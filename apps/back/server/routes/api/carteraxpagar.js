const express = require("express");
const {getCartera, getCarteraById, anulaCartera,
       addCarteraPedidos, getCarteraByTercero} = require("../../controllers/api/carteraxpagarControllers");
const server = express();

//devuelve todos las campras
server.get('/', async(req, res) => {
    try {
        const result = await getCartera();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//devuelve compras por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//devuelve todas las facturas de cartera x pagar de un tercero
server.get('/tercero/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraByTercero(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

//crea una nueva compra 
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

//anula compras por el id
server.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await anulaCartera(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
});

module.exports = server;