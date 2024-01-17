const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getAll, getTipoterById,
       newTipoter, updateTipoter} = require("../../controllers/api/tipoterceroControllers");
const server = express();

//devuelve todos los tipos de terceros
server.get('/', async(req, res) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//devuelve tipotercero por el id
server.get('/:id', async(req, res) => {
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
server.post('/', 
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
server.put('/:id', 
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

module.exports = server;