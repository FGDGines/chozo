const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getCajas, getCajaById,
       addCaja, editaCaja} = require("../../controllers/api/cajasControllers");
const server = express();

//consulta todas las cajas del sistema
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getCajas();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta caja por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCajaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//crea una nueva caja
server.post('/',  [security_post] , 
   [ check('nombre', 'El nombre de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('idusuario', 'El id del usuario de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('idpuc', 'El id de la cuenta puc de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
        const result = await addCaja(datos);
        res.status(200).json(result); 
   } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
   }
});

//modifica una caja
server.put('/:id', [security_post] ,  
   [ check('nombre', 'El nombre de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('idusuario', 'El id del usuario de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('idpuc', 'El id de la cuenta puc de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('activa', 'El campo activa de la caja es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
    const datos = req.body; 
    const {id} = req.params;
    try {
         const result = await editaCaja(datos, id);
         res.status(200).json(result); 
    } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});
    }
 });

module.exports = server;