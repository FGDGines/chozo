const {sublineas, lineas, puc} = require("../../models/DbConex");

//devuelve todas las sublineas
const getSublineas = async() => {
   const result = await sublineas.findAll();
   return result;
};

//trae la informacion de una sublinea por su id
const getSublineaById = async(id) => {
   const registro = await sublineas.findByPk(id, {
      include: [{model: lineas, attributes: { exclude: ['createdAt','updatedAt']}},
                {model: puc, attributes: { exclude: ['createdAt','updatedAt']}},
    ]
   });
   return registro;
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
   const registro = sublineas.create(datos);
   return registro;
};

//modifica una sublinea existente
const updateSublinea = async(datos, id) => {
   const {sub_detalles, linea_id, pucinventario_id, pucingresos_id,puccostoventa_id, sub_activa} = datos;  
   const idL = Number(id);
   const result = await sublineas.update(datos, {where: {id: idL}});
   return result;
};

module.exports = {
   getSublineas,
   getSublineaById,
   addSublinea,
   updateSublinea,
   getSublineasByIdLinea
};