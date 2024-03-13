import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalKardex from "../../components/ModalKardex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Inventory() {
   const token = localStorage.getItem("token");
   const [articulos, setArticulos] = useState([]);
   const [totalSistema, setTotalSistema] = useState(0);
   const [totalReal, setTotalReal] = useState(0);
   const [granTotal, setGranTotal] = useState(0);
   const [modalKardex, setModalKardex] = useState(false);
   const [record, setRecord] = useState(0);

   const closeModal = () => {
     setModalKardex(false);
   };

   const cargarExistencias = async() => {
      const result = await axios('api/existencias', {
        headers: {
           token: token,
        },
      });
      const datos = result.data;
      const array = [];
      let tot1 = 0;
      let tot3 = 0;
      datos.forEach(ele => {
         tot1+=Number(ele.existencia.exi_cantidad);
         tot3+=Number(ele.existencia.exi_cantidad) * Number(ele.art_ultimocosto);
         const reg = {
            id: ele.id,
            detalles: ele.art_detalles,
            referencia: ele.art_referencia,
            grupo: ele.grupo.gru_detalles,
            unidad: ele.unidade.uni_abreviatura,
            costo: Number(ele.art_ultimocosto),
            sistema: Number(ele.existencia.exi_cantidad),
            real: Number(ele.existencia.exi_cantidad),
            totales: Number(ele.art_ultimocosto) * Number(ele.existencia.exi_cantidad),
         };
         array.push(reg);
      });
      setArticulos(array);
      setTotalSistema(tot1);
      setTotalReal(tot1);
      setGranTotal(tot3);
   };

   const handleChange = (e, reg) => {
      const array = [];
      let tot2 = 0;
      let tot3 = 0;
      let value = Number(e.target.value);
      if(value<0) value = 0;
      articulos.forEach(ele => {
         if(ele.id == reg) {
            const registro = {
               id: ele.id,
               detalles: ele.detalles,
               referencia: ele.referencia,
               unidad: ele.unidad,
               sistema: ele.sistema,
               real: value,
               costo: ele.costo,
               totales: Number(value) * Number(ele.costo),
            };
            array.push(registro);
            tot2+=Number(value);
            tot3+=Number(value) * Number(ele.costo);
         } else {
            const registro = ele;
            tot2+=ele.real;
            tot3+=Number(ele.real) * Number(ele.costo);
            array.push(registro);
         };

      });
      setArticulos(array);
      setTotalReal(tot2);
      setGranTotal(tot3);
   };

   useEffect(() => {
      cargarExistencias(); 
   }, []);

   const handleKardex = async(e, registro) => {
      setRecord(registro);
      setModalKardex(true);
   };

   return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalKardex
           ? (<ModalKardex onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Inventario Fisico</h2>
           <table className="min-w-full leading-normal">
               <thead>
                  <tr>
                     <th>Detalles</th>
                     <th>Referencia</th>
                     <th>Grupo</th>
                     <th>Unidad</th>
                     <th className="text-right">Sistema</th>
                     <th className="text-center">Real</th>
                     <th className="text-right">Costo</th>
                     <th className="text-right">Totales</th>
                     <th>Accion</th>
                  </tr>
               </thead>
               <tbody>
                  {articulos.map(ele =>
                     <tr key={ele.id}>
                        <td>{ele.detalles}</td>
                        <td>{ele.referencia}</td>
                        <td>{ele.grupo}</td>
                        <td>{ele.unidad}</td>
                        <td className="text-right">{ele.sistema}</td>
                        <td><input className="text-right w-20 bg-yellow-200" 
                             type="number" 
                             onChange={(e)=>handleChange(e, ele.id)}
                             value={ele.real} /></td>
                        <td className="text-right">{ele.costo}</td>
                        <td className="text-right">{ele.totales}</td>
                        <th><button 
                            className="bg-blue-500 px-2 py-1 rounded-md"
                            onClick={(e)=>handleKardex(e, ele.id)}
                            >Kardex</button></th>
                     </tr>
                  )}
                  <tr>
                     <th>TOTALES</th>
                     <th></th><th></th><th></th>
                     <th className="text-right">{totalSistema}</th>
                     <th className="text-center">{totalReal}</th><th></th>
                     <th className="text-right">{granTotal}</th>

                  </tr>
               </tbody>
           </table>
           <button className="bg-blue-500 px-4 py-2 rounded-md"
               >Ajustar Inventario
           </button>
       </div>
   )
};

export default Inventory;