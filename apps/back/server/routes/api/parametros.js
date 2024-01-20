const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const {getParametros, getParametroById,
       newParametro, updateParametro,
       llenarParametros} = require("../../controllers/api/parametrosControllers");
const server = express();

//devuelve todos los parametros
server.get('/', async(req, res) => {
   try {
       const result = await getParametros();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve  parametro por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getParametroById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });
 

 //crea un nuevo parametro
server.post('/', 
  [ check('para_codigo', 'El codigo del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  [ check('para_detalles', 'El detalle del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  [ check('para_valor', 'El valor del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  async(req, res) => {
    const datos = req.body;
    try {
        const result = await newParametro(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});         
    }
});

//modifica parametro
server.put('/:id', 
  [ check('para_codigo', 'El codigo del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  [ check('para_detalles', 'El detalle del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  [ check('para_valor', 'El valor del parametro es obligatorio').not().isEmpty() ,validarCampos] ,
  async(req, res) => {
    const {id} = req.params;
    const datos = req.body;
    try {
        const result = await updateParametro(datos, id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});         
    }
});

//creacion de varios parametros en bloque
 server.post('/bulk',  async(req, res) => {
   const datos = req.body;
   try {
       const result = await llenarParametros(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});         
   }
});

module.exports = server;