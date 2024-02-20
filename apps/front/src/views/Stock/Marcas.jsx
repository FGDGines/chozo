import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Marcas() {
    const token = localStorage.getItem("token");
    const [marcas, setMarcas] = useState([]);
    const [nmarca, setNmarca] = useState("");

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
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Marcas</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Detalles</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {marcas.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.mar_detalles}</td>
                     <td><button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button></td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Marca</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Marca"
                      value={nmarca}/>
               <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Marca</button>
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

export default Marcas;