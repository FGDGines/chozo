const {marcas, articulos} = require("../../models/DbConex");

//devuelve todas las marcas
const getMarcas = async() => {
    const array = await marcas.findAll();
    return array;
};


//devuelve marca indicado por su id
const getMarcaById = async(id) => {
   const idD = Number(id);
   const registro = await marcas.findByPk(idD);
   return registro;
};

//creacion de una marca nueva
const addMarca = async(datos) => {
   const {mar_detalles} = datos;
   const [registro, created] = await marcas.findOrCreate({where: {mar_detalles}});
   return registro;      
};

//actualizacion de una marca
const updateMarca = async(datos, id) => {
    const {mar_detalles, mar_activa} = datos;
    const result = await marcas.update({mar_detalles, mar_activa}, {where: {id}});
    return result;
};

//eliminar una marca
const deleteMarca = async(id) => {
   const idM = Number(id);
   //verificamos q no existan articulos con esta marca
   const arti = await articulos.findOne({where: {marca_id: idM}});
   if(arti) throw Error("Existen articulos con esta marca");
   await marcas.destroy({where: {id: idM}});
   return {message: "Marca eliminada"};
};

module.exports = {
   getMarcas,
   getMarcaById,
   addMarca,
   updateMarca,
   deleteMarca
};