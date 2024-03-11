const {grupos, sublineas, articulos} = require("../../models/DbConex");

//devuelve todos los grupos
const getGrupos = async() => {
    const result = await grupos.findAll({
      order: [['gru_detalles', 'ASC']],
    });
    return result;
 };
 
 //trae la informacion de un grupo por su id
 const getGrupoById = async(id) => {
    const registro = await grupos.findByPk(id, {
       include: [{model: sublineas, attributes: { exclude: ['createdAt','updatedAt']}},
     ]
    });
    return registro;
 };
 
 //devuelve todos los grupos de una sublinea
 const getGruposByIdSublinea = async(id) => {
     const idL = Number(id);
     const result = await grupos.findAll({where: {sublinea_id: idL}});
     return result;
  };
 
 //crea una nuevo grupo
 const addGrupo = async(datos) => {
    const {gru_detalles, sublinea_id} = datos; 
    const [registro, created] = await grupos.findOrCreate({where: {gru_detalles, sublinea_id}});
    return registro;
 };
 
 //modifica un grupo
 const updateGrupo= async(datos, id) => {
    const {gru_detalles, sublinea_id, gru_activo} = datos;  
    const idL = Number(id);
    const result = await grupos.update(datos, {where: {id: idL}});
    return result;
 };

 //eliminar un grupo
 const deleteGrupo = async(id) => {
    const idA = Number(id);
    //verificamos que no tenga articulos 
    const arti = await articulos.findOne({where: {grupo_id: idA}});
    if(arti) throw Error("Grupo tiene articulos creados");
    await grupos.destroy({where: {id: idA}});
    return {message: "Grupo eliminado"};
 };

 //bulkcreate grupos
 const bulkGrupos = async(info) => {
   const {datos} = info;
    const result = await grupos.bulkCreate(datos);
    return result;
 };
 
 module.exports = {
    getGrupos,
    getGrupoById,
    getGruposByIdSublinea,
    addGrupo,
    updateGrupo,
    bulkGrupos,
    deleteGrupo,
 };