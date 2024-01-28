const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getFormaPagos, getFormaPagoById,
       newFormaPago, updateFormaPago,
       bulkFormaPago} = require("../../controllers/api/formasdepagoControllers");
const server = express();

//devuelve todas las formas de pago disponibles
server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getFormaPagos();
       res.status(200).json(result);    
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve forma de pago por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getFormaPagoById(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //crea una nueva forma de pago
 server.post('/',  [security_post] , 
   [ check('fpag_detalles', 'El campo fpag_detalles es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('fpag_manejabanco', 'El campo fpag_manejabanco es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
    const datos = req.body;
    try {
        const result = await newFormaPago(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});          
    }
 });

 //modifica forma de pago
 server.put('/:id',  [security_post] , 
   [ check('fpag_detalles', 'El campo fpag_detalles es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('fpag_manejabanco', 'El campo fpag_manejabanco es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateFormaPago(datos, id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});          
    }
 });

//crea en bloque formas de pago
server.post('/bulk',  [security_post] , async(req, res) => {
   const {datos} = req.body; 
   try {
      const result = await bulkFormaPago(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});    
   }
});


module.exports = server;