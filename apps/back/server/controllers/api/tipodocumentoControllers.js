const { tipodocumentos } = require("../../models/DbConex");

//devuelve todos los tipos de documentos
const getAll = async() => {
    const array = await tipodocumentos.findAll();
    return array;
};

//devuelve registro por el ID
const getTipodocById = async(id) => {
   const result = await tipodocumentos.findByPk(id);
   return result;
};

//crear un nuevo tipo de documento
const newTipodoc = async(datos) => {
   const {tdoc_detalles} = datos;
   const buscado = await tipodocumentos.findOne({where: {tdoc_detalles}});
   if(buscado) return buscado;
   const result = await tipodocumentos.create(datos);
   return result;
};

//actualizar tipo de documento
const updateTipodoc = async(datos, id) => {
   const result = await tipodocumentos.update(datos, {where: {id}});
   const registro = await tipodocumentos.findByPk(id);
   return registro;
};

//bulkcreate tipos de documentos
const bulkTipodoc = async(datos) => {
   const result = await tipodocumentos.bulkCreate(datos);
   return result;
};

module.exports = {
   getAll,
   getTipodocById,
   newTipodoc,
   updateTipodoc,
   bulkTipodoc,
};