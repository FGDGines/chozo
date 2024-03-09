import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalCtasBancarias from "../../components/ModalCtasBancarias";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CuentasBancarias() {
    const token = localStorage.getItem("token");
    const [cuentas, setCuentas] = useState([]);
    const [puc, setPuc] = useState([]);
    const [modalCtaBanco, setModalCtaBanco] = useState(false);
    const [record, setRecord] = useState(0);
    const [cuenta, setCuenta] = useState({
        cue_banco: "",
        cue_numero: "",
        cue_tipo: 1,
        cue_activa: 1,
        puc_id: 0,
    });

    const handleChange = (e) => {
       const value = e.target.value;
       const property = e.target.name;
       setCuenta({...cuenta, [property]: value});
    };

    const closeModal = () => {
      setModalCtaBanco(false);
      cargarCuentas(); 
    };

    const handleEditar = async(e, registro) => {
      setRecord(registro);
      setModalCtaBanco(true);
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const result = await axios.post('api/cuentasbancarias', cuenta, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Cuenta creada!");
        cargarCuentas();
    };

    const cargarCuentas = async() => {
       const result = await axios('api/cuentasbancarias', {
          headers: {
            token: token,
          },
       });
       setCuentas(result.data);
       setCuenta({
        cue_banco: "",
        cue_numero: "",
        cue_tipo: 1,
        cue_activa: 1,
        puc_id: 0,
       });
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
       cargarCuentas(); 
       cargarPuc();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
             {modalCtaBanco
           ? (<ModalCtasBancarias onClose={closeModal} record={record}/>) : ("")}      
           <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5 ">Maestros de Cuentas Bancarias</h2>
           <div className="pt-16 flex justify-center">
           <h1 className="text-gray-800  rounded-[30px] px-5 text-2xl font-bold">Nueva Cuenta</h1>
           </div>
           <div className="flex items-center justify-center pt-2">
           <form>
            <div className="grid grid-cols-2 gap-3">
               <input type="text" 
                      name="cue_numero"
                      onChange={(e)=>handleChange(e, "cue_numero")}
                      placeholder="Digite numero de cuenta"
                      value={cuenta.cue_numero}
                      className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center"/>
               <input type="text" 
                      name="cue_banco"
                      onChange={(e)=>handleChange(e, "cue_banco")}
                      placeholder="Digite banco"
                      value={cuenta.cue_banco}
                      className="mt-1 p-1 border-[0.5px] border-gray-800 rounded-xl mx-2 text-center"/> 
                {/* <label>Tipo de Cuenta</label>  */}
                <select name="cue_tipo"
                      value={cuenta.cue_tipo}
                      onChange={(e)=>handleChange(e, "cue_tipo")}
                      className=" border-[0.5px] border-gray-800 text-gray-800 text-center p-[5px] rounded-xl font-bold w-[200px] "
                >
                    <option value="0">Tipo de Cuenta</option>
                    <option value="1">Ahorros</option>
                    <option value="2">Corriente</option>
                </select>
                {/* <label>Cuenta Puc</label>     */}
                <select name="puc_id"
                      value={cuenta.puc_id}
                      onChange={(e)=>handleChange(e, "puc_id")}
                      className=" border-[0.5px] border-gray-800 text-gray-800 text-center p-[5px] rounded-xl font-bold w-[200px]"
                >
                    <option value="0">Seleccione Cuenta Puc</option>
                    {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                    )}
                </select>                                         </div>
                <div className="flex justify-center pt-2">  
               <button className="bg-gray-800 text-white text-center p-[5px] px-5 rounded-md font-medium" onClick={handleGrabar}>Agregar Cuenta</button>
               </div>
           </form>
           </div>
           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto pt-10 pb-16">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
           <table className="min-w-full leading-normal">
              <thead>
                 <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Numero</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Banco</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Accion</th>
                  </tr>
              </thead>
              <tbody>
              {cuentas.map(ele =>
                  <tr key={ele.id}>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.id}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.cue_numero}</td>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ele.cue_banco}</td>
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

export default CuentasBancarias;