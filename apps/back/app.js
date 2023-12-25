console.clear()
const Server = require("./server/models/Server");
const {conex} = require('./server/models/DbConex');
require('dotenv').config()
const app = new Server(process.env.PORT)

conex.sync({ alter: true });