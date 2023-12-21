const express = require("express");
const {getAgencias, getAgenciaById,
       newAgencia} = require("../../controllers/api/agenciasControllers");
const server = express();

//devolvemos todas las agencias
server.get('/', async(req, res) => {
    try {
        const result = await getAgencias();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//devolvemos las agencias por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getAgenciaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//agregamos una nueva agencia
server.post('/', async(req, res) => {
   const datos = req.body;
   try {
       const result = await newAgencia(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }   
});

module.exports = server;