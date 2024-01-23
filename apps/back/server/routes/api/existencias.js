const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const {getExistenciaById, getExistencias,
      updateExistencia, fullUpdateExistencias} = require("../../controllers/api/existenciasControllers");
const server = express();

//trae todas las existencias
server.get('/', async(req, res) => {
    try {
        const result = await getExistencias();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//trae todas las existencias de un articulo por su ID
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getExistenciaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //actualiza las existencias de un articulo por su ID
server.put('/:id', 
   [ check('articulo_id', 'El campo articulo_id es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('exi_cantidad', 'El campo exi_cantidad es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
    const {id} = req.params;
    const datos = req.body;
    try {
        const result = await updateExistencia(datos, id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //actualiza las existencias de todos los articulos
 server.post('/', 
    [ check('fecha', 'El campo fecha es obligatorio').not().isEmpty() ,validarCampos] ,   
    [ check('usuario', 'El campo usuario es obligatorio').not().isEmpty() ,validarCampos] , 
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await fullUpdateExistencias(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});           
    }
 });


module.exports = server;