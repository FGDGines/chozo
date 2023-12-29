import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";

function SideBar() {
  const location = useLocation();
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const currentView = location.pathname.split("/").pop();
    setActiveView(currentView || "home");
  }, [location.pathname]);

  const views = {
    home: [{ icon: <MdHome />, text: "Inicio", to: "/home" }],
    sales: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      { icon: <FcStatistics />, text: "Clientes", to: "/customers" },
    ],
    sell: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      { icon: <FcStatistics />, text: "Clientes", to: "/customers" },
    ],
    customers: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      { icon: <FcStatistics />, text: "Clientes", to: "/customers" },
    ],
    shopping: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Comprar", to: "/buy" },
      { icon: <FcStatistics />, text: "Compras", to: "/shopping" },
      { icon: <FcStatistics />, text: "Proveedores", to: "/providers" },
    ],
    buy: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Comprar", to: "/buy" },
      { icon: <FcStatistics />, text: "Compras", to: "/shopping" },
      { icon: <FcStatistics />, text: "Proveedores", to: "/providers" },
    ],
    providers: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <RiMoneyDollarCircleFill />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <FcStatistics />, text: "Crear nuevo", to: "/createProvider" },
    ],
    createProvider: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <RiMoneyDollarCircleFill />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <FcStatistics />, text: "Crear nuevo", to: "/createProvider" },
    ],
    stock: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Stock", to: "/stock" },
      { icon: <FcStatistics />, text: "Crear nuevo", to: "/createProduct" },
    ],
    createProduct: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Stock", to: "/stock" },
      { icon: <FcStatistics />, text: "Crear nuevo", to: "/createProduct" },
    ],
  };

  const handleSetActiveView = (view) => {
    setActiveView(view);
  };

  // ...

  const currentViewItems = views[activeView] || [];

  return (
    <div className="z-10 fixed ml-1 flex flex-col justify-center gap-10 items-center w-[65px] min-h-[97%] max-h-screen bg-customBlue text-black rounded-l-[40px] rounded-r-[40px] shadow-lg overflow-auto">
      {currentViewItems.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          onClick={() => handleSetActiveView(activeView)}
        >
          <div className="flex items-center justify-center flex-col">
            {item.icon}
            <span
              className={`text-sm text-white ${
                activeView === item.to
                  ? "bg-customBlueOpacity pb-1 pt-1 text-gray-800"
                  : "text-white hover:scale-105 transition"
              }`}
            >
              {item.text}
            </span>
          </div>
        </Link>
      ))}
    </div>

    // ...
  );
}

export default SideBar;
