import React, { useState, useRef } from "react";
import Autosuggest from "react-autosuggest";
import productos from "../../data.json";
import ShoppingCartTable from "../components/ShoppingCartTable";
import HeaderSale from "../components/HeaderSale";

function Sales() {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Efectivo");
  const [descuento, setDescuento] = useState(0);

  const inputBuscarRef = useRef(null);
  const inputCantidadRef = useRef(null);

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    const filteredSuggestions = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(inputValueLower) ||
        String(producto.id).includes(inputValueLower)
    );
    const limitedSuggestions = filteredSuggestions.slice(0, 8);

    return limitedSuggestions;
  };

  const getSuggestionValue = (suggestion) => suggestion.nombre;
  const renderSuggestion = (suggestion) => <div>{suggestion.nombre}</div>;
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleDeleteFromCart = (index) => {
    const updatedCart = [...shoppingCart];
    const deletedItem = updatedCart.splice(index, 1)[0];

    setShoppingCart(updatedCart);
    setTotalQuantity(totalQuantity - deletedItem.cantidad);
    setTotalAmount(totalAmount - deletedItem.total);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedProduct(suggestion);
  };

  const handleAddToCart = () => {
    console.log("SELECTED PRODUCT", selectedProduct);
    if (selectedProduct) {
      const newItem = {
        id: selectedProduct.id,
        nombre: selectedProduct.nombre,
        marca: selectedProduct.marca,
        precio: selectedProduct.precio,
        cantidad: quantity,
        total: selectedProduct.precio * quantity,
      };

      setShoppingCart([...shoppingCart, newItem]);
      setTotalQuantity(totalQuantity + parseInt(quantity, 10));
      setTotalAmount(totalAmount + newItem.total);

      setValue("");
      setSelectedProduct(null);
      setQuantity(1);

      inputBuscarRef.current.focus();
    }
  };

  const handleClearCart = () => {
    setShoppingCart([]);
    setTotalQuantity(0);
    setTotalAmount(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputCantidadRef.current.focus();
    }
  };

  const handleCantidadKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddToCart();
    }
  };

  const handlePaymentMethod = (method) => {
    if (method === "Efectivo") {
      setSelectedPaymentMethod("Efectivo");
    }
    if (method === "Tarjeta") {
      setSelectedPaymentMethod("Tarjeta");
    }
    if (method === "A cuenta") {
      setSelectedPaymentMethod("A cuenta");
    }
  };

  const handleDescuento = (event) => {
    const newDesc = parseInt(event.target.value, 10);
    setDescuento(newDesc);
    console.log("descuento", newDesc);
  };
  console.log("metodo de pago", selectedPaymentMethod);
  // aca seteo el estilo del input BUSCAR
  const theme = {
    container: {
      position: "relative",
      width: "600px",
    },
    suggestionsContainer: {
      backgroundColor: "#F0F0F0",
      position: "absolute",
      zIndex: 1,
      width: "100%",
      borderRadius: "8px",
    },
    suggestion: {
      padding: "10px",
      cursor: "pointer",
    },
    suggestionHighlighted: {
      backgroundColor: "#D6D6D6",
      border: "2px solid black",
    },
    input: {
      borderRadius: "20px",
      border: "2px solid black",
      padding: "2px",
      width: "100%",
      color: "#000000",
      boxSizing: "border-box",
      "&:focus": {
        outline: "none",
        border: "2px solid blue",
      },
    },
  };

  return (
    <>
      <div className="ml-[80px] font-SFRegular h-screen w-[92%] flex flex-col">
        <HeaderSale formattedDate={formattedDate} />
        <div className="text-lg ml-2 mt-5">Pedido</div>

        <div
          id="conteiner"
          className="pl-2 flex-grow relative"
          style={{ minHeight: 0 }}
        >
          <div className="flex flex-row gap-2 absolute bg-white">
            <div className="flex flex-row gap-2 w-[650px] items-center">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                theme={theme}
                inputProps={{
                  placeholder: "Buscar",
                  value,
                  onChange,
                  onKeyDown: handleKeyDown,
                  style: theme.input,
                  ref: inputBuscarRef,
                }}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row items-center gap-3">
                <h6>Cantidad</h6>
                <input
                  id="inputCantidad"
                  className="text-center rounded-[17px] border-2 border-black p-[2px]"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onKeyDown={handleCantidadKeyDown}
                  ref={inputCantidadRef}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-customBlue text-white px-4 py-1 rounded-2xl"
                onClick={handleAddToCart}
              >
                Agregar
              </button>
            </div>
          </div>

          <ShoppingCartTable
            shoppingCart={shoppingCart}
            onDeleteFromCart={handleDeleteFromCart}
          />

          <div
            id="div inferior"
            className="flex flex-row justify-between gap-10 w-full px-2 absolute bottom-1 "
          >
            <div className="flex flex-col gap-3  items-center">
              <div>Seleccionar metodo de pago</div>
              <div
                id="Botones Metodos De Pago"
                className="flex flex-row gap-2 justify-around items-center "
              >
                <button
                  onClick={() => handlePaymentMethod("Efectivo")}
                  className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                    selectedPaymentMethod === "Efectivo"
                      ? "bg-customBlue text-white"
                      : ""
                  }`}
                >
                  Efectivo
                </button>
                <button
                  onClick={() => handlePaymentMethod("Tarjeta")}
                  className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                    selectedPaymentMethod === "Tarjeta"
                      ? "bg-customBlue text-white"
                      : ""
                  }`}
                >
                  Tarjeta
                </button>
                <button
                  onClick={() => handlePaymentMethod("A cuenta")}
                  className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                    selectedPaymentMethod === "A cuenta"
                      ? "bg-customBlue text-white"
                      : ""
                  }`}
                >
                  A cuenta
                </button>
              </div>
            </div>{" "}
            <div className="flex flex-col justify-end items-end">
              <div className="flex flex-row gap-10">
                <div>Total de Productos: {totalQuantity}</div>
                <div className="flex flex-row gap-7 justify-center items-start">
                  <div>
                    Descuento{" "}
                    <input
                      type="number"
                      className="ml-3 w-[70px] border border-1 border-black rounded-lg"
                      value={descuento}
                      onChange={handleDescuento}
                    />
                  </div>
                  <div>Impuestos</div>
                  {descuento ? (
                    <div className="text-2xl">
                      Total: ${((1 - descuento / 100) * totalAmount).toFixed(2)}{" "}
                    </div>
                  ) : (
                    <div className="text-2xl">
                      Total: ${totalAmount.toFixed(2)}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={handleClearCart}
                  className="border-[3px] border-customBlue text-gray-900 py-2 px-5 m-3 rounded-2xl hover:bg-gray-300 hover:border-gray-300 transition"
                >
                  Borrar todo
                </button>
                <button className="bg-customBlue border-[3px] border-customBlue text-gray-100 py-2 px-5 m-3 rounded-2xl hover:bg-blue-800 hover:border-blue-800 transition">
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sales;
