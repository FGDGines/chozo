const {unidades} = require("../../models/DbConex");

//devuelve todas las unidades
const getUnidades = async() => {
    const array = await unidades.findAll();
    return array;
};


//devuelve unidad indicado por su id
const getUnidadById = async(id) => {
   const idD = Number(id);
   const registro = await unidades.findByPk(idD);
   return registro;
};

//creacion de una unidad nueva
const addUnidad = async(datos) => {
   const {detalles, abreviatura}= datos;
   const [registro, created] = await unidades.findOrCreate({where: {uni_detalles: detalles,uni_abreviatura: abreviatura}});
   return registro;      
};

//actualizacion de una unidad
const updateUnidad = async(datos, id) => {
    const {detalles, abreviatura} = datos;
    const result = await unidades.update({uni_detalles: detalles, uni_abreviatura: abreviatura}, {where: {id}});
    return result;
};

module.exports = {
   getUnidades,
   getUnidadById,
   addUnidad,
   updateUnidad
};