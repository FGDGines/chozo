import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalKardex({onClose, record,}) {
   const token = localStorage.getItem("token"); 
   const [feini, setFeini] = useState("1900/01/01");
   const [fefin, setFefin] = useState("9999/12/31");
   const [kardex, setKardex] = useState([]);
   const [selectedArticulo, setSelectedArticulo] = useState({});

   const getKardex = async() => {
      const id = Number(record);
      const result = await axios(`api/articulos/kardex/${id}?fechaInicio=${feini}&fechaCorte=${fefin} `, {
        headers: {
           token: token,
        },
      });
      const datos = result.data;
      const array = [];
      let sal = 0;
      datos.forEach(ele => {
         sal = sal + Number(ele.entradas) - Number(ele.salidas);
         const registro = {
            fuente: ele.fuente,
            numero: ele.numero,
            fecha: ele.fecha,
            concepto: ele.concepto,
            valoruni: ele.valoruni,
            entradas: ele.entradas,
            salidas: ele.salidas,
            saldo: sal,
         };
         array.push(registro);
      });
      setKardex(array);
   };

   const getArticulo = async() => {
      const id = Number(record);
      const result = await axios(`api/articulos/${id}`, {
          headers: {
            token: token,
         },
      });
      const datos = result.data;
      setSelectedArticulo(datos);
   };
   
   useEffect(() => {
      getArticulo();
      getKardex();
   }, []);

   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg">
           <h2 className="text-lg font-semibold bg-blue-800 text-white px-4">Kardex Detallado</h2>
           <h2 className="text-lg font-semibold bg-blue-600 text-white mb-4 px-4">
               Articulo : {selectedArticulo.art_detalles} - Ref : {selectedArticulo.art_referencia}</h2>
           <table className="min-w-full divide-y divide-gray-200">
               <thead>
                  <tr>
                      <th className="text-left">Fte</th>
                      <th className="text-left px-4">Numero</th>
                      <th className="text-left px-4">Fecha</th>
                      <th className="text-right px-4">ValorUnit.</th>
                      <th className="text-right px-4">Entradas</th>
                      <th className="text-right px-4">Salidas</th>
                      <th className="text-right px-4">Saldo</th>
                  </tr>
               </thead>
               <tbody>
               {kardex.map(ele =>
                  <tr key={ele.id}>
                    <td>{ele.fuente}</td>
                    <td className="text-left px-4">{ele.numero}</td>
                    <td className="text-left px-4">{ele.fecha}</td>
                     <td className="text-right px-4">{ele.valoruni}</td>
                    <td className="text-right px-4">{ele.entradas}</td>
                    <td className="text-right px-4">{ele.salidas}</td>
                    <td className="text-right px-4">{ele.saldo}</td>
                  </tr>
                )}
                </tbody>
           </table>
           <button className="bg-red-500 px-4 py-2 rounded-md mx-2 mt-3"
                  onClick={() => {
                      onClose();
                  }}>Abandonar
           </button> 
        </div>  

    </div>
   )
};

export default ModalKardex;