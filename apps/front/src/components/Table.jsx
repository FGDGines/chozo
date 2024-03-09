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
import { RiLoader2Fill } from "react-icons/ri";

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
      {columns && data && props && name ? (
        <div>
        <div className="mx-auto mt-10 max-w-[80%]">
            <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5 mt-10">Listado de {name}</h2>
        </div>
        <div className="font-SFRegular flex flex-col max-h-[530px] h-screen mx-auto max-w-[90%] ml-[110px]">
          <input
            type="text"
            value={filtering.globalFilter}
            onChange={(e) =>
              setFiltering({ ...filtering, globalFilter: e.target.value })
            }
            className=" w-[300px] rounded-xl mb-1 pl-3 mt-10 mb-2 p-1 border-[0.5px] border-gray-800  rounded-xl mx-1 text-center"
            placeholder="Buscar producto..."
          />
          <div className="flex-grow overflow-y-auto border">
            <table className="border-collapse border-gray-300 w-full ">
              <thead className="sticky top-0  text-gray-200 bg-customBlue">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-custoBlue">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="hover:cursor-pointer text-white"
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
          </div>
          
        </div>
      ) : (
        <div className="text-gray-600 flex justify-center items-center w-full h-screen">
          <div className="flex flex-col justify-center items-center">
            <RiLoader2Fill className="text-[60px] mr-5 text-customBlue" />
            Cargando...
          </div>
        </div>
        
      )}
      
      <div
            id="botones-paginado"
            className="fixed bottom-10 left-0 right-0 bg-white p-2 flex justify-center items-center"
          >
            <button
              id="primer-pagina"
              className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:bg-blue-600 "
              onClick={() => table.setPageIndex(0)}
            >
              1
            </button>
            <button
              id="pagina-anterior"
              className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:bg-blue-600 "
              onClick={() => table.previousPage()}
            >
              <FaArrowLeft />
            </button>
            <button
              id="pagina-siguiente"
              className="px-3 py-1.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:bg-blue-600 "
              onClick={() => table.nextPage()}
            >
              {" "}
              <FaArrowRight />
            </button>
            <button
              id="ultima-pagina"
              className="px-3 py-0.5 bg-customBlue rounded-md text-gray-100 mx-1 hover:bg-blue-600 "
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              {table.getPageCount()}
            </button>
          </div>
    </>
  );
}

export default Table;
