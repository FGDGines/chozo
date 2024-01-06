import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { IoPersonAdd } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { LuPackagePlus } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";

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
      {
        icon: <MdOutlinePendingActions />,
        text: "Pendientes",
        to: "/pendingToCollect",
      },
    ],
    sell: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      {
        icon: <MdOutlinePendingActions />,
        text: "Pendientes",
        to: "/pendingToCollect",
      },
    ],
    pendingToCollect: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      {
        icon: <MdOutlinePendingActions />,
        text: "Pendientes",
        to: "/pendingToCollect",
      },
    ],
    customers: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      // { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      // { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      { icon: <FaPeopleGroup />, text: "Clientes", to: "/customers" },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createCustomer" },
    ],
    createCustomer: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      // { icon: <RiMoneyDollarCircleFill />, text: "Vender", to: "/sales" },
      // { icon: <FcStatistics />, text: "Ventas", to: "/sell" },
      { icon: <FaPeopleGroup />, text: "Clientes", to: "/customers" },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createCustomer" },
    ],
    shopping: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <MdAddShoppingCart />, text: "Comprar", to: "/buy" },
      { icon: <FcStatistics />, text: "Compras", to: "/shopping" },
    ],
    buy: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <MdAddShoppingCart />, text: "Comprar", to: "/buy" },
      { icon: <FcStatistics />, text: "Compras", to: "/shopping" },
    ],
    providers: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <SlPeople />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createProvider" },
    ],
    createProvider: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <SlPeople />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createProvider" },
    ],
    stock: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
    ],
    createProduct: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
    ],
  };

  const handleSetActiveView = (view) => {
    setActiveView(view);
  };

  const currentViewItems = views[activeView] || [];
  return (
    <div className="z-10 fixed ml-1 flex flex-col justify-center gap-10 items-center w-[65px] min-h-[97%] max-h-screen bg-customBlue text-black rounded-l-[40px] rounded-r-[40px] shadow-lg overflow-auto">
      {currentViewItems.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          onClick={() => handleSetActiveView(activeView)}
        >
          <div className="flex font-SFMedium items-center justify-center flex-col">
            <div
              className={`text-sm text-white ${
                "/" + activeView === item.to
                  ? "bg-red-600 text-[25px] p-2 rounded-[40px] text-gray-800" // vista actual
                  : " text-[25px] p-2 hover:scale-125 transition" // iconos de otras opciones de vista
              }`}
            >
              {item.icon}
            </div>

            {console.log("item", item)}
            {console.log("activeView", activeView)}

            <span
              className={`text-white mx-1  ${
                item.text.length > 6 ? "text-xs" : "text-xs"
              } tracking-wider`}
            >
              {item.text.split("").map((letra, index) => (
                <span key={index} className="inline-block">
                  {letra}
                </span>
              ))}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
