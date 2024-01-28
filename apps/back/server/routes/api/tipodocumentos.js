const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getAll, getTipodocById, bulkTipodoc,
       newTipodoc, updateTipodoc} = require("../../controllers/api/tipodocumentoControllers");
const server = express();

//devuelve todos los tipos de documento
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//devuelve tipodocumento por el id
server.get('/:id', [security_post] ,  async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTipodocById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//crea un nuevo tipo de documento
server.post('/', [security_post] ,  
   [ check('tdoc_detalles', 'El nombre del tipo de documento es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
       const result = await newTipodoc(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

//actualiza un tipo de documento
server.put('/:id',  [security_post] , 
   [ check('tdoc_detalles', 'El nombre del tipo de documento es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   const {id} = req.params;
   try {
       const result = await updateTipodoc(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

//bulk create tipodocumentos
server.post('/bulk',  async(req, res) => {
   const datos = req.body; 
   try {
      const result = await bulkTipodoc(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});       
   }
});


module.exports = server;