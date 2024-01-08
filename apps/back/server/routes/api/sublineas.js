const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const {getSublineas, getSublineaById,
       addSublinea, updateSublinea,
       getSublineasByIdLinea} = require("../../controllers/api/sublineasControllers");
const server = express();

//trae todas las sublineas
server.get('/', async(req, res) => {
   try {
       const result = await getSublineas();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//trae la sublinea por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getSublineaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//trae las sublinea de una linea por el id de la linea
server.get('/linea/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getSublineasByIdLinea(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });


//agrega una nueva sublinea
server.post('/', 
   [ check('sub_detalles', 'El nombre de la sublinea es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('linea_id', 'El campo linea_id es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('pucinventario_id', 'El campo pucinventario_id es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('pucingresos_id', 'El campo pucingresos_id es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('puccostoventa_id', 'El campo puccostoventa_id es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
       const result = await addSublinea(datos);
       res.status(200).json(result); 
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

//actualiza una sublinea
server.put('/:id', 
[ check('sub_detalles', 'El nombre de la sublinea es obligatorio').not().isEmpty() ,validarCampos] ,
[ check('linea_id', 'El campo linea_id es obligatorio').not().isEmpty() ,validarCampos] ,
[ check('pucinventario_id', 'El campo pucinventario_id es obligatorio').not().isEmpty() ,validarCampos] ,
[ check('pucingresos_id', 'El campo pucingresos_id es obligatorio').not().isEmpty() ,validarCampos] ,
[ check('puccostoventa_id', 'El campo puccostoventa_id es obligatorio').not().isEmpty() ,validarCampos] ,
[ check('sub_activa', 'El campo sub_activa es obligatorio').not().isEmpty() ,validarCampos] ,
async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateSublinea(datos, id);
        res.status(200).json(result); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
});

module.exports = server;