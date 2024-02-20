import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Treasury() {
  const token = localStorage.getItem("token");
  const [cajas, setCajas] = useState([]);
  const [users, setUsers] = useState([]);
  const [puc, setPuc] = useState([]);
  const [caja, setCaja] = useState({
     caj_detalles: "",
     caj_activa: 1,
     usuario_id: 0,
     puc_id: 0,
  });

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

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setCaja({...caja, [property]: value});
 };

  const cargarCajas = async() => {
    const result = await axios('api/cajas', {
      headers: {
        token: token,
      },
    });
    const datos = result.data
    setCajas(datos);    
  };

  const cargarUsuarios = async() => {
    const result = await axios('api/usuarios', {
      headers: {
        token: token,
      },
    });
    const datos = result.data
    setUsers(datos);    
  };

  const handleGrabar = async(e) => {
    e.preventDefault();
    const result = await axios.post('api/cajas', caja, {
       headers: {
          token: token,
       },
    });
    toast.success("¡Caja creada!");
    cargarCajas();
    setCaja({
      caj_detalles: "",
      caj_activa: 1,
      usuario_id: 0,
      puc_id: 0,      
    })
  };

  useEffect(() => {
     cargarPuc();
     cargarUsuarios();
     cargarCajas();
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
    <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Cajas</h2>
    <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
       <thead>
          <tr><th>Id</th><th>Detalles</th><th>Usuario</th><th>Accion</th></tr>
       </thead>
       <tbody>
       {cajas.map(ele =>
           <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.caj_detalles}</td>
              <td>{ele.usuario.usu_nombre}</td>
              <td><button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button></td>
           </tr>
        )}
        </tbody>
    </table>
    <h1 className="bg-gray-800 text-white">Nuevo Usuario</h1>
    <form>
        <hr/><br/>
        <input type="text" 
               name="caj_detalles"
               onChange={(e)=>handleChange(e, "caj_detalles")}
               placeholder="Digite nombre caja"
               value={caja.caj_detalles}/><br/>
         <label>Usuario</label>    
         <select name="usuario_id"
               value={caja.usuario_id}
               onChange={(e)=>handleChange(e, "usuario_id")}
         >
             <option value="0">Seleccione</option>
             {users.map(ele => 
               <option value={ele.id}>{ele.tercero.ter_razon}  -  {ele.usu_nombre}</option>
             )}
         </select><br/>                               
         <label>Cuenta Puc</label>    
         <select name="puc_id"
               value={caja.puc_id}
               onChange={(e)=>handleChange(e, "puc_id")}
         >
             <option value="0">Seleccione</option>
             {puc.map(ele => 
               <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
             )}
         </select><br/>                                                      
        <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Caja</button>
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

export default Treasury
