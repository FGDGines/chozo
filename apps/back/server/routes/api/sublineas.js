const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getSublineas, getSublineaById,
       addSublinea, updateSublinea,
       getSublineasByIdLinea, bulkSublineas} = require("../../controllers/api/sublineasControllers");
const server = express();

//trae todas las sublineas
server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getSublineas();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//trae la sublinea por el id
server.get('/:id',  [security_post] , async(req, res) => {
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
server.get('/linea/:id',  [security_post] , async(req, res) => {
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
server.post('/',  [security_post] , 
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
server.put('/:id',  [security_post] , 
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

server.post('/bulk',   [security_post] , async(req, res) => {
   const {datos} = req.body;
   try {
       const result = await bulkSublineas(datos);
       res.status(200).json(result); 
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }   
});

module.exports = server;