import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaCircle } from "react-icons/fa";
import axios from "axios";

function Providers() {
  const [providers, setProviders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const props = {
    showModal,
    setShowModal,
    setSelectedProvider,
    selectedProvider,
    setProviders,
    providers,
  };
  const getProviders = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/proveedores");

      setProviders(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "ref", accessorKey: "art_referencia" },
    { header: "nombre", accessorKey: "tercero.ter_tercero" },
    { header: "dirección", accessorKey: "tercero.ter_direccion" },
    { header: "tel", accessorKey: "tercero.ter_telefono" },
    { header: "cel", accessorKey: "tercero.ter_celular" },
    { header: "plazo", accessorKey: "pro_plazo" },

    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-customBlue text-white rounded-md hover:scale-105 transition"
          onClick={() => buttonAction(row)}
        >
          Editar
        </button>
      ),
    },
    {
      header: "activo",
      accessorKey: "pro_activo",
      cell: (row) => (
        <span className="flex flex-col justify-center items-center">
          {row.row.original.pro_activo === 1 ? (
            <FaCircle className="text-green-500" />
          ) : (
            <FaCircle className="text-red-500" />
          )}
        </span>
      ),
    },
  ];

  function buttonAction(row) {
    const articleId = row.row.original.id;
    const selected = providers.find((article) => article.id === articleId);
    setSelectedProvider(selected);
    setShowModal(true);
    // console.log("proveedor n°", row.row.original.id);
  }

  // console.log(providers);
  return (
    <>
      <Table
        data={providers}
        columns={columns}
        name={"Proveedores"}
        props={props}
      />
    </>
  );
}

export default Providers;
