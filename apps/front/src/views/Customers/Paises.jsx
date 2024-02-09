import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Paises() {
    const token = localStorage.getItem("token");
    const [paises, setPaises] = useState([]);
    const [objeto, setObjeto] = useState({npais: "", codigo: ""});

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
       setObjeto({...objeto,[property]: value});
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {pai_nombre: objeto.npais, pai_codigo: objeto.codigo};
        const result = await axios.post('api/paises', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Pais creado!");
        cargarPaises();
    };

    const cargarPaises = async() => {
       const result = await axios('api/paises', {
          headers: {
            token: token,
          },
       });
       setPaises(result.data);
       setObjeto({npais:"",codigo:""});
    };

    useEffect(() => {
       cargarPaises(); 
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Paises</h2>
           <table>
              <thead>
                 <tr><th>Id</th><th>Pais</th><th>Codigo</th></tr>
              </thead>
              <tbody>
              {paises.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.pai_nombre}</td>
                     <td>{ele.pai_codigo}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="npais"
                      onChange={handleChange}
                      placeholder="Digite nombre Pais"
                      value={objeto.npais}/><br/>
               <input type="text" 
                      name="codigo"
                      onChange={handleChange}
                      placeholder="Digite Codigo"
                      value={objeto.codigo}/><br/>                      
               <button className="bg-red-200 px-2" onClick={handleGrabar}>Agregar Pais</button>
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

export default Paises;