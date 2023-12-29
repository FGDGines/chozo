import React from "react";
import Table from "../../components/Table";
import data from "../../../data.json";

function Sell() {
  const columns = [
    { header: "n° fact", accessorKey: "id" },
    { header: "fecha", accessorKey: "fecha" },
    { header: "cliente", accessorKey: "cliente" },
    { header: "total", accessorKey: "montoTotal" },
    { header: "a cuenta", accessorKey: "aCuenta" },
  ];
  return (
    <div className="p-5 w-[97%]">
      <Table data={data.ventas} columns={columns} name="ventas" />;
    </div>
  );
}

export default Sell;
