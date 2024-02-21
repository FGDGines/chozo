const {sublineas, lineas, puc, conex} = require("../../models/DbConex");

//devuelve todas las sublineas
const getSublineas = async() => {
   const result = await sublineas.findAll({
      include: [{model: lineas, attributes: { exclude: ['createdAt','updatedAt']}}]
   });
   return result;
};

//trae la informacion de una sublinea por su id
const getSublineaById = async(id) => {
   let query1 = "SELECT A.*,B.lin_detalles,C.puc_codigo as pucInventa,C.puc_cuenta as ctaInventa,";
   query1+="D.puc_codigo as pucIngresos,D.puc_cuenta as ctaIngresos,E.puc_codigo as pucCostov,E.puc_cuenta as ctaCostov ";
   query1+="FROM sublineas A LEFT JOIN lineas B ON B.id=A.linea_id ";
   query1+="LEFT JOIN puc C ON C.id=A.pucinventario_id ";
   query1+="LEFT JOIN puc D ON D.id=A.pucingresos_id ";
   query1+="LEFT JOIN puc E ON E.id=A.puccostoventa_id ";
   query1+="where A.id = ?";
   const registros = await conex.query(`${query1}`, {replacements: [id]});
   const registro = registros[0];
   return registro[0];
};

//devuelve todas las sublineas de una linea 
const getSublineasByIdLinea = async(id) => {
    const idL = Number(id);
    const result = await sublineas.findAll({where: {linea_id: idL}});
    return result;
 };

//crea una nueva sublinea
const addSublinea = async(datos) => {
   const {sub_detalles, linea_id, pucinventario_id, pucingresos_id,puccostoventa_id} = datos; 
   const buscado = await sublineas.findOne({where: {sub_detalles,linea_id}});
   if(buscado) return buscado;
   const registro = await sublineas.create(datos);
   return registro;
};

//modifica una sublinea existente
const updateSublinea = async(datos, id) => {
   const {sub_detalles, linea_id, pucinventario_id, pucingresos_id,puccostoventa_id, sub_activa} = datos;  
   const idL = Number(id);
   const result = await sublineas.update(datos, {where: {id: idL}});
   return result;
};

//bulk create sublineas
const bulkSublineas = async(info) => {
   const {datos} = info;
   const result = await sublineas.bulkCreate(datos);
   return result;
};

module.exports = {
   getSublineas,
   getSublineaById,
   addSublinea,
   updateSublinea,
   getSublineasByIdLinea,
   bulkSublineas,
};