const express = require('express')
const cors = require('cors')
const morgan = require("morgan");
const {conex} = require('./DbConex');

class Server {
    constructor(arg) {
        this.__port = arg
        this.app = express()
        this.middleares()
        this.paths = {
            departamentos:   '/api/departamentos',
            ciudades:        '/api/ciudades',
            terceros:        '/api/terceros',
            agencias:        '/api/agencias',
            proveedores:     '/api/proveedores',
            lineas:          '/api/lineas',
            sublineas:       '/api/sublineas',
            grupos:          '/api/grupos',
            marcas:          '/api/marcas',
            unidades:        '/api/unidades',
            articulos:       '/api/articulos',
            pedidos:         '/api/pedidos',
            carteraxpagar:   '/api/carteraxpagar',
            tokens:          '/basic/tokens',
            usuarios:        '/api/usuarios',
            cajas:           '/api/cajas',
        }
        this.upDB()
        this.routes()
        this.run()

    }

    middleares() {
        // Aqui se hacen las cosas necesatias en plan "Primero que todo"

        // cors
        this.app.use(cors())

        // Lectura y parseo del Body
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(morgan("dev"));
        // File Upload
        // Agregar a preferencia (Multer / File-Upload / etc)
        
        // Protocolos de seguridad
        /** Endpoints de seguridad, aqui, justo antes de cargar el directorio estático */
        
        // Directorio publico
        this.app.use(express.static('../out/'))

    }

    async upDB() {
        // Aqui se conecta con la base de datos
    };



    routes() {
        // Aquí se ponen las rutas básica
        this.app.get('/api/v1/hola', (req, res)=>{
            res.status(200).json({msg:"Hola Mundo"})
        });
        this.app.use(this.paths.tokens, require('../routes/basic/jsonWebToken.js'));

        //Aquí se ponen las rutas API.
        this.app.use(this.paths.departamentos, require('../routes/api/departamentos.js'));
        this.app.use(this.paths.ciudades, require('../routes/api/ciudades.js'));
        this.app.use(this.paths.terceros, require('../routes/api/terceros.js'));
        this.app.use(this.paths.agencias, require('../routes/api/agencias.js'));
        this.app.use(this.paths.proveedores, require('../routes/api/proveedores.js'));
        this.app.use(this.paths.lineas, require('../routes/api/lineas.js'));
        this.app.use(this.paths.sublineas, require('../routes/api/sublineas.js'));
        this.app.use(this.paths.grupos, require('../routes/api/grupos.js'));
        this.app.use(this.paths.marcas, require('../routes/api/marcas.js'));
        this.app.use(this.paths.unidades, require('../routes/api/unidades.js'));
        this.app.use(this.paths.articulos, require('../routes/api/articulos.js'));
        this.app.use(this.paths.pedidos, require('../routes/api/pedidos.js'));
        this.app.use(this.paths.carteraxpagar, require('../routes/api/carteraxpagar.js'));
        this.app.use(this.paths.usuarios, require('../routes/api/usuarios.js'));
        this.app.use(this.paths.cajas, require('../routes/api/cajas.js'));
    };

    run() {
        this.app.listen(this.__port, () => {
            console.log(`Server running on port ${this.__port}`)
        })
    };

   
};


module.exports = Server; 