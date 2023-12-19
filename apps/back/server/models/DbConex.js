const {Sequelize, Model} = require('sequelize');
require('dotenv').config();

//importamos los modelos
const tercerosModels = require("./Terceros");
const paisesModels = require("./Paises");
const departamentosModels = require("./Departamentos");
const ciudadesModels = require("./Ciudades");
const tipotercerosModels = require("./TipoTerceros");
const tipodocumentosModels = require("./TipoDocumentos");
const agenciasModels = require("./Agencias");
const proveedoresModels = require('./Proveedores');


//cargamos los datos de conexion a la BD
const {DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME} = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
});

//sequalizamos los modelos importados
tercerosModels(sequelize);
paisesModels(sequelize);
departamentosModels(sequelize);
ciudadesModels(sequelize);
tipodocumentosModels(sequelize);
tipotercerosModels(sequelize);
agenciasModels(sequelize);
proveedoresModels(sequelize);

const {terceros,
       paises,
       departamentos,
       ciudades,
       tipodocumentos,
       tipoterceros,
       agencias_transporte,
       proveedores} = sequelize.models;

//definimos las relaciones
paises.hasMany(departamentos, {foreignKey: 'pais_id', sourceKey: 'id'});
departamentos.belongsTo(paises, {foreignKey: 'pais_id', targetKey: 'id'});
departamentos.hasMany(ciudades, {foreignKey: 'departamento_id', sourceKey: 'id'});
ciudades.belongsTo(departamentos, {foreignKey: 'departamento_id', targetKey: 'id'});

terceros.belongsTo(ciudades, {foreignKey: 'ciudad_id', targetKey: 'id'});
terceros.belongsTo(tipodocumentos, {foreignKey: 'tipodocumento_id', targetKey: 'id'});
terceros.belongsTo(tipoterceros, {foreignKey: 'tipotercero_id', targetKey: 'id'});
proveedores.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
agencias_transporte.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
proveedores.belongsTo(agencias_transporte, {foreignKey: 'agencia_id', targetKey: 'id'});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log("Error de conexion");
    }
 };
 
 
testConnection();

module.exports = {
   terceros, 
   paises,
   departamentos,
   ciudades,
   tipodocumentos,
   tipoterceros,
   agencias_transporte,
   proveedores,
   conex: sequelize,
};