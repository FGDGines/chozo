import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaCircle } from "react-icons/fa";
import axios from "axios";

function Stock() {
  const token = localStorage.getItem("token");
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

  const getArticles = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get("api/articulos", {
        headers: {
          token: token,
        },
      });

      //console.log("response", response.data);
      setArticles(response.data);
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
    { header: "costo", accessorKey: "art_costopromedio" },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-customBlue text-white rounded-md hover:bg-blue-600"
          onClick={() => buttonAction(row)}
        >
          Editar
        </button>
        
      ),
    },
    {
      header: "acciones",
      accessorKey: "",
      cell: (row) => (
        <button
          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => buttonDelete(row)}
        >
          Eliminar
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
    //console.log("ID del artículo:", articleId);
    const selected = articles.find((article) => article.id === articleId);
    setSelectedArticle(selected);
    setShowModal(true);
  };

  const  buttonDelete = async(row)=>{
    const articleId = row.row.original.id;
    const response = await axios.delete(`api/articulos/${articleId}`, {
      headers: {
        token: token,
      },
    });
    getArticles();
  };


  return (
    <>
      <Table
        data={articles}
        columns={columns}
        name={"Productos"}
        props={props}
      />
    </>
  );
}

export default Stock;
