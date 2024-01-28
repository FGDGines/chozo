const {formasdepago} = require("../../models/DbConex");

//devuelve todas las formas de pago
const getFormaPagos = async() => {
   const fpagos = await formasdepago.findAll();
   return fpagos;
};

//devuelve forma de pago x el id
const getFormaPagoById = async(id) => {
    const fpagos = await formasdepago.findByPk(id);
    return fpagos;
};

//creamos una forma de pago
const newFormaPago = async(datos) => {
   const existe = await formasdepago.findOne({where: {fpag_detalles}});
   if(existe) return existe;
   const result = await formasdepago.create(datos);
   return result;
};

//modificamos forma de pago
const updateFormaPago = async(datos, id) => {
  const result = await formasdepago.update(datos, {where: {id}});
  const fpagos = await formasdepago.findByPk(id);
  return fpagos;
};

//creamos en bloque las formas de pago
const bulkFormaPago = async(info) => {
   const {datos} = info;
   const result = await formasdepago.bulkCreate(datos);
   return result;
}

module.exports = {
   getFormaPagos,
   getFormaPagoById,
   newFormaPago,
   updateFormaPago,
   bulkFormaPago
};