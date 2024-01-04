const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getContable, getContableByFuente, getBalance,
       getContableById, getContableByTercero,
       getItemsContables, getItemsRangoFecha} = require("../../controllers/api/contableControllers");
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

 //devuelve los items contables de una cuenta hasta una fecha de corte
 server.get('/items/:id', async(req, res) => {
    const query = req.query;
    const {id} = req.params;
    const {fechaInicio, fechaCorte} = query;
    try {
      if(fechaInicio) {
         const result = await getItemsRangoFecha(query, id);
         res.status(200).json(result);
      } else {
         const result = await getItemsContables(query, id);
         res.status(200).json(result);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }   
 });

 //devuelve el balance de prueba
 server.get('/balance/:id', async(req, res) => {
    const query = req.query;
    const {id} = req.params;
    try {
      const result = await getBalance(query, id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});     
    }
 });

 
module.exports = server;