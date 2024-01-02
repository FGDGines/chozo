const express = require("express");
const {getCuentas, getCuentaById,
       addCuenta, updateCuenta} = require("../../controllers/api/cuentasbancariasControllers");
const server = express();

//devuelve todas las cuentas bancarias
server.get('/', async(req, res) => {
   try {
       const result = await getCuentas();
       res.status(200).json(result);    
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve cuenta bancaria por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCuentaById(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //graba una nueva cuenta bancaria
server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addCuenta(datos);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //actualiza  cuenta bancaria
 server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateCuenta(datos, id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

module.exports = server;