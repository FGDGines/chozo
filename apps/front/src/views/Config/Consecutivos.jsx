import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Consecutivos() {
  const token = localStorage.getItem("token");
  const [consecu, setConsecu] = useState([]);
  const [fuentes, setFuentes] = useState([]);
  const [anual, setAnual] = useState(0);

 
  const cargarConsecu = async() => {
    const hoy = Date();
    const fecha = new Date(hoy);
    const anu = fecha.getFullYear();
    setAnual(anu);
    const result = await axios(`api/consecutivos/anual/${anu}`, {
       headers: {
         token: token,
       },
    });
    setConsecu(result.data);
   };

   const cargarFuentes = async() => {
    const result = await axios('api/fuentes', {
       headers: {
         token: token,
       },
    });
    setFuentes(result.data);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    //setFuente({...fuente,[property]: value});
  };

  const handleCambioAnual = async(e) => {
     e.preventDefault;
     const value = e.target.value;
     setAnual(value);
     const result = await axios(`api/consecutivos/anual/${value}`, {
        headers: {
          token: token,
        },
     });
     const datos = result.data;
     setConsecu(datos);
  };

  useEffect(() => {
     cargarFuentes(); 
     cargarConsecu();
  }, []);

  const handleGrabar = async(e) => {
    e.preventDefault();
    if(consecu.length == 0) {
        //generacion de consecutivos del año
        const datos = {anual: anual};
        const result = await axios.post('api/consecutivos/bulk', datos, {
           headers: {
              token: token,
           },
        });
         setConsecu(result);
         toast.success("¡Consecutivos Actualizados!");
    };
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
    <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Consecutivos Contables</h2>
    <label>Año : </label>
    <input type="number" name="anual" value={anual} onChange={(e)=>handleCambioAnual(e)}/>
    <table>
       <thead>
          <tr><th>Id</th><th>Fuente</th><th>Iniciales</th><th>Consecutivo</th></tr>
       </thead>
       <tbody>
       {consecu.map(ele =>
           <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.fue_detalles}</td>
              <td>{ele.fue_iniciales}</td>
              <td>{ele.conse_ultimograbado}</td>
           </tr>
        )}
        </tbody>
    </table>
    <form>
        <button  className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Actualizar</button>
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

export default Consecutivos;
