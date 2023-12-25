const express = require("express");
const { getPedidos, addPedido } = require("../../controllers/api/pedidosControllers");
const server = express();

//devuelve todos los pedidos grabados
server.get('/', async(req, res) => {
   try {
       const result = await getPedidos();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

//graba un nuevo pedido
server.post('/', async(req, res) => {
   const datos = req.body; 
   try {
       const result = await addPedido(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

module.exports = server;