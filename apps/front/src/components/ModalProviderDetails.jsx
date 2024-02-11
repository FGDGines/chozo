import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalProviderDetails({ props }) {
  const token = localStorage.getItem("token");
  const [isActivo, setIsActivo] = useState(props.selectedProvider.pro_activo);

  const [editedProvider, setEditedProvider] = useState({
    pro_plazo: props.selectedProvider.pro_plazo,
    pro_activo: props.selectedProvider.pro_activo,
    tercero_id: props.selectedProvider.tercero.id,
    ter_documento: props.selectedProvider.tercero.ter_documento,
    ter_tercero: props.selectedProvider.tercero.ter_tercero,
    ter_direccion: props.selectedProvider.tercero.ter_direccion,
    ter_telefono: props.selectedProvider.tercero.ter_telefono,
    ter_email: props.selectedProvider.tercero.ter_email,
    ter_celular: props.selectedProvider.tercero.ter_celular,
    ter_apellidos: props.selectedProvider.tercero.ter_apellidos,
    ter_nombres: props.selectedProvider.tercero.ter_nombres,
    ciudad_id: props.selectedProvider.tercero.ciudad_id,
    tipodocumento_id: props.selectedProvider.tercero.tipodocumento_id,
    tipotercero_id: props.selectedProvider.tercero.tipotercero_id,
    agencia_id: props.selectedProvider.agencia_id,
    token: token,
  });

  const handleInputChange = (event, property) => {
    setEditedProvider((prevProvider) => ({
      ...prevProvider,
      [property]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setEditedProvider((prevProvider) => ({
      ...prevProvider,
      pro_activo: event.target.checked ? 1 : 0,
    }));
  };

  const handleUpdate = async () => {
    console.log(editedProvider)
    try {
      const response = await axios.put(
        `api/proveedores/${props.selectedProvider.id}`,
        editedProvider
      );

      props.setProviders(response.data);

      props.setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
    }
  };

  return (
    <div className="w-full h-full">
      {editedProvider.pro_activo ? (
        <div className="w-[99%] h-[95%] flex justify-between items-center flex-col">
          <div>
            <strong>ID:</strong> {props.selectedProvider.id}
          </div>
          <div>
            <strong>Plazo:</strong>{" "}
            <input
              type="text"
              value={editedProvider.pro_plazo}
              onChange={(e) => handleInputChange(e, "pro_plazo")}
            />
          </div>
          <div>
            <strong>Activo:</strong>{" "}
            <input
              type="checkbox"
              checked={editedProvider.pro_activo === 1}
              onChange={handleCheckboxChange}
            />
          </div>
          <div>
            <strong>Documento:</strong> {editedProvider.ter_documento}
          </div>
          <div>
            <strong>Nombre:</strong>{" "}
            <input
              type="text"
              value={editedProvider.ter_tercero}
              onChange={(e) => handleInputChange(e, "ter_tercero")}
            />
          </div>
          <div>
            <strong>Dirección:</strong>{" "}
            <input
              type="text"
              value={editedProvider.ter_direccion}
              onChange={(e) => handleInputChange(e, "ter_direccion")}
            />
          </div>
          <div>
            <strong>Teléfono:</strong>{" "}
            <input
              type="text"
              value={editedProvider.ter_telefono}
              onChange={(e) => handleInputChange(e, "ter_telefono")}
            />
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <input
              type="text"
              value={editedProvider.ter_email}
              onChange={(e) => handleInputChange(e, "ter_email")}
            />
          </div>
          <div>
            <strong>Celular:</strong>{" "}
            <input
              type="text"
              value={editedProvider.ter_celular}
              onChange={(e) => handleInputChange(e, "ter_celular")}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ModalProviderDetails;
