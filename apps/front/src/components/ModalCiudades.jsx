import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalCiudades({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [oform, setOform] = useState(
    { id: 0,
      ciu_nombre: null,
      ciu_codigo: null,
    });

   const handleChange = (e, property) => {
      const value = e.target.value;
      setOform({...oform, [property]: value})
   };


   const getCiudad = async() => {
      const response = await axios(`api/ciudades/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          ciu_nombre: xreg.ciu_nombre,
          ciu_codigo: xreg.ciu_codigo,
        });
   };

   const handleGrabar = async() => {
      await axios.put(`api/ciudades/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getCiudad();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Ciudades</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Nombre : </label>
        <input type="text" name="ciu_nombre"
               className="w-50"
               value={oform.ciu_nombre} 
               onChange={(e)=>handleChange(e, "ciu_nombre")}/><br/>
        <label>Codigo : </label>
        <input type="text" name="ciu_codigo"
               className="w-50"
               value={oform.ciu_codigo} 
               onChange={(e)=>handleChange(e, "ciu_codigo")}/><br/>
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

export default ModalCiudades;