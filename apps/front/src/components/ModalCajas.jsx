import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalCajas({ onClose, record}) {
   const token = localStorage.getItem("token");
   const [usuarios, setUsuarios] = useState([]);
   const [puc, setPuc] = useState([]);
   const [isActivo, setIsActivo] = useState(false);
   const [oform, setOform] = useState(
    { id: 0,
      caj_detalles: "",
      caj_activa: 0,
      usuario_id: 0,
      puc_id: 0,
    });
   

   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "caj_activa") {
        setOform({...oform, caj_activa: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };


   const getCaja = async() => {
      const response = await axios(`api/cajas/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      setOform(
        { id: xreg.id,
          caj_detalles: xreg.caj_detalles,
          caj_activa: xreg.caj_activa,
          usuario_id: xreg.usuario_id,
          puc_id: xreg.puc_id,
        });
      setIsActivo(xreg.caj_activa==1 ?true : false);
   };

   const getUsers = async() => {
    const response = await axios(`api/usuarios`, {
        headers: {
          token: token,
        },
      });
      const datos = response.data;
      const xdatos = datos.filter(ele => ele.usu_activo==1);
      setUsuarios(xdatos);
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
      await axios.put(`api/cajas/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getCaja();
      getPuc();
      getUsers();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Cajas</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Caja : </label>
        <input type="text" name="caj_detalles"
               className="w-50"
               value={oform.caj_detalles} 
               onChange={(e)=>handleChange(e, "caj_detalles")}/>
        <div className="flex flex-row items-center mt-4">
            <h2>Usuario : </h2>
            <select name="usuario_id"
                    className="mx-3" 
                    onChange={(e)=>handleChange(e, "usuario_id")}
                    value={oform.usuario_id}>
                    {usuarios.map((usu) => 
                       <option value={usu.id}>{usu.usu_nombre}</option>
                    )}  
            </select>
        </div>        
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
        <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "caj_activa");
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

export default ModalCajas;