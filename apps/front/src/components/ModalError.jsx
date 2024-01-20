import React from "react";

function ModalError({ infoModalError }) {
  const cerrarModalError = (boolean) => {
    infoModalError.setShowModalError(boolean);
  };
  return (
    <div
      id="modalAlbaran"
      className="flex bg-transparent absolute z-10  justify-center items-center w-[90%] h-full"
    >
      <div className="w-[35%] h-[40%] bg-gray-100 flex justify-center items-center flex-col rounded-2xl  ">
        <div className="bg-gray-200 flex  rounded-2xl w-[96%] h-[92%]">
          <div className="w-full h-full flex flex-col justify-center items-center text-2xl   ">
            <div className="h-full flex justify-center items-center">
              {infoModalError.mensaje}
            </div>

            <div className="w-full flex  justify-center mb-3 ">
              <button
                className="bg-green-500 rounded-xl px-3 py-1 hover:bg-green-600 text-white transition"
                onClick={() => cerrarModalError(false)}
              >
                Aceptar{" "}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalError;
