import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalLineas from "../../components/ModalLineas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Lineas() {
    const token = localStorage.getItem("token");
    const [lineas, setLineas] = useState([]);
    const [nlinea, setNlinea] = useState("");
    const [record, setRecord] = useState(0);
    const [modalLineas, setmodalLineas] = useState(false);

    const handleChange = (e) => {
       const value = e.target.value;
       setNlinea(value);
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {lin_detalles: nlinea};
        const result = await axios.post('api/lineas', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Linea creada!");
        cargarLineas();
    };

    const cargarLineas = async() => {
       const result = await axios('api/lineas', {
          headers: {
            token: token,
          },
       });
       setLineas(result.data);
       setNlinea("");
    };

    const handleEditar = async(e, registro) => {
      setRecord(registro);
      setmodalLineas(true);
    };

   const handleEliminar = async(e, registro) => {
      const result = await axios.delete(`api/lineas/${registro}`, {
         headers: {
           token: token,
         },
      }); 
      cargarLineas();    
    };

    const closeModal = () => {
       setmodalLineas(false);
       cargarLineas(); 
    };

    useEffect(() => {
       cargarLineas(); 
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalLineas 
           ? (<ModalLineas onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Maestros de Lineas</h2>
           <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-[23px] font-bold"> Crear nueva linea</h1>
           </div>
           <div className="flex items-center justify-center mx-2 pb-5 ">
           <form>
               <div>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Linea"
                      value={nlinea}
                      className=" mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-5 text-center"/>
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium" onClick={handleGrabar}>Agregar Linea</button>
               </div>
           </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto ">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[430px] ">
           <table className="min-w-full leading-normal">
              <thead>
                 <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalles</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  </tr>
              </thead>
              <tbody>
              {lineas.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.lin_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
									<span class="relative">{ele.lin_activa===1 ? "Activa" : "Inactiva"}</span>
									</span></td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button 
                          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={(e)=>handleEditar(e, ele.id)}
                          >Editar</button></td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                     <button 
                          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={(e)=>handleEliminar(e, ele.id)}
                          >Eliminar</button>
                          </td>                          
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

export default Lineas;