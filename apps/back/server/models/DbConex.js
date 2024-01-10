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
const lineasModels = require("./Lineas");
const sublineasModels = require("./Sublineas");
const gruposModels = require("./Grupos");
const unidadesModels = require("./Unidades");
const marcasModels = require("./Marcas");
const articulosModels = require("./Articulos");
const pucModels = require("./Puc");
const carteraxpagarModels = require('./CarteraxPagar');
const contableModels = require('./Contable');
const existenciasModels = require('./Existencias');
const itemcontableModels = require('./ItemContable');
const itempedidosModels = require('./ItemPedidos');
const kardexModels = require('./Kardex');
const pedidosModels = require('./Pedidos');
const fuentesModels = require('./Fuentes');
const consecutivosModels = require('./Consecutivos');
const parametrosModels = require('./Parametros');
const item_carteraxpagarModels = require('./ItemCarteraxPagar');
const cajasModels = require('./Cajas');
const carteraxcobrarModels = require('./CarteraxCobrar');
const cuentasbancariasModels = require('./CuentasBancarias');
const formasdepagoModels = require('./FormasDePago');
const itemscarteraxcobrarModels = require('./ItemCarteraxCobrar');
const itemsformapagoModels = require('./ItemsFormaPago');
const itemstesoreriaModels = require('./ItemsTesoreria');
const tesoreriaModels = require('./Tesoreria');
const usuariosModels = require('./Usuarios');


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
lineasModels(sequelize);
sublineasModels(sequelize);
gruposModels(sequelize);
unidadesModels(sequelize);
marcasModels(sequelize);
articulosModels(sequelize);
pucModels(sequelize);
carteraxpagarModels(sequelize);
contableModels(sequelize);
existenciasModels(sequelize);
itemcontableModels(sequelize);
itempedidosModels(sequelize);
kardexModels(sequelize);
pedidosModels(sequelize);
fuentesModels(sequelize);
consecutivosModels(sequelize);
parametrosModels(sequelize);
item_carteraxpagarModels(sequelize);
cajasModels(sequelize);
carteraxcobrarModels(sequelize);
cuentasbancariasModels(sequelize);
formasdepagoModels(sequelize);
itemscarteraxcobrarModels(sequelize);
itemsformapagoModels(sequelize);
itemstesoreriaModels(sequelize);
tesoreriaModels(sequelize);
usuariosModels(sequelize);

const {terceros,               paises,
       departamentos,          ciudades,
       tipodocumentos,         tipoterceros,
       agencias_transporte,    proveedores,
       lineas,                 sublineas,
       grupos,                 unidades,
       marcas,                 articulos,
       puc,                    carteraxpagar,
       contable,               existencias,
       itemcontable,           itempedidos,
       kardex,                 pedidos,
       fuentes,                consecutivos,
       item_carteraxpagar,     cajas,
       carteraxcobrar,         cuentas_bancarias,
       formasdepago,           items_carteraxcobrar,
       items_formasdepago,     items_tesoreria,
       tesoreria,              usuarios,
       parametros} = sequelize.models;

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

lineas.hasMany(sublineas, {foreignKey: 'linea_id', sourceKey: 'id'});
sublineas.belongsTo(lineas, {foreignKey: 'linea_id', targetKey: 'id'});
sublineas.hasMany(grupos, {foreignKey: 'sublinea_id', sourceKey: 'id'});
grupos.belongsTo(sublineas, {foreignKey: 'sublinea_id', targetKey: 'id'});
grupos.hasMany(articulos, {foreignKey: 'grupo_id', sourceKey: 'id'});
articulos.belongsTo(grupos, {foreignKey: 'grupo_id', targetKey: 'id'});
articulos.belongsTo(marcas, {foreignKey: 'marca_id', targetKey: 'id'});
articulos.belongsTo(unidades, {foreignKey: 'unidad_id', targetKey: 'id'});
sublineas.belongsTo(puc, {foreignKey: 'pucinventario_id', targetKey: 'id'});
sublineas.belongsTo(puc, {foreignKey: 'pucingresos_id', targetKey: 'id'});
sublineas.belongsTo(puc, {foreignKey: 'puccostoventa_id', targetKey: 'id'});

