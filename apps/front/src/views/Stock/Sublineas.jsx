import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalSublineas from "../../components/ModalSublineas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sublineas() {
    const token = localStorage.getItem("token");
    const [sublineas, setSublineas] = useState([]);
    const [puc, setPuc] = useState([]);
    const [record, setRecord] = useState(0);
    const [modalSublineas, setModalSublineas] = useState(false);
    const [objeto, setObjeto] = useState(
        {
            idLinea: 0,
            detalle: "",
            pucInv: 0,
            pucIng: 0,
            pucCos: 0,
        });
    const [lineas, setLineas] = useState([]);

    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [property]: value });
    };

    const handleCombos = (e) => {
        e.preventDefault();
        const property = e.target.name;
        const id = e.target.value;
        console.log(property,id)
        setObjeto({...objeto, [property]: id});
    };

    const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalSublineas(true);
    };

    const handleEliminar = async(e, registro) => {
      const result = await axios.delete(`api/sublineas/${registro}`, {
         headers: {
            token: token,
         },
      });
      cargarSublineas(); 
    };
  
    const closeModal = () => {
      setModalSublineas(false);
      cargarSublineas(); 
   };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {
            sub_detalles: objeto.detalle,
            linea_id: objeto.idLinea,
            pucinventario_id: objeto.pucInv,
            pucingresos_id: objeto.pucIng,
            puccostoventa_id: objeto.pucCos,
        };
        console.log(datos);
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
       setObjeto({
         idLinea: 0,
         detalle: "",
         pucInv: 0,
         pucIng: 0,
         pucCos: 0,
       });
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
        const datos = result.data
        const cuentas = datos.filter((ele) => ele.puc_nivel == 5);
        setPuc(cuentas);
     };

    useEffect(() => {
       cargarSublineas(); 
       cargarLineas();
       cargarPuc();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           {modalSublineas 
           ? (<ModalSublineas onClose={closeModal} record={record}/>) : ("")}
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestro de Sublineas</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Detalles</th><th>Linea</th><th>Accion</th><th>Accion</th></tr>
              </thead>
              <tbody>
              {sublineas.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.sub_detalles}</td>
                     <td>{ele.linea.lin_detalles}</td>
                     <td><button 
                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                         onClick={(e)=>handleEditar(e, ele.id)}
                         >Editar</button></td>
                     <td><button 
                         className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                         onClick={(e)=>handleEliminar(e, ele.id)}
                         >Eliminar</button></td>    
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Sublinea</h1>
           <form>
               <hr/><br/>
               <label className="bg-black text-white">Linea </label>
               <select name="idLinea" onChange={(e)=>handleCombos(e)}>
                   <option value="0">Seleccione Linea</option>
                   {lineas.map(elemen => 
                      <option value={elemen.id}>{elemen.lin_detalles}</option>
                   )}
               </select><br/>
               <input type="text" 
                      name="detalle"
                      onChange={handleChange}
                      placeholder="Digite nombre Sublinea"
                      value={objeto.detalle}/>
               <br/>       
               <label className="bg-black text-white">Cta Puc Inventario </label>
               <select name="pucInv" onChange={(e)=>handleCombos(e)}>
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>       
               <label className="bg-black text-white">Cta Puc Ingresos </label>
               <select name="pucIng" onChange={(e)=>handleCombos(e)}>
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>    
               <label className="bg-black text-white">Cta Puc Costo de venta </label>
               <select name="pucCos" onChange={(e)=>handleCombos(e)}>
                   <option value="0">Seleccione Cuenta del PUC</option>
                   {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                   )}
               </select><br/>                                        
               <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Subinea</button>
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