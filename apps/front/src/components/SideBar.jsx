import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";

function SideBar() {
  const location = useLocation();
  const [activeView, setActiveView] = useState("sales");

  useEffect(() => {
    const currentView = location.pathname.split("/").pop();
    setActiveView(currentView || "sales");
  }, [location.pathname]);

  const handleSetActiveView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="z-10 fixed ml-1 flex flex-col justify-center gap-10 items-center w-[65px] min-h-[97%] max-h-screen bg-customBlue text-black rounded-l-[40px] rounded-r-[40px] shadow-lg overflow-auto">
      <Link to="/home" onClick={() => handleSetActiveView("sales")}>
        <div className="flex items-center justify-center flex-col">
          <MdHome
            className={` text-[25px] rounded-[50%] text-white ${
              activeView === "home"
                ? " bg-customBlueOpacity pb-1 pt-1 text-indigo-300"
                : "text-white hover:scale-105 transition"
            }`}
          />
          <span className="text-sm text-white">Inicio</span>
        </div>
      </Link>
      <Link to="/sales" onClick={() => handleSetActiveView("sales")}>
        <div className="flex items-center justify-center flex-col">
          <RiMoneyDollarCircleFill
            className={` text-[30px] rounded-[50%] text-white ${
              activeView === "sales"
                ? " bg-customBlueOpacity pb-1 pt-1 text-indigo-300"
                : "text-white hover:scale-105 transition"
            }`}
          />
          <span className="text-sm text-white">Vender</span>
        </div>
      </Link>

      <Link to="/sell" onClick={() => handleSetActiveView("sell")}>
        <div className="flex items-center justify-center flex-col">
          <FcStatistics
            className={` text-[25px] rounded-[50%] text-white ${
              activeView === "sell"
                ? " bg-customBlueOpacity pb-1 pt-1 text-indigo-300"
                : "text-white hover:scale-105 transition"
            }`}
          />
          <span className="text-sm text-white">Ventas</span>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