terceros.hasMany(carteraxpagar, {foreignKey: 'tercero_id', sourceKey: 'id'});
carteraxpagar.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
carteraxpagar.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
carteraxpagar.belongsTo(fuentes, {foreignKey: 'fuente_id', targetKey: 'id'});
carteraxpagar.belongsTo(puc, {foreignKey: 'puc_id', targetKey: 'id'});
contable.belongsTo(fuentes, {foreignKey: 'fuente_id', targetKey: 'id'});
fuentes.hasMany(contable, {foreignKey: 'fuente_id', sourceKey: 'id'});
contable.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
contable.hasMany(itemcontable, {foreignKey: 'contable_id', sourceKey: 'id'});
itemcontable.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
itemcontable.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
itemcontable.belongsTo(fuentes, {foreignKey: 'fuente_id', targetKey: 'id'});
itemcontable.belongsTo(puc, {foreignKey: 'puc_id', targetKey: 'id'});
puc.hasMany(itemcontable, {foreignKey: 'puc_id', sourceKey: 'id'});
usuarios.hasMany(contable, {foreignKey: 'usuario_id', sourceKey: 'id'});
contable.belongsTo(usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});
usuarios.hasMany(itemcontable, {foreignKey: 'usuario_id', sourceKey: 'id'});
itemcontable.belongsTo(usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});

pedidos.hasMany(itempedidos, {foreignKey: 'pedido_id', sourceKey: 'id'});
proveedores.hasMany(pedidos, {foreignKey: 'proveedor_id', sourceKey: 'id'});
pedidos.belongsTo(proveedores, {foreignKey: 'proveedor_id', targetKey: 'id'});
itempedidos.belongsTo(articulos, {foreignKey: 'articulo_id', targetKey: 'id'});
itempedidos.belongsTo(pedidos, {foreignKey: 'pedido_id', targetKey: 'id'});
kardex.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
kardex.belongsTo(articulos, {foreignKey: 'articulo_id', targetKey: 'id'});
existencias.belongsTo(articulos, {foreignKey: 'articulo_id', targetKey: 'id'});
fuentes.hasMany(consecutivos, {foreignKey: 'fuente_id', sourceKey: 'id'});
consecutivos.belongsTo(fuentes, {foreignKey: 'fuente_id', targetKey: 'id'});

carteraxpagar.hasMany(item_carteraxpagar, {foreignKey: 'carteraxp_id', sourceKey: 'id'});
item_carteraxpagar.belongsTo(carteraxpagar, {foreignKey: 'carteraxp_id', targetKey: 'id'});

usuarios.hasMany(cajas, {foreignKey: 'usuario_id', sourceKey: 'id'});
cajas.belongsTo(usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});
cajas.belongsTo(puc, {foreignKey: 'puc_id', targetKey: 'id'});

terceros.hasMany(carteraxcobrar, {foreignKey: 'tercero_id', sourceKey: 'id'});
carteraxcobrar.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
carteraxcobrar.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
carteraxcobrar.belongsTo(puc, {foreignKey: 'puc_id', targetKey: 'id'});
carteraxcobrar.hasMany(items_carteraxcobrar, {foreignKey: 'cartera_id', sourceKey: 'id'});
items_carteraxcobrar.belongsTo(carteraxcobrar, {foreignKey: 'cartera_id', targetKey: 'id'});
cajas.hasMany(carteraxcobrar, {foreignKey: 'caja_id', sourceKey: 'id'});
carteraxcobrar.belongsTo(cajas, {foreignKey: 'caja_id', targetKey: 'id'});


cuentas_bancarias.belongsTo(puc, {foreignKey: 'puc_id', targetKey: 'id'});
items_formasdepago.belongsTo(formasdepago, {foreignKey: 'formapago_id', targetKey: 'id'});
contable.hasMany(items_formasdepago, {foreignKey: 'contable_id', sourceKey: 'id'});
items_formasdepago.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
items_formasdepago.belongsTo(usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});

tesoreria.belongsTo(contable, {foreignKey: 'contable_id', targetKey: 'id'});
cajas.hasMany(tesoreria, {foreignKey: 'caja_id', sourceKey: 'id'});
tesoreria.belongsTo(cajas, {foreignKey: 'caja_id', targetKey: 'id'});
tesoreria.hasMany(items_tesoreria, {foreignKey: 'tesoreria_id', sourceKey: 'id'});
items_tesoreria.belongsTo(tesoreria, {foreignKey: 'tesoreria_id', targetKey: 'id'});
tesoreria.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});
tesoreria.belongsTo(fuentes, {foreignKey: 'fuente_id', targetKey: 'id'});
usuarios.belongsTo(terceros, {foreignKey: 'tercero_id', targetKey: 'id'});

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
   terceros,                   paises,
   departamentos,              ciudades,
   tipodocumentos,             tipoterceros,
   agencias_transporte,        proveedores,
   lineas,                     sublineas,
   grupos,                     unidades,
   marcas,                     articulos,
   puc,                        carteraxpagar,
   contable,                   existencias,
   fuentes,                    itemcontable,
   itempedidos,                kardex, 
   pedidos,                    consecutivos,
   parametros,                 item_carteraxpagar,
   cajas,                      carteraxcobrar,
   cuentas_bancarias,          formasdepago,
   items_carteraxcobrar,       items_formasdepago,
   items_tesoreria,            tesoreria,
   usuarios,
   conex: sequelize,
};