import React, { useState } from "react";
import data from "../../data.json";

function Sell() {
  return (
    <div className="ml-[90px]">
      <h2>Listado de Ventas</h2>
      <ul>
        {data.ventas.map((ventas) => (
          <li className="flex flex-row gap-5" key={ventas.id}>
            <div>{ventas.fecha}</div>
            <div> {ventas.cliente.nombre}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sell;
