
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Table from '../../components/Table';


function Accounting() {
  const token = localStorage.getItem("token");
   const [puc, setPuc] = useState([]);
   const [selectedPuc, setSelectedPuc] = useState(null);

   const getPuc = async() => {
      const result = await axios('api/puc', {
         headers: {
         token: token,
      },
      });
      const datos = result.data
      setPuc(datos);
   };

   const props = {
      puc,
      setPuc,
      selectedPuc,
      setSelectedPuc,
   };

   const columns = [
      { header: "Codigo", accessorKey: "puc_codigo" },
      { header: "Cuenta", accessorKey: "puc_cuenta" },
      { header: "Nivel", accessorKey: "puc_nivel" },
      {
        header: "accion",
        accessorKey: "",
        cell: (row) => (
          <button
            className="px-2 py-1 bg-customBlue text-white rounded-md hover:scale-105 transition"
            onClick={() => handleEditar(row)}
          >
            Editar
          </button>
        ),
      },
      {
         header: "accion",
         accessorKey: "",
         cell: (row) => (
           <button
             className="px-2 py-1 bg-customBlue text-white rounded-md hover:scale-105 transition"
             onClick={() => handleEliminar(row)}
           >
             Eliminar
           </button>
         ),
       },
   ];

   useEffect(() => {
      getPuc();
   }, []);

   const handleEditar = async(e, registro) => {

   };

   const handleEliminar = async(e, registro) => {

   };

  return (
   <div className="p-5  w-[97%]">
      <Table
       props={props}
       data={puc}
       columns={columns}
       name={"Cuentas Contables"}
      />
   </div>
  )
};

export default Accounting

