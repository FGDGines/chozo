import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalProductDetails({ props }) {
  const token = localStorage.getItem("token");
  const [groups, setGroups] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [unit, setUnit] = useState([]);
  const [isActivo, setIsActivo] = useState(props.selectedArticle.art_activo);

  console.log("es activo???", isActivo);

  const [editedArticle, setEditedArticle] = useState({
    art_detalles: props.selectedArticle.art_detalles,
    art_referencia: props.selectedArticle.art_referencia,
    art_ultimocosto: props.selectedArticle.art_ultimocosto,
    art_costopromedio: props.selectedArticle.art_costopromedio,
    art_precioventa: props.selectedArticle.art_precioventa,
    marca_id: props.selectedArticle.marca.id,
    unidad_id: props.selectedArticle.unidade.id,
    grupo_id: props.selectedArticle.grupo.id,
    art_activo: props.selectedArticle.art_activo,
    art_impuestoventa: props.selectedArticle.art_impuestoventa,
    art_codbarra: props.selectedArticle.art_codbarra,
    art_factorconversion: props.selectedArticle.art_factorconversion,
  });

  const notify = () => toast.success("¡Articulo modificado!");

  const getGroups = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get("api/grupos", {
        headers: {
          token: token,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("error al traer grupo:", error);
    }
  };

  const getMarcas = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get("api/marcas", {
        headers: {
          token: token,
        },
      });
      setMarcas(response.data);
    } catch (error) {
      console.error("error al traer marcas:", error);
    }
  };

  const getUnit = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get("api/unidades", {
        headers: {
          token: token,
        },
      });
      setUnit(response.data);
    } catch (error) {
      console.error("error al traer unidades:", error);
    }
  };

  useEffect(() => {
    getGroups();
    getMarcas();
    getUnit();
  }, []);

  const formatDateString = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const handleInputChange = (event, property) => {
    if (property === "art_activo") {
      const nuevoEstadoActivo = event.target.checked;
      setEditedArticle((prevArticle) => ({
        ...prevArticle,
        [property]: nuevoEstadoActivo,
      }));
      setIsActivo(nuevoEstadoActivo);
    } else {
      setEditedArticle((prevArticle) => ({
        ...prevArticle,
        [property]:
          property === "unidad_id" ||
          property === "marca_id" ||
          property === "grupo_id"
            ? parseInt(event.target.value, 10)
            : event.target.value,
      }));
    };
    console.log(editedArticle);
  };

  const handleModificar = async () => {
    setIsActivo(false);
    try {
      if (!token) {
        return;
      }
      const response = await axios.put(
        `api/articulos/${props.selectedArticle.id}`,
        editedArticle,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("respuesta del servidor", response);

      setTimeout(() => {
        props.setArticles((prevArticles) => {
          return prevArticles.map((article) =>
            article.id === props.selectedArticle.id ? response.data : article
          );
        });
        props.setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error("error al guardar", error);
    }
  };

  return (
    <div className="flex justify-between items-center flex-col">
        <div
          id="nombre"
          className="w-full clear-start text-3xl font-bold text-center p-2 pb-6"
        >
          <input
            className="px-3 rounded-xl w-full text-center text-gray-800"
            type="text"
            value={editedArticle.art_detalles}
            onChange={(e) => handleInputChange(e, "art_detalles")}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-3">
          <div id="referencia" className="">
            <label className="block text-black font-bold">Referencia:</label>
            <input
              className="block w-full text-center font-bold py-2 text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="text"
              value={editedArticle.art_referencia}
              onChange={(e) => handleInputChange(e, "art_referencia")}
            />
          </div>
          <div id="unidad">
            <label className="block text-black font-bold">Unidad:</label>
            <select
              className="block w-full text-center font-bold py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              value={editedArticle.unidad_id}
              onChange={(e) => handleInputChange(e, "unidad_id")}
            >
              {unit.map((unidad) => (
                <option key={unidad.id} value={unidad.id}>
                  {unidad.uni_detalles}
                </option>
              ))}
            </select>
          </div>
          <div id="codigo-barra">
            <label className="block text-black font-bold">Código de Barra:</label>
            <input
              className="block w-full text-center py-2 text-black bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="text"
              placeholder="codigo de barra"
              value={editedArticle.art_codbarra}
              onChange={(e) => handleInputChange(e, "art_codbarra")}
            />
          </div>

          {props.selectedArticle.marca && (
            <div id="marca">
              <label className="block text-black font-bold">Marca:</label>
              <select
                className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                value={editedArticle.marca_id}
                onChange={(e) => handleInputChange(e, "marca_id")}
              >
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.mar_detalles}
                  </option>
                ))}
              </select>
            </div>
          )}

          {props.selectedArticle.grupo && (
            <div id="grupo">
              <label className="block text-black font-bold">Grupo:</label>
              <select
                className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                value={editedArticle.grupo_id}
                onChange={(e) => handleInputChange(e, "grupo_id")}
              >
                {groups.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.gru_detalles}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div id="impuesto">
            <label className="block text-black font-bold">Impuesto:</label>
            <input
              className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="select"
              placeholder="Impuesto"
              value={editedArticle.art_impuestoventa}
              onChange={(e) => handleInputChange(e, "art_impuestoventa")}
            />
          </div>
          <div id="factor">
            <label className="block text-black font-bold">Factor Conversion:</label>
            <input
              className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="select"
              value={editedArticle.art_factorconversion}
              onChange={(e) => handleInputChange(e, "art_factorconversion")}
            />
          </div>

          <div id="costo">
            <label className="block text-black font-bold">Costo:</label>
            <input
              className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="select"
              value={editedArticle.art_ultimocosto}
              onChange={(e) => handleInputChange(e, "art_ultimocosto")}
            />
          </div>
          <div id="precio">
            <label className="block text-black font-bold">Precio:</label>
            <input
              className="block w-full px-4 py-2  text-gray-700 bg-white border-[0.5px] border-gray-400 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              type="text"
              value={editedArticle.art_precioventa}
              onChange={(e) => handleInputChange(e, "art_precioventa")}
            />
          </div>
          </div>
          <div id="fecha-creacion" className="flex justify-center gap-8 pt-6">
            <div>
            <label className="block text-black font-bold text-center">Fecha Creación:</label>
            {formatDateString(props.selectedArticle.createdAt)}
          </div>
          <div id="fecha-modificacion" className="">
            <label className="block text-black font-bold text-center">Última Modificación:</label>
            {formatDateString(props.selectedArticle.updatedAt)}
          </div>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
        <div className="flex flex-row items-center gap-3 ">
          <lavel className=" text-black font-bold text-center">Activo:</lavel>
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleInputChange(e, "art_activo");
            }}
            className=""
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          EXPORTAR
        </button>
        <div>
          <button
            onClick={() => {
              notify();
              handleModificar();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Modificar
          </button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
}

export default ModalProductDetails;
