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

//devuelve los datos del login de un usuario
const loginUser = async(datos) => {
   const {usu_nombre, usu_password} = datos;
   const user = usu_nombre;
   const passw = usu_password;
   const result = await usuarios.findOne({where: {usu_nombre: user}});
   if(!result) throw Error("Usuario Inexistente");
   if(result.usu_activo == 0) throw Error("Usuario Inactivo");
   if(result.usu_password !== passw) throw Error("Clave Invalida");
   return result;
};

//crea nuevo usuario
const addUsuario = async(datos) => {
   const {usu_nombre, usu_password, usu_admin, tercero_id} = datos;
   const idter = Number(tercero_id);
   //buscamos si el idtercero existe
   const tercero = await terceros.findByPk(idter);
   if(!tercero) throw Error("idTercero Inexistente en la BD");
   //buscamos si ya existe un usuario con ese idtercero
   const usuario = await usuarios.findOne({where: {tercero_id: idter}});
   if(usuario) throw Error("Tercero ya existente como usuario");
   //creamos el usuario
   const newUsu = {
      usu_nombre,
      usu_password,
      usu_admin: admin,
      tercero_id: idter,
   };
   const result = await usuarios.create(newUsu);
   return result;
};

//modifica usuario
const editaUsuario = async(datos, id) => {
    const {usu_nombre, usu_password, usu_admin, usu_activo} = datos;
    const nombre = usu_nombre;
    const clave = usu_password;
    const admin = Number(usu_admin);
    const activo = Number(usu_activo);
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
   loginUser,
};