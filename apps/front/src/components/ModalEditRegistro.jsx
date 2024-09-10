import React, { useState, useEffect } from "react";

function ModalEditRegistro({onClose, closeSinCambios, record, carrito}){
   const [registro, setRegistro] = useState({});

   useEffect(() => {
     const reg = carrito.find(ele=>ele.nitem==record);
     setRegistro({
        id: reg.id,
        nitem: reg.nitem,
        detalles: reg.detalles,
        valoruni: Number(reg.valoruni.toFixed(2)),
        cantidad: Number(reg.cantidad),
        impuesto: Number(reg.impuesto),
        vtotal: Number(reg.vtotal.toFixed(2)),
        vimpuesto: Number(reg.vimpuesto.toFixed(2)),
        preciocosto: Number(reg.preciocosto.toFixed(2)),
        precioventa: Number(reg.precioventa.toFixed(2)),
     });
   }, []);

   const handleCambios = (e) => {
     const propiedad = e.target.name;
     const value= Number(e.target.value);
     if(propiedad=="precioventa"){
        const vau = value/(1+Number(registro.impuesto)/100);
        const vimp = value - vau ;
        const tot = value * registro.cantidad;
        setRegistro({...registro, valoruni: vau, vtotal:tot, vimpuesto:vimp, precioventa: value, total: tot});
     };
     if(propiedad=="impuesto"){
        const vau = Number(registro.precioventa)/(1 + Number(value/100));
        const vimp = registro.vtotal - vau * registro.cantidad;
        setRegistro({...registro, impuesto: value, vimpuesto:vimp, valoruni: vau});
     };
     if(propiedad=="cantidad"){
        const vt = Number(registro.precioventa) * value;
        const vimp = vt * registro.impuesto/100;
        setRegistro({...registro, cantidad: value, vtotal:vt, vimpuesto:vimp, total: vt});
     };
   };

   const actualizar = () => {
     const nuevo =[];
     carrito.forEach(ele=>{
        if(ele.nitem==record){
          const nreg= {  
            id: ele.id,
            detalles: registro.detalles,
            cantidad: registro.cantidad,
            valoruni: registro.valoruni,
            vtotal: registro.vtotal,
            nitem: record,
            impuesto: registro.impuesto,
            preciocosto: ele.preciocosto,
            precioventa: registro.precioventa,
            vimpuesto: registro.vimpuesto,
            vtotal_str: registro.vtotal.toFixed(2),
          };
          nuevo.push(nreg);
        } else {
          nuevo.push(ele);
        };
     });
     //localSorage.removeItem("Carrito");
     const updatedItemsJSON = JSON.stringify(nuevo);
     localStorage.setItem("Carrito", updatedItemsJSON);
     onClose();
   };
 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
       <div className="max-w-4xl p-3 mx-auto bg-white rounded-md shadow-md border-t-4 border-customBlue">
          <h2 className="text-xl font-bold px-5 bg-black text-white text-center p-2 rounded-md">EDICION DE REGISTRO</h2>
          <div className="grid grid-cols-2 gap-2">
            <h2>Item</h2>
            <h2>{record}</h2>
            <h2>Artículo</h2>
            <h2>{registro.detalles}</h2>
            <h2>Precio Venta</h2>
            <input type="number" name="precioventa" value={registro.precioventa} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Cantidad</h2>
            <input type="number" name="cantidad" value={registro.cantidad} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Impuesto %</h2>
            <input type="number" name="impuesto" value={registro.impuesto} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Bruto</h2>
            <h2>{registro.valoruni * registro.cantidad}</h2>
            <h2>Impuesto</h2>
            <h2>{Number(registro.vimpuesto)}</h2>
            <h2>Total</h2>
            <h2>{registro.vtotal}</h2>
          </div>
          <div className="flex justify-center mt-5">
              <button className="bg-blue-500 px-4 py-1 rounded-md mx-2 text-white"
                  onClick={() => {actualizar();
                  }}>Actualizar
              </button>
             <button className="bg-red-500 px-4 py-1 rounded-md mx-2 text-white"
                  onClick={() => {closeSinCambios();
                  }}>Abandonar
              </button>
           </div>
       </div>
    </div>   
   )
};

export default ModalEditRegistro;