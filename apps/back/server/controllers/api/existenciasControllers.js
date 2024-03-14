const {existencias, articulos, consecutivos, contable,
    unidades, grupos, parametros, itemcontable, kardex} = require("../../models/DbConex");

//devuelve todas las existencias de todos los articulos
const getExistencias = async() => {
   //primero debemos asegurarnos de que todos los articulos tengan items de existencias
   const arti = await articulos.findAll();
   arti.forEach(async(ele) => {
      const existe = await existencias.findOne({where: {articulo_id: ele.id}});
      if(!existe) {
         await existencias.create({articulo_id: ele.id, exi_cantidad: 0});
      };
   });
   const result = await articulos.findAll({
      include: [
        {model: unidades, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: existencias, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: grupos, attributes: {exclude: ['createdAt','updatedAt']}},
      ],
      order: [['art_detalles', 'ASC']],
   });
   return result;
};

//devuelve las existencias de un solo articulo por su ID
const getExistenciaById = async(id) => {
   const result = await articulos.findByPk(id, {
      include: [
        {model: unidades, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: existencias, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: grupos, attributes: {exclude: ['createdAt','updatedAt']}},
      ]
   });
 
   return result;
};

//devuelve consecutivo 
const devuelveConsecutivo = async(anual, fuente) => {
   let num = 0;
   const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   if(registro) num = registro.conse_ultimograbado;
   num+=1;
   let numero = num.toString().padStart(7,'0');
   numero = anual.toString()+'-'+numero;
   return numero;
};

//actualiza la existencia de un solo articulo
const updateExistencia = async(datos, id) => {
   const {exi_cantidad} = datos;
   await existencias.update({exi_cantidad}, {where: {articulo_id: id}});
   const result = await existencias.findOne({where: {articulo_id: id}});
   return result;
};

//actualiza las existencias de todos los articulos enviados
const fullUpdateExistencias = async(datos) => {
   const {items, fecha, codUsuario} = datos; 
   const fechaC = new Date(fecha);
   const anual = fechaC.getFullYear();


   //capturamos en el parametro "012" predefinido el id de la Fuente de ajustes
   const parametro = await parametros.findOne({where: {para_codigo: '012'}});
   const fuente = Number(parametro.para_valor);

   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuente);

   //actualizamos las existencias
   let inv_sale = 0;
   let inv_entra = 0;
   items.forEach(async(ele) => {
      if(ele.real - ele.sistema >= 0) {
         inv_entra += (ele.real - ele.sistema) * ele.costo;
      } else {
         inv_sale += (ele.sistema - ele.real) * ele.costo;
      };
      //buscamos si existe registro
      const existe = await existencias.findOne({where: {articulo_id: ele.id}});
      if(existe) {
         await existencias.update({exi_cantidad: ele.real}, {where: {articulo_id: ele.id}});
      } else {
         await existencias.create({articulo_id: ele.id, exi_cantidad: ele.real});
      };
   });

   //grabamos la cabecera contable
   const registro = {
      con_numero: num,
      con_fecha: fechaC,
      con_valor: 0,
      con_detalles: 'Ajustes de Inventario',
      fuente_id: fuente,
      tercero_id: 1,
      usuario_id: codUsuario,
   };
   const newRegistro = await contable.create(registro);
   console.log("Cabecera contable grabada")
   
   //grabamos los items contables
   if(inv_sale>0) {
      let citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: inv_sale,
         ite_debito: 0,
         ite_detalles: 'Perdida de Mercancia',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: 286,
         tercero_id: 1,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem); 
      citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: 0,
         ite_debito: inv_sale,
         ite_detalles: 'Perdida de Mercancia',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: 288,
         tercero_id: 1,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem);    
   };

   if(inv_entra>0) {
      let citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: 0,
         ite_debito: inv_entra,
         ite_detalles: 'Recuperacion de Mercancia',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: 286,
         tercero_id: 1,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem); 
      citem = {
         ite_numero: num,
         ite_fecha: fechaC,
         ite_credito: inv_entra,
         ite_debito: 0,
         ite_detalles: 'Recuperacion de Mercancia',
         contable_id: newRegistro.id,
         fuente_id: fuente,
         puc_id: 288,
         tercero_id: 1,
         usuario_id: codUsuario,
      };
      await itemcontable.create(citem);    
   };

   //grabamos el kardex
   items.forEach(async(ele) => {
      const entra = ele.real>ele.sistema ? ele.real-ele.sistema : 0;
      const sale = ele.real<ele.sistema ?ele.sistema-ele.real : 0;
      const kitem = {
         kar_salidas: sale,
         kar_entradas: entra,
         kar_preciocosto: ele.costo,
         kar_valorunitario: ele.costo,
         kar_impuesto: 0,
         contable_id: newRegistro.id,
         articulo_id: ele.id,
      };
      await kardex.create(kitem);
      console.log("kardex actualizado");
   });

   return {message: "Existencias actualizadas"};
  
};

module.exports = {
   getExistencias,
   getExistenciaById,
   updateExistencia,
   fullUpdateExistencias,
};