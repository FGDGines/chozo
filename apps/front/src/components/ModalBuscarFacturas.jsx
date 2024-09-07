import React, { useState, useEffect } from "react";
import axios from "axios";
const meses = [
    {id: 1, mes: "Enero"},
    {id: 2, mes: "Febrero"},
    {id: 3, mes: "Marzo"},
    {id: 4, mes: "Abril"},
    {id: 5, mes: "Mayo"},
    {id: 6, mes: "Junio"},
    {id: 7, mes: "Julio"},
    {id: 8, mes: "Agosto"},
    {id: 9, mes: "Septiembre"},
    {id: 10, mes: "Octubre"},
    {id: 11, mes: "Noviembre"},
    {id: 12, mes: "Diciembre"},
];


function ModalBuscarFacturas({onClose}){
   const token = localStorage.getItem("token");
   const fecha = new Date();
   const [anual, setAnual] = useState(fecha.getFullYear());
   const [mensual, setMensual] = useState(0);
   const [registros, setRegistros] = useState([]);

   const getCartera = async() => {
      if(mensual==0 || anual==0) return;
      const resp = await axios.get(`api/carteraxcobrar/mensual?anual=${anual}&mensual=${mensual}`, {headers: {token}});
      const resul = resp.data;
      setRegistros(resul);
   };

   const handleCambios = (e) => {
     const propiedad = e.target.name;
     const value = e.target.value;
     if(propiedad=="mensual") setMensual(value);
     if(propiedad=="anual") setAnual(value);
   };

   useEffect(() => {
   }, []);

   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
       <div className="max-w-4xl p-3 mx-auto bg-white rounded-md shadow-md border-t-4 border-customBlue">
           <div className="flex justify-between bg-blue-500 text-white p-2 rounded-lg">
              <h2 className="text-xl font-bold px-5">BUSQUEDA DE PEDIDOS DE VENTA</h2>
              <select name="mensual" className="text-black border rounded-lg px-5" value={mensual} onChange={(e)=>handleCambios(e)}>
                <option value="0">Seleccione Mes</option>
                {meses.map(ele=>
                    <option value={ele.id}>{ele.mes}</option>
                )}
              </select>
              <div className="flex px-5">
                <h2>Año :</h2>
                <input type="number" name="anual" className="text-black rounded-lg w-14 text-center" value={anual}  onChange={(e)=>handleCambios(e)}/>
                <button className="bg-black text-white px-3 py-1 rounded-lg ml-5"
                onClick={()=>getCartera()}>Buscar</button>
              </div>
           </div>
           <table className="mt-3">
              <thead>
                <tr className="text-left">
                    <th>Numero</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {registros.map(reg=>
                    <tr>
                        <td className="w-32">{reg.numero}</td>
                        <td className="w-28">{reg.fecha.slice(0,10)}</td>
                        <td className="w-80">{reg.tercero}</td>
                        <td className="w-24">{reg.valor}</td>
                        <td><button className="bg-blue-400 text-white px-2 rounded-lg ">Seleccionar</button></td>
                    </tr>
                )}
              </tbody>
           </table>
           <div className="flex justify-center mt-5">
           <button className="bg-red-500 px-4 py-1 rounded-md mx-2 text-white"
                  onClick={() => {onClose();
                  }}>Abandonar
           </button>

           </div>
       </div>
    </div>
   )
};

export default ModalBuscarFacturas;