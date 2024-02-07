import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div
      className="h-screen flex flex-col items-center pt-3 w-screen justify-start bg-gray-200"
      style={backgroundStyle}
    >
      <img src={logo} alt="El Chozo Logo" className="mb-8 w-[300px]" />
      <button
        onClick={() => toLogin()}
        className="absolute top-3 left-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Salir
      </button>{" "}
      <div className="flex  flex-col gap-6 justify-center items-center">
        <div className="flex gap-[100px] flex-row">
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
        </div>
        <div className="flex gap-[100px] flex-row">
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
            to="/accounting"
          >
            Contabilidad
          </Link>
        </div>
      </div>
      <img
        src={logoFGD}
        className="w-[100px] px-2 absolute bottom-3 bg-white rounded-2xl right-[50px]"
        alt=""
      />
    </div>
  );
}

export default Home;
