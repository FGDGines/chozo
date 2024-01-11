import React from "react";
import { TiDelete } from "react-icons/ti";
import { useLocation } from "react-router-dom";

function Modal({ setShowModal }) {
  const location = useLocation();
  const isStockRoute = location.pathname === "/stock";

  return (
    <div className="font-SFRegular h-screen w-screen bg-red-900 bg-transparent absolute z-10 left-0 top-0 flex justify-center items-center">
      <div className="bg-white border-gray-600 border-2 w-[70%] h-[80%] flex-col flex p-1 rounded-xl ">
        <div>
          <button
            onClick={() => setShowModal(false)}
            className="flex justify-end right-0 w-full "
          >
            <TiDelete className="text-3xl bg-red-500 -mr-4 -mt-4 rounded-2xl text-white hover:scale-110 transition" />
          </button>
        </div>

        {isStockRoute ? (
          <div
            id="modalEditarProducto"
            className="flex justify-center items-center w-full h-full"
          >
            <div className="w-[95%] h-[95%] bg-red-200 flex justify-between items-center flex-col ">
              <div className="w-full clear-start bg-red-300">
                nombre del producto
              </div>
              <div className="w-full"> precio</div>
              <div className="w-full"> iva</div>
              <div className="w-full"> costo</div>
              <div className="w-full"> precio venta</div>

              <div className="w-full flex justify-around">
                <button>EXPORTAR </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="modalAlbaran"
            className="flex justify-center items-center w-full h-full"
          >
            <div className="w-[95%] h-[95%] bg-red-200 flex justify-between items-center flex-col ">
              <div className="w-full clear-start bg-red-300">
                nombre del cliente
              </div>
              <div className="w-full"> detalle de productos</div>
              <div className="w-full flex justify-around">
                <button>EXPORTAR </button> Total
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
