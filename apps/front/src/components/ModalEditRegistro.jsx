import React, { useState, useEffect } from "react";

function ModalEditRegistro({onClose, closeSinCambios, record, carrito}){
   const [registro, setRegistro] = useState({});

   useEffect(() => {
     const reg = carrito.find(ele=>ele.nitem==record);
     setRegistro({
        id: reg.id,
        nitem: reg.nitem,
        detalles: reg.detalles,
        valoruni: Number(reg.valoruni),
        cantidad: Number(reg.cantidad),
        impuesto: Number(reg.impuesto),
        vtotal: Number(reg.vtotal),
        vimpuesto: Number(reg.vtotal) * Number(reg.impuesto)/100,
        total: Number(reg.vtotal) * (1 + Number(reg.impuesto)/100),
     });
   }, []);

   const handleCambios = (e) => {
     const propiedad = e.target.name;
     const value= Number(e.target.value);
     if(propiedad=="valoruni"){
        const vt = registro.cantidad * value;
        const vimp = vt * registro.impuesto/100;
        const tot = vt + vimp;
        setRegistro({...registro, valoruni: value, vtotal:vt, vimpuesto:vimp, total: tot});
     };
     if(propiedad=="impuesto"){
        const vimp = registro.vtotal * value/100;
        const tot = registro.vtotal + vimp;
        setRegistro({...registro, impuesto: value, vimpuesto:vimp, total: tot});
     };
     if(propiedad=="cantidad"){
        const vt = registro.valoruni * value;
        const vimp = vt * registro.impuesto/100;
        const tot = vt + vimp;
        setRegistro({...registro, cantidad: value, vtotal:vt, vimpuesto:vimp, total: tot});
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
            <h2>Valor Unitario</h2>
            <input type="number" name="valoruni" value={registro.valoruni} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Cantidad</h2>
            <input type="number" name="cantidad" value={registro.cantidad} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Impuesto %</h2>
            <input type="number" name="impuesto" value={registro.impuesto} className="border border-black" onChange={(e)=>handleCambios(e)}/>
            <h2>Bruto</h2>
            <h2>{registro.vtotal}</h2>
            <h2>Impuesto</h2>
            <h2>{Number(registro.vimpuesto)}</h2>
            <h2>Total</h2>
            <h2>{registro.total}</h2>
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