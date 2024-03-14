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
    <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Maestros de Usuarios</h2>
    <div className="pt-10 flex justify-center">
           <h1 className=" text-gray-800  rounded-[30px] px-5 text-2xl font-bold"> Nuevo Usuario</h1>
           </div>
           <div className="flex items-center justify-center ">
           <form>
        <div className="pb-2 flex justify-center">
         <input type="text" 
                name="usu_nombre"
                onChange={(e)=>handleChange(e, "usu_nombre")}
                placeholder="Digite nombre del Usuario"
                value={oform.usu_nombre}
                className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center w-[190px] "/>
         <input type="password" 
                name="usu_password"
                onChange={(e)=>handleChange(e, "usu_password")}
                placeholder="Digite password"
                value={oform.usu_password}
                className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center w-[190px] "/>  
         </div>
         <div className="mb-2 flex flex-row  justify-center gap-3 items-center">
         <select name="tercero_id" onChange={(e)=>handleChange(e, "tercero_id")} className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[290px]">
                <option value="0">Seleccione Tercero</option>
                {terceros.map(elemen => 
                   <option key={elemen.id} value={elemen.id}>{elemen.ter_tercero}</option>
                )}
         </select>
         </div>
         <div className="mb-2 flex flex-row  justify-center gap-3 items-center">
            <label htmlFor="usu_admin" className="block font-semibold mb-1">
                Administrador :
              </label>
              <select name="usu_admin"
                 value={oform.usu_admin}
                 onChange={(e) => handleChange(e, "usu_admin")}
                 className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[60px]"
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
            <label htmlFor="usu_admin" className="font-semibold">
                Activo:</label>
              <select name="usu_activo"
                 value={oform.usu_activo}
                 onChange={(e) => handleChange(e, "usu_activo")}
                 className="border-[0.5px] border-gray-800 text-gray-800 text-center p-[3px] rounded-xl font-bold w-[60px]"
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
         </div>                            
         <div className="flex justify-center pb-5">
         <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Usuario</button>
         </div> 
      
    </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pt-5 pb-16">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[350px]">
    <table className="min-w-full leading-normal">
       <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
            </tr>
       </thead>
       <tbody>
       {users.map(ele =>
           <tr key={ele.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.usu_nombre}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.tercero.ter_tercero}</td>
              <td>{ele.usu_activo==1 ? "Activo" : "Inactivo"}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               <button 
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={(e)=>handleEditar(e, ele.id)}
                  >Editar</button></td>
           </tr>
        )}
        </tbody>
    </table>
    </div>
    </div>
    
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