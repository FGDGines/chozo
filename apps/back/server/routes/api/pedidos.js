const express = require("express");
const { check } = require('express-validator');
const { validarCampos }  = require('../../middlewares/validar-campos');
const { security_post } = require("../../middlewares/security");

const { getPedidos, addPedido, updatePedido, getPedidosByProveedor,
        anulaPedido, getPedidoById } = require("../../controllers/api/pedidosControllers");
const server = express();

//devuelve todos los pedidos grabados
server.get('/',  [security_post] , async(req, res) => {
   try {
       const result = await getPedidos();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

//graba un nuevo pedido
server.post('/',  [security_post] , 
   [ check('valor', 'El valor del pedido es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('fecha', 'La fecha del pedido es obligatoria').not().isEmpty() ,validarCampos] ,
   [ check('proveedor_id', 'El proveedor es obligatorio').not().isEmpty() ,validarCampos] ,
   [ check('items', 'Los items del pedido son obligatorios').not().isEmpty() ,validarCampos] ,
   async(req, res) => {
   const datos = req.body; 
   try {
       const result = await addPedido(datos);
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});    
   }
});

//devuelve pedido por su id
server.get('/:id', [security_post] ,  async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getPedidoById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

//devuelve pedidos de un mismo proveedore
server.get('/proveedor/:id', [security_post] ,  async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getPedidosByProveedor(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

 //modifica la informacion de un pedido
 server.put('/:id',  [security_post] , 
    [ check('valor', 'El valor del pedido es obligatorio').not().isEmpty() ,validarCampos] ,
    [ check('fecha', 'La fecha del pedido es obligatoria').not().isEmpty() ,validarCampos] ,
    [ check('items', 'Los items del pedido son obligatorios').not().isEmpty() ,validarCampos] ,
    async(req, res) => {
    const {id} = req.params;
    const datos = req.body;
    try {
        const result = await updatePedido(datos, id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });


 //anula pedido por su id
server.delete('/:id',  [security_post] , async(req, res) => {
    const {id} = req.params;
    try {
        const result = await anulaPedido(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 });

module.exports = server;