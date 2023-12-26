const {carteraxpagar, item_carteraxpagar, itempedidos, 
       pedidos, terceros, parametros, articulos, grupos, sublineas, existencias,
       contable, itemcontable, consecutivos, kardex} = require("../../models/DbConex");

//devuelve todos los registros de cartera x pagar
const getCartera = async() => {
   const result = await carteraxpagar.findAll({
      include: [
        {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
      ]
   });
   return result;
};

//devuelve un registro de cartera por el id
const getCarteraById = async(id) => {
   const idC = Number(id); 
   const registro = await carteraxpagar.findByPk(idC, {
      include: [
        {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: item_carteraxpagar, attributes: { exclude: ['createdAt','updatedAt']}},
      ]
   });
   return registro;
};

//devuelve todos los registrso de cartera de un tercero
const getCarteraByTercero = async(id) => {
    const idC = Number(id); 
    const registros = await carteraxpagar.findAll({where: {tercero_id: idC}});
    return registros;
 };


//devuelve consecutivo de FACTURAS DE COMPRA
const devuelveConsecutivo = async(anual, fuente) => {
    let num = 0;
    const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
    if(registro) num = registro.conse_ultimograbado;
    num+=1;
    let numero = num.toString().padStart(7,'0');
    numero = anual.toString()+'-'+numero;
    return numero;
 };
 
//agrega un registro de cartera de pedidos
const addCarteraPedidos = async(datos) => {
   const {fecha, vence, bruto, impuesto, total, retencion, tercero_id, items} = datos;
   const fechaC = new Date(fecha);
   const fechaV = new Date(vence);
   const anual = fechaC.getFullYear();

   //capturamos en el parametro "002" predefinido el id de la Fuente de facturas de Proveedores
   const parametro = await parametros.findOne({where: {para_codigo: '002'}});
   const fuente = Number(parametro.para_valor);
   
   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuente);

   //invocamos la funcion que grabara la contabilidad

   const contab = await grabaContable(fuente, num, fechaC, tercero_id, items, total);
   console.log("Contabilidad Grabada");

   //grabamos registro en la tabla de carteraxpagar
   const newReg = {
      cxp_numero: num,
      cxp_fecha: fechaC,
      cxp_fechavence: fechaV,
      cxp_bruto: bruto,
      cxp_impuesto: impuesto,
      cxp_total: total,
      cxp_retenciones: retencion,
      fuente_id: fuente,
      tercero_id,
      contable_id: contab.id,
   };
   const grabado = await carteraxpagar.create(newReg);
   console.log("Cartera x pagar grabada");

   //grabamos los items de la carteraxpagar
   items.forEach(async(element) => {
      //capturamos los datos del articulo que ingresa
      let idR = Number(element.itempedido_id);
      const ipedido = await itempedidos.findByPk(idR, {
          include: [{ model: articulos, attributes: { exclude: ['createdAt','updatedAt']} }]
      });

      const newItem = {
         item_pedido_id: element.itempedido_id,
         ite_cantidad: element.cantidad,
         ite_valorunitario: element.valorunitario,
         ite_detalles: `Compra de ${ipedido.articulo.art_detalles}`,
         carteraxp_id: grabado.id,
      };
      await item_carteraxpagar.create(newItem);
      console.log("items de Cartera x pagar grabada");

      //afectamos la cantidad facturada en los items de pedidos
      const xitem = await itempedidos.findByPk(element.itempedido_id);
      const can = xitem.ite_despachado + element.cantidad;
      await itempedidos.update({ite_despachado: can}, {where: {id: element.itempedido_id}});

      //afectamos el pedido
      await pedidos.update({ped_estado: 1}, {where: {id: xitem.pedido_id}});
      console.log("items de pedidos grabada");
      //le damos entrada al kardex a la mercancia que ingresa
      const kitem = {
         kar_entradas: element.cantidad,
         kar_salidas: 0,
         kar_preciocosto: element.valorunitario,
         kar_valorunitario: element.valorunitario,
         kar_impuesto: ipedido.ite_impuesto,
         contable_id: contab.id,
         articulo_id: ipedido.articulo.id,
      };
      await kardex.create(kitem);
      console.log("kardex grabada");
      //afectamos las existencias
      const existencia = {exi_cantidad: element.cantidad, articulo_id: ipedido.articulo.id,};
      const reg_exi = await existencias.findOne({where: { articulo_id: ipedido.articulo.id }});
      if(!reg_exi) {
         await existencias.create(existencia);
      } else {
         const newcantidad = reg_exi.exi_cantidad + element.cantidad;
         await existencias.update({exi_cantidad: newcantidad}, {where: {id: reg_exi.id}});
      };
      console.log("existencias grabada");

      //afectamos el ultimo costo 
      const ultcos = element.valorunitario * (1 + (ipedido.ite_impuesto)/100);
      await articulos.update({art_ultimocosto: ultcos, art_costopromedio: ultcos}, 
            {where: {id: ipedido.articulo.id}});
      console.log("ultimo costo grabada");      
   });
   
   //actualizamos el consecutivo de cartera x pagar
   const consecu = await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   const newConse = consecu.conse_ultimograbado + 1;
   await consecutivos.update({conse_ultimograbado: newConse}, {where: {id: consecu.id}});
   console.log("consecutivo actualizado");
   return grabado;
};

