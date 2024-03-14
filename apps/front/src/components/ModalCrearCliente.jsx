import React, { useState, useEffect } from "react";
import axios from "axios";
function ModalCrearCliente({
    onClose,
   }) {
    const token = localStorage.getItem("token");
    const [cities, setCities] = useState([]);
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [tipoTerceros, setTipoTerceros] = useState([]);

    const [client, setClient] = useState({
        ter_documento: null,
        ter_tercero: null,
        ter_apellidos: null,
        ter_nombres: null,
        ter_direccion: null,
        ter_telefono: null,
        ter_celular: null,
        ter_email: null,
        ciudad_id: 0,
        tipodocumento_id: 0,
        tipotercero_id: 0,
        ter_cliente: 1,
        ter_credito: 0,
    });

    const getCities = async () => {
        try {
          const response = await axios.get("api/ciudades", {
            headers: {
              token: token,
            },
          });
          setCities(response.data);
        } catch (error) {
          console.error("Error al traer cities:", error);
        }
    };

    const getTipoDocumentos = async () => {
        try {
          const response = await axios.get("api/tipodocumentos", {
            headers: {
              token: token,
            },
          });
          setTipoDocumentos(response.data);
        } catch (error) {
          console.error("Error al traer tipoDocs:", error);
        }
    };

    const getTipoTerceros = async () => {
        try {
          const response = await axios.get("api/tipoterceros", {
            headers: {
              token: token,
            },
          });
          setTipoTerceros(response.data);
        } catch (error) {
          console.error("Error al traer tipoTerceros:", error);
        }
    };

    useEffect(() => {
        getCities();
        getTipoDocumentos();
        getTipoTerceros();
    }, []);

    //creacion del cliente y cierre ventana modal
    const handleSubmit = async (e) => {
        console.log("cliente", client)
        e.preventDefault();
        const response = await axios.post("api/terceros",client, {
              headers: {
              token: token,
              },
        });
        onClose();
    };   
    

    const handleInputChange = (event, property) => {
        const value = event.target.value;
        const name = event.target.name;
        setClient({...client,[property]: value});
    };

   return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md mt-20 border-t-4 border-customBlue">
        <h2 className="text-3xl flex justify-center rounded-md text-customBlue font-bold px-5">Crear Cliente</h2>
        <form >
            <table className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <tr>
                  <td className="block text-black ">Nombres</td>
                <td>
                  <input type="text" name="ter_nombres" 
                    value={client.ter_nombres} onChange={(e) => handleInputChange(e, "ter_nombres")}
                    className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"/></td></tr>
            <tr>
                  <td className="block text-black ">Apellidos</td>
                <td>
                  <input type="text" name="ter_apellidos" 
                    value={client.ter_apellidos} onChange={(e) => handleInputChange(e, "ter_apellidos")}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md dark:bg-gray-800 focus:border-blue-500  focus:outline-none focus:ring"/></td></tr>
                
                <tr>
                  <td className="block text-black ">Tipo Persona</td>
                <select
                       name="tipotercero_id"
                       value={client.tipotercero_id}
                       onChange={(e) => handleInputChange(e, "tipotercero_id")}
                       className="block w-full px-4 py-2  text-gray-700 bg-white rounded-md  focus:border-blue-500 border-[0.5px] border-gray-400 focus:outline-none focus:ring"
                    >
                    <option value="0">Seleccionar</option>
                    {tipoTerceros.map((ter) => (
                        <option key={ter.id} value={ter.id}>
                        {ter.tter_detalles}
                        </option>
                    ))}
                </select></tr>
                <tr>
                  <td className="block text-black ">Razon Social</td>
                <td>
                  <input type="text" name="ter_tercero" 
                     value={client.ter_tercero} onChange={(e) => handleInputChange(e, "ter_tercero")}
                     className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md border-[0.5px] border-gray-400 focus:border-blue-500 focus:outline-none focus:ring"
                     /></td></tr>
                
                <tr>
                  <td className="block text-black ">Documento</td>
                <td>
                  <input type="text" name="ter_documento" 
                    value={client.ter_documento} onChange={(e) => handleInputChange(e, "ter_documento")}
                    className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md focus:border-blue-500  focus:outline-none focus:ring"/></td></tr>
                <tr>
                  <td className="block text-black ">Tipo Documento</td>
                <td>
                  <select
                        value={client.tipodocumento_id}
                        onChange={(e) => handleInputChange(e, "tipodocumento_id")}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                    >
                    <option value="">Seleccionar</option>
                    {tipoDocumentos.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                        {ele.tdoc_detalles}
                       </option>
                    ))}
                </select>
                </td></tr>
                <tr>
                  <td className="block text-black ">Ciudad</td>
                <td><select
                        value={client.ciudad_id}
                        onChange={(e) => handleInputChange(e, "ciudad_id")}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                    >
                    <option value="0">Seleccionar</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                        {city.ciu_nombre} - {city.departamento.dpt_nombre}
                       </option>
                    ))}
                </select></td></tr>
                <tr>
                  <td className="block text-black ">Direccion</td>
                <td><input type="text" name="ter_direccion" 
                    value={client.ter_direccion} onChange={(e) => handleInputChange(e, "ter_direccion")}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"></input></td></tr>
                <tr>
                  <td className="block text-black ">Telefono</td>
                <td><input type="text" name="ter_telefono"
                    value={client.ter_telefono} onChange={(e) => handleInputChange(e, "ter_telefono")} className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"></input></td></tr>
                <tr>
                  <td className="block text-black ">Celular</td>
                <td><input type="text" name="ter_celular" onChange={(e) => handleInputChange(e, "ter_celular")} className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"></input></td></tr>
                <tr>
                  <td className="block text-black ">Email</td>
                <td><input type="text" name="ter_email" 
                    value={client.ter_email} onChange={(e) => handleInputChange(e, "ter_email")}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"></input></td></tr>
                <tr>
                  <td className="block text-black ">Cargo a Cuenta</td>
                <td>
                  <select name="ter_credito"
                       value={client.ter_credito}
                       onChange={(e) => handleInputChange(e, "ter_credito")}
                       className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                    >
                    <option value="0">No</option>
                    <option value="1">Si</option>
                </select></td></tr>
            </table>
        </form>
        <div className=" w-full flex justify-center items-center mt-8 gap-3">
        <button className="bg-red-500 text-white text-l py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() => {
                      onClose();
                  }}>Cancelar
        </button>
        <button
            onClick={handleSubmit}
            className="bg-customBlue text-white py-2 px-5 rounded-md hover:bg-blue-600 "
        >Crear Cliente</button>
        </div>

    </div>
    </div>    
   )
};

export default ModalCrearCliente;