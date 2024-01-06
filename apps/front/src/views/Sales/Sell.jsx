import React, { useState } from "react";
import Table from "../../components/Table";
import data from "../../../data.json";

function Sell() {
  const [showModal, setShowModal] = useState(false);
  const columns = [
    { header: "n° fact", accessorKey: "id" },
    { header: "fecha", accessorKey: "fecha" },
    { header: "cliente", accessorKey: "cliente" },
    { header: "total", accessorKey: "montoTotal" },
    { header: "a cuenta", accessorKey: "aCuenta" },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => buttonAction(row)}
        >
          Ver
        </button>
      ),
    },
  ];

  function buttonAction(row) {
    setShowModal(true);
    console.log("ir a albaran n°", row.row.original.id);
  }

  return (
    <div className="p-5 w-[97%]">
      <Table
        data={data.ventas}
        columns={columns}
        name="ventas"
        showModal={showModal}
        setShowModal={setShowModal}
      />
      ;
    </div>
  );
}

export default Sell;
