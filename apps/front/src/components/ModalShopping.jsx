import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiLoader2Fill } from "react-icons/ri";

function ModalShopping({ props, closeWin }) {
  const token = localStorage.getItem("token");
  const codUsuario = localStorage.getItem("idUsuario");
  const [order, setOrder] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const orderId = props.selectedOrder.id;

  const fetchPurchaseOrder = async () => {
    try {
      const response = await axios.get(
        `api/pedidos/${orderId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      setOrder({ ...response.data, token: token });
      const initialCheckedItems = {};
      response.data.itempedidos.forEach((item) => {
        initialCheckedItems[item.id] = false;
      });
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.error("Error al obtener la boleta de compra:", error);
    }
  };

  useEffect(() => {
    if (props.selectedOrder) {
      fetchPurchaseOrder();
    }
  }, [orderId]);
  console.log(order);

  const handleCantidadChange = (itemId, cantidad) => {
    const updatedOrder = {
      ...order,
      itempedidos: order.itempedidos.map((item) =>
        item.id === itemId
          ? { ...item, ite_cantidad: parseFloat(cantidad) }
          : item
      ),
    };
    setOrder(updatedOrder);
  };

  const handleCostoChange = (itemId, costo) => {
    const updatedOrder = {
      ...order,
      itempedidos: order.itempedidos.map((item) =>
        item.id === itemId
          ? {
              ...item,
              articulo: {
                ...item.articulo,
                art_ultimocosto: parseFloat(costo),
              },
            }
          : item
      ),
    };
    setOrder(updatedOrder);
  };

  const handleCheckChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };

  const handleModificarPedido = async () => {
    try {
      const pedModificado = {
        fecha: order.ped_fecha,
        valor: order.ped_valor,
        solicitante: order.ped_solicitante,
        proveedor_id: order.proveedor_id,
        items: order.itempedidos.map((item) => ({
          cantidad: parseFloat(item.ite_cantidad),
          impuesto: 0,
          valoruni: item.articulo.art_ultimocosto,
          articulo_id: item.articulo.id,
        })),
        token: order.token,
      };
      const response = await axios.put(
        `api/pedidos/${orderId}`,
        pedModificado
      );
      console.log("Pedido modificado:", response.data);
    } catch (error) {
      console.error("Error al modificar el pedido:", error);
    }
  };

  const confirmarCompra = async () => {
    const pedidoAComprar = {
      fecha: order.ped_fecha,
      vence: order.ped_fecha,
      bruto: order.ped_valor,
      impuesto: 0,
      total: order.ped_valor,
      retencion: 0,
      tercero_id: order.proveedore.tercero.id,
      items: order.itempedidos.map((item) => ({
        itempedido_id: item.id,
        cantidad: parseFloat(item.ite_cantidad),
        valorunitario: item.articulo.art_ultimocosto,
      })),
      codUsuario: codUsuario,
      token: token,
    };

    try {
      const response = await axios.post(
        "api/carteraxpagar",
        pedidoAComprar
      );

      closeWin();
    } catch (error) {
      console.error("Error al confirmar la compra:", error);
    }
  };

  return (
    <>
      {Object.keys(order).length > 0 ? (
        <div className="">
          <div className="bg-customBlue text-white text-lg font-semibold rounded-t-md py-4 px-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Pedido </h2>
            <div>
            <p className="text-sm">Número de Pedido: {order.ped_numero}</p>
            <p className="text-sm">
              Fecha: {new Date(order.ped_fecha).toLocaleDateString()}
            </p>
            </div>
          </div>

          <div className="bg-gray-100 px-2 rounded text-gray pb-2 ">
            <h3 className="text-lg font-bold mt-1 text-center py-2">Proveedor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              <div className="gap-4 items-center text-center ">
                <span className="text-black font-bold pt-2 mr-2">Nombre:</span> 
                <p>{order?.proveedore.tercero.ter_tercero}</p>
              </div>
              <div className="gap-4 items-center text-center ">
                <span className="text-black font-bold pt-2 mr-2">Dirección:</span>
              <p>{order?.proveedore.tercero.ter_direccion}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <h3 className="text-lg font-bold ml-4 pb-2">Artículos Pedidos</h3>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto pb-5">
            <div className="inline-block min-w-full shadow rounded-lg max-h-[280px]">
              <table className="border-collapse  min-w-full leading-normal">
                <thead className="sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Cantidad
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      Confirmar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.itempedidos.map((item) => (
                    <tr
                      key={item.id}
                      className={checkedItems[item.id] ? "bg-green-200" : ""}
                    >
                      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-center">
                        
                          {item.articulo.art_detalles}
    
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                        <input
                          type="text"
                          value={item.articulo.art_ultimocosto}
                          onChange={(e) =>
                            handleCostoChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded  py-1 text-center w-16 "
                          disabled={checkedItems[item.id]}
                        />
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <input
                          type="text"
                          value={item.ite_cantidad}
                          onChange={(e) =>
                            handleCantidadChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded  py-1 text-center w-16"
                          disabled={checkedItems[item.id]}
                        />
                      </td>
                      <td className="px-5 py-5  bg-white text-sm flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={checkedItems[item.id]}
                          onChange={() => handleCheckChange(item.id)}

                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-4">
            {order.ped_estado == 0 ?
            <button
              onClick={() => {
                confirmarCompra();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirmar pedido
            </button> : 
              <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                 Pedido Recibido
              </div>
            }
          </div>
        </div>
      ) : (
        <div className="text-gray-600 flex justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center">
            <RiLoader2Fill className="text-[60px] mr-5 text-customBlue" />
            Cargando...
          </div>
        </div>
      )}
    </>
  );
}

export default ModalShopping;
