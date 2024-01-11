import React, { useState } from "react";

function CreateProduct() {
  const [product, setProduct] = useState({
    nombre: "",
    marca: "",
    precio: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto creado");
  };

  return (
    <div className="ml-[100px] mt-10 ">
      <h2 className="text-2xl bg-red-500 p-2 rounded-md">CREAR PRODUCTO</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Marca:</label>
          {/* <input
            type="text"
            id="marca"
            name="marca"
            value={product.marca}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          /> */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
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
