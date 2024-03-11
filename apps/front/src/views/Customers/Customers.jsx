import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import data from "../../../data.json";
import axios from "axios";

function Customers() {
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getCustomers = async () => {
    const response = await axios.get("api/terceros", {
      headers: {
        token: token,
      },
    });
    setCustomers(response.data);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const props = {
    showModal,
    setShowModal,
    selectedCustomer,
    setSelectedCustomer,
    customers,
    setCustomers,
  };
  const columns = [
    { header: "nombre", accessorKey: "ter_tercero" },
    { header: "Documento", accessorKey: "ter_documento" },
    { header: "Direccion", accessorKey: "ter_direccion" },
    { header: "Movil", accessorKey: "ter_celular" },
    { header: "Email", accessorKey: "ter_email" },
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
  ];

  function buttonAction(row) {
    const articleId = row.row.original.id;
    const selected = customers.find((article) => article.id === articleId);
    setSelectedCustomer(selected);
    setShowModal(true);
  }

  return (
    <div className="p-5  w-[97%]">
      <Table
        props={props}
        data={customers}
        columns={columns}
        name={"clientes"}
      />
    </div>
  );
}

export default Customers;
