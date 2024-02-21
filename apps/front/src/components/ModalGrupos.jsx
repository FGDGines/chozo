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
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Grupos</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Grupo : </label>
        <input type="text" name="gru_detalles"
               className="w-50"
               value={oform.gru_detalles} 
               onChange={(e)=>handleChange(e, "gru_detalles")}/>
        <div className="flex flex-row items-center mt-4"> 
           <h2>Sublinea : </h2>
           <select name="sublinea_id" 
                   className="mx-3" 
                   onChange={(e)=>handleChange(e, "sublinea_id")}
                   value={oform.sublinea_id}>
              {sublineas.map(ele =>
                 <option value={ele.id}>{ele.sub_detalles}</option>
              )}
           </select>
        </div>        

        <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "gru_activo");
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

export default ModalGrupos;