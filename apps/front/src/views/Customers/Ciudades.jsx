import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Ciudades() {
    const token = localStorage.getItem("token");
    const [dptos, setDptos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [objeto, setObjeto] = useState({nombre: "", codigo: "", idDpto: 0});

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
       console.log(property,value)
       setObjeto({...objeto,[property]: value});
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {
            ciu_nombre: objeto.nombre,
            ciu_codigo: objeto.codigo,
            departamento_id: objeto.idDpto,
        };
        console.log(datos);
        const result = await axios.post('api/ciudades', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Ciudad creada!");
        cargarCiudades();
    };

    const cargarCiudades = async() => {
       const result = await axios('api/ciudades', {
          headers: {
            token: token,
          },
       });
       setCiudades(result.data);
       setObjeto({nombre: "", codigo: "", idDpto: 0})
    };

    const cargarDptos = async() => {
        const result = await axios('api/departamentos', {
           headers: {
             token: token,
           },
        });
        setDptos(result.data);
    };

    useEffect(() => {
       cargarCiudades(); 
       cargarDptos();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Ciudades</h2>
           <table>
              <thead>
                 <tr><th>Id</th><th>Ciudad</th><th>Codigo</th><th>Departamento</th></tr>
              </thead>
              <tbody>
              {ciudades.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.ciu_nombre}</td>
                     <td>{ele.ciu_codigo}</td>
                     <td>{ele.departamento.dpt_nombre}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="nombre"
                      onChange={handleChange}
                      placeholder="Digite Ciudad"
                      value={objeto.npais}/><br/>
               <input type="text" 
                      name="codigo"
                      onChange={handleChange}
                      placeholder="Digite Codigo"
                      value={objeto.codigo}/><br/>   
               <label>Pais</label>
               <select name="idDpto" onChange={(e)=>handleChange(e)}>
                   {dptos.map(elemen => 
                      <option value={elemen.id}>{elemen.dpt_nombre}</option>
                   )}
               </select><br/>                                
               <button className="bg-red-200 px-2" onClick={handleGrabar}>Agregar Ciudad</button>
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

export default Ciudades;