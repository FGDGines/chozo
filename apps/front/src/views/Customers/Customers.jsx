import React from "react";
import Table from "../../components/Table";
import data from "../../../data.json";

function Customers() {
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "nombre", accessorKey: "nombre" },
    { header: "DNI", accessorKey: "DNI" },
    { header: "condicion", accessorKey: "condicion de venta" },
    { header: "activo", accessorKey: "activo" },
  ];
  return (
    <div className="p-5 w-[97%]">
      <Table data={data.clientes} columns={columns} name={"clientes"} />
    </div>
  );
}

export default Customers;
