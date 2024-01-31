import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaCircle } from "react-icons/fa";
import axios from "axios";

function Stock() {
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);
  const [articles, setArticles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const props = {
    showModal,
    setShowModal,
    selectedArticle,
    setArticles,
    articles,
  };

  useEffect(() => {
    getArticles();
  }, []);

  // const jsonObject = {
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA2NTczNTQxLCJleHAiOjE3MzgxMDk1NDF9.aDC_wP4TiPdCiwVAwMAEo4A4z7MHWWhuZAEU4o7I7ew",
  // };
  // const jsonString = JSON.stringify(jsonObject);

  const getArticles = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get(
        { token: token },
        "http://localhost:8081/api/articulos"
      );

      console.log("response", response.data);
      setArticles(response.data);
      // console.log(jsonString);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "ref", accessorKey: "art_referencia" },
    { header: "nombre", accessorKey: "art_detalles" },
    { header: "marca", accessorKey: "marca.mar_detalles" },
    { header: "grupo", accessorKey: "grupo.gru_detalles" },
    { header: "precio", accessorKey: "art_precioventa" },
    { header: "stock", accessorKey: "art_costopromedio" },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-customBlue text-white rounded-md hover:scale-105 transition"
          onClick={() => buttonAction(row)}
        >
          Editar
        </button>
      ),
    },
    {
      header: "activo",
      accessorKey: "art_activo",
      cell: (row) => (
        <span className="flex flex-col justify-center items-center">
          {row.row.original.art_activo === 1 ? (
            <FaCircle className="text-green-500" />
          ) : (
            <FaCircle className="text-red-500" />
          )}
        </span>
      ),
    },
  ];

  function buttonAction(row) {
    const articleId = row.row.original.id;
    console.log("ID del artículo:", articleId);
    const selected = articles.find((article) => article.id === articleId);
    setSelectedArticle(selected);
    setShowModal(true);
    // console.log("ir a albaran n°", row.row.original.id);
  }
  return (
    <>
      {/* <Table
        data={articles}
        columns={columns}
        name={"Productos"}
        props={props}
      /> */}
    </>
  );
}

export default Stock;
