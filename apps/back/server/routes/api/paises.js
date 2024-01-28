const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getAll, getPaisById, newPais, updatePais} = require("../../controllers/api/paisesControllers");
const server = express();

//devuelve todos los paises
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//devuelve pais por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getPaisById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    };
});

//crea un nuevo pais
server.post('/',  [security_post] , 
   [ check('pai_nombre', 'El nombre del pais es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
       const result = await newPais(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

//actualiza pais
server.put('/:id', [security_post] ,  
   [ check('pai_nombre', 'El nombre del pais es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   const {id} = req.params;
   try {
       const result = await updatePais(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});        
   }
});

module.exports = server;