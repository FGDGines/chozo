const {fuentes} = require("../../models/DbConex");

//devuelve todas las fuentes
const getFuentes = async() => {
    const array = await fuentes.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    });
    return array;
};


//devuelve fuente indicado por su id
const getFuenteById = async(id) => {
   const idD = Number(id);
   const registro = await fuentes.findByPk(idD);
   return registro;
};

//creacion de una fuente nueva
const addFuente = async(datos) => {
   const {fue_detalles,fue_iniciales,fue_mantieneconsecutivo} = datos;
   const [registro, created] = await fuentes.findOrCreate(
         {where: {fue_detalles,fue_iniciales,fue_mantieneconsecutivo}});
   return registro;      
};

//actualizacion de una fuente
const updateFuente = async(datos, id) => {
    const {fue_detalles, fue_iniciales, fue_matieneconsecutivo} = datos;
    const result = await fuentes.update({fue_detalles, fue_iniciales, fue_matieneconsecutivo}, {where: {id}});
    const registro = await fuentes.findByPk(id);
    return registro;
};

//bulkcreate fuentes
const bulkFuentes = async(info) => {
   const {datos} = info;
   const result = await fuentes.bulkCreate(datos);
   return result;
};

module.exports = {
   getFuentes,
   getFuenteById,
   addFuente,
   updateFuente,
   bulkFuentes,
};