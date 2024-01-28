const { tipoterceros } = require("../../models/DbConex");

//devuelve todos los tipos de terceros
const getAll = async() => {
    const array = await tipoterceros.findAll();
    return array;
};

//devuelve registro por el ID
const getTipoterById = async(id) => {
   const result = await tipoterceros.findByPk(id);
   return result;
};

//crear un nuevo tipo de tercero
const newTipoter = async(datos) => {
   const {tter_detalles} = datos;
   const buscado = await tipoterceros.findOne({where: {tter_detalles}});
   if(buscado) return buscado;
   const result = await tipoterceros.create(datos);
   return result;
};

//actualizar tipo de tercero
const updateTipoter = async(datos, id) => {
   const result = await tipoterceros.update(datos, {where: {id}});
   const registro = await tipoterceros.findByPk(id);
   return registro;
};

//creacion masiva de tipos de tercero
const bulkTipoter = async(datos) => {
   const result = await tipoterceros.bulkCreate(datos);
   return result;
};

module.exports = {
   getAll,
   getTipoterById,
   newTipoter,
   updateTipoter,
   bulkTipoter,
};