import React from "react";
import Table from "../../components/Table";
import data from "../../../data.json";

function Stock() {
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "nombre", accessorKey: "nombre" },
    { header: "marca", accessorKey: "marca" },
    { header: "precio", accessorKey: "precio" },
    { header: "stock", accessorKey: "stock" },
  ];
  return <Table data={data.productos} columns={columns} name={"Productos"} />;
}

export default Stock;
