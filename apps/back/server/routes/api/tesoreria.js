const express = require("express");
const {getTesoreria, getTesoreriaByCaja,
       getTesoreriaByFuente, getTesoreriaById,
       getTesoreriaByTercero, addTesoreria} = require("../../controllers/api/tesoreriaControllers");
const server = express();

//devuelve todos los registros de tesoreria
server.get('/', async(req, res) => {
    try {
        const result = await getTesoreria();
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//devuelveun registro de tesoreria de una id
server.get('/:id', async(req, res) => {
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
server.get('/caja/:id', async(req, res) => {
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
server.get('/fuente/:id', async(req, res) => {
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
server.get('/tercero/:id', async(req, res) => {
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
server.post('/', async(req, res) => {
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