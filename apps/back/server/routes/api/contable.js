const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getContable, getContableByFuente,
       getContableById, getContableByTercero,
       } = require("../../controllers/api/contableControllers");
const server = express();

//devuelve todos los comprobantes contables
server.get('/', async(req, res) => {
    try {
       const result = await getContable();
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

//devuelve comprobantes contables por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getContableById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve todos los comprobantes contables de una misma fuente
server.get('/fuente/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getContableByFuente(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

//devuelve todos los comprobantes contables de un mismo tercero
server.get('/tercero/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getContableByTercero(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

module.exports = server;