const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getAll, getTipoterById, bulkTipoter,
       newTipoter, updateTipoter} = require("../../controllers/api/tipoterceroControllers");
const server = express();

//devuelve todos los tipos de terceros
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//devuelve tipotercero por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTipoterById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//crea un nuevo tipo de tercero
server.post('/',  [security_post] , 
   [ check('tter_detalles', 'El nombre del tipo de tercero es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
       const result = await newTipoter(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

//actualiza un tipo de tercero
server.put('/:id',  [security_post] , 
   [ check('tter_detalles', 'El nombre del tipo de tercero es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   const {id} = req.params;
   try {
       const result = await updateTipoter(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

//bulk create tipo de terceros
server.post('/bulk', async(req, res) => {
    const datos=req.body;
    try {
        const result = await bulkTipoter(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

module.exports = server;