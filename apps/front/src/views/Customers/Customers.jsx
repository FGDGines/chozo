import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import data from "../../../data.json";
import axios from "axios";

function Customers() {
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const response = await axios.get("http://localhost:8081/api/terceros", {
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
  };
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "nombre", accessorKey: "ter_tercero" },
    { header: "DNI", accessorKey: "ter_documento" },
    { header: "condicion", accessorKey: "condicion de venta" },
    { header: "activo", accessorKey: "activo" },
  ];
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
