const {tesoreria, terceros, cajas,
       carteraxcobrar, carteraxpagar,
       contable, itemcontable, fuentes,
       items_tesoreria, formasdepago,
       items_formasdepago} = require("../../models/DbConex");

//devuelve todos los registros de tesoreria
const getTesoreria = async() => {
   const result = await tesoreria.findAll({
      include: [
        {model: fuentes, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return result;
};

//devuelve todos los registros de tesoreria de una fuente indicada por su id
const getTesoreriaByFuente = async(id) => {
    const fuente = Number(id);
    const result = await tesoreria.findAll({where: {fuente_id: fuente}}, {
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
 };

//devuelve todos los registros de tesoreria de una caja indicada por su id
const getTesoreriaByCaja = async(id) => {
    const caja = Number(id);
    const result = await tesoreria.findAll({where: {caja_id: caja}}, {
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: fuentes, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
 };

//devuelve todos los registros de tesoreria de un tercero indicada por su id
const getTesoreriaByTercero = async(id) => {
    const tercero = Number(id);
    const result = await tesoreria.findAll({where: {tercero_id: tercero}}, {
       include: [
          {model: fuentes, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
 }; 

//devuelve un registro por su id
const getTesoreriaById = async(id) => {
    const idT = Number(id);
    const result = await tesoreria.findByPk(idT, {
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: fuentes, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: contable, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: items_tesoreria, attributes: { exclude: ['createdAt','updatedAt']}},
       ]
    });
    return result;
 }; 

//devuelve consecutivo de una fuente dada
const devuelveConsecutivo = async(anual, fuente) => {
    let num = 0;
    const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
    if(registro) num = registro.conse_ultimograbado;
    num+=1;
    let numero = num.toString().padStart(7,'0');
    numero = anual.toString()+'-'+numero;
    return numero;
 };

//graba un nuevo registro en tesoreria
const addTesoreria = async(datos) => {
   const {valor, fecha, ctabancoid, cajaid, terceroid, fuenteid, items, fpagos, detalles} = datos;
   const fechaC = new Date(fecha);
   const anual = fechaC.getFullYear();

   //traemos el usuario de la caja enviada
   const usua = await cajas.findByPk(cajaid);
   const codUsuario = usua.usuario_id;

   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuenteid);

   //invocamos la funcion que grabara la contabilidad
   const contab = await grabaContable(fuenteid, num, fechaC, terceroid, items, fpagos, valor, codUsuario, cajaid, detalles);
   console.log("Contabilidad Grabada");

   //grabamos el registro en tesoreria
   const newReg = {
      tes_valor: valor,
      tes_fecha: fechaC,
      tes_detalles: detalles,
      cuentabancaria_id: ctabancoid,
      contable_id: contab.id,
      caja_id: cajaid,
      tercero_id: terceroid,
      fuente_id: fuenteid,
   };
   const grabado = await tesoreria.create(newReg);

   //grabamos los items de tesoreria
   items.forEach(async(ele) => {
       const reg = {
          ite_fecha: fechaC,
          carteraxcobrar_id: ele.tipo == 1 ? ele.carteraid : 0,
          carteraxpagar_id: ele.tipo == 2 ? ele.carteraid : 0,
          ite_valor: ele.valor,
          tesoreria_id: grabado.id,
          ite_tipo: ele.tipo,
       };
       await items_tesoreria.create(reg);
       //afectamos cartera
       if(ele.tipo == 1) {
          const xcartera = await carteraxcobrar.findByPk(ele.carteraid);
          const abo = xcartera.cxc_abonos + ele.valor;
          await carteraxcobrar.update({cxc_abonos: abo}, {where: {id: xcartera.id}});
       } else {
          const xcartera = await carteraxpagar.findByPk(ele.carteraid);
          const abo = xcartera.cxp_abonos + ele.valor;
          await carteraxpagar.update({cxp_abonos: abo}, {where: {id: xcartera.id}});
       };
   });

   //grabamos las formas de pago
   fpagos.forEach(async(ele) => {
      const citem = {
         ite_fecha: fechaC,
         cuentabanco_id: ele.ctabancoid,
         ite_valor: ele.valor,
         formapago_id: ele.idformapago,
         usuario_id: codUsuario,
         contable_id: contab.id,
      };
      await items_formasdepago.create(citem);
   });
   console.log("Formas de pago actualizadas");

   //actualizamos el consecutivo de cartera x cobrar
   const consecu = await consecutivos.findOne({where: {fuente_id: fuenteid, conse_anual: anual}})
   const newConse = consecu.conse_ultimograbado + 1;
   await consecutivos.update({conse_ultimograbado: newConse}, {where: {id: consecu.id}});
   console.log("consecutivo actualizado");
   
   return grabado;
};

const grabaContable = async(fuenteid, num, fechaC, terceroid, items, fpagos, valor, codUsuario, cajaid, detalles) => {
   //inicialmente grabamos en la tabla contable
   const registro = {
      con_numero: num,
      con_fecha: fechaC,
      con_valor: valor,
      con_detalles: detalles,
      fuente_id: fuenteid,
      tercero_id: terceroid,
      usuario_id: codUsuario,
   };
   const newRegistro = await contable.create(registro);
   console.log("Cabecera contable grabada");
   
   //capturamos en el parametro "009" predefinido el id de la Fuente de Egresos
   let parametro = await parametros.findOne({where: {para_codigo: '009'}});
   const fuenteCE = Number(parametro.para_valor);   

   //capturamos en el parametro "010" predefinido el id de la fuente de Recibo de caja
   parametro = await parametros.findOne({where: {para_codigo: '010'}});
   const fuenteRC = Number(parametro.para_valor); 

   //grabamos los items contables
   items.forEach(async(ele) => {
       const citem = {
           ite_numero: num,
           ite_fecha: fechaC,
           ite_credito: ele.tipo == 1 ? ele.valor : 0,
           ite_debito: ele.tipo == 2 ? ele.valor : 0,
           ite_detalles: ele.detalles,
           contable_id: newRegistro.id,
           fuente_id: fuenteid,
           puc_id: ele.pucid,
           tercero_id: terceroid,
           usuario_id: codUsuario,
       };
       await itemcontable.create(citem);
   });

   fpagos.forEach(async(ele) => {
         const fpag = await formasdepago.findByPk(ele.idformapago);
         const codban = await cuentas_bancarias.findByPk(ele.ctabancoid);

         const cuen = fpag.fpag_manejabanco == 1  ? codban.puc_id : cuecaja.puc_id ;
         const citem = {
            ite_numero: num,
            ite_fecha: fechaC,
            ite_debito: mov == 1 ? ele.valor : 0,
            ite_credito: mov == 2 ? ele.valor : 0,
            ite_detalles: fpag.fpag_detalles,
            contable_id: newRegistro.id,
            fuente_id: fuenteid,
            puc_id: cuen,
            tercero_id: terceroid,
            usuario_id: codUsuario,
          };
          await itemcontable.create(citem);           
   });
   console.log("items contables grabados");
   return newRegistro;
};


module.exports = {
   getTesoreria,
   getTesoreriaByCaja,
   getTesoreriaByFuente,
   getTesoreriaByTercero,
   getTesoreriaById,
   addTesoreria,
};       