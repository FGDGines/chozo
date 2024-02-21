const {departamentos, paises} = require("../../models/DbConex");

//devuelve todos los departamentos creados
const getAll = async() => {
    const array = await departamentos.findAll({
        include:[
           {model: paises, attributes: { exclude: ['createdAt','updatedAt']}}
        ]
    });
    return array;
};

//devuelve todos los departamentos de un pais indicado por el id
const getAllByPais = async(id) => {
   const idPais = Number(id);
   const array = await departamentos.findAll({ where: {pais_id: idPais}});
   return array;
};

//devuelve departamento indicado por su id
const getById = async(id) => {
   const idD = Number(id);
   const registro = await departamentos.findByPk(idD);
   return registro;
};

//creacion de un departamento nuevo
const addDpto = async(datos) => {
   const {dpt_nombre, dpt_codigo, pais_id} = datos;
   const [registro, created] = await departamentos.findOrCreate(
         {where: {dpt_nombre, dpt_codigo, pais_id}});
   return registro;      
};

//actualizacion de un departamento nuevo
const updateDpto = async(datos, id) => {
    const {dpt_nombre} = datos;
    const result = await departamentos.update({dpt_nombre}, {where: {id}});
    return result;
};

//creacion masiva de dptos
const bulkDptos = async(info) => {
   const {datos} = info;
   const result = await departamentos.bulkCreate(datos);
   return result;
};

module.exports = {
   getAll,
   getAllByPais,
   getById,
   addDpto,
   updateDpto,
   bulkDptos
};