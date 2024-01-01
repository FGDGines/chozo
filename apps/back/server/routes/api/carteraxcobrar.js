const express = require("express");
const {getCartera, getCarteraByTerceroId,
       getCarteraById, getCarteraxCaja,
       anulaCartera, addCartera} = require("../../controllers/api/carteraxcobrarControllers");
const server = express();

//consulta todos los registros de cartera
server.get('/', async(req, res) => {
    try {
        const result = await getCartera();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta registro de cartera x el id
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

//consulta todos los registros de una caja
server.get('/caja/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraxCaja(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta todos los registros de un tercero
server.get('/tercero/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraByTerceroId(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//graba un nuevo registro de cartera x cobrar
server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addCartera(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//anula un registro de cartera x cobrar
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