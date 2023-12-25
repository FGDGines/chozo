const {agencias_transporte, terceros} = require("../../models/DbConex");

//devuelve todas las agencias de transporte
const getAgencias = async() => {
   const array = await agencias_transporte.findAll( {
      include: [{model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}]
   });
   return array;
};

//devuelve la agencia de transporte por el id
const getAgenciaById = async(id) => {
    const array = await agencias_transporte.findByPk(id, {
        include: [
            {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
        ]
    })
    return array;
};

//graba nueva agencia de transporte
const newAgencia = async(datos) => {
    const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
        ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id} = datos;
    //buscamos si el tercero asociado a a la agencia ya existe en la BD    
    const buscado = await terceros.findOne({where: {ter_documento}});
    let idTer = 0;
    if(buscado) {
       idTer = buscado.id;
    } else {
        //creamos el tercero
        const grabado = await terceros.create(datos);
        idTer = grabado.id;
    };
    //ahora procedemos a grabar la agencia
    const result = await agencias_transporte.create({tercero_id: idTer});
    return result;
};

module.exports = {
    getAgencias,
    getAgenciaById,
    newAgencia
}