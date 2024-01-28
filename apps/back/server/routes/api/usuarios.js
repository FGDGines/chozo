const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')
const { security_post } = require("../../middlewares/security")

const {getUsuarios, getUsuarioById, loginUser,
       addUsuario, editaUsuario} = require("../../controllers/api/usuariosControllers");
const server = express();

//consulta todos los usuarios del sistema
server.get('/', [security_post] ,  async(req, res) => {
    try {
        const result = await getUsuarios();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta usuario por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getUsuarioById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


//crea un nuevo usuario
server.post('/',
   [ check('usu_nombre', 'El nombre de usuario es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('usu_password', 'El password es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('usu_admin', 'El campo usu_admin es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tercero_id', 'El id del Tercero es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
        const result = await addUsuario(datos);
        res.status(200).json(result); 
   } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
   }
});

 //login de ingreso de usuario
 server.post('/login', 
    [ check('usu_nombre', 'El nombre de usuario es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('usu_password', 'El password es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await loginUser(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


//modifica un usuario
server.put('/:id',
    [ check('usu_nombre', 'El nombre de usuario es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('usu_password', 'El password es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('usu_admin', 'El campo usu_admin es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('usu_activo', 'El campo usu_activo es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body; 
    const {id} = req.params;
    try {
         const result = await editaUsuario(datos, id);
         res.status(200).json(result); 
    } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});
    }
 });



module.exports = server;