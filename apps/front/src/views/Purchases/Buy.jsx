import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import productos from "../../../data.json";
import ShoppingCartTable from "../../components/ShoppingCartTable";
import HeaderSale from "../../components/HeaderSale";
import ModalError from "../../components/ModalError";
import { ToastContainer, toast } from "react-toastify";

function Buy() {
  const token = localStorage.getItem("token");
  const notify = () => toast.success("¡Compra realizada!");

  const [articles, setArticles] = useState([]);
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
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const getArticles = async () => {
    try {
      const response = await axios.get("api/articulos", {
        headers: {
          token: token,
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getArticles();
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const infoModalError = {
    setSelectedUser,
    showModalError,
    setShowModalError,
    mensaje: messageError,
  };
  const infoHeader = {
    title: "Pedido de compra",
    person1: "Usuario",
    person2: "Proveedor",
    showInfo: "no",
    isViewSale: false,
    setSelectedProvider,
    setSelectedUser,
  };

  const inputBuscarRef = useRef(null);
  const inputCantidadRef = useRef(null);

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    const filteredSuggestions = articles.filter(
      (producto) =>
        (producto.art_detalles.toLowerCase().includes(inputValueLower) ||
          String(producto.id).includes(inputValueLower)) &&
        producto.art_activo === 1 //solo muestra el producto si eta activo
    );
    const limitedSuggestions = filteredSuggestions.slice(0, 8);

    return limitedSuggestions;
  };
  const getSuggestionValue = (suggestion) =>
    suggestion.art_detalles + " " + suggestion.unidade.uni_abreviatura;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.art_detalles}{" "}
      <span className="text-red-500">{suggestion.unidade.uni_abreviatura}</span>
    </div>
  );
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
    if (selectedProduct) {
      const newItem = {
        id: selectedProduct.id,
        nombre: selectedProduct.art_detalles,
        marca: selectedProduct.marca.mar_detalles,
        precio: selectedProduct.art_ultimocosto,
        impuesto: selectedProduct.art_impuestoventa,
        cantidad: quantity,
        total: selectedProduct.art_ultimocosto * quantity,
      };

      setShoppingCart([...shoppingCart, newItem]);
      setTotalQuantity(totalQuantity + parseInt(quantity, 10));

      setTotalAmount(totalAmount + newItem.total);

      setValue("");
      setSelectedProduct(null);
      setQuantity(1);

      inputBuscarRef.current.focus();
    }
    console.log("producto agregado", selectedProduct);
  };

  const handleBuy = async () => {
    try {
      const formattedDate = new Date().toISOString().split("T")[0];

      const buyData = {
        fecha: formattedDate,
        valor: totalAmount,
        solicitante: selectedUser.label,
        proveedor_id: selectedProvider.value,
        items: shoppingCart.map((item) => ({
          cantidad: item.cantidad,
          impuesto: item.impuesto,
          valoruni: item.precio,
          articulo_id: item.id,
        })),
        token: token,
      };

      if (
        !selectedProvider ||
        !buyData.fecha ||
        !buyData.valor ||
        !buyData.solicitante ||
        !buyData.items ||
        buyData.items.length === 0
      ) {
        if (!selectedProvider) {
          setMessageError("¡Falta elegir Proveedor!");
        }
        if (!buyData.fecha) {
          setMessageError("¡Falta elegir fecha!");
        }
        if (!buyData.solicitante) {
          setMessageError("¡Falta elegir Usuario!");
        }
        if (!buyData.items || buyData.items.length === 0) {
          setMessageError("¡Falta elegir productos!");
        }

        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;
      }

      const response = await axios.post(
        "api/pedidos",
        buyData
      );
      notify();

      setShoppingCart([]);
      setTotalQuantity(0);
      setTotalAmount(0);

      console.log("compra completada con éxito", response.data);
    } catch (error) {
      console.error("error al hacer la compra", error);
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
    if (method === "A cuenta") {
      setSelectedPaymentMethod("A cuenta");
    }
  };

  const handleDescuento = (event) => {
    const newDesc = parseInt(event.target.value, 10);
    setDescuento(newDesc);
    console.log("descuento", newDesc);
  };

  const handleTotalImp = () => {};

  // aca seteo el estilo del input dropdown BUSCAR
  const theme = {
    container: {
      position: "",
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
        <HeaderSale formattedDate={formattedDate} infoHeader={infoHeader} />
        {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}

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
                className={`px-4 py-1 rounded-2xl ${
                  infoHeader.isViewSale
                    ? "bg-customBlue text-white"
                    : "bg-gray-600 text-white"
                }`}
                onClick={handleAddToCart}
              >
                Agregar
              </button>
            </div>
          </div>

          <ShoppingCartTable
            infoHeader={infoHeader}
            shoppingCart={shoppingCart}
            onDeleteFromCart={handleDeleteFromCart}
          />

          <div
            id="div inferior"
            className="flex flex-row justify-between gap-10 w-full px-2 absolute bottom-1 "
          >
            <div className="flex flex-col gap-3  items-center">

              
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
                  <div>Impuestos {}</div>
                  {descuento ? (
                    <div className="text-2xl">
                      Total: €{((1 - descuento / 100) * totalAmount).toFixed(2)}{" "}
                    </div>
                  ) : (
                    <div className="text-2xl">
                      Total: €{totalAmount.toFixed(2)}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={handleClearCart}
                  className={`border-[3px]  text-gray-900 py-2 px-5 m-3 rounded-2xl hover:text-white hover:bg-sky-600 hover:border-sky-600 transition ${
                    infoHeader.isViewSale
                      ? "border-customBlue"
                      : "border-gray-700"
                  }`}
                >
                  Borrar todo
                </button>
                <button
                  onClick={() => handleBuy()}
                  className={`text-gray-100 py-2 px-5 m-3 rounded-2xl border-[3px] ${
                    infoHeader.isViewSale
                      ? "bg-customBlue  border-customBlue  hover:bg-blue-800 hover:border-blue-800 transition"
                      : "bg-gray-600  border-gray-600  hover:bg-gray-700 hover:gray-700 transition"
                  } `}
                >
                  CONFIRMAR
                </button>
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
export default Buy;
