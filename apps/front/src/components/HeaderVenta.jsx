import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeaderVenta = ({ formattedDate, infoHeader }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCajero, setSelectedCajero] = useState(null);
  const [clientesVarios, setClientesVarios] = useState(0);

  const [clients, setClients] = useState([]);
  const [cajas, setCajas] = useState([]);

  //se trae los clientes para vista VENTA
  const getClient = async () => {
    try {
      const response = await axios.get("api/terceros", {
        headers: {
          token: token,
        },
      });
      const optionsClient = response.data.map((cliente) => ({
        value: cliente.id,
        selected: cliente.id===selectedClient ? true : false,
        label:
          cliente.ter_tercero +"  -  " + cliente.ter_documento,
      }));

      setClients(optionsClient);
    } catch (error) {
      console.error("Error:", error);
    }
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
    paramClientesVarios();
    const storedCajero = localStorage.getItem("selectedCajero");
    if (storedCajero) {
        setSelectedCajero(JSON.parse(storedCajero));
        infoHeader.setSelectedCaja(storedCajero);
    }
    getClient();
    getCaja();
 
  }, [infoHeader.isViewSale]);

  
  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
    if (infoHeader.setselectedClient1) {
      infoHeader.setselectedClient1(selectedOption);
    }
    if (infoHeader.setSelectedProvider) {
      infoHeader.setSelectedProvider(selectedOption);
    }
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
    <div className="pl-2 flex flex-row w-full justify-between items-center pr-5">
        <div>
            <h2 className="text-[30px] font-SFMedium">{infoHeader.title}</h2>
            <div className="text-gray-500 mt-1">
                Fecha de la orden: {formattedDate}
            </div>
            <div className="text-gray-500 mt-1">Punto de venta: Dirección</div>
        </div>

  
        <div className="flex flex-col gap-3 justify-center items-end w-[30%]">
            <div className="flex flex-row items-center gap-3">
                {infoHeader.person1}
                <Select
                 value={selectedCajero}
                 onChange={handleUserChange}
                 options={cajas}
                 isSearchable
                 placeholder="Seleccione un usuario..."
                 className="w-[250px]"
                />
            </div>
            <div className="flex flex-row items-center gap-3">
                <button onClick={toCreateClient}>
                    <IoPersonAdd className="text-sky-500 text-lg" />
                </button>
                {infoHeader.person2}
                <Select
                 value={selectedClient}
                 onChange={handleClientChange}
                 options={clients}
                 isSearchable
                 placeholder="Seleccione un cliente..."
                 className="w-[400px]"
                />
            </div>
        </div>
        <div>
            <img src={logo} className="w-[200px]" alt="" />
        </div>
     </div>
  );
};

export default HeaderVenta;
