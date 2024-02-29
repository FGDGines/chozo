import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalUsuarios({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [isActivo, setIsActivo] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [oform, setOform] = useState(
    { id: 0,
      usu_nombre: null,
      usu_admin: 0,
      tercero_id: 0,
      usu_activo: 0,
      usu_password: "",
    });

   const handleChange = (e, property) => {
      const value = e.target.value;
      setOform({...oform, [property]: value})
   };


   const getUsuario = async() => {
      const response = await axios(`api/usuarios/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          usu_nombre: xreg.usu_nombre,
          usu_admin: xreg.usu_admin,
          usu_activo: xreg.usu_activo,
          usu_password: "",
          tercero_id: xreg.tercero_id,
        });
        setIsActivo(xreg.usu_activo == 1 ? true : false)
        setIsAdmin(xreg.usu_admin == 1 ? true : false);
   };

   const handleGrabar = async() => {
      await axios.put(`api/usuarios/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getUsuario();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4">Modificacion Usuarios</h2>
        <h2 className="text-lg font-semibold mb-4">Id: {record} </h2>
        <label>Nombre : </label>
        <input type="text" name="usu_nombre"
               className="w-60"
               value={oform.usu_nombre} 
               onChange={(e)=>handleChange(e, "usu_nombre")}/><br/>
        <label>Password : </label>
        <input type="password" name="usu_password"
               className="w-50"
               value={oform.usu_password} 
               onChange={(e)=>handleChange(e, "usu_password")}/><br/>   
        <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "usu_activo");
            }}
          /><br/>   
        <strong className="mr-1 mb-0.5">Admin:</strong>{" "}
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => {
              setIsAdmin(!isAdmin);
              handleChange(e, "usu_admin");
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

export default ModalUsuarios;