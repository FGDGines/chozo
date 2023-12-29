const {articulos, grupos, marcas, unidades, conex} = require("../../models/DbConex");


//devuelve todos los articulos
const getArticulos = async() => {
   const result = await articulos.findAll();
   return result;
};

//devuelve todos los articulos de un grupo
const getArticulosByIdGrupo = async(id) => {
    const idG = Number(id);
    const result = await articulos.findAll({where: {grupo_id: idG}});
    return result;
};
 
//devuelve el articulo por el id
const getArticuloById = async(id) => {
   const registro = await articulos.findByPk(id, {
      include: [
        {model: marcas, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: unidades, attributes: { exclude: ['createdAt','updatedAt']}},
        {model: grupos, attributes: { exclude: ['createdAt','updatedAt']}},
      ]
   })
   return registro;
};

//agrega un nuevo articulo
const addArticulo = async(datos) => {
   const {art_detalles, art_referencia, grupo_id} = datos;
   const buscado = await articulos.findAll({
      where: { 
         art_detalles,
         art_referencia,
         grupo_id
       }
   });
   if(buscado.length) return buscado;
   const registro = await articulos.create(datos);
   return registro;
};

//actualiza registro
const updateArticulo = async(datos, id) => {
   const idA = Number(id);
   const registro = await articulos.update(datos, {where: {id: idA}});
   return registro;
};

//buscar un articulo por el nombre
const findArticulo = async(datos) => {
   const {art_detalles, art_referencia, grupo_id} = datos;
   articulos.findAll({
      where: {
        [conex.and]: [
          { art_detalles },
          { art_referencia },
          {grupo_id}
        ]
      }
    });
};

module.exports = {
   getArticulos,
   getArticuloById,
   getArticulosByIdGrupo,
   addArticulo,
   updateArticulo
};