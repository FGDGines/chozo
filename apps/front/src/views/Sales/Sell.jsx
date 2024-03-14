import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { FaCheck } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

function Sell() {
  const token = localStorage.getItem("token");
  const [sales, setSales] = useState([]);
  const [bill, setBill] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { header: "Numero", accessorKey: "cxc_numero" },
    { header: "fecha", accessorKey: "cxc_fechafac" },
    { header: "cliente", accessorKey: "tercero.ter_tercero" },
    {header: "total", 
    accessorKey: "cxc_valor", 
    cell: (row) => (
      <span>{row.row.original.cxc_valor} €</span>
    ),
  },
    {
      header: "credito",
      accessorKey: "cxc_metodopago",
      cell: (row) =>
        row.row.original.cxc_metodopago === 1 ? (
          <div className="w-full flex justify-center items-center">
            <FaCheck className="text-red-400" />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <FaCircle className="text-gray-300" />{" "}
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
        `api/carteraxcobrar/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      setBill(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSales = async () => {
    try {
      const response = await axios.get(
        "api/carteraxcobrar",
        {
          headers: {
            token: token,
          },
        }
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
  return (
    <div className="p-5 w-[97%]">
      <Table data={sales} columns={columns} name="ventas" props={props} />;
    </div>
  );
}

export default Sell;
