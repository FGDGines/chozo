const {terceros, tipoterceros, 
      tipodocumentos, ciudades, departamentos} = require("../../models/DbConex");

const getTerceros = async() => {
   const array = await terceros.findAll({
      where: {ter_cliente: 1},
      order: [['ter_tercero', 'ASC']],
   });
   return array;
};

const getTerceroById = async(id) => {
   const idT = Number(id); 
   const registro = await terceros.findByPk(idT, {
      include: [
         {model: tipodocumentos, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: tipoterceros, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: ciudades, attributes: { exclude: ['createdAt','updatedAt']},
                 include: [{model: departamentos, attributes: {exclude: ['createdAt','updatedAt']}}]},
      ],
   });
   return registro;
};

const addTercero = async(datos) => {
   const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
          ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id, ter_cliente, ter_credito} = datos;
   const buscado = await terceros.findOne({where: {ter_documento}});
   if(buscado) {
      throw Error("Este numero de documento ya existe");
   };
   const grabado = await terceros.create(datos);
   return grabado;      
};

const updateTercero = async(datos, id) => {
   const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
      ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id, ter_credito} = datos;
   const idTer = Number(id);
   const result = await terceros.update(datos, {where: {id: idTer}});
   return result;     
};

const bulkTerceros = async(info) => {
   const {datos} = info;
   const result = await terceros.bulkCreate(datos);
   return result;
};

module.exports = {
    getTerceros,
    getTerceroById,
    addTercero,
    updateTercero,
    bulkTerceros,
}