import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalUnidades({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [oform, setOform] = useState(
    { id: 0,
      uni_detalles: null,
      uni_abreviatura: 0,
    });

   const handleChange = (e, property) => {
      const value = e.target.value;
      setOform({...oform, [property]: value})
   };


   const getUnidad = async() => {
      const response = await axios(`api/unidades/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          uni_detalles: xreg.uni_detalles,
          uni_abreviatura: xreg.uni_abreviatura,
        });
   };

   const handleGrabar = async() => {
      await axios.put(`api/unidades/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getUnidad();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Unidades</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Detalles : </label>
        <input type="text" name="uni_detalles"
               className="w-50"
               value={oform.uni_detalles} 
               onChange={(e)=>handleChange(e, "uni_detalles")}/><br/>
        <label>Iniciales : </label>
        <input type="text" name="uni_abreviatura"
               className="w-50"
               value={oform.uni_abreviatura} 
               onChange={(e)=>handleChange(e, "uni_abreviatura")}/><br/>
        <div className="flex flex-row items-center mt-4">
           <button className="bg-red-500 px-4 py-2 rounded-md mx-2"
                  onClick={() => {
                      onClose();
                  }}>Abandonar
           </button>
           <button className="bg-blue-500 px-4 py-2 rounded-md mx-2"
                  onClick={() => {
                      handleGrabar();
                  }}>Actualizar
           </button>
        </div>
    </div>
    </div>    
   )
};

export default ModalUnidades;