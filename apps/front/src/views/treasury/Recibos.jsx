import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Recibos() {
   const token = localStorage.getItem("token");
   const [clientes, setClientes] = useState([]);

   const cargarClientes = async() => {
      const result = await axios.get('api/terceros', {
        headers: {
          token: token,
        },
      });
      const datos = result.data
      setClientes(datos);   
   };

   useEffect(() => {
     cargarClientes()
   }, []);

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Recibo de Caja</h2>
        <div className="flex flex-row items-center gap-3">
            <h2 className="text-l">Cliente</h2>
            <select>
               <option value="0">Seleccione</option>
               {clientes.map(ele => 
                  <option value={ele.id}>{ele.ter_tercero}  -  {ele.ter_documento}</option>
                )}
            </select>
        </div>
    </div>
   )
};

export default Recibos;