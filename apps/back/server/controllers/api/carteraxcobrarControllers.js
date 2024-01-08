const {carteraxcobrar, items_carteraxcobrar, unidades, consecutivos,
       contable, itemcontable, articulos, parametros, grupos,
       sublineas, existencias, cuentas_bancarias,
       kardex, formasdepago, cajas, terceros, items_formasdepago} = require("../../models/DbConex");

//consulta todas las cuentas x cobrar generadas
const getCartera = async() => {
   const result = await carteraxcobrar.findAll({
      include: [
         {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return result;
};

//consulta todas las cuentas x cobrar generadas desde una caja
const getCarteraxCaja = async(id) => {
    const idC = Number(id);
    const result = await carteraxcobrar.findAll({where: {caja_id: idC}},{
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
 };

 //consulta cartera x un id
const getCarteraById = async(id) => {
    const idC = Number(id);
    const result = await carteraxcobrar.findByPk(idC, {
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: items_carteraxcobrar, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: contable, attributes: { exclude: ['createdAt','updatedAt']},
                  include: [{model: items_formasdepago, 
                           include: [{model: formasdepago}] }]},
       ]
    });
    return result;
 };

 //consulta cartera x un tercero
 const getCarteraByTerceroId = async(id) => {
    const idter = Number(id);
    const result = await carteraxcobrar.findAll({where: {tercero_id: idter}},{
       include: [
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
};

//devuelve consecutivo de FACTURAS DE venta
const devuelveConsecutivo = async(anual, fuente) => {
    let num = 0;
    const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
    if(registro) num = registro.conse_ultimograbado;
    num+=1;
    let numero = num.toString().padStart(7,'0');
    numero = anual.toString()+'-'+numero;
    return numero;
 };

//agrega una nueva venta
const addCartera = async(datos) => {
   const {fecha, vence, bruto, impuesto, total, metodopago, 
          terceroid, cajaid, items, fpagos} = datos;
   const fechaC = new Date(fecha);
   const fechaV = new Date(vence);
   const anual = fechaC.getFullYear();

   //traemos el usuario de la caja enviada
   const usua = await cajas.findByPk(cajaid);
   const codUsuario = usua.usuario_id;
   
   //capturamos en el parametro "005" predefinido el id de la Fuente de facturas de ventas
   const parametro = await parametros.findOne({where: {para_codigo: '005'}});
   const fuente = Number(parametro.para_valor);

   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuente);

   //capturamos en el parametro "008" predefinido el id de la forma de pago credito tabla formapagos
   const parametro1 = await parametros.findOne({where: {para_codigo: '008'}});
   const fpag_credito = Number(parametro1.para_valor);
  
   //invocamos la funcion que grabara la contabilidad
   const contab = await grabaContable(fuente, num, fechaC, terceroid, items, fpagos, total, impuesto, metodopago, codUsuario, cajaid);
   console.log("Contabilidad Grabada");

   //totalizamos los abonos segun las formas de pago enviadas
   let abonos = 0;
   if(metodopago == 1) {
      abonos = total;
   } else {
     fpagos.forEach(ele => {
         if(ele.idFormaPago !== fpag_credito) abonos+= ele.valor;
     }); 
   };

   //procedemos a grabar en carteraxcobrar
   const newReg = {
      cxc_numero: num,
      cxc_fechafac: fechaC,
      cxc_fechavenc: fechaV,
      cxc_bruto: bruto,
      cxc_impuesto: impuesto,
      cxc_valor: total,
      cxc_retenciones: 0,
      cxc_abonos: abonos,
      cxc_metodopago: metodopago,
      fuente_id: fuente,
      tercero_id: terceroid,
      contable_id: contab.id,
      caja_id: cajaid,
   };
   const grabado = await carteraxcobrar.create(newReg);
   console.log("Cartera x cobrar grabada");

   //procedemos a grabar los items de la carteraxcobrar
   items.forEach(async(ele) => {
      let idArt = Number(ele.articuloId);
      const arti = await articulos.findByPk(idArt);
      const citem = {
         ite_detalles: arti.art_detalles,
         codigo_id: idArt,
         ite_valorunitario: ele.valoruni,
         ite_impuesto: ele.impuesto,
         ite_preciocosto: ele.preciocosto,
         ite_cantidad: ele.cantidad,
         cartera_id: grabado.id,
      };
      await items_carteraxcobrar.create(citem);
      console.log("Items de cartera actualizado");

      //grabamos la informacion en el kardex
      const kitem = {
         kar_salidas: ele.cantidad,
         kar_entradas: 0,
         kar_preciocosto: ele.preciocosto,
         kar_valorunitario: ele.valoruni,
         kar_impuesto: ele.impuesto,
         contable_id: contab.id,
         articulo_id: idArt,
      };
      await kardex.create(kitem);
      console.log("kardex actualizado");

      //afectamos las existencias
      const existencia = {exi_cantidad: 0 - ele.cantidad, articulo_id: idArt,};
      const reg_exi = await existencias.findOne({where: { articulo_id: idArt }});
      if(!reg_exi) {
         await existencias.create(existencia);
      } else {
         const newcantidad = reg_exi.exi_cantidad - ele.cantidad;
         await existencias.update({exi_cantidad: newcantidad}, {where: {id: reg_exi.id}});
      };
      console.log("existencias actualizadas");
   });

   //procedemos a guardar las formas de pago
   fpagos.forEach(async(ele) => {
      const citem = {
         ite_fecha: fechaV,
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
   const consecu = await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   const newConse = consecu.conse_ultimograbado + 1;
   await consecutivos.update({conse_ultimograbado: newConse}, {where: {id: consecu.id}});
   console.log("consecutivo actualizado");
   
   return newReg;
};


//esta funcion grabara el comprobante contable
const grabaContable = async(fuente, num, fechaC, terceroid, items, fpagos, total, impuesto, metodopago, codUsuario, cajaid) => {
   //inicialmente grabamos en la tabla contable
   const registro = {
      con_numero: num,
      con_fecha: fechaC,
      con_valor: total,
      con_detalles: 'Factura de ventas',
      fuente_id: fuente,
      tercero_id: terceroid,
      usuario_id: codUsuario,
   };
   const newRegistro = await contable.create(registro);
   console.log("Cabecera contable grabada")

   //grabamos los itemscontables

   items.forEach(async(ele) => {
      let idArt = Number(ele.articuloId);
      const xreg = await articulos.findByPk(idArt, {
         include: [{model: grupos}]
      });
      const sublin = await sublineas.findByPk(xreg.grupo.sublinea_id);
      const puc1 = sublin.pucinventario_id;
      const puc2 = sublin.pucingresos_id;
      const puc3 = sublin.puccostoventa_id;
      let citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: ele.valoruni*ele.cantidad,
         ite_debito: 0,
         ite_detalles: 'Ingresos por factura de venta',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: puc2,
         tercero_id: terceroid,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem); 
      citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_debito: ele.preciocosto*ele.cantidad,
         ite_credito: 0,
         ite_detalles: 'Costo de venta',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: puc3,
         tercero_id: terceroid,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem);
      citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: ele.preciocosto*ele.cantidad,
         ite_debito: 0,
         ite_detalles: 'Salida de Mercancia por Venta',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: puc3,
         tercero_id: terceroid,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem);
   });

   //grabamos el item contable de total impuesto
   if(impuesto>0) {
      const parametro = await parametros.findOne({where: {para_codigo: '006'}});
      const cta = Number(parametro.para_valor);
      const citem = {
        ite_numero: num,
        ite_fecha: fechaC,
        ite_debito: 0,
        ite_credito: impuesto,
        ite_detalles: 'Impuesto a las Ventas',
        contable_id: newRegistro.id,
        fuente_id: fuente,
        puc_id: cta,
        tercero_id: terceroid,
        usuario_id: codUsuario,
      };
      await itemcontable.create(citem);     
   };

   if(metodopago == 2) {
      //metodo de pago credito
      const parametro = await parametros.findOne({where: {para_codigo: '007'}});
      const cta = Number(parametro.para_valor);
      const citem = {
        ite_numero: num,
        ite_fecha: fechaC,
        ite_debito: total,
        ite_credito: 0,
        ite_detalles: 'Cuenta x Cobrar Clientes',
        contable_id: newRegistro.id,
        fuente_id: fuente,
        puc_id: cta,
        tercero_id: terceroid,
        usuario_id: codUsuario,
      };
      await itemcontable.create(citem);  
   } else {
      //metodo pago contado, recorremos el array de formas de pago
      const cuecaja = await cajas.findByPk(cajaid);
      const parametro = await parametros.findOne({where: {para_codigo: '007'}});
      const ctacredito = Number(parametro.para_valor);
      fpagos.forEach(async(ele) => {
         const fpag = await formasdepago.findByPk(ele.idformapago);
         const codban = await cuentas_bancarias.findByPk(ele.ctabancoid);

         const cuen = fpag.fpag_manejabanco == 1 
             ?codban.puc_id : fpag.fpag_manejabanco == 2 
                 ? cuecaja.puc_id : ctacredito ;
         const citem = {
            ite_numero: num,
            ite_fecha: fechaC,
            ite_debito: ele.valor,
            ite_credito: 0,
            ite_detalles: fpag.fpag_detalles,
            contable_id: newRegistro.id,
            fuente_id: fuente,
            puc_id: cuen,
            tercero_id: terceroid,
            usuario_id: codUsuario,
          };
          await itemcontable.create(citem);           
      });
   };

   console.log("Item contable grabados")
   return newRegistro;
};


//anulacion de una factura
const anulaCartera = async(id) => {
   const idC = Number(id);
   const cartera = await carteraxcobrar.findByPk(idC);
   if(cartera.cxc_abonos > 0 && cartera.cxc_metodopago == 2) {
       throw Error("Factura presenta abonos");
   };
   if(cartera.cxc_anulada == 1) {
       throw Error("Factura ya se encuentra anulada");
   };
   const grabado = await carteraxcobrar.update({cxc_anulada: 1}, {where: {id: idC}});
   await items_carteraxcobrar.update({ite_anulado: 1}, {where: {cartera_id: idC}});
   await kardex.update({kar_anulado: 1}, {where: {contable_id: cartera.contable_id}});
   await items_formasdepago.update({ite_anulado: 1}, {where: {contable_id: cartera.contable_id}});
   await contable.update({con_anulado: 1}, {where: {id: cartera.contable_id}});
   await itemcontable.update({ite_anulado: 1}, {where: {contable_id: cartera.contable_id}});
   //volvemos a actualizar las existencias
   const items = await items_carteraxcobrar.findAll({where: {cartera_id: idC}});
   items.forEach(async(ele) => {
      const reg_exi = await existencias.findOne({where: {articulo_id: ele.codigo_id}});
      if(reg_exi) {
         const newcantidad = reg_exi.exi_cantidad + ele.ite_cantidad;
         await existencias.update({exi_cantidad: newcantidad}, {where: {id: reg_exi.id}});
      };   
   });
   return grabado;
};


module.exports = {
   getCartera,
   getCarteraById,
   getCarteraByTerceroId,
   getCarteraxCaja,
   addCartera,
   anulaCartera,
};