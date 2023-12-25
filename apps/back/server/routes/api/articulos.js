const express = require("express");
const {getArticulos, getArticuloById,
       getArticulosByIdGrupo, addArticulo,
       updateArticulo} = require("../../controllers/api/articulosControllers");
const server = express();

//devuelve todas los articulos
server.get('/', async(req, res) => {
   try {
      const result = await getArticulos();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  articulo por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getArticuloById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve todos los articulo de un grupo por su id
server.get('/grupo/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getArticulosByIdGrupo(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea un nuevo grupo
 server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addArticulo(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza un articulo
 server.put('/:id', async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateArticulo(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

module.exports = server;