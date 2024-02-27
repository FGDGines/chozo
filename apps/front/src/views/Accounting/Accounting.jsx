
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";


function Accounting() {
  const token = localStorage.getItem("token");
   const [puc, setPuc] = useState([]);

   const getPuc = async() => {
      const result = await axios('api/puc', {
         headers: {
         token: token,
      },
      });
      const datos = result.data
      setPuc(datos);
   };

   useEffect(() => {
      getPuc();
   }, []);

   const handleEditar = async(e, registro) => {

   };

   const handleEliminar = async(e, registro) => {

   };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Plan Unico de Cuentas</h2>
      <table className="w-3/4 text-sm text-left text-gray-700 dark:text-gray-700">
          <thead>
             <tr>
                <th>Codigo</th><th>Cuenta</th><th>Nivel</th><th>Accion</th><th>Accion</th>
             </tr>
          </thead>
          <tbody>
              {puc.map(ele => 
                 <tr key={ele.id}>
                    <td>{ele.puc_codigo}</td>
                    <td>{ele.puc_cuenta}</td>
                    <td>{ele.puc_nivel}</td>
                    <td><button
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={(e)=>handleEditar(e, ele.id)}
                        >Editar</button></td>
                    <td><button
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={(e)=>handleEliminar(e, ele.id)}
                        >Eliminar</button></td>                        
                 </tr>
              )}
          </tbody>
      </table>
      </div>
    </>
  )
}

export default Accounting
