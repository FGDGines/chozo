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

           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Unidades</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Detalles</th><th>Iniciales</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {unidades.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.uni_detalles}</td>
                     <td>{ele.uni_abreviatura}</td>
                     <td><button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Unidad</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="nomunidad"
                      onChange={handleChange}
                      placeholder="Digite nombre Unidad"
                      value={nomunidad}/><br/>
               <input type="text" 
                      name="iniciales"
                      onChange={handleChange}
                      placeholder="Digite Iniciales"
                      value={iniciales}/><br/>                      
               <button className="bg-blue-800 text-white text-center mt-2 p-2 rounded-md" onClick={handleGrabar}>Agregar Unidad</button>
           </form>
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