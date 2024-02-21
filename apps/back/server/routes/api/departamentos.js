const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const { getAll, getAllByPais, bulkDptos,
        getById, addDpto, updateDpto } = require("../../controllers/api/departamentosControllers");
const server = express();

//devuelve todos los departamentos
server.get('/',  [security_post] , async(req, res) => {
   try {
      const result = await getAll();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

//devuelve todos los departamentos de un pais por el ID
server.get('/pais/:id',  [security_post] , async(req, res) => {
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

 //crea un nuevo departamento
 server.post('/',  [security_post] , 
    [ check('dpt_nombre', 'El nombre del departamento es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('pais_id', 'El campo Pais_id es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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
 server.put('/:id',  [security_post] , 
    [ check('dpt_nombre', 'El nombre del departamento es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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

  //creacion masiva de dptos
server.post('/bulk', [security_post],  async(req, res) => {
   const datos = req.body;
   try {
      const result = await bulkDptos(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

module.exports = server;