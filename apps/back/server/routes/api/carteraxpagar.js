const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getCartera, getCarteraById, anulaCartera,
       addCarteraPedidos, getCarteraByTercero} = require("../../controllers/api/carteraxpagarControllers");
const server = express();

//devuelve todos las compras
server.get('/',  [security_post] , async(req, res) => {
    const query = req.query;
    try {
        const result = await getCartera(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//devuelve compras por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//devuelve todas las facturas de cartera x pagar de un tercero
server.get('/tercero/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraByTercero(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//crea una nueva compra 
server.post('/',  [security_post] , 
   [ check('fecha', 'La fecha de la compra es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('vence', 'La fecha de vencimiento de la compra es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('bruto', 'El valor bruto de la compra es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('impuesto', 'El valor del impuesto es obligatorio').not().isEmpty() ,validarCampos] , 
   [ check('total', 'El valor total de la compra es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tercero_id', 'El campo tercero_id es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('items', 'El campo items de la compra es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('codUsuario', 'El campo codUsuario es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
       const result = await addCarteraPedidos(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

//anula compras por el id
server.delete('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await anulaCartera(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

module.exports = server;