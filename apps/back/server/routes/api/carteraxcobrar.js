const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const {getCartera, getCarteraByTerceroId,
       getCarteraById, getCarteraxCaja,
       devuelveConsecutivo, getCarteraMes,
       anulaCartera, addCartera} = require("../../controllers/api/carteraxcobrarControllers");
const server = express();

//consulta todos los registros de cartera
server.get('/',  [security_post] , async(req, res) => {
    const query = req.query;
    try {
        const result = await getCartera(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta todos los registros de cartera
server.get('/mensual',  [security_post] , async(req, res) => {
    const {mensual, anual} = req.query;
    try {
        const result = await getCarteraMes(mensual, anual);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


//devuelve el proximo consecutivo de una fuente
server.get('/consecutivo',  [security_post] , async(req, res) => {
    const {fuente, anual} = req.query;
    try {
        const result = await devuelveConsecutivo(anual, fuente);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


//consulta registro de cartera x el id
server.get('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta todos los registros de una caja
server.get('/caja/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraxCaja(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta todos los registros de un tercero
server.get('/tercero/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getCarteraByTerceroId(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//graba un nuevo registro de cartera x cobrar
server.post('/',  [security_post] , 
    [ check('fecha', 'La fecha de la Factura es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('vence', 'La fecha de vencimiento de la Factura es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('bruto', 'El valor bruto de la Factura es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('impuesto', 'El valor impuesto de la Factura es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('total', 'El valor total de la Factura es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('metodopago', 'El metodo de pago es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('terceroid', 'El campo terceroid es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('cajaid', 'El campo cajaid es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('items', 'El campo items de la factura es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fpagos', 'El campo fpagos de la factura es obligatorio').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const datos = req.body;
    try {
        const result = await addCartera(datos);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//anula un registro de cartera x cobrar
server.delete('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await anulaCartera(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


module.exports = server;