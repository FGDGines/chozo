const {formasdepago} = require("../../models/DbConex");

const getFormaPagos = async() => {
   const fpagos = await formasdepago.findAll();
   return fpagos;
};

const getFormaPagoById = async(id) => {
    const fpagos = await formasdepago.findByPk(id);
    return fpagos;
 };

module.exports = {
   getFormaPagos,
   getFormaPagoById
};