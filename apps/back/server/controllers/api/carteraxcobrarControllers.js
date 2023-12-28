const {carteraxcobrar, items_carteraxcobrar, unidades,
       contable, itemcontable, articulos, parametros,
       kardex, formasdepago, cajas, terceros} = require("../../models/DbConex");

//consulta todas las cuentas x cobrar generadas
const getCartera = async() => {
   const result = await carteraxcobrar.findAll({
      include: [
         {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
         {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return result;
};

//consulta todas las cuentas x cobrar generadas desde una caja
const getCarteraxCaja = async(id) => {
    const idC = Number(id);
    const result = await carteraxcobrar.findAll({where: {caja_id: idC}},{
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
 };

 //consulta cartera x un id
const getCarteraById = async(id) => {
    const idC = Number(id);
    const result = await carteraxcobrar.findAll({where: {id: idC}},{
       include: [
          {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}},
          {model: items_carteraxcobrar, attributes: { exclude: ['createdAt','updatedAt']}},
       ]
    });
    return result;
 };

 //consulta cartera x un tercero
 const getCarteraByTerceroId = async(id) => {
    const idter = Number(id);
    const result = await carteraxcobrar.findAll({where: {tercero_id: idter}},{
       include: [
          {model: cajas, attributes: { exclude: ['createdAt','updatedAt']}}
       ]
    });
    return result;
};

//devuelve consecutivo de FACTURAS DE venta
const devuelveConsecutivo = async(anual, fuente) => {
    let num = 0;
    const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
    if(registro) num = registro.conse_ultimograbado;
    num+=1;
    let numero = num.toString().padStart(7,'0');
    numero = anual.toString()+'-'+numero;
    return numero;
 };

//agrega una nueva venta
const addCartera = async(datos) => {
   const {fecha, vence, bruto, impuesto, valor, metodopago, terceroid, cajaid} = datos;
   const fechaC = new Date(fecha);
   const fechaV = new Date(vence);
   const anual = fechaC.getFullYear();

   //capturamos en el parametro "005" predefinido el id de la Fuente de facturas de ventas
   const parametro = await parametros.findOne({where: {para_codigo: '005'}});
   const fuente = Number(parametro.para_valor);

   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuente);

};

module.exports = {

};