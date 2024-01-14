import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Modal({ props }) {
  const location = useLocation();
  const isStockRoute = location.pathname === "/stock";
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

  const getGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/grupos");
      setGroups(response.data);
    } catch (error) {
      console.error("error al traer grupo:", error);
    }
  };
  const getMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/marcas");
      setMarcas(response.data);
    } catch (error) {
      console.error("error al traer marcas:", error);
    }
  };
  const getUnit = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/unidades");
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
    console.log("estado articulo editado", editedArticle);
    try {
      const response = await axios.put(
        `http://localhost:8081/api/articulos/${props.selectedArticle.id}`,
        editedArticle
      );
      console.log("respuesta del servidor", response);

      props.setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === props.selectedArticle.id ? response.data : article
        )
      );
      props.setShowModal(false);
    } catch (error) {
      console.error("error al guardar", error);
    }
  };

  return (
    <div className="font-SFRegular h-screen w-screen  bg-transparent absolute z-10 left-0 top-0 flex justify-center items-center">
      <div className="bg-white border-gray-600 border-2 w-[70%] h-[80%] flex-col flex p-1 rounded-xl ">
        <div className="boton-eliminar">
          <button
            onClick={() => props.setShowModal(false)}
            className="flex justify-end right-0 w-full "
          >
            <TiDelete className="text-3xl bg-red-500 -mr-4 -mt-4 rounded-2xl text-white hover:scale-110 transition" />
          </button>
        </div>

        {isStockRoute ? (
          <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
            <div
              className={` ${
                isActivo
                  ? ""
                  : "bg-white  opacity-40 hover:cursor-default absolute"
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
                <div id="grupo">
                  <strong>Grupo:</strong>{" "}
                  <select
                    className="border border-1 px-2 w-[200px] rounded-xl border-gray-300"
                    value={editedArticle.grupo_id}
                    onChange={(e) => handleInputChange(e, "grupo_id")}
                  >
                    {groups.map((grup) => (
                      <option key={grup.id} value={grup.id}>
                        {grup.gru_detalles}
                      </option>
                    ))}
                  </select>
                </div>
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
                <div
                  id="fecha-modificacion"
                  className="flex flex-col text-center"
                >
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
              <button
                onClick={() => handleModificar()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Modificar
              </button>
            </div>
          </div>
        ) : (
          <div
            id="modalAlbaran"
            className="flex justify-center items-center w-full h-full"
          >
            <div className="w-[95%] h-[95%] bg-red-200 flex justify-between items-center flex-col ">
              <div className="w-full clear-start bg-red-300">
                nombre del cliente
              </div>
              <div className="w-full"> detalle de productos</div>
              <div className="w-full flex justify-around">
                <button>EXPORTAR </button> Total
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
