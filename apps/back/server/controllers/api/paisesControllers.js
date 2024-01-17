const { paises} = require("../../models/DbConex");

//devuelve todos los paises creados
const getAll = async() => {
    const array = await paises.findAll();
    return array;
};

//devuelve pais por el id
const getPaisById = async(id) => {
    const result = await paises.findByPk(id);
    return result;
};

//crea un nuevo pais
const newPais = async(datos) => {
    const {pai_nombre} = datos;
    const [result, created] = await paises.findOrCreate({where: {pai_nombre}});
    return result;
};

//modifica un pais
const updatePais = async(datos, id) => {
    const idP = Number(id);
    const {pai_nombre} = datos;
    const result = await paises.update({pai_nombre}, {where: {id: idP}});
    const registro = await paises.findByPk(idP);
    return registro;
};

module.exports = {
    getAll,
    getPaisById,
    newPais,
    updatePais,
};