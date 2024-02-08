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
    }
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
    <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
      <div
        className={` ${
          isActivo ? "" : "bg-white  opacity-40 hover:cursor-default absolute"
        }`}
      >
        <div
          id="nombre"
          className="w-full clear-start text-xl font-bold text-center p-2"
        >
          <input
            className="border border-1 px-3 rounded-xl"
            type="text"
            value={editedArticle.art_detalles}
            onChange={(e) => handleInputChange(e, "art_detalles")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div id="id">
            <strong>ID:</strong> {props.selectedArticle.id}
          </div>
          <div id="referencia">
            <strong>Referencia:</strong>{" "}
            <input
              className="border border-1 px-2 w-[100px] rounded-xl"
              type="text"
              value={editedArticle.art_referencia}
              onChange={(e) => handleInputChange(e, "art_referencia")}
            />
          </div>
          <div id="unidad">
            <strong>Unidad:</strong> <strong>Unidad:</strong>{" "}
            <select
              className="border border-1 px-2 rounded-xl border-gray-300"
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
            <strong>Cód. de Barra:</strong>
            <input
              className="border border-1 px- rounded-xl border-red-700"
              type="text"
              placeholder="recordar a pol"
              // value={"no se puede cambiar"}
              // onChange={(e) => handleInputChange(e, "uni_detalles")}
            />
          </div>

          {props.selectedArticle.marca && (
            <div id="marca">
              <strong>Marca:</strong>{" "}
              <select
                className="border border-1 px-2 w-[200px] rounded-xl border-gray-300"
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
              <strong>Grupo:</strong>{" "}
              <select
                className="border border-1 px-2 w-[200px] rounded-xl border-gray-300"
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
            <strong>Impuesto:</strong>{" "}
            {/* {props.selectedArticle.art_impuestoventa} */}
            <input
              className="border border-1 border-red-600 px-2 w-[200px] rounded-xl"
              type="select"
              placeholder="Recordar a pol"
              // value={"no deja cambiar"}
              // onChange={(e) => handleInputChange(e, "")}
            />
          </div>
          <div id="costo-promedio">
            <strong>Costo Promedio:</strong>{" "}
            {props.selectedArticle.art_costopromedio}
          </div>
          <div id="costo">
            <strong>Costo:</strong>
            <input
              className="border border-1 px-2 w-[100px] rounded-xl border-gray-300"
              type="select"
              value={editedArticle.art_ultimocosto}
              onChange={(e) => handleInputChange(e, "art_ultimocosto")}
            />
          </div>
          <div id="precio">
            <strong>Precio:</strong>
            <input
              className="border border-1 px-2 w-[100px] rounded-xl border-gray-300"
              type="text"
              value={editedArticle.art_precioventa}
              onChange={(e) => handleInputChange(e, "art_precioventa")}
            />
          </div>
          <div id="fecha-creacion" className="flex flex-col text-center">
            <strong>Fecha Creación:</strong>{" "}
            {formatDateString(props.selectedArticle.createdAt)}
          </div>
          <div id="fecha-modificacion" className="flex flex-col text-center">
            <strong>Última Modificación:</strong>{" "}
            {formatDateString(props.selectedArticle.updatedAt)}
          </div>
        </div>
      </div>
      <div className="w-full h-full  flex justify-around p-2 relative items-end">
        <div className="flex flex-row items-center ">
          <strong className="mr-1 mb-0.5">Activo:</strong>{" "}
          <input
            type="checkbox"
            checked={isActivo}
            onChange={(e) => {
              setIsActivo(!isActivo);
              handleInputChange(e, "art_activo");
            }}
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
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default ModalProductDetails;
