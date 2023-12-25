const express = require("express");
const {getUnidades, getUnidadById,
       addUnidad, updateUnidad} = require("../../controllers/api/unidadesControllers");
const server = express();

//devuelve todas los unidades
server.get('/', async(req, res) => {
   try {
      const result = await getUnidades();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  unidad por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getUnidadById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea una nueva unidad
 server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addUnidad(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza una unidad
 server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateUnidad(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

module.exports = server;