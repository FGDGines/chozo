import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalCustomerDetails({ props }) {
  const token = localStorage.getItem("token");

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
    token: token,
  });

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
            <strong>Nombre:</strong>{" "}
            <input
              type="text"
              value={editedCustomer.ter_tercero}
              onChange={(e) => handleInputChange(e, "ter_tercero")}
            />
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
