const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const {getFuentes, getFuenteById, bulkFuentes,
       addFuente,updateFuente} = require("../../controllers/api/fuentesControllers");
const server = express();

//devuelve todas los fuentes
server.get('/', async(req, res) => {
   try {
      const result = await getFuentes();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  fuente por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getFuenteById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea una nueva fuente
 server.post('/', 
    [ check('fue_detalles', 'El nombre de la fuentes es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fue_iniciales', 'El campo fue_iniciales es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fue_mantieneconsecutivo', 'El campo fue_mantieneconsecutivo es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await addFuente(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza una fuente
 server.put('/:id', 
    [ check('fue_detalles', 'El nombre de la fuentes es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fue_iniciales', 'El campo fue_iniciales es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fue_mantieneconsecutivo', 'El campo fue_mantieneconsecutivo es obligatorio').not().isEmpty() ,validarCampos] ,
     async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateFuente(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //bulkcreate fuentes
 server.post('/bulk', async(req, res) => {
    const datos = req.body;
    try {
      const result = await bulkFuentes(datos);
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
    }
 });

module.exports = server;