//esta funcion grabara el comprobante contable
const grabaContable = async(fuente, num, fechaC, tercero_id, items, total) => {
   //inicialmente grabamos en la tabla contable
   const registro = {
      con_numero: num,
      con_fecha: fechaC,
      con_valor: total,
      con_detalles: 'Facturacion de Pedido de Proveedores',
      fuente_id: fuente,
      tercero_id,
   };
   const newRegistro = await contable.create(registro);
   console.log("Cabecera contable grabada")

   //grabamos los itemscontables
   let suma_impuesto = 0;
   let suma_bruto = 0;
   items.forEach(async(ele) => {
      let idR = Number(ele.itempedido_id);
      const xreg = await itempedidos.findByPk(idR, {
          include: [{ model: articulos, attributes: { exclude: ['createdAt','updatedAt']} }]
      });
      suma_bruto+= xreg.ite_cantidad * xreg.ite_preciocosto;
      suma_impuesto+= xreg.ite_impuesto * xreg.ite_cantidad * xreg.ite_preciocosto /100;
      const idG = xreg.articulo.grupo_id;
      const xcontable = await grupos.findByPk(idG, {
          include: [{model: sublineas}]
      });
      const citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_debito: xreg.ite_preciocosto * xreg.ite_cantidad,
         ite_credito: 0,
         ite_detalles: `Compra de ${xreg.articulo.art_detalles}`,
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: xcontable.sublinea.pucinventario_id,
         tercero_id,
      };
      await itemcontable.create(citem);
   });
   console.log("Items contables grabados");

   //grabamos el item contable de total impuesto
   if(suma_impuesto>0) {
      const parametro = await parametros.findOne({where: {para_codigo: '003'}});
      const cta = Number(parametro.para_valor);
      const citem = {
        ite_numero: num,
        ite_fecha: fechaC,
        ite_debito: suma_impuesto,
        ite_credito: 0,
        ite_detalles: 'Impuesto a las compras',
        contable_id: newRegistro.id,
        fuente_id: fuente,
        puc_id: cta,
        tercero_id,
      };
      await itemcontable.create(citem);     
   };


   //grabamos el item contable de cuenta x pagar a proveedores
   const parametro = await parametros.findOne({where: {para_codigo: '004'}});
   const cta = Number(parametro.para_valor);
   const citem = {
     ite_numero: num,
     ite_fecha: fechaC,
     ite_debito: 0,
     ite_credito: suma_impuesto + suma_bruto,
     ite_detalles: 'Cuenta x pagar a Proveedores',
     contable_id: newRegistro.id,
     fuente_id: fuente,
     puc_id: cta,
     tercero_id,
   };
   await itemcontable.create(citem);  
   console.log("Item contable de cuenta x pagar grabado")

   //actualizamos el valor total en la contabilidad
   const xtotal = suma_impuesto + suma_bruto;
   await contable.update({con_valor: xtotal}, {where: {id: newRegistro.id}});  
   return newRegistro;
};

//anulacion de cartera x pagar
const anulaCartera = async(id) => {
   const idC = Number(id);
   const cartera = await carteraxpagar.findByPk(idC);
   if(cartera.cxp_abonos>0) throw Error("Registro de Cartera presenta abonos");
   if(cartera.cxp_anulada == 1) throw Error("Registro de cartera ya se encuentra anulado");
   //anulamos la tabla de carteraxpagar
   await carteraxpagar.update({cxp_anulada: 1}, {where: {id: idC}});
   //anulamos items de cartera x pagar
   await item_carteraxpagar.update({ite_anulado: 1}, {where: {carteraxp_id: idC}});
   //anulamos la contabilidad cabecera contable
   await contable.update({con_anulado: 1}, {where: {id: cartera.contable_id}});
   //anulamos los items de contabilidad
   await itemcontable.update({ite_anulado: 1}, {where: {contable_id: cartera.contable_id}});
   //anulamos el kardex
   await kardex.update({kar_anulado: 1}, {where: {contable_id: cartera.contable_id}});
   //devolvemos la mercancia ingresada
   const mercancia = await kardex.findAll({where: {contable_id: cartera.contable_id}});
   mercancia.forEach(async(ele) => {
      const idArt = ele.articulo_id;
      const cant = ele.kar_entradas;
      //actualizamos la tabla de existencias
      const exi = await existencias.findOne({where: {articulo_id: idArt}});
      const newCan = exi.cantidad - cant;
      await existencias.update({exi_cantidad: newCan}, {where: {id: exi.id}});
   });
   //actualizamos los items del pedido
   const items = await item_carteraxpagar.findAll({where: {carteraxp_id: idC}});
   items.forEach(async(ele) => {
      const ipedido = await itempedidos.findByPk(ele.item_pedidoid);
      const newCan = ipedido.ite_despachado - ele.ite_cantidad;
      await itempedidos.update({ite_despachado: newCan}, {where: {id: ipedido.id}});
      await pedidos.update({ped_estado: 0}, {where: {id: ipedido.pedido_id}});
   });
   return {message: "Factura de Compra Anulada"};
};

module.exports = {
   getCartera,
   getCarteraById,
   addCarteraPedidos,
   anulaCartera,
   getCarteraByTercero,
};