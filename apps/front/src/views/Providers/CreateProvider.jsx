import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProvider() {
  const token = localStorage.getItem("token");
  const [clients, setClients] = useState([]);
  const [plazo, setPlazo] = useState("");
  const [agenciaId, setAgenciaId] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);

  const notify = () => toast.success("¡Proveedor creado!");
  const notifyError = () => toast.error("¡Faltan datos por completar!");

  const getProvider = async () => {
    try {
      const response = await axios.get("api/terceros", {
        headers: {
          token: token,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error("error al traer proveedor:", error);
    }
  };

  useEffect(() => {
    getProvider();
  }, []);

  const handleInputChange = (event, property) => {
    if (property === "selectedProvider") {
      setSelectedProvider(event.target.value);
    } else if (property === "plazo") {
      setPlazo(event.target.value);
    } else if (property === "agenciaId") {
      setAgenciaId(event.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedProvider || !plazo || !agenciaId) {
        notifyError();
      } else {
        const client = clients.find(
          (c) => c.id === parseInt(selectedProvider, 10)
        );

        const providerData = {
          ter_documento: client.ter_documento,
          ter_tercero: client.ter_tercero,
          ter_apellidos: client.ter_apellidos,
          ter_nombres: client.ter_nombres,
          ter_direccion: client.ter_direccion,
          ter_telefono: client.ter_telefono,
          ter_celular: client.ter_celular,
          ter_email: client.ter_email,
          ciudad_id: client.ciudad_id,
          tipodocumento_id: client.tipodocumento_id,
          tipotercero_id: client.tipotercero_id,
          pro_plazo: parseInt(plazo, 10),
          agencia_id: parseInt(agenciaId, 10),
          token: token,
        };

        const response = await axios.post(
          "api/proveedores",
          providerData
        );

        console.log("al crearse devuelve", response);

        setSelectedProvider(null);
        setPlazo("");
        setAgenciaId("");
        notify();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[80%]">
      <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">
        CREAR PROVEEDOR
      </h2>
      <form className="bg-gray-200 rounded-md mt-4 p-4" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-row justify-start items-center">
          <label htmlFor="cliente" className="block font-semibold w-[30%] mb-1">
            Cliente:
          </label>
          <select
            className="border border-1 px-2 rounded-xl w-[60%] border-gray-300"
            value={selectedProvider || ""}
            onChange={(e) => handleInputChange(e, "selectedProvider")}
          >
            <option value="">Seleccionar</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.ter_tercero}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-row justify-start gap-5 items-center">
          <label htmlFor="plazo" className="block font-semibold mb-1">
            Plazo (días):
          </label>
          <input
            type="text"
            id="plazo"
            name="plazo"
            value={plazo}
            onChange={(e) => handleInputChange(e, "plazo")}
            className="mt-1 p-1 border rounded-md w-[70%]"
          />
        </div>
        <div className="mb-4 flex flex-row justify-start gap-5 items-center">
          <label htmlFor="agencia" className="block font-semibold mb-1">
            Agencia ID:
          </label>
          <input
            type="text"
            id="agencia"
            name="agencia"
            value={agenciaId}
            onChange={(e) => handleInputChange(e, "agenciaId")}
            className="mt-1 p-1 border rounded-md w-[70%]"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 text-white text-xl py-2 px-4 rounded-md hover:bg-green-600"
          >
            Crear Proveedor
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

export default CreateProvider;
