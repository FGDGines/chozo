import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalMarcas from "../../components/ModalMarcas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Marcas() {
    const token = localStorage.getItem("token");
    const [marcas, setMarcas] = useState([]);
    const [nmarca, setNmarca] = useState("");
    const [modalMarcas, setModalMarcas] = useState(false);
    const [record, setRecord] = useState(0);

    const handleChange = (e) => {
       const value = e.target.value;
       setNmarca(value);
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {mar_detalles: nmarca};
        const result = await axios.post('api/marcas', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Marca creada!");
        cargarMarcas();
    };

    const closeModal = () => {
      setModalMarcas(false);
      cargarMarcas(); 
   };

   const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalMarcas(true);
    };

   const handleEliminar = async(e, registro) => {
      const result = await axios.delete(`api/marcas/${registro}`, {
         headers: {
           token: token,
         },
      });
      cargarMarcas(); 
    };

    const cargarMarcas = async() => {
       const result = await axios('api/marcas', {
          headers: {
            token: token,
          },
       });
       setMarcas(result.data);
       setNmarca("");
    };

    useEffect(() => {
       cargarMarcas(); 
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalMarcas
           ? (<ModalMarcas onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5 ">Maestros de Marcas</h2>
           <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-[23px] font-bold"> Nueva Marca</h1>
           </div>
           <div className="flex items-center justify-center">
           <form>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Marca"
                      value={nmarca}
                      className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-5 text-center"/>
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium " onClick={handleGrabar}>Agregar Marca</button>
           </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pb-10">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
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
              {marcas.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.mar_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
									<span class="relative">{ele.mar_activa===1 ? "Activa" : "Inactiva"}</span>
									</span></td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><button 
                         className="px-4 py-1 bg-customBlue text-white rounded  "
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

export default Marcas;