const {carteraxcobrar, items_carteraxcobrar, unidades, grupos,
       contable, itemcontable, articulos, parametros, sublineas, existencias,
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
    const result = await carteraxcobrar.findAll({where: {id: idC}},{
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: items_carteraxcobrar, attributes: { exclude: ['createdAt','updatedAt']}},
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
   const fpag_credito = Number(parametro.para_valor);
  
   //invocamos la funcion que grabara la contabilidad
   const contab = await grabaContable(fuente, num, fechaC, terceroid, items, fpagos, total, metodopago, cajaid);
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
      cxc_retenciones: retencion,
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
         cartera_id: newReg.id,
      };
      await items_carteraxcobrar.create(citem);
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
      console.log("kardex grabada");
      //afectamos las existencias
      const existencia = {exi_cantidad: ele.cantidad, articulo_id: idArt,};
      const reg_exi = await existencias.findOne({where: { articulo_id: idArt }});
      if(!reg_exi) {
         await existencias.create(existencia);
      } else {
         const newcantidad = reg_exi.exi_cantidad - element.cantidad;
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
         formapago_id: ele.idFormaPago,
         usuario_id: codUsuario,
         contable_id: contab.id,
      };
      await items_formasdepago.create(citem);
   });

   //actualizamos el consecutivo de cartera x cobrar
   const consecu = await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   const newConse = consecu.conse_ultimograbado + 1;
   await consecutivos.update({conse_ultimograbado: newConse}, {where: {id: consecu.id}});
   console.log("consecutivo actualizado");
   
   return newReg;
};


//esta funcion grabara el comprobante contable
const grabaContable = async(fuente, num, fechaC, terceroid, items, fpagos, total) => {
   //inicialmente grabamos en la tabla contable
   const registro = {
      con_numero: num,
      con_fecha: fechaC,
      con_valor: total,
      con_detalles: 'Factura de ventas',
      fuente_id: fuente,
      tercero_id: terceroid,
   };
   const newRegistro = await contable.create(registro);
   console.log("Cabecera contable grabada")

   //grabamos los itemscontables
   let array1 = [];
   let array2 = [];
   items.forEach(async(ele) => {
      let idArt = Number(ele.articuloId);
      const xreg = await articulos.findByPk(idArt, {
         include: [{model: grupos, attributes: {include: [{model: sublineas}]}}]
      });
      const puc1 = xreg.grupo.sublinea.pucinventario_id;
      const puc2 = xreg.grupo.sublinea.pucingresos_id;
      const puc3 = xreg.grupo.sublinea.puccostoventa_id;

      //agrupamos en array1 por el puc2 (cuenta de ingresos)
      let hallado = false;
      array1.map(function(dato) {
         if(dato.puc == puc2) {
            hallado = true;
            dato.valor+= items.valoruni * items.cantidad;
         };
         return dato;
      });
      if(!hallado) array1.push({puc: puc2, valor: items.valoruni * items.cantidad});

      //agrupamos en array2 por el puc1 (cuenta de inventario contra costo de venta)
      hallado = false;
      array2.map(function(dato) {
         if(dato.pucInv == puc1) {
            hallado = true;
            dato.valor+= items.preciocosto * items.cantidad;
         };
         return dato;
      });
      if(!hallado) array2.push({pucInv: puc1, pucCV: puc3, valor: items.preciocosto * items.cantidad});   
   });

   //procedemos a contabilizar los ingresos agrupados
   array1.forEach(async(e) => {
      const citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: e.valor,
         ite_debito: 0,
         ite_detalles: `Ingresos por factura de venta}`,
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: e.puc,
         tercero_id: terceroid,
      };
      await itemcontable.create(citem);
   });

   //procedemos a contabilizar los costos de venta
   array2.forEach(async(e) => {
         const citem1 = {
            ite_numero: num,
            ite_fecha: fechaC,
            ite_debito: e.valor,
            ite_credito: 0,
            ite_detalles: `Costos de venta}`,
            contable_id: newRegistro.id,
            fuente_id: fuente,
            puc_id: e.pucCV,
            tercero_id: terceroid,
         };
         await itemcontable.create(citem1);
         const citem2 = {
            ite_numero: num,
            ite_fecha: fechaC,
            ite_credito: e.valor,
            ite_debito: 0,
            ite_detalles: `Costos de venta}`,
            contable_id: newRegistro.id,
            fuente_id: fuente,
            puc_id: e.pucInv,
            tercero_id: terceroid,
         };
         await itemcontable.create(citem2);
   });

   console.log("Items contables grabados");

   //grabamos el item contable de total impuesto
   if(suma_impuesto>0) {
      const parametro = await parametros.findOne({where: {para_codigo: '006'}});
      const cta = Number(parametro.para_valor);
      const citem = {
        ite_numero: num,
        ite_fecha: fechaC,
        ite_debito: 0,
        ite_credito: suma_impuesto,
        ite_detalles: 'Impuesto a las Ventas',
        contable_id: newRegistro.id,
        fuente_id: fuente,
        puc_id: cta,
        tercero_id: terceroid,
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
      };
      await itemcontable.create(citem);  
   } else {
      //metodo pago contado, recorremos el array de formas de pago
      fpagos.forEach(async(ele) => {
         const citem = {
            ite_numero: num,
            ite_fecha: fechaC,
            ite_debito: ele.valor,
            ite_credito: 0,
            ite_detalles: ele.detalles,
            contable_id: newRegistro.id,
            fuente_id: fuente,
            puc_id: ele.cuenta,
            tercero_id: terceroid,
          };
          await itemcontable.create(citem);           
      });
   };

   console.log("Item contable grabados")
   return newRegistro;
};



module.exports = {

};