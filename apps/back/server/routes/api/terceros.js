const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getTerceros, getTerceroById,
      updateTercero, addTercero} = require("../../controllers/api/tercerosControllers");
const server = express();

server.get('/', async(req, res) => {
   try {
       const result = await getTerceros();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTerceroById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

 server.post('/',
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

 server.put('/:id', 
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

module.exports = server;