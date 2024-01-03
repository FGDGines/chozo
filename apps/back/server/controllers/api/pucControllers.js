const {puc} = require("../../models/DbConex");
 
//devuelve el plan de cuentas completo
const getPuc = async() => {
   const result = await puc.findAll({
      attributes: ['id','puc_codigo','puc_cuenta','puc_nivel']
   }, {order: ['puc_codigo', 'ASC']});
   return result;
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
   let cuenta = puc.findOne({where: {puc_codigo: grup}});
   if(!cuenta) {
      const result = agregaCuenta(grup, cuen_grupo, 1);
      if(result.error) throw Error("No se pudo crear cuenta de Grupos");
   };   
   //buscamos si existe la cuenta del subgrupo
   cuenta = puc.findOne({where: {puc_codigo: sgru}});
   if(!cuenta) {
       const result = agregaCuenta(sgru, cuen_subgrupo, 2);
       if(result.error) throw Error("No se pudo crear cuenta de Subgrupos");
   };    
   //buscamos si existe la cuenta mayor
   cuenta = puc.findOne({where: {puc_codigo: may}});
   if(!cuenta) {
       const result = agregaCuenta(may, cuen_mayor, 3);
       if(result.error) throw Error("No se pudo crear cuenta Mayor");
   };    
   //buscamos si existe la cuenta de la subcuenta
   cuenta = puc.findOne({where: {puc_codigo: scta}});
   if(!cuenta) {
       const result = agregaCuenta(scta, cuen_subcuenta, 4);
       if(result.error) throw Error("No se pudo crear subcuenta");
   };    
   //buscamos si existe la auxiliar
   cuenta = puc.findOne({where: {puc_codigo: aux}});
   if(!cuenta) {
      const cuenta = agregaCuenta(aux, naux, 5);
      if(cuenta.error) throw Error("No se pudo crear cuenta Auxiliar");
      return cuenta;
   } else {
      return cuenta;
   };   
};

module.exports = {
   getPuc,
   getCuentaByCodigo,
   getCuentaById,
   addCuenta,
};