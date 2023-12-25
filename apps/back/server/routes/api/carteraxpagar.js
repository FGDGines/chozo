const express = require("express");
const {getCartera, getCarteraById,
       addCarteraPedidos} = require("../../controllers/api/carteraxpagarControllers");
const server = express();

server.get('/', async(req, res) => {
    try {
        const result = await getCartera();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

server.post('/', async(req, res) => {
   const datos = req.body; 
   try {
       const result = await addCarteraPedidos(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

module.exports = server;