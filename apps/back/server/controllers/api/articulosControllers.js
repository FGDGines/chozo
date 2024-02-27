const {articulos, grupos, marcas, kardex, itempedidos, existencias,
      unidades, sublineas, conex} = require("../../models/DbConex");


//devuelve todos los articulos
const getArticulos = async() => {
   const result = await articulos.findAll({
      include: [
         {model: marcas, attributes: {exclude: ['createdAt','updatedAt']}},
         {model: unidades, attributes: {exclude: ['createdAt','updatedAt']}},
         {model: grupos, attributes: {exclude: ['createdAt','updatedAt']}},
      ]
   });
   return result;
};

//devuelve todos los articulos de un grupo
const getArticulosByIdGrupo = async(id) => {
    const idG = Number(id);
    const result = await articulos.findAll({where: {grupo_id: idG}, 
       include: [
         {model: marcas, attributes: {exclude: ['createdAt','updatedAt']}},
         {model: unidades, attributes: {exclude: ['createdAt','updatedAt']}},
       ]      
      });
    return result;
};
 
//devuelve el articulo por el id
const getArticuloById = async(id) => {
   const registro = await articulos.findByPk(id, {
      include: [
        {model: marcas, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: unidades, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: grupos, attributes: { exclude: ['createdAt','updatedAt']},
               include: [{model: sublineas, attributes: { exclude: ['createdAt','updatedAt']}}]},
      ]
   })
   return registro;
};

//agrega un nuevo articulo
const addArticulo = async(datos) => {
   const {art_detalles, art_referencia, grupo_id, marca_id, unidad_id} = datos;
   const buscado = await articulos.findAll({
      where: { 
         art_detalles,
         art_referencia,
         grupo_id,
         marca_id,
         unidad_id
      }
   });
   if(buscado.length) return buscado;
   const registro = await articulos.create(datos);
   return registro;
};

//actualiza registro
const updateArticulo = async(datos, id) => {
   const idA = Number(id);
   await articulos.update(datos, {where: {id: idA}});
   const registro = getArticuloById(id);
   return registro;
};

//eliminar un articulo
const deleteArticulo = async(id) => {
   const idA = Number(id);
   //verificamos que no tiene movimientos en el kardex ni en items de pedidos
   const movim = await kardex.findOne({where:{articulo_id: idA}});
   if(movim) throw Error("Articulo tiene Movimientos en el Kardex");
   //verificamos si tiene movimiento en pedidos
   const pedidos = await itempedidos.findOne({where: {articulo_id: idA}});
   if(pedidos) throw Error("Articulo tiene movimiento en pedidos");
   //verificamos que no tenga registros en existencias
   const existe = await existencias.findOne({where: {articulo_id: idA}});
   if(existe) {
      //eliminamos primero de la tabla de existencias
      await existencias.destroy({where: {articulo_id: idA}});
   };
   //procedemos a eliminar el registro
   await articulos.destroy({where: {id: idA}});
   return {message: "Registro Eliminado"};
};

//creacion masiva de articulos
const bulkArticulos = async(info) => {
   const {datos} = info;
   const result = await articulos.bulkCreate(datos);
   return result;
};


module.exports = {
   getArticulos,
   getArticuloById,
   getArticulosByIdGrupo,
   addArticulo,
   updateArticulo,
   bulkArticulos,
   deleteArticulo,
};