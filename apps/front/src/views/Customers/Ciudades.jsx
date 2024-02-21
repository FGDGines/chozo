import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalCiudades from "../../components/ModalCiudades";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Ciudades() {
    const token = localStorage.getItem("token");
    const [dptos, setDptos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [objeto, setObjeto] = useState({nombre: "", codigo: "", idDpto: 0});
    const [modalCiudades, setModalCiudades] = useState(false);
    const [record, setRecord] = useState(0);    

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
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

    const closeModal = () => {
      setModalCiudades(false);
      cargarCiudades(); 
   };

   const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalCiudades(true);
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
        {modalCiudades
           ? (<ModalCiudades onClose={closeModal} record={record}/>) : ("")}                  
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Ciudades</h2>
           <table>
              <thead>
                 <tr><th>Id</th><th>Ciudad</th><th>Codigo</th><th>Departamento</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {ciudades.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.ciu_nombre}</td>
                     <td>{ele.ciu_codigo}</td>
                     <td>{ele.departamento.dpt_nombre}</td>
                     <td><button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Ciudad</h1>
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
                   <option value="0">Seleccione Departamento</option>
                   {dptos.map(elemen => 
                      <option value={elemen.id}>{elemen.dpt_nombre}</option>
                   )}
               </select><br/>                                
               <button  className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Ciudad</button>
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