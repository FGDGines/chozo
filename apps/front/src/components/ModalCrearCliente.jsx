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
    <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold bg-blue-800 text-white mb-4 px-4 text-center">Creacion Clientes</h2>
        <form >
            <table>
                <tr><td>Tipo Persona</td>
                <td><select
                       name="tipotercero_id"
                       value={client.tipotercero_id}
                       onChange={(e) => handleInputChange(e, "tipotercero_id")}
                    >
                    <option value="0">Seleccionar</option>
                    {tipoTerceros.map((ter) => (
                        <option key={ter.id} value={ter.id}>
                        {ter.tter_detalles}
                        </option>
                    ))}
                </select></td></tr>
                <tr><td>Razon Social</td>
                <td><input type="text" name="ter_tercero" 
                     value={client.ter_tercero} onChange={(e) => handleInputChange(e, "ter_tercero")}/></td></tr>
                <tr><td>Apellidos</td>
                <td><input type="text" name="ter_apellidos" 
                    value={client.ter_apellidos} onChange={(e) => handleInputChange(e, "ter_apellidos")}/></td></tr>
                <tr><td>Nombres</td>
                <td><input type="text" name="ter_nombres" 
                    value={client.ter_nombres} onChange={(e) => handleInputChange(e, "ter_nombres")}/></td></tr>
                <tr><td>Documento</td>
                <td><input type="text" name="ter_documento" 
                    value={client.ter_documento} onChange={(e) => handleInputChange(e, "ter_documento")}/></td></tr>
                <tr><td>Tipo Documento</td>
                <td><select
                        value={client.tipodocumento_id}
                        onChange={(e) => handleInputChange(e, "tipodocumento_id")}
                    >
                    <option value="">Seleccionar</option>
                    {tipoDocumentos.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                        {ele.tdoc_detalles}
                       </option>
                    ))}
                </select></td></tr>
                <tr><td>Ciudad</td>
                <td><select
                        value={client.ciudad_id}
                        onChange={(e) => handleInputChange(e, "ciudad_id")}
                    >
                    <option value="0">Seleccionar</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                        {city.ciu_nombre} - {city.departamento.dpt_nombre}
                       </option>
                    ))}
                </select></td></tr>
                <tr><td>Direccion</td>
                <td><input type="text" name="ter_direccion" 
                    value={client.ter_direccion} onChange={(e) => handleInputChange(e, "ter_direccion")}></input></td></tr>
                <tr><td>Telefono</td>
                <td><input type="text" name="ter_telefono"
                    value={client.ter_telefono} onChange={(e) => handleInputChange(e, "ter_telefono")}></input></td></tr>
                <tr><td>Celular</td>
                <td><input type="text" name="ter_celular" onChange={(e) => handleInputChange(e, "ter_celular")}></input></td></tr>
                <tr><td>Email</td>
                <td><input type="text" name="ter_email" 
                    value={client.ter_email} onChange={(e) => handleInputChange(e, "ter_email")}></input></td></tr>
                <tr><td>Cargo a Cuenta</td>
                <td><select name="ter_credito"
                       value={client.ter_credito}
                       onChange={(e) => handleInputChange(e, "ter_credito")}
                    >
                    <option value="0">No</option>
                    <option value="1">Si</option>
                </select></td></tr>
            </table>
        </form>
        <div className=" w-full flex justify-center items-center mt-8">
        <button className="bg-red-500 text-white text-l py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() => {
                      onClose();
                  }}>Cancelar
        </button>
        <button
            onClick={handleSubmit}
            className="bg-green-500 text-white text-l py-2 px-4 rounded-md hover:bg-green-600 ml-4"
        >Crear Cliente</button>
        </div>

    </div>
    </div>    
   )
};

export default ModalCrearCliente;