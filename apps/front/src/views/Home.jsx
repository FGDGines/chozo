import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import logo from "../assets/logo/elChozo.png";
import logoFGD from "../assets/logo/logoFGD.png";
import background from "../assets/logo/background2.jpg";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("selectedCajero");
    localStorage.removeItem("selectedClient");
    localStorage.removeItem("selectedUser");
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const toLogin = () => {
    props.handleLogout();
  };

  return (
    <div className="h-screen  w-screen "
    style={backgroundStyle}>
      
         <button
          onClick={() => toLogin()}
          className="absolute top-5 left-10 p-2 hover:scale-105 transition text-gray-100 duration-300">{<SlLogout className="text-blue-500 h-8 w-8" />}
          </button>

    <div className="flex  items-center  justify-center">
      <img src={logo} alt="El Chozo Logo" className="pt-10 pb-10 w-[300px]" />
      </div>
      <div className="flex justify-center pt-10">
        <div className="grid grid-cols-2 gap-4 place-content-center md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-10">
          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/sales"
          >
            Ventas
          </Link>
          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/shopping"
          >
            Compras
          </Link>

          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/stock"
          >
            Stock
          </Link>
          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/customers"
          >
            Clientes
          </Link>
          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/providers"
          >
            Proveedores
          </Link>

          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/treasury"
          >
            Tesoreria
          </Link>

          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/accounting"
          >
            Contabilidad
          </Link>
          <Link
            className="p-4 w-[150px] text-lg font-bold flex justify-center items-center rounded-3xl bg-blue-500 hover:scale-105 transition text-gray-100 duration-300"
            to="/config"
          >
            Configuracion
          </Link>
        </div>
        </div>
      <img
        src={logoFGD}
        className="w-[100px] px-2 mb-5 absolute bottom-3 bg-white rounded-2xl right-[50px]"
        alt=""
      />
    
    </div>
  );
}

export default Home;
