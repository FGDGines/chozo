import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalLineas({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [oform, setOform] = useState({id: 0, lin_detalles: null, lin_activa: 0});
   const [isActivo, setIsActivo] = useState(false);
   
   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "lin_activa") {
        setOform({...oform, lin_activa: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };

   const getArticulo = async() => {
      const response = await axios(`api/lineas/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      setOform({id: xreg.id, lin_detalles: xreg.lin_detalles, lin_activa: xreg.lin_activa});
      setIsActivo(xreg.lin_activa==1 ?true : false);
   };

   const handleGrabar = async() => {
      await axios.put(`api/lineas/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getArticulo();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Lineas</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Linea : </label>
        <input type="text" name="lin_detalles"
               className="w-50"
               value={oform.lin_detalles} 
               onChange={(e)=>handleChange(e, "lin_detalles")}/>
        <div className="flex flex-row items-center ">
          <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "lin_activa");
            }}
          />
        </div>
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

export default ModalLineas;