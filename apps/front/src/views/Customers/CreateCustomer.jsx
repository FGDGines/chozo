import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCustomer() {
  const token = localStorage.getItem("token");
  const [cities, setCities] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [tipoTerceros, setTipoTerceros] = useState([]);

  const notify = () => toast.success("¡Cliente creado!");
  const notifyError = () => toast.error("¡Faltan datos por completar!");

  const getCities = async () => {
    try {
      const response = await axios.get("api/ciudades", {
        headers: {
          token: token,
        },
      });
      setCities(response.data);
    } catch (error) {
      console.error("Error al traer cities:", error);
    }
  };
  const getTipoDocumentos = async () => {
    try {
      const response = await axios.get("api/tipodocumentos", {
        headers: {
          token: token,
        },
      });
      setTipoDocumentos(response.data);
    } catch (error) {
      console.error("Error al traer tipoDocs:", error);
    }
  };
  const getTipoTerceros = async () => {
    try {
      const response = await axios.get("api/tipoterceros", {
        headers: {
          token: token,
        },
      });
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
    ter_cliente: 1,
    ter_credito: 0,
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
          property === "tipotercero_id" ||
          property === "ter_credito"
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
        const response = await axios.post("api/terceros",client, {
          headers: {
            token: token,
          },
        });

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
          ter_cliente: 1,
          ter_credito: 0,
        });
        notify();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <div className="pb-6 ">
      <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">
        CREAR CLIENTE
      </h2>
      </div>
      <div className="bg-gray-100 shadow-lg border-[1.5px]  border-bg-gray-100 rounded px-8   mb-4 flex flex-col my-2 ">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mt-5 mb-5 gap-5">
            <div className="mb-4  gap-4 items-center">
              <label
                htmlFor="nombre-compl"
                className="block tracking-wide text-grey text-md font-bold mb-2"
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
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-4 items-center">
              <label htmlFor="nombre" className="block tracking-wide text-grey text-md font-bold mb-2">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={client.ter_nombres}
                onChange={(e) => handleInputChange(e, "ter_nombres")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-4 items-center">
              <label htmlFor="apellido" className="block tracking-wide text-grey text-md font-bold mb-2">
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={client.ter_apellidos}
                onChange={(e) => handleInputChange(e, "ter_apellidos")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>

            <div className="mb-4  gap-4 items-center">
              <label htmlFor="documento" className="block tracking-wide text-grey text-md font-bold mb-2">
                Documento:
              </label>
              <input
                type="text"
                id="documento"
                name="documento"
                value={client.ter_documento}
                onChange={(e) => handleInputChange(e, "ter_documento")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>

            <div className="mb-4  gap-4 items-center">
              <label htmlFor="ciudad" className="block tracking-wide text-grey text-md font-bold mb-2">
                Ciudad:
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3 font-medium"
                value={client.ciudad_id || ""}
                onChange={(e) => handleInputChange(e, "ciudad_id")}
              >
                <option value="">Seleccionar</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.ciu_nombre} - {city.departamento.dpt_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="tipoDoc" className="block tracking-wide text-grey text-md font-bold mb-2">
                Tipo documento:
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3 font-medium"
                value={client.tipodocumento_id || ""}
                onChange={(e) => handleInputChange(e, "tipodocumento_id")}
              >
                <option value="0">Seleccionar</option>
                {tipoDocumentos.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.tdoc_detalles}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="tipoTercero" className="block font-semibold mb-1">
                Tipo tercero:
              </label>
              <select
                className="block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3 font-medium"
                value={client.tipotercero_id || ""}
                onChange={(e) => handleInputChange(e, "tipotercero_id")}
              >
                <option value="0">Seleccionar</option>
                {tipoTerceros.map((ter) => (
                  <option key={ter.id} value={ter.id}>
                    {ter.tter_detalles}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="direccion" className="block font-semibold mb-1">
                Direccion:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={client.ter_direccion}
                onChange={(e) => handleInputChange(e, "ter_direccion")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="telefono" className="block font-semibold mb-1">
                Telefono:
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={client.ter_telefono}
                onChange={(e) => handleInputChange(e, "ter_telefono")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="celular" className="block font-semibold mb-1">
                Celular:
              </label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={client.ter_celular}
                onChange={(e) => handleInputChange(e, "ter_celular")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
              <label htmlFor="email" className="block tracking-wide text-grey text-md font-bold mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={client.ter_email}
                onChange={(e) => handleInputChange(e, "ter_email")}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3"
              />
            </div>
            <div className="mb-4  gap-5 items-center">
            <label htmlFor="credito" className="block tracking-wide text-grey text-md font-bold mb-2">
                Cargo a Cuenta:
              </label>
              <select name="ter_credito"
                 value={client.ter_credito || ""}
                 onChange={(e) => handleInputChange(e, "ter_credito")}
                 className=" block w-full bg-grey-lighter text-grey-darker border-[0.5px] border-gray-400 rounded-lg py-3 px-4 mb-3 font-medium"
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
            </div>
          </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-5 rounded-md hover:bg-gray-800 mb-4"
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
    </div>
  );
}

export default CreateCustomer;
