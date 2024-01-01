const express = require("express");
const {getFormaPagos, getFormaPagoById} = require("../../controllers/api/formasdepagoControllers");
const server = express();

//devuelve todas las formas de pago disponibles
server.get('/', async(req, res) => {
   try {
       const result = await getFormaPagos();
       res.status(200).json(result);    
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve forma de pago por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getFormaPagoById(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

module.exports = server;