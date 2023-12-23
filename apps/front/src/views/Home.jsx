import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className="flex gap-3 flex-wrap">
        <Link
          className="p-5 w-[150px] text-xl text-bold flex justify-center items-center rounded bg-customBlue hover:scale-105 transition"
          to="/sales"
        >
          <button>Ventas</button>
        </Link>

        <Link
          className="p-5 w-[150px] text-xl text-bold flex justify-center items-center rounded bg-customBlue hover:scale-105 transition"
          to="/purchases"
        >
          <button>Compras</button>
        </Link>

        <Link
          className="p-5 w-[150px] text-xl text-bold flex justify-center items-center rounded bg-customBlue hover:scale-105 transition"
          to="/stock"
        >
          <button>Stock</button>
        </Link>

        <Link
          className="p-5 w-[150px] text-xl text-bold flex justify-center items-center rounded bg-customBlue hover:scale-105 transition"
          to="/providers"
        >
          <button>Proveedores</button>
        </Link>

        <Link
          className="p-5 w-[150px] text-xl text-bold flex justify-center items-center rounded bg-customBlue hover:scale-105 transition"
          to="/accounting"
        >
          <button>Contabilidad</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
