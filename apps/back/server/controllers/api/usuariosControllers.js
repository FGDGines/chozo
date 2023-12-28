const {usuarios, terceros} = require("../../models/DbConex");

//devuelve todos los usuarios del sistema
const getUsuarios = async() => {
   const result = await usuarios.findAll({
      include: [
         {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return result;
};

//devuelve usuario por el id
const getUsuarioById = async(id) => {
   const idU = Number(id);
   const result = await usuarios.findByPk(idU, {
    include: [
        {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}
     ]    
   });
   return result;
};

//crea nuevo usuario
const addUsuario = async(datos) => {
   const {nombre, clave, admin, idtercero} = datos;
   const idter = Number(idtercero);
   //buscamos si el idtercero existe
   const tercero = await terceros.findByPk(idter);
   if(!tercero) throw Error("idTercero Inexistente en la BD");
   //buscamos si ya existe un usuario con ese idtercero
   const usuario = await usuarios.findOne({where: {tercero_id: idter}});
   if(usuario) throw Error("Tercero ya existente como usuario");
   //creamos el usuario
   const newUsu = {
      usu_nombre: nombre,
      usu_password: clave,
      usu_admin: admin,
      tercero_id: idter,
   };
   const result = await usuarios.create(newUsu);
   return result;
};

//modifica usuario
const editaUsuario = async(datos, id) => {
    const {nombre, clave, admin, activo} = datos;
    const idU = Number(id);
    const result = await usuarios.update({
        usu_nombre: nombre,
        usu_password: clave,
        usu_admin: admin,
        usu_activo: activo}, {where: {id: idU}});
    return result;    
};

module.exports = {
   getUsuarios,
   getUsuarioById,
   addUsuario,
   editaUsuario,
};