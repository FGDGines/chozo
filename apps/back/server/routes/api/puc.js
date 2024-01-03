const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const {getPuc, getCuentaByCodigo,
       getCuentaById, addCuenta} = require("../../controllers/api/pucControllers");
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



module.exports = server;