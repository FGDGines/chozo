const {ciudades, departamentos} = require("../../models/DbConex");

//devuelve todos las ciudades creados
const getAll = async() => {
    const array = await ciudades.findAll({
        include:[
           {model: departamentos, attributes: { exclude: ['createdAt','updatedAt']}}
        ]
    });
    return array;
};

//devuelve todas las ciudades de un departamento indicado por el id
const getAllByDpto = async(id) => {
   const idD = Number(id);
   const array = await ciudades.findAll({ where: {departamento_id: idD}});
   return array;
};

//devuelve ciudad indicado por su id
const getById = async(id) => {
   const idD = Number(id);
   const registro = await ciudades.findByPk(idD);
   return registro;
};

//creacion de una ciudad nueva
const addCiudad = async(datos) => {
   const {idDpto, name} = datos;
   const [registro, created] = await ciudades.findOrCreate(
         {where: {ciu_nombre: name, departamento_id: idDpto}});
   return registro;      
};

//actualizacion de una ciudad
const updateCiudad = async(datos, id) => {
    const idD = Number(id);
    const {name} = datos;
    const result = await ciudades.update({ciu_nombre: name}, {where: {id: idD}});
    return result;
};

module.exports = {
   getAll,
   getAllByDpto,
   getById,
   addCiudad,
   updateCiudad
};