const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getArticulos, getArticuloById,
       getArticulosByIdGrupo, addArticulo,
       updateArticulo, bulkArticulos} = require("../../controllers/api/articulosControllers");
const server = express();

//devuelve todas los articulos
server.get('/',  [security_post] , async(req, res) => {
   try {
      const result = await getArticulos();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  articulo por su id
server.get('/:id',  [security_post] , async(req, res) => {
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
server.get('/grupo/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getArticulosByIdGrupo(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea un nuevo articulo
 server.post('/',  [security_post] , 
    [ check('art_detalles', 'El detalle del articulo es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('art_referencia', 'La referencia del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('marca_id', 'La marca del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('grupo_id', 'El grupo del articulo es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('unidad_id', 'La unidad de presentacion del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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
 server.put('/:id',  [security_post] , 
    [ check('art_detalles', 'El detalle del articulo es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('art_referencia', 'La referencia del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('marca_id', 'La marca del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('grupo_id', 'El grupo del articulo es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('unidad_id', 'La unidad de presentacion del articulo es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('art_activo', 'El campo activo es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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

 //creacion masiva de articulos
 server.post('/bulk',  [security_post] ,  async(req, res) => {
   const datos = req.body;
   try {
      const result = await bulkArticulos(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

module.exports = server;