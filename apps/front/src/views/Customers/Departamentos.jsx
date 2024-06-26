import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalDepartamentos from "../../components/ModalDepartamentos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Departamentos() {
    const token = localStorage.getItem("token");
    const [dptos, setDptos] = useState([]);
    const [paises, setPaises] = useState([]);
    const [objeto, setObjeto] = useState({nombre: "", codigo: "", idPais: 0});
    const [modalDptos, setModalDptos] = useState(false);
    const [record, setRecord] = useState(0);   

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
       console.log(property,value)
       setObjeto({...objeto,[property]: value});
    };

    const closeModal = () => {
      setModalDptos(false);
      cargarDptos(); 
   };

   const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalDptos(true);
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {
            dpt_nombre: objeto.nombre,
            dpt_codigo: objeto.codigo,
            pais_id: objeto.idPais,
        };
        console.log(datos);
        const result = await axios.post('api/departamentos', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Departamento creado!");
        cargarDptos();
    };

    const cargarPaises = async() => {
       const result = await axios('api/paises', {
          headers: {
            token: token,
          },
       });
       setPaises(result.data);
    };

    const cargarDptos = async() => {
        const result = await axios('api/departamentos', {
           headers: {
             token: token,
           },
        });
        setDptos(result.data);
        setObjeto({nombre: "", codigo: "", idPais: 0})
     };

    useEffect(() => {
       cargarPaises(); 
       cargarDptos();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
        {modalDptos
           ? (<ModalDepartamentos onClose={closeModal} record={record}/>) : ("")}         

           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Departamentos</h2>
           <table>
              <thead>
                 <tr><th>Id</th><th>Departamento</th><th>Codigo</th><th>Pais</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {dptos.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.dpt_nombre}</td>
                     <td>{ele.dpt_codigo}</td>
                     <td>{ele.paise.pai_nombre}</td>
                     <td><button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nuevo Departamento</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="nombre"
                      onChange={handleChange}
                      placeholder="Digite Departamento"
                      value={objeto.npais}/><br/>
               <input type="text" 
                      name="codigo"
                      onChange={handleChange}
                      placeholder="Digite Codigo"
                      value={objeto.codigo}/><br/>   
               <label>Pais</label>
               <select name="idPais" onChange={(e)=>handleChange(e)}>
                   <option value="0">Seleccione Pais</option>
                   {paises.map(elemen => 
                      <option value={elemen.id}>{elemen.pai_nombre}</option>
                   )}
               </select><br/>                                
               <button className="bg-red-200 px-2" onClick={handleGrabar}>Agregar Departamento</button>
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

export default Departamentos;