import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCustomer() {
  const [cities, setCities] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [tipoTerceros, setTipoTerceros] = useState([]);

  console.log("tipo doc", tipoDocumentos);
  console.log("tipo ter", tipoTerceros);

  const notify = () => toast.success("¡Articulo creado!");
  const notifyError = () => toast.error("¡Faltan datos por completar!");

  const getCities = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/ciudades");
      setCities(response.data);
    } catch (error) {
      console.error("Error al traer cities:", error);
    }
  };
  const getTipoDocumentos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tipodocumentos"
      );
      setTipoDocumentos(response.data);
    } catch (error) {
      console.error("Error al traer tipoDocs:", error);
    }
  };
  const getTipoTerceros = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tipoterceros"
      );
      setTipoTerceros(response.data);
    } catch (error) {
      console.error("Error al traer tipoTerceros:", error);
    }
  };

  useEffect(() => {
    getCities();
    getTipoDocumentos();
    getTipoTerceros();
  }, []);

  const [client, setClient] = useState({
    ter_documento: null,
    ter_tercero: null,
    ter_apellidos: null,
    ter_nombres: null,
    ter_direccion: null,
    ter_telefono: null,
    ter_celular: null,
    ter_email: null,
    ciudad_id: null,
    tipodocumento_id: null,
    tipotercero_id: null,
  });

  const handleInputChange = (event, property) => {
    if (property === "ter_tercero") {
      setClient((prevArticle) => ({
        ...prevArticle,
        [property]: event.target.value,
      }));
    } else {
      let fullName;

      if (property === "ter_nombres") {
        fullName = event.target.value + " " + (client.ter_apellidos || "");
      } else if (property === "ter_apellidos") {
        fullName = (client.ter_nombres || "") + " " + event.target.value;
      } else {
        fullName = client.ter_nombres + " " + client.ter_apellidos;
      }

      setClient((prevArticle) => ({
        ...prevArticle,
        [property]:
          property === "ciudad_id" ||
          property === "tipodocumento_id" ||
          property === "tipotercero_id"
            ? parseInt(event.target.value, 10)
            : event.target.value,
        ter_tercero: fullName,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Cliente creado", client);

    try {
      if (
        !client.ter_documento ||
        !client.ter_tercero ||
        !client.ter_apellidos ||
        !client.ter_nombres ||
        !client.ter_direccion ||
        !client.ter_telefono ||
        !client.ter_celular ||
        !client.ter_email ||
        !client.ciudad_id ||
        !client.tipodocumento_id ||
        !client.tipotercero_id
      ) {
        notifyError();
      } else {
        const response = await axios.post(
          "http://localhost:8081/api/terceros",
          client
        );

        console.log("Al crearse devuelve", response);

        setClient({
          ter_documento: null,
          ter_tercero: null,
          ter_apellidos: null,
          ter_nombres: null,
          ter_direccion: null,
          ter_telefono: null,
          ter_celular: null,
          ter_email: null,
          ciudad_id: null,
          tipodocumento_id: null,
          tipotercero_id: null,
        });
        notify();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">
        CREAR CLIENTE
      </h2>
      <form className="bg-gray-200 rounded-md mt-4 p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 ">
          <div>
            <div className="mb-4 flex flex-row justify-start items-center">
              <label
                htmlFor="nombre-compl"
                className="block font-semibold w-[30%] mb-1"
              >
                Nombre completo:
              </label>
              <input
                disabled
                type="text"
                id="nombre-completo"
                name="nombre-completo"
                value={client.ter_tercero}
                onChange={(e) => handleInputChange(e, "ter_tercero")}
                className="mt-1 p-1 border  rounded-md  w-[60%]"
              />
            </div>
            <div className="mb-4 flex flex-row justify-start gap-5 items-center">
              <label htmlFor="nombre" className="block font-semibold mb-1">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={client.ter_nombres}
                onChange={(e) => handleInputChange(e, "ter_nombres")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="apellido" className="block font-semibold mb-1">
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={client.ter_apellidos}
                onChange={(e) => handleInputChange(e, "ter_apellidos")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>

            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="documento" className="block font-semibold mb-1">
                Documento:
              </label>
              <input
                type="text"
                id="documento"
                name="documento"
                value={client.ter_documento}
                onChange={(e) => handleInputChange(e, "ter_documento")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>

            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="ciudad" className="block font-semibold mb-1">
                Ciudad:
              </label>
              <select
                className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
                value={client.ciudad_id || ""}
                onChange={(e) => handleInputChange(e, "ciudad_id")}
              >
                <option value="">Seleccionar</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.ciu_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="tipoDoc" className="block font-semibold mb-1">
                Tipo documento:
              </label>
              <select
                className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
                value={client.tipodocumento_id || ""}
                onChange={(e) => handleInputChange(e, "tipodocumento_id")}
              >
                <option value="">Seleccionar</option>
                {tipoDocumentos.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.tdoc_detalles}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="tipoTercero" className="block font-semibold mb-1">
                Tipo tercero:
              </label>
              <select
                className="border border-1 px-2 rounded-xl w-[50%] border-gray-300"
                value={client.tipotercero_id || ""}
                onChange={(e) => handleInputChange(e, "tipotercero_id")}
              >
                <option value="">Seleccionar</option>
                {tipoTerceros.map((ter) => (
                  <option key={ter.id} value={ter.id}>
                    {ter.tter_detalles}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {" "}
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="direccion" className="block font-semibold mb-1">
                Direccion:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={client.ter_direccion}
                onChange={(e) => handleInputChange(e, "ter_direccion")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="telefono" className="block font-semibold mb-1">
                Telefono:
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={client.ter_telefono}
                onChange={(e) => handleInputChange(e, "ter_telefono")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="celular" className="block font-semibold mb-1">
                Celular:
              </label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={client.ter_celular}
                onChange={(e) => handleInputChange(e, "ter_celular")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>
            <div className="mb-4 flex flex-row  justify-start gap-5 items-center">
              <label htmlFor="email" className="block font-semibold mb-1">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={client.ter_email}
                onChange={(e) => handleInputChange(e, "ter_email")}
                className="mt-1 p-1 border rounded-md w-[70%]"
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 text-white text-xl py-2 px-4 rounded-md hover:bg-green-600"
          >
            Crear Cliente
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
  );
}

export default CreateCustomer;
