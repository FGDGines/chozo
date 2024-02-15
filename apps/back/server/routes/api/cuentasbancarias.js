const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");
const {getCuentas, getCuentaById,
       addCuenta, updateCuenta} = require("../../controllers/api/cuentasbancariasControllers");
const server = express();

//devuelve todas las cuentas bancarias
server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getCuentas();
       res.status(200).json(result);    
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve cuenta bancaria por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCuentaById(id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //graba una nueva cuenta bancaria
server.post('/',  [security_post] , 
    [ check('cue_banco', 'El nombre del banco es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('cue_numero', 'El numero de la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('cue_tipo', 'El tipo de cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('puc_id', 'El campo puc_id es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await addCuenta(datos);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

 //actualiza  cuenta bancaria
 server.put('/:id', [security_post] , 
    [ check('banco', 'El nombre del banco es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('numero', 'El numerod e la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('tipo', 'El tipo de cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('pucid', 'El campo pucid es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('cue_activa', 'El campo cue_activa es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    const {id} = req.params;
    try {
        const result = await updateCuenta(datos, id);
        res.status(200).json(result);    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});    
    }
 });

module.exports = server;