import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
// import data from "../../../data.json";

function Sell() {
  const [sales, setSales] = useState([]);
  const [bill, setBill] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { header: "n° fact", accessorKey: "id" },
    { header: "fecha", accessorKey: "cxc_fechafac" },
    { header: "cliente", accessorKey: "tercero.ter_tercero" },
    { header: "total", accessorKey: "cxc_valor" },
    { header: "a cuenta", accessorKey: "cxc_metodopago" },
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
    getBillById(row.row.original.id);
    // console.log("ir a albaran n°", row.row.original.id);
  }

  const getBillById = async (id) => {
    try {
      // console.log("este es el id", id);
      const response = await axios.get(
        `http://localhost:8081/api/carteraxcobrar/${id}`
      );

      setBill(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/carteraxcobrar"
      );
      const data = response.data.map((venta) => {
        const fecha = new Date(venta.cxc_fechafac);
        const formattedDate = `${fecha.getDate()}/${
          fecha.getMonth() + 1
        }/${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}0`;

        return { ...venta, cxc_fechafac: formattedDate };
      });

      setSales(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSales();
  }, []);
  const props = {
    showModal,
    setShowModal,
    getBillById,
    bill,
  };
  // console.log("factura", bill);
  return (
    <div className="p-5 w-[97%]">
      <Table data={sales} columns={columns} name="ventas" props={props} />;
    </div>
  );
}

export default Sell;
