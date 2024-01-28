const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getProveedores, getProveedorById,
       addProveedor, updateProveedor} = require("../../controllers/api/proveedoresControllers");
const server = express();

//devolvemos todos los proveedores
server.get('/',  [security_post] , async(req, res) => {
    try {
        const result = await getProveedores();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//devolvemos el proveedor por el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getProveedorById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//agregamos un nuevo proveedor
server.post('/',  [security_post] , 
   [ check('ter_documento', 'El Numero de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('ter_tercero', 'La razon social es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ciudad_id', 'La ciudad es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('tipodocumento_id', 'El tipo de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tipotercero_id', 'El tipo de persona es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('agencia_id', 'La Agencia es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('pro_plazo', 'El plazo de pago es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   try {
       const result = await addProveedor(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }   
});

//actualizamos la informacion de un proveedor
server.put('/:id', [security_post] , 
   [ check('ter_documento', 'El Numero de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('ter_tercero', 'La razon social es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('ciudad_id', 'La ciudad es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('tipodocumento_id', 'El tipo de Documento es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('tipotercero_id', 'El tipo de persona es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('agencia_id', 'La Agencia es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('pro_plazo', 'El plazo de pago es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('pro_activo', 'El campo activo es obligatorio').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body;
   const {id} = req.params;
   try {
       const result = await updateProveedor(datos, id);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }      
});

module.exports = server;