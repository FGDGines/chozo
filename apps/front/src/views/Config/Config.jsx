import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Config() {
  const token = localStorage.getItem("token");
  const [fuentes, setFuentes] = useState([]);
  const [fuente, setFuente] = useState({
    fue_detalles: "",
    fue_iniciales: "",
    fue_mantieneconsecutivo: 0,
  });

  const cargarFuentes = async() => {
    const result = await axios('api/fuentes', {
       headers: {
         token: token,
       },
    });
    setFuentes(result.data);
    setFuente({
      fue_detalles: "",
      fue_iniciales: "",
      fue_mantieneconsecutivo: 0,      
    })
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setFuente({...fuente,[property]: value});
  };

  useEffect(() => {
     cargarFuentes(); 
  }, []);

  const handleGrabar = async(e) => {
    e.preventDefault();
    const result = await axios.post('api/fuentes', fuente, {
       headers: {
          token: token,
       },
    });
    toast.success("¡Fuente creada!");
    cargarFuentes();
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
    <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Fuentes Contables</h2>
    <table>
       <thead>
          <tr><th>Id</th><th>Fuente</th><th>Iniciales</th></tr>
       </thead>
       <tbody>
       {fuentes.map(ele =>
           <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.fue_detalles}</td>
              <td>{ele.fue_iniciales}</td>
           </tr>
        )}
        </tbody>
    </table>
    <form>
        <hr/><br/>
        <input type="text" 
               name="fue_detalles"
               onChange={(e)=>handleChange(e, "fue_detalles")}
               placeholder="Digite Fuente"
               value={fuente.fue_detalles}/><br/>
        <input type="text" 
               name="fue_iniciales"
               onChange={(e)=>handleChange(e, "fue_iniciales")}
               placeholder="Digite Iniciales"
               value={fuente.fue_iniciales}/><br/>       
        <label>Mantiene Consecutivo Anual : </label>
              <select name="fue_mantieneconsecutivo"
                 value={fuente.fue_mantieneconsecutivo}
                 onChange={(e)=>handleChange(e, "fue_mantieneconsecutivo")}
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select><br/>
        <button  className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Fuente</button>
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
}

export default Config;
