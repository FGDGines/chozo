const {carteraxpagar, item_carteraxpagar, itempedidos, 
       pedidos, terceros, parametros, articulos, grupos, sublineas,
       contable, itemcontable, consecutivos} = require("../../models/DbConex");

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
   return contab;

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
      contable_id: contable.id,
   };
   const grabado = await carteraxpagar.create(newReg);

   //grabamos los items de la carteraxpagar
   items.forEach(async(element) => {
      const newItem = {
         itempedido_id: element.itempedido_id,
         ite_cantidad: element.cantidad,
         ite_valorunitario: element.valorunitario,
         ite_detalles: element.detalles,
         carteraxp_id: grabado.id,
      };
      await item_carteraxpagar.create(newItem);
      //afectamos la cantidad facturada en los items de pedidos
      const xitem = await itempedidos.findByPk(element.itempedido_id);
      const can = xitem.ite_despachado + element.cantidad;
      await itempedidos.update({ite_despachado: can}, {where: {id: element.itempedido_id}});
      //afectamos el pedido
      await pedidos.update({ped_estado: 1}, {where: {id: xitem.pedido_id}});
   });

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
   //grabamos los itemscontables
   items.forEach(async(ele) => {
      let idR = Number(ele.itempedido_id);
      const xreg = await itempedidos.findByPk(idR, {
          include: [{ model: articulos, attributes: { exclude: ['createdAt','updatedAt']} }]
      });
      console.log(xreg)
      const idG = xreg.articulo.grupo_id;
      const xcontable = await grupos.findByPk(idG, {
          include: [{model: sublineas}]
      });
      const citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         //pendiente para continuar
      }
   });
   return newRegistro;
};


module.exports = {
   getCartera,
   getCarteraById,
   addCarteraPedidos,
};