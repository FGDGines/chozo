import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalGrupos({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [oform, setOform] = useState(
    { id: 0,
      gru_detalles: null,
      gru_activo: 0,
      sublinea_id: 0,
    });
   const [isActivo, setIsActivo] = useState(false);
   const [sublineas, setSublineas] = useState([]);

   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "gru_activo") {
        setOform({...oform, gru_activo: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };


   const cargarSublineas = async() => {
    const result = await axios('api/sublineas', {
       headers: {
         token: token,
       },
    });
    setSublineas(result.data);
 };

   const getGrupos = async() => {
      const response = await axios(`api/grupos/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          gru_detalles: xreg.gru_detalles,
          gru_activo: xreg.gru_activo,
          sublinea_id: xreg.sublinea_id,
        });
      setIsActivo(xreg.gru_activo==1 ?true : false);
   };

   const handleGrabar = async() => {
      await axios.put(`api/grupos/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getGrupos();
      cargarSublineas();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border-t-4 border-customBlue">
        <h2 className="text-2xl font-bold text-center text-black mb-4 px-4">Modificar Grupos</h2>
        <label className="block text-black font-bold pb-2">Grupo: </label>
        <input type="text" name="gru_detalles"
               className="block w-full px-4 py-2 mb-5 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
               value={oform.gru_detalles} 
               onChange={(e)=>handleChange(e, "gru_detalles")}/>
        
        <label className="block text-black font-bold pb-2">Sublinea: </label>
           <select name="sublinea_id" 
                   className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring" 
                   onChange={(e)=>handleChange(e, "sublinea_id")}
                   value={oform.sublinea_id}>
              {sublineas.map(ele =>
                 <option value={ele.id}>{ele.sub_detalles}</option>
              )}
           </select>
                
<div className="flex flex-row items-center gap-2 pt-5">
        <label className="block text-black font-bold">Activo:</label>
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "gru_activo");
            }}
          />
          </div>
        <div className="flex flex-row items-center mt-4">
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

export default ModalGrupos;