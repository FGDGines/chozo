const express = require("express");
const {getLineas, getLineaById,
       addLinea, updateLinea} = require("../../controllers/api/lineasControllers");
const server = express();

//trae todas las lineas
server.get('/', async(req, res) => {
   try {
       const result = await getLineas();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//trae la linea por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getLineaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//agrega una nueva linea
server.post('/', async(req, res) => {
   const datos = req.body;
   try {
       const result = await addLinea(datos);
       res.status(200).json(result); 
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

//actualiza una linea
server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateLinea(datos, id);
        res.status(200).json(result); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
});

module.exports = server;