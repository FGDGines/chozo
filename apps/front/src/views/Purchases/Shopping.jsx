import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

function Shopping() {
  const token = localStorage.getItem("token");
  const [purchaseOrders, setPurchaseOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const props = {
    showModal,
    setShowModal,
    selectedOrder,
    setPurchaseOrders,
    purchaseOrders,
  };

  const getPurchaseOrders = async () => {
    try {
      const response = await axios.get("api/pedidos", {
        headers: {
          token: token,
        },
      });

      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("error al recibir pedidos:", error);
    }
  };

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Número de Pedido", accessorKey: "ped_numero" },
    {
      header: "Fecha de Pedido",
      accessorKey: "ped_fecha",
      cell: (row) => new Date(row.row.original.ped_fecha).toLocaleDateString(),
    },
    { header: "Estado", accessorKey: "ped_estado" },
    { header: "Solicitante", accessorKey: "ped_solicitante" },
    { header: "Proveedor", accessorKey: "proveedore.tercero.ter_tercero" },
    {
      header: "Acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-customBlue text-white rounded-md hover:scale-105 transition"
          onClick={() => buttonAction(row)}
        >
          Recibir
        </button>
      ),
    },
  ];

  function buttonAction(row) {
    const orderId = row.row.original.id;
    console.log("ID del artículo:", orderId);
    const selected = purchaseOrders.find((order) => order.id === orderId);
    setSelectedOrder(selected);
    setShowModal(true);
  }

  return (
    <>
      <Table
        data={purchaseOrders}
        columns={columns}
        name={"Pedidos a proveedor"}
        props={props}
      />
    </>
  );
}

export default Shopping;
