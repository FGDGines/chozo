import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sublineas() {
    const token = localStorage.getItem("token");
    const [sublineas, setSublineas] = useState([]);
    const [puc, setPuc] = useState([]);
    const [objeto, setObjeto] = useState(
        {
            idLinea: 0,
            nomsublinea: "",
            pucInv: 0,
            pucIng: 0,
            pucCos: 0,
        });
    const [lineas, setLineas] = useState([]);

    const handleChange = (e) => {
       const value = e.target.value;
       //setObjeto({...,objeto.nomsublinea=value});
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        return
        const result = await axios.post('api/sublineas', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Sublinea creada!");
        cargarSublineas();
    };

    const cargarSublineas = async() => {
       const result = await axios('api/sublineas', {
          headers: {
            token: token,
          },
       });
       setSublineas(result.data);
    };

    const cargarLineas = async() => {
        const result = await axios('api/lineas', {
           headers: {
             token: token,
           },
        });
        setLineas(result.data);
     };

     const cargarPuc = async() => {
        const result = await axios('api/puc', {
           headers: {
             token: token,
           },
        });
        setPuc(result.data);
     };

    useEffect(() => {
       cargarSublineas(); 
       cargarLineas();
       cargarPuc();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestro de Sublineas</h2>
           <table>
              <thead>
                 <tr><th>Id</th><th>Detalles</th><th>Linea</th></tr>
              </thead>
              <tbody>
              {sublineas.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.sub_detalles}</td>
                     <td>{ele.linea.lin_detalles}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <form>
               <hr/><br/>
               <label>Linea </label>
               <select name="idlinea">
                   {lineas.map(elemen => 
                      <option value={elemen.id}>{elemen.lin_detalles}</option>
                   )}
               </select><br/>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Sublinea"
                      value={objeto.nomsublinea}/>
               <br/>       
               <label>Cta Puc Inventario </label>
               <select name="pucIdInv">
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>       
               <label>Cta Puc Ingresos </label>
               <select name="pucIdIng">
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>    
               <label>Cta Puc Costo de venta </label>
               <select name="pucIdCos">
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>                                        
               <button className="bg-red-200 px-2" onClick={handleGrabar}>Agregar Subinea</button>
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

export default Sublineas;