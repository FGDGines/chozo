import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/elChozo.png";
import logoFGD from "../assets/logo/logoFGD.png";
import background from "../assets/logo/background2.jpg";

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="h-screen flex flex-col items-center pt-10 w-screen justify-start bg-gray-200"
      style={backgroundStyle}
    >
      <img src={logo} alt="El Chozo Logo" className="mb-8 w-[300px]" />

      <div className="flex gap-4 flex-wrap">
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
      <img
        src={logoFGD}
        className="w-[100px] px-2 absolute bottom-3 bg-white rounded-2xl right-[50px]"
        alt=""
      />
    </div>
  );
}

export default Home;
