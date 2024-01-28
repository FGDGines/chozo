const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getTerceros, getTerceroById, bulkTerceros,
      updateTercero, addTercero} = require("../../controllers/api/tercerosControllers");
const server = express();

server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getTerceros();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTerceroById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

 server.post('/', [security_post] , 
   [ check('ter_documento', 'El documento de identidad es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('ter_tercero', 'La razon social del tercero es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ciudad_id', 'La ciudad es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('tipodocumento_id', 'El tipo de documento de identidad es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tipotercero_id', 'El tipo de persona es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
      const result = await addTercero(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});    
   }
 });

 server.put('/:id', [security_post] ,  
   [ check('ter_documento', 'El documento de identidad es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('ter_tercero', 'La razon social del tercero es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ciudad_id', 'La ciudad es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('tipodocumento_id', 'El tipo de documento de identidad es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tipotercero_id', 'El tipo de persona es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   const {id} = req.params;
   try {
       const result = await updateTercero(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});     
   };
 });

 server.post('/bulk',  [security_post] , async(req, res) => {
    const {datos} = req.body;
    try {
        const result = await bulkTerceros(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

module.exports = server;