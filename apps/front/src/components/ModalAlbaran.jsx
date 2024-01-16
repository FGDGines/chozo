import React from "react";

function ModalAlbaran() {
  return (
    <div
      id="modalAlbaran"
      className="flex justify-center items-center w-full h-full"
    >
      <div className="w-[95%] h-[95%] bg-red-200 flex justify-between items-center flex-col ">
        <div className="w-full clear-start bg-red-300">nombre del cliente</div>
        <div className="w-full"> detalle de productos</div>
        <div className="w-full flex justify-around">
          <button>EXPORTAR </button> Total
        </div>
      </div>
    </div>
  );
}

export default ModalAlbaran;
