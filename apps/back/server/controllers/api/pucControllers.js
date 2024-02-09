const {puc, itemcontable, conex} = require("../../models/DbConex");
 
//devuelve el plan de cuentas completo y ordenado por codigo
const getPuc = async() => {
   const query1 = "SELECT id, puc_codigo,puc_cuenta,puc_nivel FROM puc order by puc_codigo";
   const registros = await conex.query(`${query1}`);
   const array = registros[0];
   return array;
};

//devuelve una sola cuenta por el id
const getCuentaById = async(id) => {
   const idP = Number(id); 
   const result = await puc.findByPk(idP);
   return result;
};

//devuelve cuenta localizada por el codigo
const getCuentaByCodigo = async(query) => {
   const result = await puc.findOne({where: query});
   return result;
};

//agrega la cuenta al puc
const agregaCuenta = async(cod, ncuenta, nivel) => {
   if(!ncuenta) return {error: true, idcuenta: 0} 
   const grabado = await puc.create({puc_codigo: cod, puc_cuenta: ncuenta, puc_nivel: nivel})
   return {error: false, idcuenta: grabado.id};
};

//crea una cuenta nueva
const addCuenta = async(datos) => {
   const {puc_codigo, puc_cuenta, cuen_grupo, cuen_subgrupo, cuen_mayor, cuen_subcuenta} = datos;
   if(puc_codigo.length<8) throw Error("El codigo de la cuenta debe ser de nivel auxiliar");
   if(puc_codigo.length>9) throw Error("La cuenta auxiliar debe tener maximo 9 digitos");

   const naux = puc_cuenta;
   const aux = puc_codigo;
   const grup = puc_codigo.substring(0,1);
   const sgru = puc_codigo.substring(0,2);
   const may = puc_codigo.substring(0,4);
   const scta = puc_codigo.substring(0,6);

   //buscamos si existe la cuenta de grupo
   let cuenta = await puc.findOne({where: {puc_codigo: grup}});
   if(!cuenta) {
      const result = await agregaCuenta(grup, cuen_grupo, 1);
      if(result.error) throw Error("No se pudo crear cuenta de Grupos");
   }; 
  
   //buscamos si existe la cuenta del subgrupo
   cuenta = await puc.findOne({where: {puc_codigo: sgru}});
   if(!cuenta) {
       const result = await agregaCuenta(sgru, cuen_subgrupo, 2);
       if(result.error) throw Error("No se pudo crear cuenta de Subgrupos");
   };    
   //buscamos si existe la cuenta mayor
   cuenta = await puc.findOne({where: {puc_codigo: may}});
   if(!cuenta) {
       const result = await agregaCuenta(may, cuen_mayor, 3);
       if(result.error) throw Error("No se pudo crear cuenta Mayor");
   };    
   //buscamos si existe la cuenta de la subcuenta
   cuenta = await puc.findOne({where: {puc_codigo: scta}});
   if(!cuenta) {
       const result = await agregaCuenta(scta, cuen_subcuenta, 4);
       if(result.error) throw Error("No se pudo crear subcuenta");
   };    
   //buscamos si existe la auxiliar
   cuenta = await puc.findOne({where: {puc_codigo: aux}});
   if(!cuenta) {
      const xcuenta = await agregaCuenta(aux, naux, 5);
      if(xcuenta.error) throw Error("No se pudo crear cuenta Auxiliar");
      return xcuenta;
   } else {
      return cuenta;
   };   
};

//modificar una cuenta existente
const updateCuenta = async(datos, id) => {
   const {puc_codigo, puc_cuenta} = datos;
   const idP = Number(id);
   const cuenta = await puc.findByPk(idP);
   const L = puc_codigo.length;
   if(cuenta.puc_nivel == 1 && L !== 1) throw Error("Codigo debe tener 1 Digito");
   if(cuenta.puc_nivel == 2 && L !== 2) throw Error("Codigo debe tener 2 Digitos");
   if(cuenta.puc_nivel == 3 && L !== 4) throw Error("Codigo debe tener 4 Digitos");
   if(cuenta.puc_nivel == 4 && L !== 6) throw Error("Codigo debe tener 6 Digitos");
   if(cuenta.puc_nivel == 5 && (L < 8 || L > 9)) throw Error("Codigo debe tener 8 o 9 Digitos");
   const result = await puc.update({puc_codigo,puc_cuenta}, {where: {id: idP}});
   return result;
};

//eliminar una cuenta
const deleteCuenta = async(id) => {
    const idP = Number(id);
    const cuenta = await puc.findByPk(idP);
    //buscamos si existen registros contables con esa cuenta
    if(cuenta.puc_nivel == 5) {
        const contab = await itemcontable.findOne({where: {puc_id: idP}});
        if(contab) throw Error("Esta cuenta tiene registros contables");
    };
    const result = await puc.destroy({where: {id: idP}});
    return result;
};

//crea varias cuentas en bloque
const bulkPuc = async(info) => {
   const {datos} = info;
   const result = await puc.bulkCreate(datos);
   const query1 = "SELECT puc_codigo,puc_cuenta,puc_nivel FROM puc order by puc_codigo";
   const registros = await conex.query(`${query1}`);
   const array = registros[0];
   return array;
};

module.exports = {
   getPuc,
   getCuentaByCodigo,
   getCuentaById,
   addCuenta,
   updateCuenta,
   deleteCuenta,
   bulkPuc,
};