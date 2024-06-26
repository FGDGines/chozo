import React, { useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";

const ShoppingCartTable = ({ shoppingCart, onDeleteFromCart, infoHeader, onChangeCantidad, onChangeCosto}) => {
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      const totalHeight = tableContainerRef.current.scrollHeight;
      tableContainerRef.current.scrollTop = totalHeight;
    }
  }, [shoppingCart]);

  return (
    <div
      className="overflow-x-auto w-full mt-[50px] pl-2s text-sm max-h-[260px] overflow-y-auto relative"
      ref={tableContainerRef}
    >
      <table className="border-collapse border border-gray-300 rounded-xl w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="bg-custoBlue">
            <th
              className={`border p-2 w-[2%] -translate-y-1 bg-whte text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              N°
            </th>
            <th
              className={`border p-2 w-[5%] -translate-y-1  text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              ID
            </th>
            <th
              className={`border p-2 w-[41%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              Descripción
            </th>
            <th
              className={`border p-2 w-[15%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              Marca
            </th>
            <th
              className={`border p-2 w-[2%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              Cantidad
            </th>
            <th
              className={`border p-2 w-[10%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              {infoHeader.isViewSale ? "Precio unitario" : "Costo unitario"}
            </th>
            <th
              className={`border p-2 w-[5%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              Imp{" "}
            </th>
            <th
              className={`border p-2 w-[20%] -translate-y-1 text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              Total
            </th>
            <th
              className={`border p-2 w-[5%] -translate-y-1  text-white ${
                infoHeader.isViewSale ? "bg-customBlue" : "bg-gray-600"
              }`}
            >
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {shoppingCart.map((item, index) => (
            <tr key={index} className="transition-all hover:bg-gray-200">
              <td className="border px-2 text-center">{index + 1}</td>
              <td className="border px-2 text-center">{item.id}</td>
              <td className="border px-2 text-left">{item.nombre}</td>
              <td className="border px-2 text-left">{item.marca}</td>

              <td className="border px-2 text-center">
                <input type="number" 
                       value={item.cantidad} 
                       onChange={(e)=>onChangeCantidad(e, index)}
                       className="w-20"/></td>
              <td className="border px-2 text-center">
              <input type="number" 
                       value={item.precio.toFixed(2)} 
                       onChange={(e)=>onChangeCosto(e, index)}
                       className="w-20"/>
              </td>
              <td className="border px-2 text-left">{item.impuesto}</td>
              <td className="border p-2 text-center">
                {item.total.toFixed(2)} €
              </td>
              <td className="border text-center">
                <button
                  className="text-red-500 text-xl hover:scale-105 hover:-translate-y-1 transition"
                  onClick={() => onDeleteFromCart(index)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCartTable;
