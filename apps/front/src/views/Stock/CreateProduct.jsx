import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateProduct() {
  const [groups, setGroups] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [unit, setUnit] = useState([]);

  const getGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/grupos");
      setGroups(response.data);
    } catch (error) {
      console.error("Error al traer grupo:", error);
    }
  };

  const getMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/marcas");
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al traer marcas:", error);
    }
  };

  const getUnit = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/unidades");
      setUnit(response.data);
    } catch (error) {
      console.error("Error al traer unidades:", error);
    }
  };

  useEffect(() => {
    getGroups();
    getMarcas();
    getUnit();
  }, []);

  const [product, setProduct] = useState({
    art_detalles: null,
    art_referencia: null,
    art_ultimocosto: null,
    art_costopromedio: null,
    art_precioventa: null,
    marca_id: null,
    unidad_id: null,
    grupo_id: null,
  });
  const handleInputChange = (event, property) => {
    if (property === "art_detalles") {
      const nombreCorto = event.target.value
        .toUpperCase()
        .split(/\s+/)
        .map((word, index) => (index === 0 ? word.slice(0, 3) : word[0]))
        .join("");

      setProduct((prevArticle) => ({
        ...prevArticle,
        [property]: event.target.value,
        art_referencia: nombreCorto,
      }));
    } else {
      setProduct((prevArticle) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Producto creado", product);

    try {
      if (
        !product.art_detalles ||
        !product.art_referencia ||
        !product.art_ultimocosto ||
        !product.art_precioventa ||
        !product.grupo_id ||
        !product.marca_id ||
        !product.unidad_id
      ) {
        window.alert("Faltan datos");
      }

      const response = await axios.post(
        "http://localhost:8081/api/articulos",
        product
      );

      console.log("Al crearse devuelve", response);

      setProduct({
        art_detalles: "",
        art_referencia: "",
        art_ultimocosto: 0,
        art_costopromedio: 0,
        art_precioventa: 0,
        marca_id: 0,
        unidad_id: 0,
        grupo_id: 0,
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">
        CREAR PRODUCTO
      </h2>
      <form
        className="mt-4 p-4 bg-gray-100 rounded-md grid grid-cols-2 "
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label
              htmlFor="nombre"
              className="block text-lg font-semibold mb-1"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre del articulo"
              value={product.art_detalles}
              onChange={(e) => handleInputChange(e, "art_detalles")}
              className="mt-1 p-2 border rounded-md w-[70%]"
            />
          </div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label htmlFor="ref" className="block text-lg font-semibold mb-1">
              Nombre corto:
            </label>
            <input
              type="text"
              id="ref"
              name="ref"
              value={product.art_referencia}
              onChange={(e) => handleInputChange(e, "art_referencia")}
              className="mt-1 p-2 border rounded-md w-[30%]"
            />
          </div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label
              htmlFor="unidad"
              className="block text-lg font-semibold mb-1"
            >
              Unidad:
            </label>
            <select
              className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
              value={product.unidad_id || ""}
              onChange={(e) => handleInputChange(e, "unidad_id")}
            >
              <option value="">Seleccionar</option>
              {unit.map((unidad) => (
                <option key={unidad.id} value={unidad.id}>
                  {unidad.uni_detalles}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label htmlFor="marca" className="block text-lg font-semibold mb-1">
              Marca:
            </label>
            <select
              className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
              value={product.marca_id || ""}
              onChange={(e) => handleInputChange(e, "marca_id")}
            >
              <option value="">Seleccionar</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.mar_detalles}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label htmlFor="grupo" className="block text-lg font-semibold mb-1">
              Grupo:
            </label>
            <select
              className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
              value={product.grupo_id || ""}
              onChange={(e) => handleInputChange(e, "grupo_id")}
            >
              <option value="">Seleccionar</option>
              {groups.map((grup) => (
                <option key={grup.id} value={grup.id}>
                  {grup.gru_detalles}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label
              htmlFor="ultimo-costo"
              className="block text-lg font-semibold mb-1"
            >
              Ultimo costo:
            </label>
            <input
              type="text"
              id="ultimo-costo"
              name="ultimo-costo"
              value={product.art_ultimocosto}
              onChange={(e) => handleInputChange(e, "art_ultimocosto")}
              className="border border-1 p-1.5 text-center rounded-xl w-[20%] border-gray-300"
            />
          </div>
          <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
            <label
              htmlFor="precio"
              className="block text-lg font-semibold mb-1"
            >
              Precio:
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={product.art_precioventa}
              onChange={(e) => handleInputChange(e, "art_precioventa")}
              className="border border-1 p-1.5 text-center rounded-xl w-[20%] border-gray-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
