import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Modal from "./Modal";

function Table({ data, columns, name, props }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState({
    globalFilter: "",
  });

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering.globalFilter,
      filters: [
        {
          id: "fecha",
          value: filtering.fechaFilter,
          operator: "date-eq",
        },
      ],
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: (value) =>
      setFiltering({ ...filtering, globalFilter: value }),
  });

  return (
    <>
      {props.showModal ? <Modal props={props} data={data} /> : ""}
      <div className="ml-[100px] font-SFRegular flex flex-col max-h-[530px] h-screen ">
        <div className="text-[35px]">Listado de {name}</div>
        <input
          type="text"
          value={filtering.globalFilter}
          onChange={(e) =>
            setFiltering({ ...filtering, globalFilter: e.target.value })
          }
          className="bg-gray-300 w-[300px] rounded-xl mb-1 pl-3 "
          placeholder="Buscar"
        />

        <div className="flex-grow overflow-y-auto">
          <table className="border-collapse border border-gray-300 w-full ">
            <thead className="sticky top-0 text-gray-200 bg-customBlue">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          id="botones-paginado"
          className="p-2 flex justify-center items-center "
        >
          <button
            id="primer-pagina"
            className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
            onClick={() => table.setPageIndex(0)}
          >
            1
          </button>
          <button
            id="pagina-anterior"
            className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
            onClick={() => table.previousPage()}
          >
            <FaArrowLeft />
          </button>
          <button
            id="pagina-siguiente"
            className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
            onClick={() => table.nextPage()}
          >
            {" "}
            <FaArrowRight />
          </button>
          <button
            id="ultima-pagina"
            className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:scale-105 transition "
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            {table.getPageCount()}
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
