import React, { useState, useEffect } from "react";

function ModalEfectivo({
    onClose,
    totalAmount,
   }) {

   const [efectivo, setEfectivo] = useState(0);
   
   const handleChangeEfectivo = (e) => {
      const value = e.target.value;
      setEfectivo(value);
   };

   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Pago Efectivo</h2>
        <h2 className="text-lg font-semibold mb-4">Valor Total: {totalAmount} €</h2>
        <label>Digite valor Efectivo : </label>
        <input type="number"
               value={efectivo} 
               className="text-right w-20"
               onChange={handleChangeEfectivo} /><br/> 
        <h2 className="text-lg font-semibold mb-4">Su cambio: {efectivo-totalAmount} €</h2>       
        <button className="bg-gray-300 px-4 py-2 rounded-md mx-2"
                  onClick={() => {
                      onClose();
                  }}>Cerrar
        </button>
    </div>
    </div>    
   )
};

export default ModalEfectivo