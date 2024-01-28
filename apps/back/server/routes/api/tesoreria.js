const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getTesoreria, getTesoreriaByCaja,
       getTesoreriaByFuente, getTesoreriaById,
       getTesoreriaByTercero, addTesoreria} = require("../../controllers/api/tesoreriaControllers");
const server = express();

//devuelve todos los registros de tesoreria
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getTesoreria();
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//devuelveun registro de tesoreria de una id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTesoreriaById(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //devuelve todos los registros de tesoreria de una caja
server.get('/caja/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTesoreriaByCaja(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //devuelve todos los registro de tesoreria de una fuente
server.get('/fuente/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTesoreriaByFuente(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //devuelve todos los registro de tesoreria de un tercero
server.get('/tercero/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTesoreriaByTercero(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//agrega un nuevo registro de tesoreria
server.post('/',  [security_post] , 
   [ check('valor', 'El valor es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('fecha', 'La fecha es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ctabancoid', 'La cuenta bancaria es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
       const result = await addTesoreria(datos);
       res.status(200).json(result);    
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

module.exports = server;