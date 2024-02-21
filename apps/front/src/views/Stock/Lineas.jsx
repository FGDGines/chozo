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
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Lineas</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Detalles</th><th>Estado</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {lineas.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.lin_detalles}</td>
                     <td>{ele.lin_activa==1 ? "Activa" : "Inactiva"}</td>
                     <td><button 
                          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={(e)=>handleEditar(e, ele.id)}
                          >Editar</button></td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Linea</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Linea"
                      value={nlinea}/>
               <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Linea</button>
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

export default Lineas;