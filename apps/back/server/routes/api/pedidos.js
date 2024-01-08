const express = require("express");
const { check } = require('express-validator')
const { validarCampos }  = require('../../middlewares/validar-campos')

const { getPedidos, addPedido, updatePedido, getPedidosByProveedor,
        anulaPedido, getPedidoById } = require("../../controllers/api/pedidosControllers");
const server = express();

//devuelve todos los pedidos grabados
server.get('/', async(req, res) => {
   try {
       const result = await getPedidos();
       res.status(200).json(result);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message});
   }
});

//graba un nuevo pedido
server.post('/', async(req, res) => {
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
server.get('/:id', async(req, res) => {
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
server.get('/proveedor/:id', async(req, res) => {
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
 server.put('/:id', async(req, res) => {
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
server.put('/anular/:id', async(req, res) => {
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