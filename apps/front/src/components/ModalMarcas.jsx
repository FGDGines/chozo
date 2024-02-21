import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalMarcas({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [oform, setOform] = useState(
    { id: 0,
      mar_detalles: null,
      mar_activa: 0,
    });
   const [isActivo, setIsActivo] = useState(false);

   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "mar_activa") {
        setOform({...oform, mar_activa: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };


   const getMarca = async() => {
      const response = await axios(`api/marcas/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          mar_detalles: xreg.mar_detalles,
          mar_activa: xreg.mar_activa,
        });
      setIsActivo(xreg.mar_activa==1 ?true : false);
   };

   const handleGrabar = async() => {
      await axios.put(`api/marcas/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getMarca();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Marcas</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Marca : </label>
        <input type="text" name="gru_detalles"
               className="w-50"
               value={oform.mar_detalles} 
               onChange={(e)=>handleChange(e, "mar_detalles")}/>
        <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "mar_activa");
            }}
          />
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

export default ModalMarcas;