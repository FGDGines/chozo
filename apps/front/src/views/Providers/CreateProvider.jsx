import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProvider() {
  const token = localStorage.getItem("token");
  const [ciudades, setCiudades] = useState([]);
  const [tipodoc, setTipodoc] = useState([]);
  const [tipoper, setTipoper] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [objeto, setObjeto] = useState({
     nombre: "",
     documento: "",
     idTipodoc: 0,
     tipoper: 1,
     idCiudad: 0,
     direccion: "",
     telefono: "",
     celular: "",
     email: "",
     plazo: 0,
     idAgencia: 0,
  });

  const notify = () => toast.success("¡Proveedor creado!");
  const notifyError = () => toast.error("¡Faltan datos por completar!");

  const cargarCiudades = async () => {
     const response = await axios.get("api/ciudades", {
        headers: {
        token: token,
        },
     });
     setCiudades(response.data);
  };

  const cargarTipodoc = async () => {
    const response = await axios.get("api/tipodocumentos", {
       headers: {
       token: token,
       },
    });
    setTipodoc(response.data);
 };

 const cargarTipoper = async () => {
  const response = await axios.get("api/tipoterceros", {
     headers: {
     token: token,
     },
  });
  setTipoper(response.data);
};

const cargarAgencias = async () => {
  const response = await axios.get("api/agencias", {
     headers: {
     token: token,
     },
  });
  setAgencias(response.data);
};

  useEffect(() => {
    cargarCiudades();
    cargarTipodoc();
    cargarTipoper();
    cargarAgencias();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    console.log(property,value)
    setObjeto({...objeto,[property]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
        ter_documento: objeto.documento,
        ter_tercero: objeto.nombre,
        ter_apellidos: "",
        ter_nombres: "",
        ter_direccion: objeto.direccion,
        ter_telefono: objeto.telefono,
        ter_celular: objeto.celular,
        ter_email: objeto.email,
        ciudad_id: objeto.idCiudad,
        tipodocumento_id: objeto.idTipodoc,
        tipotercero_id: objeto.tipoper,
        pro_plazo: objeto.plazo,
        agencia_id: objeto.idAgencia,
    };
    console.log(datos);
    const result = await axios.post('api/proveedores', datos, {
       headers: {
          token: token,
       },
    });
    toast.success("¡Proveedor creado!");
    setObjeto({
      nombre: "",
      documento: "",
      idTipodoc: 0,
      tipoper: 1,
      idCiudad: 0,
      direccion: "",
      telefono: "",
      celular: "",
      email: "",
      plazo: 0,
      idAgencia: 0,
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">
        CREAR PROVEEDOR
      </h2>
      <form className="bg-gray-200 rounded-md mt-4 p-4">
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Razon Social</label>
            <input type="text" name="nombre" value={objeto.nombre} onChange={handleChange}/>
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Documento</label>
            <input type="text" name="documento" value={objeto.documento}  onChange={handleChange}/>
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Tipo Documento</label>
            <select name="idTipodoc" onChange={(e)=>handleChange(e)}>
               {tipodoc.map(elemen => 
                   <option value={elemen.id}>{elemen.tdoc_detalles}</option>
               )}                    
            </select>
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Tipo Persona</label>
            <select name="tipoper" onChange={(e)=>handleChange(e)}>
               {tipoper.map(elemen => 
                   <option value={elemen.id}>{elemen.tter_detalles}</option>
               )}                    
            </select>
        </div>        
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Ciudad</label>
            <select name="idCiudad" onChange={(e)=>handleChange(e)}>
               {ciudades.map(elemen => 
                   <option value={elemen.id}>{elemen.ciu_nombre} - {elemen.departamento.dpt_nombre}</option>
               )}                    
            </select>
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Direccion</label>
            <input type="text" name="direccion" value={objeto.direccion} onChange={handleChange} />
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Telefono</label>
            <input type="text" name="telefono" value={objeto.telefono} onChange={handleChange} />
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Celular</label>
            <input type="text" name="celular" value={objeto.celular} onChange={handleChange} />
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Email</label>
            <input type="text" name="email" value={objeto.email} onChange={handleChange} />
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Plazo</label>
            <input type="number" name="plazo" value={objeto.plazo} onChange={handleChange} />
        </div>
        <div className="mb-2 flex flex-row justify-start items-center">
            <label>Agencia</label>
            <select name="idAgencia" onChange={(e)=>handleChange(e)}>
               {agencias.map(elemen => 
                   <option value={elemen.id}>{elemen.tercero.ter_tercero}</option>
               )}                    
            </select>
        </div>        
        <div className="w-full flex justify-center items-center">
            <button
               className="bg-green-500 text-white text-xl py-2 px-4 rounded-md hover:bg-green-600"
               onClick={handleSubmit}
            >Crear Proveedor
            </button>
            <ToastContainer
               position="top-right"
               autoClose={3000}
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
      </form>
    </div>
  );
};

export default CreateProvider;
