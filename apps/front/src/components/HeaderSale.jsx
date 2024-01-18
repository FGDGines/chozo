import React, { useEffect, useState } from "react";
import Select from "react-select";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";
import axios from "axios";

const Header = ({ formattedDate, infoHeader }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [providers, setProviders] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [cajas, setCajas] = useState([]);

  //se trae los clientes para vista VENTA
  const getClient = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/terceros");

      const optionsClient = response.data.map((cliente) => ({
        value: cliente.id,
        label:
          cliente.ter_nombres +
          " " +
          cliente.ter_apellidos +
          " " +
          cliente.ter_documento,
      }));

      setClients(optionsClient);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //se trae los poveedores para vista COMPRA

  const getProvider = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/proveedores");
      const optionsProv = response.data.map((proveedor) => ({
        value: proveedor.id,
        label: proveedor.tercero.ter_tercero,
      }));

      setProviders(optionsProv);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //se trae las cajas para vista VENTA
  const getCaja = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/cajas");

      const optionsCajas = response.data.map((caja) => ({
        value: caja.id,
        label: caja.caj_detalles,
      }));

      setCajas(optionsCajas);
    } catch (error) {}
  };

  //se trae los usuarios para vista COMPRA
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/usuarios");
      const optionsUsers = response.data.map((user) => ({
        value: user.id,
        label: user.usu_nombre,
      }));

      setUsers(optionsUsers);
    } catch (error) {}
  };

  useEffect(() => {
    if (infoHeader.isViewSale) {
      getClient();
      getCaja();
    } else {
      getProvider();
      getUser();
    }
  }, [infoHeader.isViewSale]);

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
    infoHeader.setSelectedCaja(selectedOption);
  };

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
    infoHeader.setSelectedProvider(selectedOption);
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
      {infoHeader.isViewSale ? (
        <div className="flex flex-col gap-3 justify-center items-end w-[30%]">
          <div className="flex flex-row items-center gap-3">
            {infoHeader.person1}
            <Select
              value={selectedUser}
              onChange={handleUserChange}
              options={cajas}
              isSearchable
              placeholder="Seleccione un usuario..."
              className="w-[250px]"
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
              options={clients}
              isSearchable
              placeholder="Seleccione un cliente..."
              className="w-[250px]"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-end w-[30%]">
          <div className="flex flex-row items-center gap-3">
            {infoHeader.person1}
            <Select
              value={selectedUser}
              onChange={handleUserChange}
              options={users}
              isSearchable
              placeholder="Seleccione un usuario..."
              className="w-[250px]"
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
              options={providers}
              isSearchable
              placeholder="Seleccione un cliente..."
              className="w-[250px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
