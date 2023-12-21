const {proveedores, agencias_transporte, terceros} = require("../../models/DbConex");

//devuelve todos los proveedores
const getProveedores = async() => {
   const array = await proveedores.findAll( {
      include: [{model: terceros, attributes: { exclude: ['createdAt','updatedAt']}}]
   });
   return array;
};

//devuelve el proveedor por el id
const getProveedorById = async(id) => {
    const array = await proveedores.findByPk(id, {
        include: [
            {model: terceros, attributes: { exclude: ['createdAt','updatedAt']}},
        ]
    })
    return array;
};

//graba nuevo proveedor
const addProveedor = async(datos) => {
    const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
        ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id, agencia_id, pro_plazo} = datos;
    //buscamos si el tercero asociado al proveedor ya existe en la BD    
    const buscado = await terceros.findOne({where: {ter_documento}});
    let idTer = 0;
    if(buscado) {
       idTer = buscado.id;
    } else {
        //creamos el tercero
        const newTercero = {
            ter_documento,
            ter_tercero,
            ter_apellidos,
            ter_nombres,
            ter_direccion,
            ter_telefono,
            ter_email,
            ter_celular,
            ciudad_id,
            tipodocumento_id,
            tipotercero_id 
        };
        const grabado = await terceros.create(newTercero);
        idTer = grabado.id;
    };
    //ahora procedemos a grabar el proveedor
    const newProveedor = {
      tercero_id: idTer,
      pro_plazo,
      agencia_id
    };
    const result = await proveedores.create(newProveedor);
    return result;
};

//actualiza datos del proveedor
const updateProveedor = async(datos, id) => {
   const idP = Number(id);
   const {ter_documento, ter_tercero, ter_apellidos, ter_nombres, ter_direccion, ter_telefono,
          ter_email, ter_celular, ciudad_id, tipodocumento_id, tipotercero_id, 
          agencia_id, pro_plazo, pro_activo} = datos;
   //cargamos los datos actuales del proveedor       
   const registro = await proveedores.findByPk(idP);       
   //actualizamos primero los datos del tercero
   const tercero = await terceros.update({ter_documento, ter_tercero, ter_apellidos, ter_nombres,
                   ter_direccion, ter_telefono, ter_email, ter_celular, ciudad_id, 
                   tipodocumento_id, tipotercero_id}, {where: {id: registro.tercero_id}});
             
   //actualizamos los datos del proveedor
   const provee = await proveedores.update({agencia_id, pro_plazo, pro_activo}, {where: {id: idP}});
   return provee;                
};

module.exports = {
   getProveedores,
   getProveedorById,
   addProveedor,
   updateProveedor,
};