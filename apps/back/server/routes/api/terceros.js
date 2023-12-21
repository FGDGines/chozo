const express = require("express");
const {getTerceros, getTerceroById,
      updateTercero, addTercero} = require("../../controllers/api/tercerosControllers");
const server = express();

server.get('/', async(req, res) => {
   try {
       const result = await getTerceros();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getTerceroById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

 server.post('/', async(req, res) => {
   const datos = req.body;
   try {
      const result = await addTercero(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});    
   }
 });

 server.put('/:id', async(req, res) => {
   const datos = req.body;
   const {id} = req.params;
   try {
       const result = await updateTercero(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});     
   };
 });

module.exports = server;