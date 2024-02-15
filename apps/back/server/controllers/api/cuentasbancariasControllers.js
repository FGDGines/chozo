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
   const {cue_banco, cue_numero, cue_tipo, puc_id} = datos;
   const buscado = await cuentas_bancarias.findOne({where: {cue_banco,cue_numero}});
   if(buscado) return buscado;
   const grabada = await cuentas_bancarias.create(datos);
   return grabada;
};

//actualiza una cuenta bancaria
const updateCuenta = async(datos, id) => {
    const {banco, numero, tipo, pucid,cue_activa} = datos;
    const idC = Number(id);
    const registro = {
       cue_banco: banco,
       cue_numero: numero,
       cue_tipo: tipo,
       cue_activa: 1,
       puc_id: pucid,
       cue_activa
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