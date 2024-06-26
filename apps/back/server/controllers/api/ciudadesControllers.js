const {ciudades, departamentos} = require("../../models/DbConex");


//devuelve todos las ciudades creados
const getAll = async() => {
    const array = await ciudades.findAll({
        include:[
           {model: departamentos, attributes: { exclude: ['createdAt','updatedAt']}}
        ],
        order: [['ciu_nombre', 'ASC']],
    });
    return array;
};

//devuelve todas las ciudades de un departamento indicado por el id
const getAllByDpto = async(id) => {
   const idD = Number(id);
   const array = await ciudades.findAll({
       where: {departamento_id: idD},
       order: [['ciu_nombre', 'ASC']],
      });
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
   const {departamento_id, ciu_nombre, ciu_codigo} = datos;
   const [registro, created] = await ciudades.findOrCreate(
         {where: {ciu_nombre, departamento_id, ciu_codigo}});
   return registro;      
};

//actualizacion de una ciudad
const updateCiudad = async(datos, id) => {
    const idD = Number(id);
    const {ciu_nombre, ciu_codigo} = datos;
    const result = await ciudades.update({ciu_nombre, ciu_codigo}, {where: {id: idD}});
    return result;
};

//creacion masiva de ciudades
const bulkCiudades = async(info) => {
   const {datos} = info;
   const result = await ciudades.bulkCreate(datos);
   return result;
};

module.exports = {
   getAll,
   getAllByDpto,
   getById,
   addCiudad,
   updateCiudad,
   bulkCiudades
};