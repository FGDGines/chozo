const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getLineas, getLineaById, bulkLineas, deleteLinea,
       addLinea, updateLinea} = require("../../controllers/api/lineasControllers");
const server = express();

//trae todas las lineas
server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getLineas();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//trae la linea por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getLineaById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

//agrega una nueva linea
server.post('/',  [security_post] , 
   [ check('lin_detalles', 'El nombre de la linea es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
       const result = await addLinea(datos);
       res.status(200).json(result); 
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});       
   }
});

//actualiza una linea
server.put('/:id',  [security_post] , 
   [ check('lin_detalles', 'El nombre de la linea es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('lin_activa', 'El campo lin_activa es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateLinea(datos, id);
        res.status(200).json(result); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});       
    }
});

//eliminar una linea
server.delete('/:id', [security_post], async(req, res) => {
   const {id} = req.params;
   try {
       const resul = await deleteLinea(id);
       res.status(200).json(resul);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});          
   };
});

//bulk create lineas
server.post('/bulk',  [security_post] ,  async(req, res) => {
   const datos = req.body; 
   try {
       const result = await bulkLineas(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});           
   }
});

module.exports = server;