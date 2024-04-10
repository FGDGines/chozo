import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeaderVenta = ({ formattedDate, infoHeader, handleOpenModalClientes, clientes }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCajero, setSelectedCajero] = useState(null);
  const [clientesVarios, setClientesVarios] = useState(0);

  const [clients, setClients] = useState(clientes);
  const [cajas, setCajas] = useState([]);


  //se trae los clientes para vista VENTA
  const getClient = async () => {
      const optionsClient = clientes.map((cliente) => ({
        value: cliente.id,
        selected: cliente.id===selectedClient ? true : false,
        label:
          cliente.ter_tercero +"  -  " + cliente.ter_documento,
      }));
      setClients(optionsClient);
  };


  //se trae las cajas para vista VENTA
  const getCaja = async () => {
    try {
      const response = await axios.get("api/cajas", {
        headers: {
          token: token,
        },
      });

      const optionsCajas = response.data.map((caja) => ({
        value: caja.id,
        label: caja.caj_detalles,
      }));

      setCajas(optionsCajas);
    } catch (error) {}
  };

  
  const paramClientesVarios = async() => {
    //traemos el parametro id=11 de id clientes varios
     const response = await axios.get("api/parametros/11", {
         headers: {
           token: token,
         },
     });
     const datos = response.data;
     setClientesVarios(Number(datos.para_valor));
     setSelectedClient(datos.para_valor);
  };

  useEffect(() => {
    getClient();
    paramClientesVarios();
    const storedCajero = localStorage.getItem("selectedCajero");
    if (storedCajero) {
        setSelectedCajero(JSON.parse(storedCajero));
        infoHeader.setSelectedCaja(storedCajero);
    }
    getCaja();
 
  }, []);

  
  const handleClientChange = (e) => {
    const value = e.target.value;
    setSelectedClient(value);
    infoHeader.setselectedClient1(value);
  };

  const toCreateClient = () => {
    const route = "/createCustomer";
    navigate(route);
  };

  const handleUserChange = (selectedOption) => {
    console.log(selectedOption);
    if (infoHeader.setSelectedCaja) {
      setSelectedCajero(selectedOption);
      infoHeader.setSelectedCaja(selectedOption);
      localStorage.setItem("selectedCajero", JSON.stringify(selectedOption));
    }
    if (infoHeader.setSelectedUser) {
      setSelectedUser(selectedOption);
      infoHeader.setSelectedUser(selectedOption);
      localStorage.setItem("selectedUser", JSON.stringify(selectedOption));
    }
  };

  
  return (
    <div className="pl-2 flex flex-row w-full justify-between items-center pr-5 bg-gray-100 rounded-xl">
 
        <div className="flex flex-col gap-3 justify-center items-start w-[30%]">
            <h2 className="text-[30px] font-SFMedium">{infoHeader.title}</h2>
            <div className="flex flex-row items-center gap-3">
                <button onClick={handleOpenModalClientes}>
                    <IoPersonAdd className="text-sky-500 text-lg" />
                </button>
                {infoHeader.person2}
                <select name="cliente" 
                    className="w-[400px] border-solid bg-blue-100 py-2"
                    onChange={(e)=>handleClientChange(e)}>
                    <option value="0">Seleccione Cliente</option>
                    {clientes.map(ele =>
                       <option value={ele.id}>{ele.ter_tercero} - {ele.ter_documento}</option>
                    )}
                </select>
            </div>
        </div>
        <div>
            <div className="text-gray-500 mt-1">
                Fecha de la orden: {formattedDate}
            </div>
            <div className="text-gray-500 mt-1">Caja : {infoHeader.selectedCaja.caj_detalles}</div>
        </div>

        <div>
            <img src={logo} className="w-[200px]" alt="" />
        </div>
     </div>
  );
};

/*
<Select
value={selectedClient}
onChange={handleClientChange}
options={clients}
isSearchable
placeholder="Seleccione un cliente..."
className="w-[400px]"
/>
*/
export default HeaderVenta;
