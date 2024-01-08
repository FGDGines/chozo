const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const {getMarcas, getMarcaById,
       addMarca, updateMarca} = require("../../controllers/api/marcasControllers");
const server = express();

//devuelve todas los marcas
server.get('/', async(req, res) => {
   try {
      const result = await getMarcas();
      res.status(200).json(result);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
});


 //devuelve  marca por su id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
       const result = await getMarcaById(id);
       res.status(200).json(result);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
    }
 });

 //crea una nueva marca
 server.post('/', 
    [ check('mar_detalles', 'El nombre de la marca es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await addMarca(datos);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

 //actualiza una marca
 server.put('/:id', 
    [ check('mar_detalles', 'El nombre de la marca es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('mar_activa', 'El campo mar_activa es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateMarca(datos, id);
        res.status(200).json(result);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
 });

module.exports = server;