const {lineas, sublineas} = require("../../models/DbConex");

//devuelve todas las lineas
const getLineas = async() => {
   const result = await lineas.findAll({
      order: [['lin_detalles', 'ASC']],
   });
   return result;
};

//trae la informacion de una linea por su id
const getLineaById = async(id) => {
   const registro = await lineas.findByPk(id);
   return registro;
};

//crea una nueva linea
const addLinea = async(datos) => {
   const {lin_detalles}= datos;
   const [registro, created] = await lineas.findOrCreate({where: {lin_detalles}});
   return registro;
};

//modifica una linea existente
const updateLinea = async(datos, id) => {
   const idL = Number(id);
   const result = await lineas.update(datos, {where: {id: idL}});
   return result;
};

//eliminar linea
const deleteLinea = async(id) => {
   const idL = Number(id);
   //verificamos que no tenga sublineas creadas
   const subl = await sublineas.findOne({where: {linea_id: idL}});
   if(subl) throw Error("Linea contiene sublineas creadas");
   await lineas.destroy({where: {id: idL}});
   return {message: "Linea Eliminada"};
};

//bulk create lineas
const bulkLineas = async(info) => {
   const {datos} = info;
   const result = await lineas.bulkCreate(datos);
   return result;
};

module.exports = {
    getLineas,
    getLineaById,
    addLinea,
    updateLinea,
    bulkLineas,
    deleteLinea,
};