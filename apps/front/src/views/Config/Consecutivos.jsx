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
      const datos = {anual: anual, items: consecu};
      const result = await axios.post('api/consecutivos/updateAnual', datos, {
           headers: {
              token: token,
           },
      });
      toast.success("¡Consecutivos Actualizados!");
   };
  

  const handleCambiar = async(e, reg) => {
     e.preventDefault();
     const idR = Number(reg);
     const value = Number(e.target.value);
     const array = [];
     consecu.forEach(ele => {
       const newreg = {
          id: ele.id,
          fue_detalles: ele.fue_detalles,
          fue_iniciales: ele.fue_iniciales,
          conse_ultimograbado: ele.id==reg ? value : ele.conse_ultimograbado,
       };
       array.push(newreg);
     });
     setConsecu(array);
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
    <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Consecutivos Contables</h2>
    <div className="pt-8 pb-5 flex items-center justify-center mx-2 gap-3">
    <label className="tracking-wide text-grey text-lg font-bold ">Año: </label>
    <input 
    type="number" 
    name="anual" 
    value={anual} 
    onChange={(e)=>handleCambioAnual(e)}
    className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl text-center w-[190px] "/>

<form>
    <button  className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Actualizar</button>
    </form>
</div>
<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto  pb-16">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[450px]">
    <table className="min-w-full leading-normal">
       <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fuente</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Iniciales</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Consecutivo</th>
          </tr>
       </thead>
       <tbody>
       {consecu.map(ele =>
           <tr key={ele.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.fue_detalles}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.fue_iniciales}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="number" 
                         value={ele.conse_ultimograbado} 
                         className="w-20"
                         onChange={(e)=>handleCambiar(e, ele.id)}/>
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
}

export default Consecutivos;
