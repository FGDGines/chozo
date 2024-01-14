import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import data from "../../../data.json";
import axios from "axios";

function Stock() {
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
  console.log("productos", articles);
  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/articulos");

      setArticles(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "nombre", accessorKey: "art_detalles" },
    { header: "marca", accessorKey: "marca.mar_detalles" },
    { header: "precio", accessorKey: "art_precioventa" },
    { header: "stock", accessorKey: "art_costopromedio" },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => buttonAction(row)}
        >
          Editar
        </button>
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
    <Table data={articles} columns={columns} name={"Productos"} props={props} />
  );
}

export default Stock;
