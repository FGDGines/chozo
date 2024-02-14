import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalCustomerDetails({ props }) {
  const token = localStorage.getItem("token");
  const [cities, setCities] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [editedCustomer, setEditedCustomer] = useState({
    tercero_id: props.selectedCustomer.id,
    ter_documento: props.selectedCustomer.ter_documento,
    ter_tercero: props.selectedCustomer.ter_tercero,
    ter_direccion: props.selectedCustomer.ter_direccion,
    ter_telefono: props.selectedCustomer.ter_telefono,
    ter_email: props.selectedCustomer.ter_email,
    ter_celular: props.selectedCustomer.ter_celular,
    ter_apellidos: props.selectedCustomer.ter_apellidos,
    ter_nombres: props.selectedCustomer.ter_nombres,
    ciudad_id: props.selectedCustomer.ciudad_id,
    tipodocumento_id: props.selectedCustomer.tipodocumento_id,
    tipotercero_id: props.selectedCustomer.tipotercero_id,
    ter_credito: props.selectedCustomer.ter_credito,
    token: token,
  });

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

  useEffect(() => {
    getCities();
    getTipoDocumentos();
    //getTipoTerceros();
  }, []);

  const handleInputChange = (event, property) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [property]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      pro_activo: event.target.checked ? 1 : 0,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `api/terceros/${props.selectedCustomer.id}`,
        editedCustomer, {
          headers: {
            token: token,
          },
        }
      );
      //vuelvo a consultar los terceros
      const result = await axios.get(`api/terceros`, {
        headers: {token: token,}
      });
      props.setCustomers(result.data);
      props.setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  return (
    <div className="w-full h-full">

        <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
          <div>
            <strong>ID:</strong> {props.selectedCustomer.id}
          </div>
          <div>
            <strong>Documento:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_documento}
              onChange={(e) => handleInputChange(e, "ter_documento")}
            />
          </div>
          <div>
            <strong>Razón social:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_tercero}
              onChange={(e) => handleInputChange(e, "ter_tercero")}
            />
          </div>
          <div>
            <strong>Apellidos:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_apellidos}
              onChange={(e) => handleInputChange(e, "ter_apellidos")}
            />
          </div>
          <div>
            <strong>Nombres:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_nombres}
              onChange={(e) => handleInputChange(e, "ter_nombres")}
            />
          </div>
          <div>
             <strong>Ciudad:</strong>{" "}
             <select name="ciudad_id"
              value={editedCustomer.ciudad_id}
              onChange={(e) => handleInputChange(e, "ciudad_id")}
             >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.ciu_nombre} - {city.departamento.dpt_nombre}
                  </option>
                ))}
             </select>
          </div>
          <div>
            <strong>Dirección:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_direccion}
              onChange={(e) => handleInputChange(e, "ter_direccion")}
            />
          </div>
          <div>
            <strong>Teléfono:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_telefono}
              onChange={(e) => handleInputChange(e, "ter_telefono")}
            />
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_email}
              onChange={(e) => handleInputChange(e, "ter_email")}
            />
          </div>
          <div>
            <strong>Celular:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_celular}
              onChange={(e) => handleInputChange(e, "ter_celular")}
            />
          </div>
          <div>
             <strong>Tipo Documento:</strong>{" "}
             <select  name="tipodocumento_id"
                      value={editedCustomer.tipodocumento_id}
                      onChange={(e) => handleInputChange(e, "tipodocumento_id")}
             >
             {tipoDocumentos.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.tdoc_detalles}
                  </option>
                ))}
             </select>
          </div>
          <div>
              <strong>Cargo a Cuenta:</strong>{" "}
              <select name="ter_credito"
                      value={editedCustomer.ter_credito}
                      onChange={(e) => handleInputChange(e, "ter_credito")}
              >
                  <option value="0">No</option>
                  <option value="1">Si</option>
              </select>
          </div>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>{" "}
        </div>
    </div>
  );
}

export default ModalCustomerDetails;
