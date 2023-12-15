console.clear()
const Server = require("./server/models/Server");
require('dotenv').config()
const app = new Server(process.env.PORT)

