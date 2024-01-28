const {parametros} = require("../../models/DbConex");

//devuelve todos los parametros
const getParametros = async() => {
   const result = await parametros.findAll();
   return result;
};

//devuelve parametro por su ID
const getParametroById = async(id) => {
    const result = await parametros.findByPk(id);
    return result;
};

//crear un nuevo parametro
const newParametro = async(datos) => {
   const {para_codigo} = datos; 
   const existe = await parametros.findOne({where: {para_codigo}});
   if(existe) return existe;
   const result = await parametros.create(datos);
   return result;
};

//modifica un parametro
const updateParametro = async(datos, id) => {
   const result = await parametros.update(datos, {where: {id}});
   const registro = await parametros.findByPk(id);
   return registro;
};

//crea varios registros simultaneamente
const llenarParametros = async(info) => {
   const {datos} = info;
   const result = await parametros.bulkCreate(datos);
   const registros = await parametros.findAll();
   return registros;
};

module.exports = {
   getParametros,
   getParametroById,
   newParametro,
   updateParametro,
   llenarParametros,
};