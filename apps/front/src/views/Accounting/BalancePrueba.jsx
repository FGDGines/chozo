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
      let mmes = mes > 9 ? mes : '0'+ mes;
      let fecha1 = anual + "-" + mmes + "-01";
      let dia = "31";
      if(mes==4 || mes==6 || mes==9 || mes==11) dia = "30";
      if(mes==2) {
         dia = "28";
         if(anual % 4 == 0) dia = "29";
      };
      let fecha2 = anual + "-" + mmes + "-" +dia;
      const result = await axios(`api/contable/balance/${anual}?fechaInicio=${fecha1}&&fechaCorte=${fecha2}`, {
         headers: {
         token: token,
       },
      });
      const datos = result.data;
      setBalance(datos);
   };

   //definimos formato de numeros
   const options = {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
   };
   const formatterDolar = new Intl.NumberFormat('en-US', options);

   let sum_ant = 0;
   let sum_deb = 0;
   let sum_cre = 0;
   let sum_sal = 0;
   balance.forEach(ele => {
      sum_ant+=ele.anterior;
      sum_deb+=ele.debitos;
      sum_cre+=ele.creditos;
      sum_sal+=ele.saldo;
   });

  return (
    <>
      <div className="ml-[97px] font-SFRegular h-screen w-[98%] flex flex-col mt-5">
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
      <table className="w-[90%] text-sm text-left text-gray-700 dark:text-gray-700">
          <thead>
             <tr>
                <th>Codigo</th><th>Cuenta</th>
                <th className="text-right">Anterior</th>
                <th className="text-right">Debitos</th>
                <th className="text-right">Creditos</th>
                <th className="text-right">Saldo</th>
             </tr>
           </thead>
          <tbody>
             {balance.map(ele =>
                <tr>
                    <td>{ele.puc_codigo}</td>
                    <td>{ele.puc_cuenta}</td>
                    <td className="text-right">{formatterDolar.format(ele.anterior)}</td>
                    <td className="text-right">{formatterDolar.format(ele.debitos)}</td>
                    <td className="text-right">{formatterDolar.format(ele.creditos)}</td>
                    <td className="text-right">{formatterDolar.format(ele.saldo)}</td>
                </tr>
             )}
             <tr><td></td><td></td>
             <td className="text-right">-------------------</td><td className="text-right">-------------------</td>
             <td className="text-right">-------------------</td><td className="text-right">-------------------</td></tr>
             <tr><td></td><td>TOTALES</td>
                 <td className="text-right">{formatterDolar.format(sum_ant)}</td>
                 <td className="text-right">{formatterDolar.format(sum_deb)}</td>
                 <td className="text-right">{formatterDolar.format(sum_cre)}</td>
                 <td className="text-right">{formatterDolar.format(sum_sal)}</td>
             </tr>
          </tbody>
      </table>
      </div>
    </>
  )
}

export default BalancePrueba;
