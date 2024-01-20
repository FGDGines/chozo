const {consecutivos, fuentes} = require("../../models/DbConex");

//devuelve todos los consecutivos existente
const getAll = async() => {
   const result = await consecutivos.findAll({
      include: [
         {model: fuentes}
      ]
   });
   return result;
};

//devuelve consecutivo por el ID
const getById = async(id) => {
    const result = await consecutivos.findByPk((id),{
       include: [
          {model: fuentes}
       ]
    });
    return result;
 };

 //devuelve todos los consecutivos de una misma fuente
 const getConsecuByFuente = async(fte) => {
    const result = await consecutivos.findAll({where: {fuente_id: fte}});
    return result;
 };

 //devuelve todos los consecutivos de una mismo año
 const getConsecuByAnual = async(anual) => {
    const result = await consecutivos.findAll({
      where: {conse_anual: anual},
      include: [{model: fuentes}]
    });
    return result;
 };

 //crea u nuevo consecutivo
 const addConsecu = async(datos) => {
    const {fuente_id, conse_anual} = datos;
    const existe = await consecutivos.findOne({where: {fuente_id, conse_anual}});
    if(existe) return existe;
    const grabado = await consecutivos.create(datos);
    return grabado;
 };

 //modifica consecutivo
 const updateConsecu = async(datos, id) => {
    const {conse_ultimograbado} = datos;
    const result = await consecutivos.update({conse_ultimograbado}, {where: {id}});
    const registro = await consecutivos.findByPk(id);
    return registro;
 };

 //crea todos los consecutivos de un año dado 
 const generarConsecu = async(datos) => {
    const {anual} = datos;
    const fuent = await fuentes.findAll();
    fuent.forEach(async(ele) => {
       const [registro, created] = await consecutivos.findOrCreate({where: {
          conse_anual: anual,
          fuente_id: ele.id,
       }})
    });
    const registros = await consecutivos.findAll({where: {conse_anual: anual}});
    return registros;
 };
 

module.exports = {
   getAll,
   getById,
   getConsecuByAnual,
   getConsecuByFuente,
   addConsecu,
   updateConsecu,
   generarConsecu,
};