const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getUnidades, getUnidadById,
       addUnidad, updateUnidad} = require("../../controllers/api/unidadesControllers");
const server = express();

//devuelve todas los unidades
server.get('/',  [security_post] , async(req, res) => {
   try {
      const result = await getUnidades();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  unidad por su id
server.get('/:id',  [security_post] , async(req, res) => {
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
 server.post('/', [security_post] ,  
    [ check('uni_abreviatura', 'La abreviatura de la unidad es obligatoria').not().isEmpty() ,validarCampos] , 
    [ check('uni_detalles', 'El detalle de la unidad es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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
 server.put('/:id', [security_post] ,  
    [ check('uni_abreviatura', 'La abreviatura de la unidad es obligatoria').not().isEmpty() ,validarCampos] , 
    [ check('uni_detalles', 'El detalle de la unidad es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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