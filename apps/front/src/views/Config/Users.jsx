import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalUsuarios from "../../components/ModalUsuarios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
   const token = localStorage.getItem("token");
   const [users, setUsers] = useState([]);
   const [terceros, setTerceros] = useState([]);
   const [modalUsuarios, setModalUsuarios] = useState(false);
   const [record, setRecord] = useState(0);

   const notify = () => toast.success("¡Usuario Creado!");
   const notifyError = () => toast.error("¡Faltan datos por completar!");
   const [oform, setOform] = useState({
       usu_nombre: "",
       usu_password: "",
       usu_admin: 0,
       usu_activo: 1,
       tercero_id: 0,
    });

   const getUsers = async() => {
      const result = await axios('api/usuarios', {
        headers: {
          token: token,
        },
     });
     setUsers(result.data);
   };

   const getTerceros = async() => {
      const result = await axios('api/terceros', {
        headers: {
          token: token,
        },
     });
     setTerceros(result.data);
   };

   const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalUsuarios(true);
  };

  const closeModal = () => {
    setModalUsuarios(false);
    getUsers(); 
 };

   const handleChange = (e, info) => {
      const value = e.target.value;
      setOform({...oform,[info]: value});
   };

   const handleGrabar = async() => {
      if(oform.usu_nombre.length<3) {
        notifyError();
        return;
      };
      if(oform.usu_password.length<4) {
        notifyError();
        return;
      };  
      if(oform.tercero_id==0) {
        notifyError();
        return;
      };  
      const result = await axios.post('api/usuarios', oform, {
        headers: {
          token: token,
        },
      });  
      notify();  
      setOform({
        usu_nombre: "",
        usu_password: "",
        usu_admin: 0,
        usu_activo: 1,
        tercero_id: 0,    
      });
      getUsers(); 
   };

   useEffect(() => {
      getUsers(); 
      getTerceros();
   }, []);

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
    {modalUsuarios
    ? (<ModalUsuarios onClose={closeModal} record={record}/>) : ("")}
    <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Usuarios</h2>
    <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
       <thead>
          <tr><th>Id</th><th>Usuario</th><th>Nombre</th><th>Estado</th><th>Accion</th></tr>
       </thead>
       <tbody>
       {users.map(ele =>
           <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.usu_nombre}</td>
              <td>{ele.tercero.ter_tercero}</td>
              <td>{ele.usu_activo==1 ? "Activo" : "Inactivo"}</td>
              <td><button 
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={(e)=>handleEditar(e, ele.id)}
                  >Editar</button></td>
           </tr>
        )}
        </tbody>
    </table>
    <h1 className="bg-gray-800 text-white">Nuevo Usuario</h1>
    <form>
        <hr/><br/>
         <input type="text" 
                name="usu_nombre"
                onChange={(e)=>handleChange(e, "usu_nombre")}
                placeholder="Digite nombre del Usuario"
                value={oform.usu_nombre}/><br/>
         <input type="password" 
                name="usu_password"
                onChange={(e)=>handleChange(e, "usu_password")}
                placeholder="Digite password"
                value={oform.usu_password}/><br/>  
         <select name="tercero_id" onChange={(e)=>handleChange(e, "tercero_id")}>
                <option value="0">Seleccione Tercero</option>
                {terceros.map(elemen => 
                   <option key={elemen.id} value={elemen.id}>{elemen.ter_tercero}</option>
                )}
         </select>
         <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label htmlFor="usu_admin" className="block font-semibold mb-1">
                Administrador :
              </label>
              <select name="usu_admin"
                 value={oform.usu_admin}
                 onChange={(e) => handleChange(e, "usu_admin")}
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
         </div>    
         <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label htmlFor="usu_admin" className="block font-semibold mb-1">
                Activo :
              </label>
              <select name="usu_activo"
                 value={oform.usu_activo}
                 onChange={(e) => handleChange(e, "usu_activo")}
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
         </div>                               
         <button className="bg-blue-800 text-white text-center p-2 rounded-md mt-2" onClick={handleGrabar}>Agregar Usuario</button>
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

export default Users;