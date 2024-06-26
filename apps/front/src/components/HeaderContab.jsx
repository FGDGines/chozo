import React, { useEffect, useState } from "react";
import Select from "react-select";
import data from "../../data.json";
import { IoPersonAdd } from "react-icons/io5";
import logo from "../assets/logo/elChozo.png";

const Header = ({ formattedDate, infoHeader }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSale, setIsSale] = useState([]);

  console.log("Tercero seleccionado", selectedClient);
  console.log("INFO HEADER 1", infoHeader);

  useEffect(() => {
    if (infoHeader.isViewSale) {
      console.log("INFO HEADER 2", infoHeader);
      const optionsClient = data.clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nombre + " " + cliente.DNI,
      }));
      setIsSale(optionsClient);
    } else {
      const optionsProvider = data.proveedores.map((proveedor) => ({
        value: proveedor.id,
        label: proveedor.nombre + " " + proveedor.NIF,
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
          Fecha comprobante: {formattedDate}
        </div>
        {infoHeader.showInfo ? (
          ""
        ) : (
          <div className="text-gray-500 mt-1">Número: </div>
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
            placeholder="Seleccione fuente..."
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
            placeholder="Seleccione tercero..."
            className="w-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
