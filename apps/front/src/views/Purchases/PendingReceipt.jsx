import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { FaCheck } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

function PendingReceipt() {
  const token = localStorage.getItem("token");
  const [facturas, setFacturas] = useState([]);
  const [factura, setFactura] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { header: "Numero", accessorKey: "id" },
    { header: "fecha", accessorKey: "cxp_fechafac" },
    { header: "Proveedor", accessorKey: "tercero.ter_tercero" },
    { header: "total", accessorKey: "cxp_total" },
    { header: "abonos", accessorKey: "cxp_abonos" },
    { header: "saldo", accessorKey: "cxp_saldo" },
    { header: "credito",
      accessorKey: "cxp_saldo",
      cell: (row) =>
         (
          <div className="w-full flex justify-center items-center">
            <FaCheck className="text-red-400" />
          </div>
        ),
    },
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
  }

  const getBillById = async (id) => {
    try {
      const response = await axios.get(
        `api/carteraxpagar/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response.data);
      setFactura(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBuys = async () => {
    try {
      const response = await axios.get(
        "api/carteraxpagar",
        {
          headers: {
            token: token,
          },
        }
      );
      const data = response.data.map((venta) => {
        const fecha = new Date(venta.cxp_fecha);
        const formattedDate = `${fecha.getDate()}/${
          fecha.getMonth() + 1
        }/${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}0`;

        return { ...venta, cxp_fecha: formattedDate };
      });
      const filteredSales = data.filter((venta) => venta.cxp_total-venta.cxp_abonos>0);
      setFacturas(filteredSales);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBuys();
  }, []);
  const props = {
    showModal,
    setShowModal,
    getBillById,
    factura,
  };
  console.log(facturas);
  return (
    <div className="p-5 w-[97%]">
      <Table data={facturas} columns={columns} name="cartera x pagar" props={props} />;
    </div>
  );
}

export default PendingReceipt;
