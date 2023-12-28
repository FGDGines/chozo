import React, { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../../data.json";

function SellTable() {
  const columns = [
    { header: "n° fact", accessorKey: "id" },
    { header: "fecha", accessorKey: "fecha" },
    { header: "cliente", accessorKey: "cliente" },
    { header: "total", accessorKey: "montoTotal" },
    { header: "a cuenta", accessorKey: "aCuenta" },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: data.ventas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div className="ml-[100px] font-SFRegular">
      <div>Listado de ventas</div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="border-collapse border border-gray-300 rounded-xl w-full">
        <thead className="sticky top-0  text-gray-200 bg-customBlue">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-custoBlue">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="hover:cursor-pointer"
                >
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}{" "}
                    {
                      { asc: "⬆️", desc: "⬇️" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-200 ${
                index % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="text-center text-sm py-2 " key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => table.setPageIndex(0)}>1</button>
      <button onClick={() => table.previousPage()}>Anterior</button>
      <button onClick={() => table.nextPage()}>Siguiente</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        {table.getPageCount()}
      </button>
    </div>
  );
}

export default SellTable;
