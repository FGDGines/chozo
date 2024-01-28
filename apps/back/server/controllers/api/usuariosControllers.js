const {usuarios, terceros, paises, departamentos, ciudades} = require("../../models/DbConex");
const bcryptjs =  require('bcryptjs')
const { generarJWT } = require("../../middlewares/generarJWT")

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

   const autenticate  = await  bcryptjs.compareSync(passw , result.usu_password)
   

   if(result.usu_password !== passw && !autenticate) throw Error("Clave Invalida");

   return {result , token: await generarJWT({id: result.id})};
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
      usu_password: bcryptjs.hashSync( usu_password , bcryptjs.genSaltSync() ),
      usu_admin,
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

//este controller crea el usuario administrador inicial del sistema
const usuarioAdmin = async(datos) => {
   const {usu_nombre, usu_password, pais, dpto, ciudad,
          apellidos, nombres, documento, email,
          direccion, telefono, celular} = datos;
   const razon = apellidos+' '+nombres;  
   
   //buscamos primero si ya esta creado el usuario inicial
   const existe = await getUsuarioById(1);
   if(existe) throw Error("Usuario Admin Inicial ya se encuentra creado");
   //creamos el pais
   const xpais = await paises.create({pai_nombre: pais});
   //creamos el departamento
   const xdpto = await departamentos.create({dpt_nombre: dpto, pais_id: xpais.id});
   //creamos la ciudad
   const xciudad = await ciudades.create({ciu_nombre: ciudad, departamento_id: xdpto.id});
   //ahora creamos el tercero 
   const newTercero = {
      ter_documento: documento,
      ter_tercero: razon,
      ter_apellidos: apellidos,
      ter_nombres: nombres,
      ter_direccion: direccion,
      ter_telefono: telefono,
      ter_email: email,
      ter_celular: celular,
      ciudad_id: xciudad.id,
      tipodocumento_id: 3,
      tipotercero_id: 1
   };
   const ter = await terceros.create(newTercero);
   //ahora procedemos a crear el usuario nuevo
   const nuevoUser = {usu_nombre, usu_password, usu_admin: 1, tercero_id: ter.id};
   const result = await addUsuario(nuevoUser);
   return result;

};

module.exports = {
   getUsuarios,
   getUsuarioById,
   addUsuario,
   editaUsuario,
   loginUser,
   usuarioAdmin,
};