import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CuentasBancarias() {
    const token = localStorage.getItem("token");
    const [cuentas, setCuentas] = useState([]);
    const [puc, setPuc] = useState([]);
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
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Cuentas Bancarias</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Numero</th><th>Banco</th></tr>
              </thead>
              <tbody>
              {cuentas.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.cue_numero}</td>
                     <td>{ele.cue_banco}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nueva Cuenta</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="cue_numero"
                      onChange={(e)=>handleChange(e, "cue_numero")}
                      placeholder="Digite numero de cuenta"
                      value={cuenta.cue_numero}/><br/>
               <input type="text" 
                      name="cue_banco"
                      onChange={(e)=>handleChange(e, "cue_banco")}
                      placeholder="Digite banco"
                      value={cuenta.cue_banco}/><br/> 
                <label>Tipo de Cuenta</label> 
                <select name="cue_tipo"
                      value={cuenta.cue_tipo}
                      onChange={(e)=>handleChange(e, "cue_tipo")}
                >
                    <option value="0">Seleccione</option>
                    <option value="1">Ahorros</option>
                    <option value="2">Corriente</option>
                </select><br/>
                <label>Cuenta Puc</label>    
                <select name="puc_id"
                      value={cuenta.puc_id}
                      onChange={(e)=>handleChange(e, "puc_id")}
                >
                    <option value="0">Seleccione</option>
                    {puc.map(ele => 
                      <option value={ele.id}>{ele.puc_codigo}  -  {ele.puc_cuenta}</option>
                    )}
                </select><br/>                                                      
               <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Cuenta</button>
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

export default CuentasBancarias;