import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalSublineas from "../../components/ModalSublineas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sublineas() {
    const token = localStorage.getItem("token");
    const [sublineas, setSublineas] = useState([]);
    const [puc, setPuc] = useState([]);
    const [record, setRecord] = useState(0);
    const [modalSublineas, setModalSublineas] = useState(false);
    const [objeto, setObjeto] = useState(
        {
            idLinea: 0,
            detalle: "",
            pucInv: 0,
            pucIng: 0,
            pucCos: 0,
        });
    const [lineas, setLineas] = useState([]);

    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [property]: value });
    };

    const handleCombos = (e) => {
        e.preventDefault();
        const property = e.target.name;
        const id = e.target.value;
        console.log(property,id)
        setObjeto({...objeto, [property]: id});
    };

    const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalSublineas(true);
    };

    const handleEliminar = async(e, registro) => {
      const result = await axios.delete(`api/sublineas/${registro}`, {
         headers: {
            token: token,
         },
      });
      cargarSublineas(); 
    };
  
    const closeModal = () => {
      setModalSublineas(false);
      cargarSublineas(); 
   };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {
            sub_detalles: objeto.detalle,
            linea_id: objeto.idLinea,
            pucinventario_id: objeto.pucInv,
            pucingresos_id: objeto.pucIng,
            puccostoventa_id: objeto.pucCos,
        };
        console.log(datos);
        const result = await axios.post('api/sublineas', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Sublinea creada!");
        cargarSublineas();
    };

    const cargarSublineas = async() => {
       const result = await axios('api/sublineas', {
          headers: {
            token: token,
          },
       });
       setSublineas(result.data);
       setObjeto({
         idLinea: 0,
         detalle: "",
         pucInv: 0,
         pucIng: 0,
         pucCos: 0,
       });
    };

    const cargarLineas = async() => {
        const result = await axios('api/lineas', {
           headers: {
             token: token,
           },
        });
        setLineas(result.data);
     };

     const cargarPuc = async() => {
        const result = await axios('api/puc', {
           headers: {
             token: token,
           },
        });
        const datos = result.data
        const cuentas = datos.filter((ele) => ele.puc_nivel == 5);
        setPuc(cuentas);
     };

    useEffect(() => {
       cargarSublineas(); 
       cargarLineas();
       cargarPuc();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalSublineas 
           ? (<ModalSublineas onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Maestro de Sublineas</h2>
           <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-2xl font-bold"> Nueva Sublinea</h1>
           </div>
           <div className="flex items-center justify-center ">
           <form>
               
               {/* <label className="bg-black text-white">Linea </label> */}
               <div className="pb-2 flex justify-center">
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Sublinea"
                      value={objeto.detalle}
                      className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center w-[190px] "/>
                   </div>
                   <div className="grid grid-cols-2 gap-1">
                   <div className="">
               <select name="idLinea" onChange={(e)=>handleCombos(e)} className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px]">
                   <option value="0">Seleccione Linea</option>
                   {lineas.map(elemen => 
                      <option value={elemen.id}>{elemen.lin_detalles}</option>
                   )}
               </select>
               </div>
               
                    
               {/* <label className="bg-black text-white">Cta Puc Inventario </label> */}
               <div className="pb-2">
               <select name="pucInv" onChange={(e)=>handleCombos(e)} className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px]">
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select>    
               </div> 
               {/* <label className="bg-black text-white">Cta Puc Ingresos </label> */}
               <div className="pb-2">
               <select name="pucIng" onChange={(e)=>handleCombos(e)} className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px] ">
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select>   
               </div>
               {/* <label className="bg-black text-white">Cta Puc Costo de venta </label> */}
               <div className="pb-2">
               <select name="pucCos" onChange={(e)=>handleCombos(e)} className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px]">
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select>  
               </div>
               </div>          
               <div className="flex justify-center pb-5">                         
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Subinea</button>
               </div> 
           </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto pb-16">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[280px]">
           <table className="min-w-full leading-normal">
              <thead>
                 <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalles</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Linea</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  </tr>
              </thead>
              <tbody>
              {sublineas.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.sub_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.linea.lin_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><button 
                         className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                         onClick={(e)=>handleEliminar(e, ele.id)}
                         >Eliminar</button></td>    
                  </tr>
               )}
               </tbody>
           </table>
           </div>
           </div>
           <ToastContainer
            position="top-right"
            autoClose={1000}
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

export default Sublineas;