const {cuentas_bancarias, puc} = require("../../models/DbConex");

//devuelve todas las cuentas bancarias disponibles
const getCuentas = async() => {
   const result = await cuentas_bancarias.findAll({
      include: [{model: puc, attributes: { exclude: ['createdAt','updatedAt']}}]
   });
   return result;
};

//devuelve  cuentas bancaria por su id
const getCuentaById = async(id) => {
    const result = await cuentas_bancarias.findByPk(id, {
       include: [{model: puc, attributes: { exclude: ['createdAt','updatedAt']}}]
    });
    return result;
};

//crea una nueva cuenta bancarias
const addCuenta = async(datos) => {
   const {banco, numero, tipo, pucid} = datos;
   const newreg = {
      cue_banco: banco,
      cue_numero: numero,
      cue_tipo: tipo,
      cue_activa: 1,
      puc_id: pucid,
   };
   const grabada = await cuentas_bancarias.create(newreg);
   return grabada;
};

//actualiza una cuenta bancaria
const updateCuenta = async(datos, id) => {
    const {banco, numero, tipo, pucid} = datos;
    const idC = Number(id);
    const registro = {
       cue_banco: banco,
       cue_numero: numero,
       cue_tipo: tipo,
       cue_activa: 1,
       puc_id: pucid,
    };   
    const result = await cuentas_bancarias.update(registro, {where: {id: idC}});
    return result;
};

module.exports = {
   getCuentas,
   getCuentaById,
   addCuenta,
   updateCuenta
};