const {existencias, articulos, unidades, grupos} = require("../../models/DbConex");

//devuelve todas las existencias de todos los articulos
const getExistencias = async() => {
   const result = await articulos.findAll({
      include: [
        {model: unidades, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: existencias, attributes: {exclude: ['createdAt','updatedAt']}},
        {model: grupos, attributes: {exclude: ['createdAt','updatedAt']}},
      ]
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

//actualiza la existencia de un solo articulo
const updateExistencia = async(datos, id) => {
   const {exi_cantidad} = datos;
   await existencias.update({exi_cantidad}, {where: {articulo_id: id}});
   const result = await existencias.findOne({where: {articulo_id: id}});
   return result;
};

//actualiza las existencias de todos los articulos enviados
const fullUpdateExistencias = async(datos) => {
   const {items, fecha, usuario} = datos; 
   items.forEach(async(ele) => {
      //buscamos si existe registro
      const existe = await existencias.findOne({where: {articulo_id: ele.articulo_id}});
      if(existe) {
         await existencias.update({exi_cantidad: ele.exi_cantidad}, {where: {articulo_id: existe.id}});
      } else {
         await existencias.create({articulo_id: ele.articulo_id, exi_cantidad: ele.exi_cantidad});
      };
   });
   return {message: "Existencias actualizadas"};
   //ojo pendiente grabar en el kardex el ajuste de inventario, esto genera un comprobante contable
};

module.exports = {
   getExistencias,
   getExistenciaById,
   updateExistencia,
   fullUpdateExistencias,
};