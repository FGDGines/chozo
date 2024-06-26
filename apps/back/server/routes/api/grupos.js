const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getGrupos, getGrupoById, bulkGrupos,
       getGruposByIdSublinea, deleteGrupo,
       addGrupo, updateGrupo} = require("../../controllers/api/gruposControllers");
const server = express();

//trae todos los grupos
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getGrupos();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });
 
 //trae el grupo por el id
 server.get('/:id',  [security_post] , async(req, res) => {
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
 server.get('/sublinea/:id',  [security_post] , async(req, res) => {
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
 server.post('/', [security_post] ,  
    [ check('gru_detalles', 'El campo gru_detalles es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('sublinea_id', 'El campo sublinea_id es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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
 server.put('/:id', [security_post] ,  
     [ check('gru_detalles', 'El campo gru_detalles es obligatorio').not().isEmpty() ,validarCampos] ,
     [ check('gru_activo', 'El campo gru_activo es obligatorio').not().isEmpty() ,validarCampos] ,
     [ check('sublinea_id', 'El campo sublinea_id es obligatorio').not().isEmpty() ,validarCampos] ,
     async(req, res) => {
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

 //eliminacion de grupos
 server.delete('/:id', [security_post], async(req, res) => {
   const {id} = req.params;
   try {
      const result = await deleteGrupo(id);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});        
   }
 });
 
 //creacion masiva de grupos
 server.post('/bulk',  [security_post] ,   async(req, res) => {
    const datos = req.body;
    try {
        const result = await bulkGrupos(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

module.exports = server;