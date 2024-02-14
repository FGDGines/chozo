import React from "react";
import { TiDelete } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import ModalProductDetails from "./ModalProductDetails";
import ModalAlbaran from "./ModalAlbaran";
import ModalProviderDetails from "./ModalProviderDetails";
import ModalShopping from "./ModalShopping";
import ModalCustomerDetails from "./ModalCustomerDetails";

function Modal({ props }) {
  const location = useLocation();
  const isStockRoute = location.pathname === "/stock";
  const isSellRoute = location.pathname === "/sell";
  const isProvRoute = location.pathname === "/providers";
  const isShoppingRoute = location.pathname === "/shopping";
  const isPendingToCollectRoute = location.pathname === "/pendingToCollect";
  const isCustomRoute = location.pathname === "/customers";
  
  const closeWindows = () => {
    props.setShowModal(false);
  };

  return (
    <div className="font-SFRegular h-screen w-screen  bg-transparent absolute z-10 left-0 top-0 flex justify-center items-center">
      <div
        className={`bg-white border-gray-600 border-2 ${
          isShoppingRoute ? "h-[95%] w-[80%]" : "h-[80%] w-[70%]"
        } flex-col flex p-1 rounded-xl`}
      >
        <div className="boton-eliminar">
          <button
            onClick={() => props.setShowModal(false)}
            className="flex justify-end right-0 w-full "
          >
            <TiDelete className="text-3xl bg-red-500 -mr-4 -mt-4 z-10 ring-zinc-100 rounded-2xl text-white hover:scale-110 transition" />
          </button>
        </div>
        {isStockRoute ? <ModalProductDetails props={props} /> : ""}
        {isSellRoute ? <ModalAlbaran props={props} /> : ""}
        {isProvRoute ? <ModalProviderDetails props={props} /> : ""}
        {isShoppingRoute ? <ModalShopping props={props} closeWin={closeWindows}/> : ""}
        {isPendingToCollectRoute ? <ModalAlbaran props={props} /> : ""}
        {isCustomRoute ? <ModalCustomerDetails props={props} /> : ""}
      </div>
    </div>
  );
}

export default Modal;
