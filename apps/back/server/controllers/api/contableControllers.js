const {contable, itemcontable, conex,
       terceros, puc, fuentes, consecutivos} = require("../../models/DbConex");

const { QueryTypes } = require('@sequelize/core');

//devuelve todos los comprobantes contables
const getContable = async() => {
   const contab = await contable.findAll({
      include: [
        {
           model: terceros,
           attributes: ['ter_tercero', 'ter_documento']
        },
        {
           model: fuentes,
           attributes: ['fue_iniciales', 'fue_detalles']
        }
      ]
   });
   return contab;
}; 

//devuelve todos los comprobantes contables de una fuente indicada
const getContableByFuente = async(id) => {
    const idF = Number(id);
    const contab = await contable.findAll({
       where: {fuente_id: idF},
       include: [
         {
            model: terceros,
            attributes: ['ter_tercero', 'ter_documento']
         },
       ]
    });
    return contab;
 };   
 
//devuelve todos los comprobantes contables de un tercero
const getContableByTercero = async(id) => {
    const idT = Number(id);
    const contab = await contable.findAll({
       where: {tercero_id: idT},
       include: [
         {
            model: fuentes,
            attributes: ['fue_iniciales', 'fue_detalles'],
         }   
       ]
    });
    return contab;
 };   

//devuelve comprobante contable por el ID
const getContableById = async(id) => {
    const idT = Number(id);
    const contab = await contable.findByPk(idT, {
       include: [
         {
            model: fuentes,
            attributes: ['fue_iniciales', 'fue_detalles']
         },
         {
            model: terceros,
            attributes: ['ter_tercero', 'ter_documento']
         },
         {
            model: itemcontable,
            include: [
               {
                  model: puc,
                  attributes: ['puc_codigo', 'puc_cuenta']
               },
            ]
         },
       ]
    });
    return contab;
};    

//crea un comprobante contable nuevo

//anula un comprobante contable

//devuelve los items contables de una cuenta hasta una fecha de corte
const getItemsContables = async(query, id) => {
   const {fechaCorte } = query;
   const fCorte = new Date(fechaCorte);
   const registros = await itemcontable.findAll({
      where: {puc_id: id}, 
      include: [
         {
            model: terceros,
            attributes: ['ter_documento', 'ter_tercero']
         },
         {
            model: puc,
            attributes: ['puc_codigo', 'puc_cuenta']
         },
         {
            model: fuentes,
            attributes: ['fue_detalles', 'fue_iniciales']
         }
      ]
   });
   const array = registros.filter(ele => ele.ite_fecha <= fCorte)
   return array;
};


//devuelve los items contables de una cuenta en un rango de fechas
const getItemsRangoFecha = async(query, id) => {
   const {fechaInicio, fechaCorte } = query;
   const fInicio = new Date(fechaInicio);
   const fCorte = new Date(fechaCorte);
   const registros = await itemcontable.findAll({
      where: {puc_id: id}, 
      include: [
         {
            model: terceros,
            attributes: ['ter_documento', 'ter_tercero']
         },
         {
            model: puc,
            attributes: ['puc_codigo', 'puc_cuenta']
         },
         {
            model: fuentes,
            attributes: ['fue_detalles', 'fue_iniciales']
         }
      ]
   });
   const array = registros.filter(ele => ele.ite_fecha >= fInicio && ele.ite_fecha <= fCorte)
   return array;
};

//devuelve los saldos de todas las cuentas contables a un corte de fecha
const getBalance = async(query, id) => {
   const anual = Number(id);
   const {fechaInicio, fechaCorte } = query;
   const fInicio = new Date(fechaInicio);
   const fCorte = new Date(fechaCorte);
   let query1 = "SELECT B.puc_codigo,B.puc_cuenta,00000000000.00 as anterior,sum(A.ite_debito) as debitos,";
   query1+= "sum(A.ite_credito) as creditos,00000000000.00 as saldo ";
   query1+= "FROM itemcontable A left join puc B on B.id=A.puc_id ";
   query1+= "where A.ite_anulado= 0 and ite_fecha>=? and ite_fecha<=? ";
   query1+= "GROUP BY B.id ORDER BY B.puc_codigo";
   const registros = await conex.query(`${query1}`, {replacements: [fInicio, fCorte]});
   const array = registros[0];
   return array;
 };

module.exports = {
    getContable,
    getContableByFuente,
    getContableByTercero,
    getContableById,
    getItemsContables,
    getItemsRangoFecha,
    getBalance,
};       