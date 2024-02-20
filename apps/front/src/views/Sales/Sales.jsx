import React, { useState, useRef, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import ShoppingCartTable from "../../components/ShoppingCartTable";
import HeaderVenta from "../../components/HeaderVenta";
import axios from "axios";
import ModalError from "../../components/ModalError";
import { ToastContainer, toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal";
import ModalForpagos from "../../components/ModalForpagos";

function Sales() {
  const token = localStorage.getItem("token");
  const notify = () => toast.success("¡Venta realizada!");

  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [codbarra, setCodbarra] = useState("");
  const [artCodbarra, setArtCodbarra] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =  useState("Efectivo");
  const [descuento, setDescuento] = useState(0);
  const [showModalError, setShowModalError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [selectedCaja, setSelectedCaja] = useState("");
  const [selectedClient1, setselectedClient1] = useState("");
  // pagos
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [ctaBanco, setCtaBanco] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);


  const getCuentaBancaria = async() => {
    try {
      const response = await axios.get("api/cuentasbancarias", {
        headers: {
          token: token,
        },
      });
      setCtaBanco(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const getPaymentMethods = async () => {
    try {
      const response = await axios.get(
        "api/formasdepago",
        {
          headers: {
            token: token,
          },
        }
      );
      const datos = response.data;
      setPaymentMethods(response.data);
      //cargamos el array forpagos
      const array = [];
      datos.forEach((ele) => {

        const newReg = {
          idformapago: ele.id,
          detalle: ele.fpag_detalles,
          manejabanco: ele.fpag_manejabanco,
          valor: 0,
          ctabancoid: 0,
        };
        array.push(newReg);
      });

      const updatedItemsJSON = JSON.stringify(array);
      localStorage.setItem("forpagos", updatedItemsJSON);
    } catch (error) {
      console.error("Error al obtener métodos de pago:", error);
    }
  };

  useEffect(() => {
    getArticles();
    getPaymentMethods();
    getCuentaBancaria();
    const storedCajero = localStorage.getItem("selectedCajero");
    if (storedCajero) {
      setSelectedCaja(JSON.parse(storedCajero));
    };
  }, []);

  const date = new Date();
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const today = date.toISOString();


  const infoHeader = {
    title: "Pedido de venta",
    person1: "Cajero",
    person2: "Cliente",
    isViewSale: true,
    setSelectedCaja,
    setselectedClient1,
  };

  const infoModalError = {
    showModalError,
    setShowModalError,
    mensaje: messageError,
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

  //!abre modal de pago:
  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "Credito") {
      setPaymentModalOpen(true); //
    } else
      setPaymentDetails([
        { ctabancoid: 0, valor: totalAmount, idformapago: 1 },
      ]);
  };

  //!cierra modal
  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

    
  //!agrega al carro
  const handleAddToCart = () => {
    setCodbarra("");
    setArtCodbarra("");
    if (selectedProduct) {
      const newItem = {
        id: selectedProduct.id,
        nombre: selectedProduct.art_detalles,
        marca: selectedProduct.marca.mar_detalles,
        precio: selectedProduct.art_precioventa,
        preciocosto: selectedProduct.art_ultimocosto,
        impuesto: selectedProduct.art_impuestoventa,
        cantidad: quantity,
        total: selectedProduct.art_precioventa * quantity,
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

  const handleSale = async () => {
    console.log("metodo",paymentDetails)
    try {
      if(selectedPaymentMethod=="Efectivo") {

      } else {
        let localStorageItems = JSON.parse(localStorage.getItem("forpagos"));
        let xforpagos = localStorageItems || [];
        setPaymentDetails(xforpagos);
        let suma = 0;
        for(let i=0;i<xforpagos.length;i++) {
            suma += xforpagos[i].valor;
        };
        if(suma !== totalAmount) {
          setMessageError("¡Formas de pago no definidas Correctamente!");
          infoModalError.mensaje = messageError;
          return;
        };   
      };
      const date = new Date();
      const today1 = date.toISOString();
      const venceFac = date.setFullYear(date.getFullYear() + 1);

      const saleData = {
        fecha: today1,
        vence: venceFac,
        bruto: parseFloat(totalAmount.toFixed(2)),
        impuesto: 123,
        total: parseFloat(totalAmount.toFixed(2)),
        metodopago: selectedPaymentMethod === "Efectivo" ? 1 : 2,
        terceroid: selectedClient1.value,
        cajaid: selectedCaja.value,
        items: shoppingCart.map((item) => ({
          articuloId: item.id,
          valoruni: item.precio,
          impuesto: item.impuesto,
          preciocosto: item.preciocosto,
          cantidad: parseFloat(item.cantidad),
        })),
        fpagos: paymentDetails,
        token: token,
      };

      if (
        !selectedClient1 ||
        !saleData.fecha ||
        !saleData.metodopago ||
        !saleData.terceroid ||
        !saleData.cajaid ||
        !saleData.fpagos ||
        saleData.items.length === 0
      ) {
        if (!selectedClient1) {
          setMessageError("¡Falta elegir Cliente!");
        }
        if (!saleData.terceroid) {
          setMessageError("¡Falta elegir Cliente!");
        }
        if (!saleData.cajaid) {
          setMessageError("¡Falta elegir Cajero!");
        }
        if (!saleData.items || saleData.items.length === 0) {
          setMessageError("¡Falta elegir productos!");
        }

        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;
      }

      const response = await axios.post(
        "api/carteraxcobrar",
        saleData
      );

      notify();
      setShoppingCart([]);
      setTotalQuantity(0);
      setTotalAmount(0);
    } catch (error) {
      console.error("error al realizar la venta", error);
    }
  };
  //vacia el carro
  const handleClearCart = () => {
    setShoppingCart([]);
    setTotalQuantity(0);
    setTotalAmount(0);
    setCodbarra("");
    setArtCodbarra("");
    let localStorageItems = JSON.parse(localStorage.getItem("forpagos"));
    let xforpagos = localStorageItems;
    for(let i=0;i<xforpagos.length;i++) {
        xforpagos[i].valor = 0;
        xforpagos[i].idbanco = 0;
    };
    //localStorage.clear("forpagos");
    const updatedItemsJSON = JSON.stringify(xforpagos);
    localStorage.setItem("forpagos", updatedItemsJSON);
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

  const handleCodbarraKeyDown = (event) => {
    if (event.key === "Enter") {
       event.preventDefault();
       const buscado = articles.find((ele) => ele.art_codbarra === codbarra);
       if(!buscado) {
          setMessageError("¡Codigo de Barra Inexistente!");
          setShowModalError(true);
          setCodbarra("");
          infoModalError.mensaje = messageError;
          return;
       };
       setSelectedProduct(buscado);
       setArtCodbarra(buscado.art_detalles);
       console.log(artCodbarra)
       setCodbarra("");
    }
  };

  const handleDescuento = (event) => {
    const newDesc = parseInt(event.target.value, 10);
    setDescuento(newDesc);
  };

  const handleTotalImp = () => {};

  // aca seteo el estilo del input dropdown BUSCAR
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
        <HeaderVenta formattedDate={formattedDate} infoHeader={infoHeader} />
        {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}
        {paymentModalOpen ? (
          <ModalForpagos
            isOpen={paymentModalOpen}
            onClose={handleClosePaymentModal}
            totalAmount={totalAmount}
            ctaBancarias={ctaBanco}
          />
        ) : (
          ""
        )}


        <div className="m-2 flex flex-row gap-2 w-[650px] items-center">
          <input id="codbarra"
          className="text-center rounded-[30px] border-2 border-black p-[2px]"
          type="text"
          placeholder="Codigo de Barra"
          value={codbarra}
          onChange={(e) => setCodbarra(e.target.value)}
          onKeyDown={handleCodbarraKeyDown}
          />
          <div className="text-lg ml-2 mt-0">{artCodbarra}</div>
        </div>
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
            infoHeader={infoHeader}
            shoppingCart={shoppingCart}
            onDeleteFromCart={handleDeleteFromCart}
          />

          <div
            id="div inferior"
            className="flex flex-row justify-between gap-10 w-full px-2 absolute bottom-1 "
          >
            <div className="flex flex-col gap-3  items-center">
              <div>Seleccionar metodo de pago</div>
              <div className="flex flex-row gap-2 justify-around items-center">
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
                  onClick={() => handlePaymentMethod("Credito")}
                  className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                    selectedPaymentMethod === "Credito"
                      ? "bg-customBlue text-white"
                      : ""
                  }`}
                >
                  Formas de Pago
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
                  <div>Impuestos {}</div>
                  {descuento ? (
                    <div className="text-2xl">
                      Total: {((1 - descuento / 100) * totalAmount).toFixed(2)}{" "} €
                    </div>
                  ) : (
                    <div className="text-2xl">
                      Total:{totalAmount.toFixed(2)}{" "} €
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
                <button
                  onClick={() => handleSale()}
                  className="bg-customBlue border-[3px] border-customBlue text-gray-100 py-2 px-5 m-3 rounded-2xl hover:bg-blue-800 hover:border-blue-800 transition"
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
};



export default Sales;
