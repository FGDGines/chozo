const express = require("express");
const { getAll, getAllByPais,
        getById, addDpto, updateDpto } = require("../../controllers/api/departamentosControllers");
const server = express();

//devuelve todos los departamentos
server.get('/', async(req, res) => {
   try {
      const result = await getAll();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

//devuelve todos los departamentos de un pais por el ID
server.get('/pais/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getAllByPais(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve  departamento por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea un nuevo departamento
 server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addDpto(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza un departamento
 server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateDpto(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

module.exports = server;