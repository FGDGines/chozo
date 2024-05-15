import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalKardex from "../../components/ModalKardex";
import ModalError from "../../components/ModalError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiLoader2Fill } from "react-icons/ri";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


function Inventory() {
   const token = localStorage.getItem("token");
   const [todos, setTodos] = useState([]);
   const [articulos, setArticulos] = useState([]);
   const [grupos, setGrupos] = useState([]);
   const [grupoSelected, setGrupoSelected] = useState({});
   const [totalSistema, setTotalSistema] = useState(0);
   const [totalReal, setTotalReal] = useState(0);
   const [granTotal, setGranTotal] = useState(0);
   const [modalKardex, setModalKardex] = useState(false);
   const [record, setRecord] = useState(0);
   const notify = () => toast.success("¡Ajuste Ejecutado!");
   const [showModalError, setShowModalError] = useState(false);
   const [messageError, setMessageError] = useState("");
   const doc = new jsPDF();

   const closeModal = () => {
     setModalKardex(false);
   };

   const infoModalError = {
      showModalError,
      setShowModalError,
      mensaje: messageError,
    };

   const cargarGrupos = async() => {
      const result = await axios('api/grupos', {
         headers: {
           token: token,
         },
      });
      setGrupos(result.data);
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
            grupoId: Number(ele.grupo_id),
            pventa: Number(ele.art_precioventa),
         };
         array.push(reg);
      });
      setTodos(array);
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
               grupoId: ele.grupoId,
               pventa: ele.pventa,
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
      setTodos(array);
      setTotalReal(tot2);
      setGranTotal(tot3);
   };

   useEffect(() => {
      cargarExistencias(); 
      cargarGrupos();
   }, []);

   const handleKardex = async(e, registro) => {
      setRecord(registro);
      setModalKardex(true);
   };

   const handleChangeGrupo = (e) => {
      e.preventDefault();
      const registro = Number(e.target.value);
      const array = todos.filter(ele=> ele.grupoId==registro);
      setGrupoSelected(registro);
      setArticulos(array);
   };

   const imprimir = () => {
      
      autoTable(doc, {
         html: "#my-table",
         bodyStyles: { fillColor: "#b5e4d4" },
         columnStyles: {
           0: { halign: "left" },
           1: { halign: "center" },
           4: { halign: "right" },
           5: { halign: "right" },
           6: { halign: "right" },
           7: { halign: "right"},

         },
         theme: "striped",
         StyleDef: {fontSize: 6},
       }),
       doc.save("articulos.pdf")
   };

   const handleAjustar = async(e) => {
      e.preventDefault();
      if(totalReal == totalSistema) {
         setMessageError("¡No hay diferencias que ajustar!");
         setShowModalError(true);
         infoModalError.mensaje = messageError;
         return;
      };
      const array = articulos.filter(ele => ele.sistema !== ele.real);
      const datos = {
         fecha : "2024-03-14",
         codUsuario : 4,
         items : array,
      };
      const result = await axios.post('api/existencias', datos, {
         headers: {
            token: token,
         },
      });
      notify(); 
      cargarExistencias();
   };



   return (
       <div className="mx-auto mt-10 max-w-[85%]">
           {modalKardex
           ? (<ModalKardex onClose={closeModal} record={record}/>) : ("")}
           {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}
           <div className="flex bg-customBlue p-2 rounded-[30px] justify-between">
              <h2 className="text-2xl text-white px-5">Inventario Fisico</h2>
              <select className="rounded-lg"
                 onChange={(e)=>handleChangeGrupo(e)}
              >
                 <option value="0">Seleccione Familia</option>
                 {grupos.map((grup) => (
                  <option key={grup.id} value={grup.id}>
                    {grup.gru_detalles}
                  </option>
                 ))}
              </select>
              <button className="text-l text-white bg-green-400 rounded-xl px-2 hover:bg-green-600"
                      onClick={()=>imprimir()}>Generar PDF</button>
           </div>
            {articulos.length==0 ? (
               <div className="text-gray-600 flex justify-center items-center w-full h-screen">
                  <div className="flex flex-col justify-center items-center">
                  <RiLoader2Fill className="text-[60px] mr-5 text-customBlue" />
                   Cargando...
                 </div>
              </div>
           ) : (
           <div> 
           <table className="min-w-full leading-normal" id="my-table">
               <thead>
                  <tr>
                     <th className="text-left text-xs">Detalles</th>
                     <th className="text-left text-xs">Familia</th>
                     <th className="text-left text-xs">Und</th>
                     <th className="text-right text-xs">Sistema</th>
                     <th className="text-center text-xs">Real</th>
                     <th className="text-right text-xs">Costo</th>
                     <th className="text-right text-xs">Totales</th>
                     <th className="text-right text-xs">Precio</th>
                     <th className="text-center text-xs">Accion</th>
                  </tr>
               </thead>
               <tbody>
                  {articulos.map(ele =>
                     <tr key={ele.id}>
                        <td className="text-xs">{ele.detalles}</td>
                        <td className="text-xs">{ele.grupo}</td>
                        <td className="text-xs">{ele.unidad}</td>
                        <td className="text-xs text-right">{ele.sistema}</td>
                        <td><input className="text-right w-20 bg-yellow-200 text-xs" 
                             type="number" 
                             onChange={(e)=>handleChange(e, ele.id)}
                             value={ele.real} /></td>
                        <td className="text-right text-xs">{ele.costo.toFixed(2)}{" "}€</td>
                        <td className="text-right w-20 text-xs">{ele.totales.toFixed(2)}{" "}€</td>
                        <td className="text-right text-xs">{ele.pventa.toFixed(2)}{" "}€</td>
                        <th><button 
                            className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-800"
                            onClick={(e)=>handleKardex(e, ele.id)}
                            >Kardex</button></th>
                     </tr>
                  )}
                  <tr>
                     <th>TOTALES</th>
                     <th></th><th></th><th></th>
                     <th className="text-right text-xs">{totalSistema}</th>
                     <th className="text-center text-xs">{totalReal}</th><th></th>
                     <th className="text-right text-xs">{granTotal.toFixed(2)} €</th>

                  </tr>
               </tbody>
           </table>
           <button className="bg-blue-500 px-4 py-2 rounded-md"
               onClick={(e)=>handleAjustar(e)}
               >Ajustar Inventario
           </button>
           </div>
           )}
           <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
       </div>
   )
};

export default Inventory;