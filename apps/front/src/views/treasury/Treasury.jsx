import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ModalCajas from "../../components/ModalCajas";
import "react-toastify/dist/ReactToastify.css";

function Treasury() {
  const token = localStorage.getItem("token");
  const [cajas, setCajas] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalCajas, setModalCajas] = useState(false);
  const [record, setRecord] = useState(0);
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

  const closeModal = () => {
    setModalCajas(false);
    cargarCajas(); 
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

  const handleEditar = async(e, registro) => {
    setRecord(registro);
    setModalCajas(true);
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
    {modalCajas
           ? (<ModalCajas onClose={closeModal} record={record}/>) : ("")}      
    <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5 ">Maestros de Cajas</h2>
    <div className="pt-16 flex justify-center">
    <h1 className="text-gray-800  rounded-[30px] px-5 text-2xl font-bold">Nueva Caja</h1>
    </div>
    <div className="flex items-center justify-center pt-3">
    <form>
      <div className="flex items-center justify-between gap-2">
        <input type="text" 
               name="caj_detalles"
               onChange={(e)=>handleChange(e, "caj_detalles")}
               placeholder="Digite nombre caja"
               value={caja.caj_detalles}
               className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center"/>
         {/* <label>Usuario</label>     */}
         <select name="usuario_id"
               value={caja.usuario_id}
               onChange={(e)=>handleChange(e, "usuario_id")}
               className=" border-[0.5px] border-gray-800 text-gray-800 text-center p-[5px] rounded-xl font-bold w-[290px]"
         >
             <option value="0">Seleccione Usuario</option>
             {users.map(ele => 
               <option value={ele.id}>{ele.tercero.ter_razon}  -  {ele.usu_nombre}</option>
             )}
         </select>                             
         {/* <label>Cuenta Puc</label>     */}
         <select name="puc_id"
               value={caja.puc_id}
               onChange={(e)=>handleChange(e, "puc_id")}
               className=" border-[0.5px] border-gray-800 text-gray-800 text-center p-[5px] rounded-xl font-bold w-[290px]"
         >
             <option value="0">Seleccione Cuenta Puc</option>
             {puc.map(ele => 
               <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
             )}
         </select> 
         </div>                                                  <div className="flex justify-center pt-2">
        <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium" onClick={handleGrabar}>Agregar Caja</button>
        </div>
    </form>
    </div>
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pt-10 pb-16">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
    <table className="min-w-full leading-normal">
       <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalles</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
          </tr>
       </thead>
       <tbody>
       {cajas.map(ele =>
           <tr key={ele.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.caj_detalles}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.usuario.usu_nombre}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button 
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={(e)=>handleEditar(e, ele.id)}
                  >Editar</button>
                  </td>
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
}

export default Treasury
