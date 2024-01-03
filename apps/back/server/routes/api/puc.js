const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getPuc, getCuentaByCodigo, updateCuenta,
       getCuentaById, addCuenta, deleteCuenta} = require("../../controllers/api/pucControllers");
const server = express();


//devuelve el plan de cuentas completo o una cuenta por su codigo
server.get('/', async(req, res) => {
    const query = req.query;
    try {
        if(query.hasOwnProperty('puc_codigo')) {
            const result = await getCuentaByCodigo(query);
            res.status(200).json(result);
        } else {
            const result = await getPuc();
            res.status(200).json(result);
        };
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
     }
});

//devuelve una cuenta por su id
server.get('/:id', async(req, res) => {
   const {id} = req.params; 
   try {
       const result = await getCuentaById(id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});   
   }
});

//AGREGA NUEVA CUENTA
server.post('/', 
    [ check('puc_codigo', 'El codigo de la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('puc_cuenta', 'El nombre de la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
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

 //edita una CUENTA
server.put('/:id', 
   [ check('puc_codigo', 'El codigo de la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('puc_cuenta', 'El nombre de la cuenta es obligatorio').not().isEmpty() ,validarCampos] ,
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

//eliminar una cuenta
server.delete('/:id', async(req, res) => {
    const {id} = req.params; 
    try {
        const result = await deleteCuenta(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});   
    }
 });
 

module.exports = server;