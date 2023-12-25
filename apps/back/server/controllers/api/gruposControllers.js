const {grupos, sublineas} = require("../../models/DbConex");

//devuelve todos los grupos
const getGrupos = async() => {
    const result = await grupos.findAll();
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
    const registro = grupos.create(datos);
    return registro;
 };
 
 //modifica un grupo
 const updateGrupo= async(datos, id) => {
    const {gru_detalles, sublinea_id, gru_activo} = datos;  
    const idL = Number(id);
    const result = await grupos.update(datos, {where: {id: idL}});
    return result;
 };
 
 module.exports = {
    getGrupos,
    getGrupoById,
    getGruposByIdSublinea,
    addGrupo,
    updateGrupo
 };