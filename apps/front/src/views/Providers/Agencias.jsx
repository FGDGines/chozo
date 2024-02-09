import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Agencias() {
    const token = localStorage.getItem("token");
    const [agencias, setAgencias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [tipodoc, setTipodoc] = useState([]);
    const [objeto, setObjeto] = useState(
        {
            razon: "",
            documento: "",
            idTipodoc: 0,
            idCiudad: 0,
            direccion: "",
            telefono: "",
            celular: "",
            email: "",
        });

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
       console.log(property,value)
       setObjeto({...objeto,[property]: value});
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {
            ter_documento: objeto.documento,
            ter_tercero: objeto.razon,
            ter_apellidos: "",
            ter_nombres: "",
            ter_direccion: objeto.direccion,
            ter_telefono: objeto.telefono,
            ter_celular: objeto.celular,
            ter_email: objeto.email,
            ciudad_id: objeto.idCiudad,
            tipodocumento_id: objeto.idTipodoc,
            tipotercero_id: 1,
        };
        console.log(datos);
        const result = await axios.post('api/agencias', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Agencia creada!");
        cargarAgencias();
    };

    const cargarCiudades = async() => {
       const result = await axios('api/ciudades', {
          headers: {
            token: token,
          },
       });
       setCiudades(result.data);
    };

    const cargarAgencias = async() => {
        const result = await axios('api/agencias', {
           headers: {
             token: token,
           },
        });
        setAgencias(result.data);
        setObjeto({
            razon: "",
            documento: "",
            idTipodoc: 0,
            idCiudad: 0,
            direccion: "",
            telefono: "",
            celular: "",
            email: "",            
        })
    };

    const cargarTipodoc = async() => {
        const result = await axios('api/tipodocumentos', {
           headers: {
             token: token,
           },
        });
        setTipodoc(result.data);
    };

    useEffect(() => {
       cargarCiudades(); 
       cargarAgencias();
       cargarTipodoc();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Agencias</h2>
           <table className="border-collapse border border-slate-400">
              <thead>
                 <tr><th>Id</th><th>Agencia</th><th>Nit</th><th>Celular</th><th>Email</th></tr>
              </thead>
              <tbody>
              {agencias.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.tercero.ter_tercero}</td>
                     <td>{ele.tercero.ter_documento}</td>
                     <td>{ele.tercero.ter_celular}</td>
                     <td>{ele.tercero.ter_email}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <hr/>

           <form>
           <table>
               <tr>
                   <td>Razon Social</td>
                   <td>
                   <input type="text" 
                      name="razon"
                      onChange={handleChange}
                      value={objeto.razon}/><br/>
                   </td>
               </tr>
               <tr>
                   <td>Documento</td>
                   <td>
                   <input type="text" 
                      name="documento"
                      onChange={handleChange}
                      value={objeto.documento}/><br/>                    
                   </td>
               </tr>
               <tr>
                   <td>Tipo Documento</td>
                   <td><select name="idTipodoc" onChange={(e)=>handleChange(e)}>
                   {tipodoc.map(elemen => 
                         <option value={elemen.id}>{elemen.tdoc_detalles}</option>
                      )}                    
                       </select></td>
               </tr>
               <tr>
                   <td>Ciudad</td>
                   <td><select name="idCiudad" onChange={(e)=>handleChange(e)}>
                      {ciudades.map(elemen => 
                         <option value={elemen.id}>{elemen.ciu_nombre}  -  {elemen.departamento.dpt_nombre}</option>
                      )}
                    </select></td>
               </tr>
               <tr>
                   <td>Direccion</td>
                   <td>
                   <input type="text" 
                      name="direccion"
                      onChange={handleChange}
                      value={objeto.direccion}/><br/>                    
                   </td>                   
               </tr>
               <tr>
                   <td>Telefono</td>
                   <td>
                   <input type="text" 
                      name="telefono"
                      onChange={handleChange}
                      value={objeto.telefono}/><br/>                    
                   </td>                   
               </tr>   
               <tr>
                   <td>Celular</td>
                   <td>
                   <input type="text" 
                      name="celular"
                      onChange={handleChange}
                      value={objeto.celular}/><br/>                    
                   </td>                   
               </tr>   
               <tr>
                   <td>Email</td>
                   <td>
                   <input type="text" 
                      name="email"
                      onChange={handleChange}
                      value={objeto.email}/><br/>                    
                   </td>                   
               </tr>                                       
               <tr>
                   <td colSpan="2">
                   <button className="bg-red-200 px-2" onClick={handleGrabar}>Agregar Agencia</button>
                   </td>
               </tr>   
           </table>     
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

export default Agencias;