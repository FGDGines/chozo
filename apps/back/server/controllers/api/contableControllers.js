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
   const {fechaInicio, fechaCorte} = query;
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

//devuelve un balance de prueba en un rango de fechas
const getBalance = async(query, id) => {
   const anual = Number(id);
   const {fechaInicio, fechaCorte } = query;
   const fInicio = new Date(fechaInicio);
   const fCorte = new Date(fechaCorte);
   //traemos primero los saldos anteriores
   let query0 = "SELECT B.puc_codigo,B.puc_cuenta,sum(A.ite_debito-A.ite_credito) as anterior,";
   query0+= "sum(A.ite_base) as debitos,sum(A.ite_base) as creditos,sum(A.ite_base) as saldo,B.id "
   query0+= "from itemcontable A left join puc B on B.id=A.puc_id ";
   query0+= "where A.ite_anulado = 0 and ite_fecha < ? GROUP BY B.id ORDER BY B.puc_codigo";
   const saldoan = await conex.query(`${query0}`, {replacements: [fInicio]});
   const array0 = saldoan[0];

   //ahora traemos los movimientos del periodo
   let query1 = "SELECT B.puc_codigo,B.puc_cuenta,sum(A.ite_base) as anterior,sum(A.ite_debito) as debitos,";
   query1+= "sum(A.ite_credito) as creditos,sum(A.ite_base) as saldo,B.id ";
   query1+= "FROM itemcontable A left join puc B on B.id=A.puc_id ";
   query1+= "where A.ite_anulado= 0 and ite_fecha>=? and ite_fecha<=? ";
   query1+= "GROUP BY B.id ORDER BY B.puc_codigo";
   const registros = await conex.query(`${query1}`, {replacements: [fInicio, fCorte]});
   const array1 = registros[0];

   //ahora empalmamos ambos array en uno solo
   array0.forEach(ele => {
      var hallado = false;
      array1.map(function(dato){
         if(dato.id == ele.id){
            dato.anterior+= Number(ele.anterior);
            hallado = true;
         };
         return dato;
      });
      if(!hallado) {
         array1.push(ele);
      }; 
   });

   //recalculamos el saldo final
   array1.forEach(ele => {
      ele.saldo = ele.anterior + ele.debitos - ele.creditos;
   });

   //ahora generamos el balance con el PUC
   let query2 = "SELECT puc_codigo,puc_cuenta,puc_saldo as anterior,puc_saldo as debitos,puc_saldo as creditos,puc_saldo as saldo FROM puc ";
   query2+= "ORDER BY puc_codigo";
   const array2 = await conex.query(`${query2}`);
   const balan = array2[0];

   //realizamos proceso de mayorizacion
   array1.forEach(ele => {
      const aux = ele.puc_codigo;
      const grup = ele.puc_codigo.substring(0,1);
      const sgru = ele.puc_codigo.substring(0,2);
      const may = ele.puc_codigo.substring(0,4);
      const scta = ele.puc_codigo.substring(0,6);
      balan.map(function(e) {
         if(e.puc_codigo == aux) {
            e.anterior = e.anterior + ele.anterior;
            e.debitos = e.debitos + ele.debitos;
            e.creditos = e.creditos + ele.creditos;
            e.saldo = e.anterior + e.debitos -e.creditos;
         };
         if(e.puc_codigo == grup) {
            e.anterior = e.anterior + ele.anterior;
            e.debitos = e.debitos + ele.debitos;
            e.creditos = e.creditos + ele.creditos;
            e.saldo = e.anterior + e.debitos -e.creditos;
         };
         if(e.puc_codigo == sgru) {
            e.anterior = e.anterior + ele.anterior;
            e.debitos = e.debitos + ele.debitos;
            e.creditos = e.creditos + ele.creditos;
            e.saldo = e.anterior + e.debitos -e.creditos;
         };
         if(e.puc_codigo == may) {
            e.anterior = e.anterior + ele.anterior;
            e.debitos = e.debitos + ele.debitos;
            e.creditos = e.creditos + ele.creditos;
            e.saldo = e.anterior + e.debitos -e.creditos;
         };
         if(e.puc_codigo == scta) {
            e.anterior = e.anterior + ele.anterior;
            e.debitos = e.debitos + ele.debitos;
            e.creditos = e.creditos + ele.creditos;
            e.saldo = e.anterior + e.debitos -e.creditos;
         };
         return e;
      });
   });

   //filtramos solo las cuentas que tuvieron movimiento o que traian un saldo anterior
   const balance = balan.filter(dato => dato.anterior !== 0.00 || dato.debitos !== 0.00 || dato.creditos !== 0.00);

   return balance;
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