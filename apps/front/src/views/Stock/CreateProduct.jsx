import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProduct() {
  const token = localStorage.getItem("token");
  const [groups, setGroups] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [unit, setUnit] = useState([]);

  const notify = () => toast.success("¡Articulo creado!");
  const notifyError = () => toast.error("¡Faltan datos por completar!");

  const getGroups = async () => {
    try {
      const response = await axios.get("api/grupos", {
        headers: {
          token: token,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error al traer grupo:", error);
    }
  };

  const getMarcas = async () => {
    try {
      const response = await axios.get("api/marcas", {
        headers: {
          token: token,
        },
      });
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al traer marcas:", error);
    }
  };

  const getUnit = async () => {
    try {
      const response = await axios.get("api/unidades", {
        headers: {
          token: token,
        },
      });
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
    art_impuestoventa: 0,
    marca_id: null,
    unidad_id: null,
    grupo_id: null,
    art_codbarra: null,
    art_factorconversion: 1,
    token: token,
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
        notifyError();
      } else {
        const response = await axios.post(
          "api/articulos",
          product
        );
        setProduct({
          art_detalles: "",
          art_referencia: "",
          art_ultimocosto: 0,
          art_costopromedio: 0,
          art_precioventa: 0,
          marca_id: 0,
          unidad_id: 0,
          grupo_id: 0,
          art_codbarra: '',
          art_factorconversion: 1,
          art_impuestoventa: 0,
        });
        notify();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <div className="pb-7 ">
      <h2 className="text-2xl bg-customBlue  p-2 rounded-[30px] text-white px-5">
        CREAR PRODUCTO
      </h2>
      </div>
      <div className="bg-white shadow-lg rounded px-8   mb-4 flex flex-col my-2 ">
      <form className="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mt-5 mb-5 gap-5">
            <div className="mb-4  gap-4 items-center">
              <label
                htmlFor="nombre"
                className="block tracking-wide text-grey text-md font-bold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre del articulo"
                value={product.art_detalles}
                onChange={(e) => handleInputChange(e, "art_detalles")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-4 items-center">
              <label htmlFor="ref" className="block tracking-wide text-grey text-md font-bold mb-2">
                Referencia
              </label>
              <input
                type="text"
                id="ref"
                name="ref"
                value={product.art_referencia}
                onChange={(e) => handleInputChange(e, "art_referencia")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="unidad"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Unidad
              </label>
              <select
                className=" block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
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
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="marca"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Marca
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
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
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="grupo"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Grupo
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
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
          
          
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="ultimo-costo"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Costo (€)
              </label>
              <input
                type="text"
                id="ultimo-costo"
                name="ultimo-costo"
                value={product.art_ultimocosto}
                onChange={(e) => handleInputChange(e, "art_ultimocosto")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="precio"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Precio (€)
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={product.art_precioventa}
                onChange={(e) => handleInputChange(e, "art_precioventa")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="impuesto"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Impuesto Venta (%) 
              </label>
              <input
                type="number"
                id="impuesto"
                name="impuesto"
                value={product.art_impuestoventa}
                onChange={(e) => handleInputChange(e, "art_impuestoventa")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>                        
            <div className="mb-4  gap-5 items-center">
              <label
                htmlFor="codbarra"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Codigo Barra 
              </label>
              <input
                type="text"
                id="codbarra"
                name="codbarra"
                value={product.art_codbarra}
                onChange={(e) => handleInputChange(e, "art_codbarra")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>  
            <div className="mb-4 gap-5 items-center">
              <label
                htmlFor="factor"
                className="block tracking-wide text-grey text-md font-bold mb-2"
              >
                Factor Conversion 
              </label>
              <input
                type="number"
                id="factor"
                name="factor"
                value={product.art_factorconversion}
                onChange={(e) => handleInputChange(e, "art_factorconversion")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>                      
          </div>

        <div className=" w-full flex justify-center items-center mt-5">
          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-5 rounded-md hover:bg-gray-800 mb-4"
          >
            Crear Producto
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
      </form>
      </div>
    </div>
  );
}

export default CreateProduct;
