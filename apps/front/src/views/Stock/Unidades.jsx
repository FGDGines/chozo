import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalUnidades from "../../components/ModalUnidades";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Unidades() {
    const token = localStorage.getItem("token");
    const [unidades, setUnidades] = useState([]);
    const [nomunidad, setNomUnidad] = useState("");
    const [iniciales, setIniciales] = useState("");
    const [modalUnidades, setModalUnidades] = useState(false);
    const [record, setRecord] = useState(0);

    const handleChange = (e) => {
       const value = e.target.value;
       if(e.target.name == "nomunidad") setNomUnidad(value);
       if(e.target.name == "iniciales") setIniciales(value);
    };

    const closeModal = () => {
      setModalUnidades(false);
      cargarUnidades(); 
   };

   const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalUnidades(true);
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {uni_detalles: nomunidad, uni_abreviatura: iniciales};
        const result = await axios.post('api/unidades', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Unidad creada!");
        cargarUnidades();
    };

    const cargarUnidades = async() => {
       const result = await axios('api/unidades', {
          headers: {
            token: token,
          },
       });
       setUnidades(result.data);
       setNomUnidad("");
       setIniciales("");
    };

    useEffect(() => {
       cargarUnidades(); 
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalUnidades
           ? (<ModalUnidades onClose={closeModal} record={record}/>) : ("")}

           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Maestros de Unidades</h2>
           <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-[23px] font-bold">Nueva Unidad</h1>
           </div>
           
           <form>
           <div className="flex items-center justify-center mx-2 pb-2">
               <input type="text" 
                      name="nomunidad"
                      onChange={handleChange}
                      placeholder="Digite nombre Unidad"
                      value={nomunidad}
                      className=" mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-5 text-center"/>
               <input type="text" 
                      name="iniciales"
                      onChange={handleChange}
                      placeholder="Digite Iniciales"
                      value={iniciales}
                      className=" mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-5 text-center"/>   
                      </div>  
                      <div className="flex items-center justify-center mx-2 pb-5">                
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium" onClick={handleGrabar}>Agregar Unidad</button>
               </div> 
           </form>
           
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pt-10 ">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[530px]">
           <table className="min-w-full leading-normal">
              <thead>
                 <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalles</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Iniciales</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  </tr>
              </thead>
              <tbody>
              {unidades.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.uni_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.uni_abreviatura}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
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

export default Unidades;