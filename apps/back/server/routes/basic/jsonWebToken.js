const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const server = express();

server.post('/', (req, res) => {
   //generamos el token mediante el id y el name
   console.log(secret)
   const {xid, nombre} = req.body;
   const idUser = xid.toString();
   const {id: sub, name} = {id: idUser, name: nombre};

   const token = jwt.sign({
      sub,
      name,
      exp: Date.now() + 60 * 1000
   }, secret);
   res.status(200).send({token});
});

module.exports = server;