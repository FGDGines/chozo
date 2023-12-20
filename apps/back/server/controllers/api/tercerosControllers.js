const {terceros, tipoterceros, tipodocumentos, ciudades} = require("../../models/DbConex");

const getTerceros = async() => {
   const array = await terceros.findAll();
   return array;
};

const getTerceroById = async(id) => {
   const idT = Number(id); 
   const registro = await terceros.findByPk(idT, {
      include: [
         {model: tipodocumentos, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: tipoterceros, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: ciudades, attributes: { exclude: ['createdAt','updatedAt']}},
      ]
   });
   return registro;
};

const addTercero = async(datos) => {
   const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
          ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id} = datos;
   const buscado = await terceros.findOne({where: {ter_documento}});
   if(buscado) {
      throw Error("Este numero de documento ya existe");
   };
   const grabado = await terceros.create(datos);
   return grabado;      
};

module.exports = {
    getTerceros,
    getTerceroById,
    addTercero
}