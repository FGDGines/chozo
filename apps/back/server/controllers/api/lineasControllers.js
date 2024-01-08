const {lineas} = require("../../models/DbConex");

//devuelve todas las lineas
const getLineas = async() => {
   const result = await lineas.findAll();
   return result;
};

//trae la informacion de una linea por su id
const getLineaById = async(id) => {
   const registro = await lineas.findByPk(id);
   return registro;
};

//crea una nueva linea
const addLinea = async(datos) => {
   const {lin_detalles}= datos;
   const [registro, created] = await lineas.findOrCreate({where: {lin_detalles}});
   return registro;
};

//modifica una linea existente
const updateLinea = async(datos, id) => {
   const idL = Number(id);
   const result = await lineas.update(datos, {where: {id: idL}});
   return result;
};

module.exports = {
    getLineas,
    getLineaById,
    addLinea,
    updateLinea
};