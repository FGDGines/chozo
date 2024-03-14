import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalSublineas({
    onClose,
    record,
   }) {
   const token = localStorage.getItem("token");
   const [puc, setPuc] = useState([]);
   const [oform, setOform] = useState(
    { id: 0,
      sub_detalles: null,
      sub_activa: 0,
      linea_id: 0,
      pucinventario_id: 0,
      pucingresos_id: 0,
      puccostoventa_id: 0,
      linea: "",
      pucIngresos: null,
      pucInventa: null,
      pucCostov: null,
      ctaInventa: null,
      ctaIngresos: null,
      ctaCostov: null,
    });
   const [isActivo, setIsActivo] = useState(false);
   const [lineas, setLineas] = useState([]);

   const handleChange = (e, property) => {
      const value = e.target.value;
      if(property == "sub_activa") {
        setOform({...oform, sub_activa: isActivo ? 0 : 1}) 
      } else {
         setOform({...oform, [property]: value})
      };
   };

   const getPuc = async() => {
    const response = await axios('api/puc', {
      headers: {
        token: token,
      },
    });
    const datos = response.data;
    const xdatos = datos.filter(ele => ele.puc_nivel==5);
    setPuc(xdatos);
   };

   const cargarLineas = async() => {
    const result = await axios('api/lineas', {
       headers: {
         token: token,
       },
    });
    setLineas(result.data);
 };

   const getSublinea = async() => {
      const response = await axios(`api/sublineas/${record}`, {
        headers: {
          token: token,
        },
      });
      const xreg = response.data;
      console.log(xreg)
      setOform(
        { id: xreg.id,
          sub_detalles: xreg.sub_detalles,
          sub_activa: xreg.sub_activa,
          linea_id: xreg.linea_id,
          pucinventario_id: xreg.pucinventario_id,
          pucingresos_id: xreg.pucingresos_id,
          puccostoventa_id: xreg.puccostoventa_id,
          lin_detalles: xreg.lin_detalles,
          pucInventa: xreg.pucInventa,
          ctaInventa: xreg.ctaInventa,
          pucIngresos: xreg.pucIngresos,
          ctaIngresos: xreg.ctaIngresos,
          pucCostov: xreg.pucCostov,
          ctaCostov: xreg.ctaCostov,
        });
      setIsActivo(xreg.sub_activa==1 ?true : false);
   };

   const handleGrabar = async() => {
      await axios.put(`api/sublineas/${record}`, oform, {
        headers: {
            token: token,
          },
      });
      onClose();
   };

   useEffect(() => {
      getSublinea();
      cargarLineas();
      getPuc();
   }, []);

 
   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border-t-4 border-customBlue">
        <h2 className="text-2xl font-bold text-center text-black mb-4 px-4">Modificar Sublineas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
         <div className=" gap-4 items-center">
        <label className="block text-black font-bold pb-2 pt-2">Sublinea : </label>
        <input type="text" name="sub_detalles"
               className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
               value={oform.sub_detalles} 
               onChange={(e)=>handleChange(e, "sub_detalles")}/>
         </div>
        <div className=" gap-4 items-center"> 
           <label className="block text-black font-bold pb-2 pt-2">Linea : </label>
           <select name="linea_ids" 
                   className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring" 
                   onChange={(e)=>handleChange(e, "linea_id")}
                   value={oform.linea_id}>
              {lineas.map(ele =>
                 <option value={ele.id}>{ele.lin_detalles}</option>
              )}
           </select>
        </div>        
        <div className="  gap-4 items-center"> 
           <label className="block text-black font-bold pb-2 pt-2">Puc Inventario : </label>
           <select name="pucInventa" 
                   className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                   onChange={(e)=>handleChange(e, "pucinventario_id")}
                   value={oform.pucinventario_id}>
              {puc.map(ele =>
                 <option value={ele.id}>{ele.puc_codigo} - {ele.puc_cuenta}</option>
              )}
           </select>
        </div>
        <div className="  gap-4 items-center"> 
           <label className="block text-black font-bold pb-2 pt-2">Puc Ingresos : </label>
           <select name="pucIngresos" 
                   className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring" 
                   onChange={(e)=>handleChange(e, "pucingresos_id")}
                   value={oform.pucingresos_id}>
              {puc.map(ele =>
                 <option value={ele.id}>{ele.puc_codigo} - {ele.puc_cuenta}</option>
              )}
           </select>
        </div>
        <div className=" gap-4 items-center"> 
           <label className="block text-black font-bold pb-2 pt-2">Puc Costoventa : </label>
           <select name="pucCostov"
                   className="block w-full px-4 py-2 mb-5 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring" 
                   onChange={(e)=>handleChange(e, "puccostoventa_id")}
                   value={oform.puccostoventa_id}>
              {puc.map(ele =>
                 <option value={ele.id}>{ele.puc_codigo} - {ele.puc_cuenta}</option>
              )}
           </select>
        </div>
        </div>
        <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 justify-center">
        <div className="flex flex-row items-center gap-2 pt-5">
        <label className="block text-black font-bold">Activo:</label>
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleChange(e, "sub_activa");
            }}
          />
          </div>
        <div className="flex flex-row items-center mt-4">
           <button className="bg-red-500 px-4 py-2 rounded-md mx-2 text-white"
                  onClick={() => {
                      onClose();
                  }}>Abandonar
           </button>
           <button className="bg-blue-500 px-4 py-2 rounded-md mx-2 text-white"
                  onClick={() => {
                      handleGrabar();
                  }}>Actualizar
           </button>
        </div>
        </div>
    </div>
    </div>    
   )
};

export default ModalSublineas;