import React, { useState } from "react";
import Select from "react-select";
import data from "../../data.json";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";

const Header = ({ formattedDate }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("cliente seleccionado", selectedClient);

  const optionsClient = data.clientes.map((cliente) => ({
    value: cliente.id,
    label: cliente.nombre + " " + cliente.DNI,
  }));

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
        <h2 className="text-[30px] font-SFMedium">Pedido de venta</h2>
        <div className="text-gray-500 mt-1">
          Fecha de la orden: {formattedDate}
        </div>
        <div className="text-gray-500 mt-1">Punto de venta: Dirección</div>
      </div>
      <div>
        <img src={logo} className="w-[200px]" alt="" />
      </div>
      <div className="flex flex-col gap-3 justify-center items-end w-[30%]">
        <div className="flex flex-row items-center gap-3">
          Cajero
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            options={optionsUser}
            isSearchable
            placeholder="Seleccione un cliente..."
            className=" w-[250px]"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <button>
            <IoPersonAdd className="text-sky-500 text-lg" />
          </button>
          Cliente
          <Select
            value={selectedClient}
            onChange={handleClientChange}
            options={optionsClient}
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
