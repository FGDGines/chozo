import React, { useEffect, useState } from "react";
import Select from "react-select";
import data from "../../data.json";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";
import axios from "axios";

const Header = ({ formattedDate, infoHeader }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSale, setIsSale] = useState([]);
  const [providers, setProviders] = useState([]);
  const [clients, setClients] = useState([]);

  console.log("cliente seleccionado", selectedClient);
  console.log("INFO HEADER 1", infoHeader);

  const getClient = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/terceros");
      console.log("clientes:", response.data);
      setClients(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProvider = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/proveedores");
      console.log("proveedores:", response.data);
      setProviders(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (infoHeader.isViewSale) {
      getClient();
      const optionsClient = clients.map((cliente) => ({
        value: cliente.id,
        label:
          cliente.ter_nombres +
          " " +
          cliente.ter_apellidos +
          " " +
          cliente.ter_documento1,
      }));
      setIsSale(optionsClient);
    } else {
      getProvider();
      const optionsProvider = providers.map((proveedor) => ({
        value: proveedor.id,
        label: proveedor.ter_tercero + " " + proveedor.ter_documento,
      }));
      setIsSale(optionsProvider);
    }
  }, [infoHeader.isViewSale]);

  const optionsUser = data.user.map((user) => ({
    value: user.id,
    label: user.nombre + " " + user.DNI,
  }));

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  return (
    <div className="pl-2 flex flex-row w-full justify-between items-center pr-5">
      <div>
        <h2 className="text-[30px] font-SFMedium">{infoHeader.title}</h2>
        <div className="text-gray-500 mt-1">
          Fecha de la orden: {formattedDate}
        </div>
        {infoHeader.showInfo ? (
          ""
        ) : (
          <div className="text-gray-500 mt-1">Punto de venta: Dirección</div>
        )}
      </div>
      <div>
        <img src={logo} className="w-[200px]" alt="" />
      </div>
      <div className="flex flex-col gap-3 justify-center items-end w-[30%]">
        <div className="flex flex-row items-center gap-3">
          {infoHeader.person1}
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            options={optionsUser}
            isSearchable
            placeholder="Seleccione un usuario..."
            className=" w-[250px]"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <button>
            <IoPersonAdd className="text-sky-500 text-lg" />
          </button>
          {infoHeader.person2}
          <Select
            value={selectedClient}
            onChange={handleClientChange}
            options={isSale}
            isSearchable
            placeholder="Seleccione un cliente..."
            className="w-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
