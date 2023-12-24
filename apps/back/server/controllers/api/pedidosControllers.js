const {pedidos, itempedidos, articulos, consecutivos, parametros,
       proveedores, agencias_transporte} = require("../../models/DbConex");

//devuelve todos los pedidos existentes
const getPedidos = async() =>{
   const array = await pedidos.findAll({
      include: [
        {model: proveedores, attributes: { exclude: ['createdAt','updatedAt']}}
      ]
   });
   return array;
};

//devuelve consecutivo de pedidos
const devuelveConsecutivo = async(anual, fuente) => {
   let num = 0;
   const registro= await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   if(registro) num = registro.conse_ultimograbado;
   num+=1;
   let numero = num.toString().padStart(7,'0');
   numero = anual.toString()+'-'+numero;
   return numero;
};

//graba un nuevo pedido
const addPedido = async(datos) => {
   const {fecha, valor, solicitante, proveedor_id, items} = datos;
   const ped_fecha = new Date(fecha);
   const anual = ped_fecha.getFullYear();

   //capturamos en el parametro "001" predefinido el id de la Fuente de Pedidos a Proveedores
   const parametro = await parametros.findOne({where: {para_codigo: '001'}});
   const fuente = Number(parametro.para_valor);
   
   //invocamos la funcion que nos devolvera el ultimo consecutivo grabado en el año definido por anual
   const num = await devuelveConsecutivo(anual, fuente);
   const newItem = {
        ped_numero: num,
        ped_fecha,
        ped_valor: valor,
        ped_solicitante: solicitante,
        proveedor_id,
   };

   //procedemos a grabar el nuevo pedido
   const pedido = await pedidos.create(newItem);

   //grabamos cada uno de los items del pedido
   items.forEach(async(ele) => {
      const registro = {
         ite_cantidad: ele.cantidad,
         ite_impuesto: ele.impuesto,
         ite_preciocosto: ele.valoruni,
         pedido_id: pedido.id,
         articulo_id: ele.articulo_id,
      };
      const regGrabado = await itempedidos.create(registro);
   });
   
   //actualizamos el consecutivo de los pedidos
   const consecu = await consecutivos.findOne({where: {fuente_id: fuente, conse_anual: anual}})
   const newConse = consecu.conse_ultimograbado + 1;
   await consecutivos.update({conse_ultimograbado: newConse}, {where: {id: consecu.id}});
   return pedido;
};

module.exports = {
    getPedidos,
    addPedido,
}