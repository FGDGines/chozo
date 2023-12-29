const express = require("express");
const {getUsuarios, getUsuarioById,
       addUsuario, editaUsuario} = require("../../controllers/api/usuariosControllers");
const server = express();

//consulta todos los usuarios del sistema
server.get('/', async(req, res) => {
    try {
        const result = await getUsuarios();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//consulta usuario por el id
server.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const result = await getUsuarioById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//crea un nuevo usuario
server.post('/', async(req, res) => {
   const datos = req.body; 
   try {
        const result = await addUsuario(datos);
        res.status(200).json(result); 
   } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
   }
});

//modifica un usuario
server.put('/:id', async(req, res) => {
    const datos = req.body; 
    const {id} = req.params;
    try {
         const result = await editaUsuario(datos, id);
         res.status(200).json(result); 
    } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message});
    }
 });

module.exports = server;