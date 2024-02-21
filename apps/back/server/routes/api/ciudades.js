const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getAll, getById, bulkCiudades,
       getAllByDpto, addCiudad, updateCiudad} = require("../../controllers/api/ciudadesControllers");
const server = express();

//devuelve todas los ciudades
server.get('/',  [security_post] , async(req, res) => {
   try {
      const result = await getAll();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

//devuelve todos los ciudades de un departamento por el ID
server.get('/dpto/:id',  [security_post] , async(req, res) => {
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

 //crea una nueva ciudad
 server.post('/', [security_post] , 
    [ check('ciu_nombre', 'El nombre de la ciudad es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('departamento_id', 'El campo departamento_id es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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
 server.put('/:id',  [security_post] , 
    [ check('ciu_nombre', 'El nombre de la ciudad es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
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

 //creacion masiva de ciudades
server.post('/bulk',  [security_post],  async(req, res) => {
   const datos = req.body;
   try {
      const result = await bulkCiudades(datos);
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});

module.exports = server;