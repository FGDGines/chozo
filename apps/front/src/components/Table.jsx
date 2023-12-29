import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function Table({ data, columns, name }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: data,
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
      <div className="text-[35px]">Listado de {name}</div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="border-collapse border border-gray-300 w-full">
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
      <div className="p-2 flex justify-center items-center">
        <button
          className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
          onClick={() => table.setPageIndex(0)}
        >
          1
        </button>
        <button
          className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
          onClick={() => table.previousPage()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
          onClick={() => table.nextPage()}
        >
          {" "}
          <FaArrowRight />
        </button>
        <button
          className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {table.getPageCount()}
        </button>
      </div>
    </div>
  );
}

export default Table;
