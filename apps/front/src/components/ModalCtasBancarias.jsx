import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalCtasBancarias({ onClose, record}) {
   const token = localStorage.getItem("token");
   const [puc, setPuc] = useState([]);
   const [isActivo, setIsActivo] = useState(false);
   const [oform, setOform] = useState(
    { id: 0,
      cue_banco: "",
      cue_numero: 0,
      cue_tipo: 0,
      puc_id: 0,
      cue_activa: 0,
    });
   

   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "cue_activa") {
        setOform({...oform, cue_activa: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };


   const getCtaBanco = async() => {
      const response = await axios(`api/cuentasbancarias/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          cue_banco: xreg.cue_banco,
          cue_numero: xreg.cue_numero,
          cue_tipo: xreg.cue_tipo,
          puc_id: xreg.puc_id,
          cue_activa: xreg.cue_activa
        });
      setIsActivo(xreg.cue_activa==1 ?true : false);
   };

   const getPuc = async() => {
    const response = await axios('api/puc', {
      headers: {
        token: token,
      },
    });
    const datos = response.data;
    const xdatos = datos.filter(ele => ele.puc_nivel==5);
    setPuc(xdatos);
   };

   const handleGrabar = async() => {
      await axios.put(`api/cuentasbancarias/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getCtaBanco();
      getPuc();
    }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Ctas Bancarias</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Banco : </label>
        <input type="text" name="cue_banco"
               className="w-50"
               value={oform.cue_banco} 
               onChange={(e)=>handleChange(e, "cue_banco")}/><br/>
        <label>Numero : </label>
        <input type="text" name="cue_numero"
               className="w-50"
               value={oform.cue_numero} 
               onChange={(e)=>handleChange(e, "cue_numero")}/><br/>               
        <div className="flex flex-row items-center mt-4"> 
           <h2>Cuenta Puc : </h2>
           <select name="puc_id" 
                   className="mx-3" 
                   onChange={(e)=>handleChange(e, "puc_id")}
                   value={oform.puc_id}>
                   {puc.map(cta=>
                      <option value={cta.id}>{cta.puc_codigo} - {cta.puc_cuenta}</option> 
                   )} 
           </select>
        </div>  
        <div className="flex flex-row items-center mt-4">      
           <h2>Tipo : </h2>
           <select name="cue_tipo" 
                   className="mx-3" 
                   onChange={(e)=>handleChange(e, "cue_tipo")}
                   value={oform.cue_tipo}>
                   <option value="1">Ahorros</option>
                   <option value="2">Corriente</option>
           </select>
        </div>   
        <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "cue_activa");
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

export default ModalCtasBancarias;