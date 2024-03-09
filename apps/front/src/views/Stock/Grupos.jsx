import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalGrupos from "../../components/ModalGrupos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Grupos() {
    const token = localStorage.getItem("token");
    const [grupos, setGrupos] = useState([]);
    const [sublineas, setSublineas] = useState([]);
    const [record, setRecord] = useState(0);
    const [modalGrupos, setModalGrupos] = useState(false);    
    const [objeto, setObjeto] = useState({ngrupo: "", idSublinea: 0});

    const handleChange = (e) => {
       const property = e.target.name;
       const value = e.target.value;
       console.log(property,value)
       setObjeto({...objeto, [property]: value });
    };

    const closeModal = () => {
      setModalGrupos(false);
      cargarGrupos(); 
   };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {gru_detalles: objeto.ngrupo, sublinea_id: objeto.idSublinea};
        const result = await axios.post('api/grupos', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Grupo creado!");
        cargarGrupos();
    };

    const cargarSublineas = async() => {
        const result = await axios('api/sublineas', {
           headers: {
             token: token,
           },
        });
        setSublineas(result.data);
     };

     const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalGrupos(true);
    };

    const handleEliminar = async(e, registro) => {
      const result = await axios.delete(`api/grupos/${registro}`,  {
         headers: {
            token: token,
         },
      });   
      cargarGrupos();  
    };

    const cargarGrupos = async() => {
       const result = await axios('api/grupos', {
          headers: {
            token: token,
          },
       });
       setGrupos(result.data);
       setObjeto({ngrupo: "", idSublinea: 0});
    };

    useEffect(() => {
       cargarGrupos(); 
       cargarSublineas();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalGrupos
           ? (<ModalGrupos onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5 ">Maestros de Grupos</h2>
           <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-2xl font-bold"> Crear nuevo grupo</h1>
           </div>
           <div className="flex items-center justify-center pt-3">
           <form>
               <div className="flex items-center justify-between gap-2">
               <input type="text" 
                      name="ngrupo"
                      onChange={handleChange}
                      placeholder="Digite nombre Grupo"
                      value={objeto.ngrupo}
                      className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center"/>
               <select name="idSublinea" onChange={(e)=>handleChange(e)} className=" border-[0.5px] border-gray-800 text-gray-800 text-center p-[5px] rounded-xl font-bold ">
                   <option value="0">Sublinea</option>
                   {sublineas.map(elemen => 
                      <option value={elemen.id}>{elemen.sub_detalles}</option>
                   )}
               </select>      
               </div>
               <div className="flex justify-center pt-2 pb-5">
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium" onClick={handleGrabar}>Agregar</button>
               </div>
           </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pt-10 pb-16">
            <div className="inline-block min-w-full shadow rounded-lg md:max-h-[330px]">
           <table className="min-w-full leading-normal">
              <thead>
                 <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  </tr>
              </thead>
              <tbody>
              {grupos.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.gru_detalles}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
									<span class="relative">{ele.gru_activo===1 ? "Activo" : "Inactiva"}</span>
									</span></td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button 
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={(e)=>handleEditar(e, ele.id)}
                        >Editar</button>
                        </td>
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

export default Grupos;