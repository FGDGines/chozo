import React, { useState } from "react";
import Table from "../../components/Table";
import data from "../../../data.json";

function Stock() {
  const [showModal, setShowModal] = useState(false);
  const props = {
    showModal,
    setShowModal,
  };

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "nombre", accessorKey: "nombre" },
    { header: "marca", accessorKey: "marca" },
    { header: "precio", accessorKey: "precio" },
    { header: "stock", accessorKey: "stock" },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => buttonAction(row)}
        >
          Editar
        </button>
      ),
    },
  ];

  function buttonAction(row) {
    setShowModal(true);
    console.log("ir a albaran n°", row.row.original.id);
  }
  return (
    <Table
      data={data.productos}
      columns={columns}
      name={"Productos"}
      props={props}
    />
  );
}

export default Stock;
