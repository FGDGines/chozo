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
    <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Maestros de Fuentes Contables</h2>
    {/* <div className="pt-10 flex justify-center">

    </div> */}
    <div className="flex items-center justify-center pt-10 pb-5">
    <form>
      <div className="pb-2 flex justify-center">
        <input type="text" 
               name="fue_detalles"
               onChange={(e)=>handleChange(e, "fue_detalles")}
               placeholder="Digite Fuente"
               value={fuente.fue_detalles}
               className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center w-[190px] "/>
        <input type="text" 
               name="fue_iniciales"
               onChange={(e)=>handleChange(e, "fue_iniciales")}
               placeholder="Digite Iniciales"
               value={fuente.fue_iniciales}
               className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center w-[190px] "/> 
                    </div>
        {/* <label>Mantiene Consecutivo Anual : </label> */}
             <div className="pb-2 flex justify-center">
              <select name="fue_mantieneconsecutivo"
                 value={fuente.fue_mantieneconsecutivo}
                 onChange={(e)=>handleChange(e, "fue_mantieneconsecutivo")}
                 className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px]"
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
              </div>
              <div className=" flex justify-center pb-5">
        <button  className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Fuente</button>
        </div>
    </form>
    </div>
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto pb-16">
      <div className="inline-block min-w-full shadow rounded-lg max-h-[320px]">
    <table className="min-w-full leading-normal">
       <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fuente</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Iniciales</th>
          </tr>
       </thead>
       <tbody>
       {fuentes.map(ele =>
           <tr key={ele.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.fue_detalles}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.fue_iniciales}</td>
           </tr>
        )}
        </tbody>
    </table>
    </div> </div>
    
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
