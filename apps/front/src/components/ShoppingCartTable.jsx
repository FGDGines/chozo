import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

const ShoppingCartTable = ({ shoppingCart, onDeleteFromCart }) => {
  const tableContainerRef = useRef(null);
  const tableBodyRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (tableContainerRef.current && tableBodyRef.current) {
      const totalHeight = tableBodyRef.current.scrollHeight;
      tableContainerRef.current.scrollTop = totalHeight;
    }
  }, [shoppingCart]);

  const handleRowMouseEnter = (index) => {
    setSelectedRow(index);
  };

  return (
    <div
      className="overflow-x-auto w-full mt-[50px] pl-2s text-sm max-h-[260px] overflow-y-auto relative"
      ref={tableContainerRef}
    >
      <table className="border-collapse border border-gray-300 rounded-xl w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="bg-custoBlue">
            <th className="border p-2 w-[2%] -translate-y-1 bg-whte text-white bg-customBlue">
              N°
            </th>
            <th className="border p-2 w-[5%] -translate-y-1  text-white bg-customBlue">
              ID
            </th>
            <th className="border p-2 w-[53%] -translate-y-1 text-white bg-customBlue">
              Descripción
            </th>
            <th className="border p-2 w-[5%] -translate-y-1 text-white bg-customBlue">
              Cantidad
            </th>
            <th className="border p-2 w-[15%] -translate-y-1 text-white bg-customBlue">
              Precio Unitario
            </th>
            <th className="border p-2 w-[20%] -translate-y-1 text-white bg-customBlue">
              Total
            </th>
            <th className="border p-2 w-[5%] -translate-y-1  text-white bg-customBlue">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody ref={tableBodyRef}>
          {shoppingCart.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                selectedRow === index ? "bg-gray-200" : ""
              } transition-all`}
              onMouseEnter={() => handleRowMouseEnter(index)}
            >
              <td className="border px-2 text-center">{index + 1}</td>
              <td className="border px-2 text-center">{item.id}</td>
              <td className="border px-2 text-left">{item.nombre}</td>
              <td className="border px-2 text-center">{item.cantidad}</td>
              <td className="border px-2 text-center">
                ${item.precio.toFixed(2)}
              </td>
              <td className="border p-2 text-center">
                ${item.total.toFixed(2)}
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
