const express = require("express");
const {getAll, getById, 
       getAllByDpto, addCiudad, updateCiudad} = require("../../controllers/api/ciudadesControllers");
const server = express();

//devuelve todas los ciudades
server.get('/', async(req, res) => {
   try {
      const result = await getAll();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

//devuelve todos los ciudades de un departamento por el ID
server.get('/dpto/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getAllByDpto(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve  ciudad por su id
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

 //crea una nueva ciudad
 server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addCiudad(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza una ciudad
 server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateCiudad(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

module.exports = server;