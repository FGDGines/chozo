const {cajas, usuarios, terceros, puc} = require("../../models/DbConex");

//devuelve todas las cajas
const getCajas = async() => {
   const result = await cajas.findAll({
      include: [
          {model: usuarios, attributes: { exclude: ['createdAt','updatedAt']}}
      ]      
   });
   return result;
};

//devuelve caja por su id
const getCajaById = async(id) => {
   const idC = Number(id); 
   const result = await cajas.findByPk(idC, {
      include: [
         {model: usuarios, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: puc, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return result;
};

//crea una nueva caja
const addCaja = async(datos) => {
   const {caj_detalles, usuario_id, puc_id, caj_activa} = datos;
   const [creado, created] = await cajas.findOrCreate({where: {
      caj_detalles,
      usuario_id,
      puc_id,  
      caj_activa,    
   }});
   return creado;
};

//modifica una caja
const editaCaja = async(datos, id) => {
   const idC = Number(id);
   const {caj_detalles, usuario_id, puc_id, caj_activa} = datos;
   const result = await cajas.update({
       caj_detalles,
       usuario_id,
       puc_id,
       caj_activa,
   }, {where: {id: idC}});
   return result;
};

module.exports = {
   getCajas,
   getCajaById,
   addCaja,
   editaCaja
};