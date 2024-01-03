const {contable, itemcontable, 
       terceros, puc, fuentes, consecutivos} = require("../../models/DbConex");

//devuelve todos los comprobantes contables
const getContable = async() => {
   const contab = await contable.findAll({
      include: [
        {model: terceros, attribute: ['ter_tercero', 'ter_documento']},
        {model: fuentes, attribute: ['fue_iniciales', 'fue_detalles']}
      ]
   });
   return contab;
}; 

//devuelve todos los comprobantes contables de una fuente indicada
const getContableByFuente = async(id) => {
    const idF = Number(id);
    const contab = await contable.findAll({where: {fuente_id: idF}}, {
       include: [
         {model: terceros, attribute: ['ter_tercero', 'ter_documento']},
         {model: fuentes, attribute: ['fue_iniciales', 'fue_detalles']}
       ]
    });
    return contab;
 };   
 
//devuelve todos los comprobantes contables de un tercero
const getContableByTercero = async(id) => {
    const idT = Number(id);
    const contab = await contable.findAll({where: {tercero_id: idT}}, {
       include: [
         {model: fuentes, attribute: ['fue_iniciales', 'fue_detalles']},
       ]
    });
    return contab;
 };   

//devuelve comprobante contable por el ID
const getContableById = async(id) => {
    const idT = Number(id);
    const contab = await contable.findByPk(idT, {
       include: [
         {model: fuentes, attribute: ['fue_iniciales', 'fue_detalles']},
         {model: terceros, attribute: ['ter_tercero', 'ter_documento']},
         {model: itemcontable, attribute: [{
            include: [{model: puc, attribute: ['puc_codigo', 'puc_cuenta']}]
         }]},
       ]
    });
    return contab;
 };    

module.exports = {
    getContable,
    getContableByFuente,
    getContableByTercero,
    getContableById,
};       