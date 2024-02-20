const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getAll, getById, getConsecuByAnual,
      getConsecuByFuente, addConsecu, 
      generarConsecu, updateConsecu} = require("../../controllers/api/consecutivosControllers");
const server = express();

//devuelve todos los consecutivos
server.get('/',  [security_post] , async(req, res) => {
   try {
      const result = await getAll();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  consecutivo por su id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve  consecutivo de una misma fuente
 server.get('/fuente/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getConsecuByFuente(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //devuelve  consecutivo de un mismo año
 server.get('/anual/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getConsecuByAnual(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });



 //crea un nuevo consecutivo
 server.post('/',  [security_post] , 
    [ check('fuente_id', 'El campo fuente_id es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('conse_anual', 'El campo conse_anual es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('conse_ultimograbado', 'El campo conse_ultimograbado es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const {datos} = req.body;
    try {
        const result = await addConsecu(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza un consecutivo
 server.put('/:id',  [security_post] , 
 [ check('fuente_id', 'El campo fuente_id es obligatorio').not().isEmpty() ,validarCampos] ,
 [ check('conse_anual', 'El campo conse_anual es obligatorio').not().isEmpty() ,validarCampos] ,
 [ check('conse_ultimograbado', 'El campo conse_ultimograbado es obligatorio').not().isEmpty() ,validarCampos] ,
  async(req, res) => {
    const {datos} = req.body;
    const {id} = req.params;
    try {
        const result = await updateConsecu(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //genera todos los consecutivos de un año
 server.post('/bulk', [security_post] ,  
   [ check('datos.anual', 'El campo anual es obligatorio').not().isEmpty() ,validarCampos] ,   
   async(req, res) => {
   const {datos} = req.body;
    try {
      const result = await generarConsecu(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});   
   }
 });

module.exports = server;