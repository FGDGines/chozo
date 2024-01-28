const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getAgencias, getAgenciaById,
       newAgencia} = require("../../controllers/api/agenciasControllers");
const server = express();

//devolvemos todas las agencias
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getAgencias();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//devolvemos las agencias por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getAgenciaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//agregamos una nueva agencia
server.post('/',  [security_post] , 
   [ check('ter_documento', 'El Numero de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('ter_tercero', 'La razon social es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ciudad_id', 'La ciudad es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('tipodocumento_id', 'El tipo de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tipotercero_id', 'El tipo de persona es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
       const result = await newAgencia(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }   
});

module.exports = server;