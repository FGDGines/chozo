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
    <div className="bg-white max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border-t-4 border-customBlue">
        <h2 className="text-2xl font-bold text-center text-black mb-4 px-4">Modificar Unidades</h2>
        <label className="block text-black font-bold pb-2">Detalles : </label>
        <input type="text" name="uni_detalles"
               className="block w-full px-4 py-2 mb-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
               value={oform.uni_detalles} 
               onChange={(e)=>handleChange(e, "uni_detalles")}/><br/>
        <label className="block text-black font-bold pb-2">Iniciales : </label>
        <input type="text" name="uni_abreviatura"
               className="block w-full px-4 py-2 mb-5 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
               value={oform.uni_abreviatura} 
               onChange={(e)=>handleChange(e, "uni_abreviatura")}/><br/>
        <div className="flex flex-row items-center mt-2">
           <button className="bg-red-500 px-4 py-2 rounded-md mx-2 text-white"
                  onClick={() => {
                      onClose();
                  }}>Abandonar
           </button>
           <button className="bg-blue-500 px-4 py-2 rounded-md mx-2 text-white"
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