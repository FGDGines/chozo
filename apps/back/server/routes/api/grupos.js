const express = require("express");
const {getGrupos, getGrupoById,
       getGruposByIdSublinea, addGrupo, updateGrupo} = require("../../controllers/api/gruposControllers");
const server = express();

//trae todos los grupos
server.get('/', async(req, res) => {
    try {
        const result = await getGrupos();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });
 
 //trae el grupo por el id
 server.get('/:id', async(req, res) => {
     const {id} = req.params;
     try {
         const result = await getGrupoById(id);
         res.status(200).json(result);
     } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});    
     }
  });
 
 //trae los grupos de una sublinea por el id de la sublinea
 server.get('/sublinea/:id', async(req, res) => {
     const {id} = req.params;
     try {
         const result = await getGruposByIdSublinea(id);
         res.status(200).json(result);
     } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});    
     }
  });
 
 
 //agrega un nuevo grupo
 server.post('/', async(req, res) => {
    const datos = req.body;
    try {
        const result = await addGrupo(datos);
        res.status(200).json(result); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
 });
 
 //actualiza un grupo
 server.put('/:id', async(req, res) => {
     const datos = req.body;
     const {id} = req.params;
     try {
         const result = await updateGrupo(datos, id);
         res.status(200).json(result); 
     } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});       
     }
 });
 

module.exports = server;