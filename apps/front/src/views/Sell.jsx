import React from "react";
import data from "../../data.json";

function Sell() {
  return (
    <div className="ml-[90px]">
      <h2>Listado de Ventas</h2>
      <ul className="flex flex-row gap-5">
        <li className="font-bold">ID Venta</li>
        <li className="font-bold">Fecha</li>
        <li className="font-bold">Cliente</li>
        <li className="font-bold">Total</li>
        <li className="font-bold">Deuda</li>
      </ul>
      {data.ventas.map((venta) => (
        <ul className="flex flex-row gap-5" key={venta.id}>
          <li>{venta.id}</li>
          <li>{venta.fecha}</li>
          <li>{venta.cliente.nombre}</li>
        </ul>
      ))}
    </div>
  );
}

export default Sell;
