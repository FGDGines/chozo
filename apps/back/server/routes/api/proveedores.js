const express = require("express");
const {getProveedores, getProveedorById,
       addProveedor, updateProveedor} = require("../../controllers/api/proveedoresControllers");
const server = express();

//devolvemos todos los proveedores
server.get('/', async(req, res) => {
    try {
        const result = await getProveedores();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//devolvemos el proveedor por el id
server.get('/:id', async(req, res) => {
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
server.post('/', async(req, res) => {
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
server.put('/:id', async(req, res) => {
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