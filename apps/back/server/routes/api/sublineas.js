const express = require("express");
const {getSublineas, getSublineaById,
       addSublinea, updateSublinea,
       getSublineasByIdLinea} = require("../../controllers/api/sublineasControllers");
const server = express();

//trae todas las sublineas
server.get('/', async(req, res) => {
   try {
       const result = await getSublineas();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//trae la sublinea por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getSublineaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//trae las sublinea de una linea por el id de la linea
server.get('/linea/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getSublineasByIdLinea(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });


//agrega una nueva sublinea
server.post('/', async(req, res) => {
   const datos = req.body;
   try {
       const result = await addSublinea(datos);
       res.status(200).json(result); 
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

//actualiza una sublinea
server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateSublinea(datos, id);
        res.status(200).json(result); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
});

module.exports = server;