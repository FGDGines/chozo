import React, { useEffect, useState } from "react";
import axios from "axios";
function ModalShopping({ props }) {
  const [order, setOrder] = useState({});
  const orderId = props.selectedOrder.id;

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/pedidos/${orderId}`
      );
      setOrder(response.data);
    } catch (error) {
      console.error("Error al obtener la boleta de compra:", error);
    }
  };
  useEffect(() => {
    if (props.selectedOrder) {
      fetchPurchaseOrder();
    }
  }, [orderId]);

  const order2 = order.itempedidos;
  console.log(order2);

  const handleCantidadChange = (itemId, cantidad) => {
    const updatedOrder = {
      ...order,
      itempedidos: order.itempedidos.map((item) =>
        item.id === itemId ? { ...item, ite_cantidad: cantidad } : item
      ),
    };
    setOrder(updatedOrder);
  };

  const handleCostoChange = (itemId, costo) => {
    const updatedOrder = {
      ...order,
      itempedidos: order.itempedidos.map((item) =>
        item.id === itemId
          ? { ...item, articulo: { ...item.articulo, art_preciocosto: costo } }
          : item
      ),
    };
    setOrder(updatedOrder);
  };

  const handleAnularPedido = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/pedidos/anular/${orderId}`,
        {
          fecha: "2024-01-25",
          valor: 30000,
          solicitante: "German",
          proveedor_id: 2,
          items: order.itempedidos.map((item) => ({
            cantidad: item.ite_cantidad,
            impuesto: 0,
            valoruni: item.articulo.art_preciocosto,
            articulo_id: item.articulo.id,
          })),
        }
      );
      console.log("Pedido anulado:", response.data);

      // Confirmar la compra
      await confirmarCompra();
    } catch (error) {
      console.error("Error al anular el pedido:", error);
    }
  };

  const confirmarCompra = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/carteraxpagar",
        {
          fecha: "2023-12-25",
          vence: "2023-12-31",
          bruto: 30000,
          impuesto: 0,
          total: 30000,
          retencion: 0,
          tercero_id: 7,
          items: order.itempedidos.map((item) => ({
            itempedido_id: item.id,
            cantidad: item.ite_cantidad,
            valorunitario: item.articulo.art_preciocosto,
          })),
          codUsuario: 1,
        }
      );
      console.log("Compra confirmada:", response.data);
    } catch (error) {
      console.error("Error al confirmar la compra:", error);
    }
  };

  return (
    <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
      {Object.keys(order).length > 0 ? (
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Boleta de Compra</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Número de Pedido:</strong> {order?.ped_numero}
            </div>
            <div>
              <strong>Fecha:</strong> {order?.ped_fecha}
            </div>
          </div>

          <h3 className="text-lg font-bold mt-4">Proveedor</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Nombre:</strong> {order?.proveedore.tercero.ter_tercero}
            </div>
            <div>
              <strong>Dirección:</strong>{" "}
              {order?.proveedore.tercero.ter_direccion}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mt-4">Artículos Pedidos</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.itempedidos.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.articulo.art_detalles}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.articulo.art_preciocosto}
                          onChange={(e) =>
                            handleCostoChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.ite_cantidad}
                          onChange={(e) =>
                            handleCantidadChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
                <button onClick={handleAnularPedido}>Confirmar pedido</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ModalShopping;
