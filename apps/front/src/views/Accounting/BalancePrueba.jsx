import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";


function BalancePrueba() {
  const token = localStorage.getItem("token");
  const [anual, setAnual] = useState(2000);
  const [mes, setMes] = useState(1);
  const [balance, setBalance] = useState([]);

   useEffect(() => {
     const date = new Date();
     const an = date.getFullYear();
     setAnual(an);
   }, []);

   const handleMes = (e) => {
      const value= Number(e.target.value);
      setMes(value);
   };

   const handleAnual = (e) => {
      const value = Number(e.target.value);
      setAnual(value);
   };

   const handleBalance = async(e) => {
      e.preventDefault();
      const fecha1="2024-01-01";
      const fecha2="2024-12-31";
      const result = await axios(`api/contable/balance/${anual}?fechaInicio=${fecha1}&&fechaCorte=${fecha2}`, {
         headers: {
         token: token,
       },
      });
      const datos = result.data;
      setBalance(datos);
   };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Balance de Prueba</h2>
      <div className="flex flex-row items-center gap-3">
         <label>Año : </label>
         <input type="number" 
                value={anual} 
                onChange={(e)=>handleAnual(e)}
                className="w-20"/>
      </div>
 
      <div className="flex flex-row items-center gap-3">
         <label>Mes : </label>
         <select name="idmes" className="w-40" 
           onChange={(e)=>handleMes(e)}
           value={mes}>
           <option value="1">Enero</option>
           <option value="2">Febrero</option>
           <option value="3">Marzo</option>
           <option value="4">Abril</option>
           <option value="5">Mayo</option>
           <option value="6">Junio</option>
           <option value="7">Julio</option>
           <option value="8">Agosto</option>
           <option value="9">Septiembre</option>
           <option value="10">Octubre</option>
           <option value="11">Noviembre</option>
           <option value="12">Diciembre</option>
         </select>
         <button
         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
         onClick={(e)=>handleBalance(e)}
         >Actualizar</button>
      </div>
      <hr/>
      <table className="w-3/4 text-sm text-left text-gray-700 dark:text-gray-700">
          <thead>
             <tr>
                <th>Codigo</th><th>Cuenta</th><th>Anterior</th><th>Debitos</th><th>Creditos</th><th>Saldo</th>
             </tr>
          </thead>
          <tbody>
             {balance.map(ele =>
                <tr>
                    <td>{ele.puc_codigo}</td>
                    <td>{ele.puc_cuenta}</td>
                    <td>{ele.anterior}</td>
                    <td>{ele.debitos}</td>
                    <td>{ele.creditos}</td>
                    <td>{ele.saldo}</td>
                </tr>
             )}
          </tbody>
      </table>
      </div>
    </>
  )
}

export default BalancePrueba;
