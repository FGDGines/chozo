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
        text: "Cartera",
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
      { icon: <LuPackage />, text: "Paises", to: "/paises" },
    ],
    buy: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <MdAddShoppingCart />, text: "Pedido", to: "/buy" },
      { icon: <FcStatistics />, text: "Pedidos", to: "/shopping" },
      {
        icon: <MdOutlinePendingActions />,
        text: "Cartera",
        to: "/pendingReceipt",
      },
    ],
    shopping: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <MdAddShoppingCart />, text: "Pedido", to: "/buy" },
      { icon: <FcStatistics />, text: "Pedidos", to: "/shopping" },
      {
        icon: <MdOutlinePendingActions />,
        text: "Pendientes",
        to: "/pendingReceipt",
      },
    ],
    pendingReceipt: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <MdAddShoppingCart />, text: "Pedido", to: "/buy" },
      { icon: <FcStatistics />, text: "Pedidos", to: "/shopping" },
      {
        icon: <MdOutlinePendingActions />,
        text: "Cartera",
        to: "/pendingReceipt",
      },
    ],

    providers: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <SlPeople />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createProvider" },
      { icon: <IoPersonAdd />, text: "Agencias", to: "/agencias" },
    ],
    createProvider: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <SlPeople />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createProvider" },
      { icon: <IoPersonAdd />, text: "Agencias", to: "/agencias" },
    ],
    agencias: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      {
        icon: <SlPeople />,
        text: "Proveedores",
        to: "/providers",
      },
      { icon: <IoPersonAdd />, text: "Nuevo", to: "/createProvider" },
      { icon: <IoPersonAdd />, text: "Agencias", to: "/agencias" },
    ],
    stock: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Inventario", to: "/inventario" },
    ],
    inventario: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Etiquetas", to: "/etiquetas" },
    ],
    etiquetas: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Inventario", to: "/inventario" },
    ],
    Labels: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Inventario", to: "/inventario" },
    ],
    createProduct: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
      { icon: <LuPackagePlus />, text: "Nuevo", to: "/createProduct" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Etiquetas", to: "/etiquetas" },
    ],
    accounting: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Puc", to: "/accounting" },
      { icon: <LuPackage />, text: "Balance", to: "/balanceprueba" },
      { icon: <LuPackagePlus />, text: "Auxiliares", to: "/auxiliares" },
    ],
    balanceprueba: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Puc", to: "/accounting" },
      { icon: <LuPackagePlus />, text: "Auxiliares", to: "/auxiliares" },
    ],
    auxiliares: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Puc", to: "/accounting" },
      { icon: <LuPackagePlus />, text: "Balance", to: "/balanceprueba" },
    ],
    lineas: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Sublineas", to: "/sublineas" },
      { icon: <LuPackage />, text: "Grupos", to: "/grupos" },
      { icon: <LuPackage />, text: "Marcas", to: "/marcas" },
      { icon: <LuPackage />, text: "Unidades", to: "/unidades" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
    ],  
    sublineas: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Grupos", to: "/grupos" },
      { icon: <LuPackage />, text: "Marcas", to: "/marcas" },
      { icon: <LuPackage />, text: "Unidades", to: "/unidades" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
    ],      
    grupos: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Sublineas", to: "/sublineas" },
      { icon: <LuPackage />, text: "Marcas", to: "/marcas" },
      { icon: <LuPackage />, text: "Unidades", to: "/unidades" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
    ],   
    marcas: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Sublineas", to: "/sublineas" },
      { icon: <LuPackage />, text: "Grupos", to: "/grupos" },
      { icon: <LuPackage />, text: "Unidades", to: "/unidades" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
    ],   
    unidades: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Lineas", to: "/lineas" },
      { icon: <LuPackage />, text: "Sublineas", to: "/sublineas" },
      { icon: <LuPackage />, text: "Grupos", to: "/grupos" },
      { icon: <LuPackage />, text: "Marcas", to: "/marcas" },
      { icon: <LuPackage />, text: "Stock", to: "/stock" },
    ],           
    paises: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Paises", to: "/paises" },
      { icon: <LuPackage />, text: "Departamentos", to: "/departamentos" },
      { icon: <LuPackage />, text: "Ciudades", to: "/ciudades" },
    ],  
    departamentos: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Paises", to: "/paises" },
      { icon: <LuPackage />, text: "Departamentos", to: "/departamentos" },
      { icon: <LuPackage />, text: "Ciudades", to: "/ciudades" },
    ],    
    ciudades: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <LuPackage />, text: "Paises", to: "/paises" },
      { icon: <LuPackage />, text: "Departamentos", to: "/departamentos" },
      { icon: <LuPackage />, text: "Ciudades", to: "/ciudades" },
    ],  
    treasury: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Recibos", to: "/recibos" },
      { icon: <IoPersonAdd />, text: "Egresos", to: "/egresos" },
      { icon: <IoPersonAdd />, text: "Ctas Bancarias", to: "/cuentasbancarias" },
    ],    
    config: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Fuentes", to: "/config" },
      { icon: <IoPersonAdd />, text: "Consecutivos", to: "/consecutivos" },
      { icon: <FaPeopleGroup />, text: "Usuarios", to: "/usuarios" },
    ], 
    cuentasbancarias: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Recibos", to: "/recibos" },
      { icon: <IoPersonAdd />, text: "Egresos", to: "/egresos" },
      { icon: <IoPersonAdd />, text: "Cajas", to: "/treasury" },
    ],   
    consecutivos: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Fuentes", to: "/config" },
      { icon: <IoPersonAdd />, text: "Usuarios", to: "/usuarios" },
    ],  
    usuarios: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Fuentes", to: "/config" },
      { icon: <IoPersonAdd />, text: "Consecutivos", to: "/consecutivos" },
    ],      
    recibos: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Cuentasbancarias", to: "/cuentasbancarias" },
      { icon: <IoPersonAdd />, text: "Egresos", to: "/egresos" },
      { icon: <IoPersonAdd />, text: "Cajas", to: "/treasury" },
    ],   
    egresos: [
      { icon: <MdHome />, text: "Inicio", to: "/home" },
      { icon: <FaPeopleGroup />, text: "Cuentasbancarias", to: "/cuentasbancarias" },
      { icon: <IoPersonAdd />, text: "Recibos", to: "/recibos" },
      { icon: <IoPersonAdd />, text: "Cajas", to: "/treasury" },
    ],                                                                                     
  };

  const handleSetActiveView = (view) => {
    setActiveView(view);
  };

  const currentViewItems = views[activeView] || [];
  return (
    <div className="z-10 fixed ml-1 mt-3 flex flex-col justify-center gap-10 items-center w-[85px] min-h-[97%] max-h-screen bg-customBlue text-black rounded-l-[30px] rounded-r-[30px] shadow-lg overflow-auto">
      {currentViewItems.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          onClick={() => handleSetActiveView(activeView)}
        >
          <div className="flex font-SFMedium items-center justify-center flex-col">
            <div
              className={`${
                "/" + activeView === item.to
                  ? "bg-gray-100 text-[35px]  p-2 rounded-[40px]  text-customBlue" // vista actual
                  : " text-[25px] p-2 hover:scale-125 transition text-white" // iconos de otras opciones de vista
              }`}
            >
              {item.icon}
            </div>

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
