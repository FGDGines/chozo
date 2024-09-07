import React, { useState, useRef, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import ShoppingCartTable from "../../components/ShoppingCartTable";
import HeaderVenta from "../../components/HeaderVenta";
import axios from "axios";
import ModalError from "../../components/ModalError";
import { ToastContainer, toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal";
import ModalForpagos from "../../components/ModalForpagos";
import ModalEfectivo from "../../components/ModalEfectivo";
import ModalCrearCliente from "../../components/ModalCrearCliente";

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
  const [selectedCaja, setSelectedCaja] = useState({});
  const [clientes, setClientes] = useState([]);
  const [selectedClient1, setselectedClient1] = useState(0);
  // pagos
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [ctaBanco, setCtaBanco] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [pagoModalEfectivo, setPagoModalEfectivo] = useState(false);
  const [creaClienteModal, setCreaClienteModal] = useState(false);
  const [idPagoCredito, setIdPagoCredito] = useState(0);

 
  const cargarCaja = async() => {
    const idUsuario = localStorage.getItem("idUsuario");
    const response = await axios.get("api/cajas", {
      headers: {
        token: token,
      },      
    });
    const datos = response.data;
    const datoscaja = datos.find(ele=>ele.usuario_id==idUsuario && ele.caj_activa==1);
    setSelectedCaja(datoscaja);
  };

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

  //traigo el id de clientes varios de la tabla de parametros
  const getClientesVarios = async() => {
    const response = await axios.get("api/parametros/11", {
        headers: {
          token: token,
        },
     });
     const datos = response.data;
     const reg = Number(datos.para_valor);
     setselectedClient1(reg);   
  };

  //traigo el id de forma de pago credito de la tabla de parametros
  const getFpagoCredito = async() => {
    const response = await axios.get("api/parametros/8", {
        headers: {
          token: token,
        },
     });
     const datos = response.data;
     const reg = Number(datos.para_valor);
     setIdPagoCredito(reg);   
  };

  //se trae los clientes para vista VENTA
  const getClient = async () => {
      try {
        const response = await axios.get("api/terceros", {
          headers: {
            token: token,
          },
        });
        setClientes(response.data);
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
    getClient();
    getClientesVarios();
    getFpagoCredito();
    cargarCaja();
    //const storedCajero = localStorage.getItem("selectedCajero");
    //if (storedCajero) {
    //  setSelectedCaja(JSON.parse(storedCajero));
    //};
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
    selectedCaja,
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

  //eliminamos items del carrito
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
    //agregamos directamente al carrito 
    const newItem = {
      id: suggestion.id,
      nombre: suggestion.art_detalles,
      marca: suggestion.marca.mar_detalles,
      precio: suggestion.art_precioventa,
      preciocosto: suggestion.art_ultimocosto,
      impuesto: suggestion.art_impuestoventa,
      cantidad: quantity,
      total: suggestion.art_precioventa * quantity,
    };
    setShoppingCart([...shoppingCart, newItem]);
    setTotalQuantity(totalQuantity + parseInt(quantity, 10));
    setTotalAmount(totalAmount + newItem.total);
    onSuggestionsClearRequested();
    setValue("");
    setSelectedProduct(null);
    setQuantity(1);
    inputBuscarRef.current.focus();
  };

  //cambiamos las cantidades
  const handleChangeCantidad = (e, index) => {
     const updatedCart = [...shoppingCart];
     const value=Number(e.target.value);
     updatedCart[index].cantidad = value;
     updatedCart[index].total = Number(updatedCart[index].precio) * value;
     let can = 0;
     let vtotal = 0;
     updatedCart.forEach(ele => {
       can+=Number(ele.cantidad);
       vtotal+=Number(ele.total);
     });
     setShoppingCart(updatedCart);
     setTotalQuantity(can);
     setTotalAmount(vtotal);
  };

  const handleChangeCosto = (e, index) => {
    const updatedCart = [...shoppingCart];
    const value = Number(e.target.value);
    updatedCart[index].precio = value; 
    updatedCart[index].total = Number(updatedCart[index].cantidad) * value;
    let totalQuantity = 0;
    let totalAmount = 0;
  
    updatedCart.forEach((item) => {
      totalQuantity += Number(item.cantidad);
      totalAmount += Number(item.total);
    });
  
    setShoppingCart(updatedCart); 
    setTotalQuantity(totalQuantity); 
    setTotalAmount(totalAmount); 
  };
  


  //!abre modal de pago:
  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "Credito") {
      setPaymentModalOpen(true); //
    } else
      setPagoModalEfectivo(true);
      setPaymentDetails([
        { ctabancoid: 0, valor: totalAmount, idformapago: 1 },
      ]);
  };

  //!cierra modal
  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    let localStorageItems = JSON.parse(localStorage.getItem("forpagos"));
    let xforpagos = localStorageItems;
    setPaymentDetails(xforpagos);
  };

  //cierra modal pago efectivo
  const handleModalEfectivo = () => {
    setPagoModalEfectivo(false);
  };

  //cierra el modal de creacion de clientes
  const handleCloseModalClientes = () => {
     setCreaClienteModal(false);
     getClient();
  };

  //abre el modald e crear clientes
  const handleOpenModalClientes = () => {
    setCreaClienteModal(true);
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
    try {
      const formasdePago = paymentDetails.filter(ele=>ele.valor>0);
      let suma = 0;
      formasdePago.forEach(ele => {
         suma+=ele.valor;
      });
      if(suma !== totalAmount) {
          setMessageError("¡Formas de pago no definidas Correctamente!");
          setShowModalError(true);
          infoModalError.mensaje = messageError;
          return;
      };  
      //buscamos si dentrod e las formas de pago hay credito o cargo a cuenta
      const credito = formasdePago.find(ele=>ele.idformapago==idPagoCredito);
      if(credito) {
         //averiguamos si el cliente tiene permitido comprar a credito
         const response = await axios.get(`api/terceros/${selectedClient1}`,
          {
            headers: {
              token: token,
            },
          }); 
          const clien = response.data;
          if(clien.ter_credito==0) {
              setMessageError("¡Cliente No tiene permitido Cargo a Cuenta...!");
              setShowModalError(true);
              infoModalError.mensaje = messageError;
              return;
          };
      }; 
      const date = new Date();
      const today1 = date.toISOString();
      const venceFac = date.setFullYear(date.getFullYear() + 1);

      const saleData = {
        fecha: today1,
        vence: today1,
        bruto: parseFloat(totalAmount.toFixed(2)),
        impuesto: 123,
        total: parseFloat(totalAmount.toFixed(2)),
        metodopago: selectedPaymentMethod === "Efectivo" ? 1 : 2,
        terceroid: selectedClient1==0 ? idCliVarios : selectedClient1,
        cajaid: selectedCaja.id,
        items: shoppingCart.map((item) => ({
          articuloId: item.id,
          valoruni: item.precio,
          impuesto: item.impuesto,
          preciocosto: item.preciocosto,
          cantidad: parseFloat(item.cantidad),
        })),
        fpagos: formasdePago,
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
        if (!saleData.terceroid) {
          setMessageError("¡Falta elegir Cliente...!");
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
      };
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
       //agregamos directamente al carrito
       const newItem = {
          id: buscado.id,
          nombre: buscado.art_detalles,
          marca: buscado.marca.mar_detalles,
          precio: buscado.art_precioventa,
          preciocosto: buscado.art_ultimocosto,
          impuesto: buscado.art_impuestoventa,
          cantidad: quantity,
          total: buscado.art_precioventa * quantity,
       };
       setShoppingCart([...shoppingCart, newItem]);
       setTotalQuantity(totalQuantity + parseInt(quantity, 10));
       setTotalAmount(totalAmount + newItem.total);
       setSelectedProduct(null);
       setQuantity(1);
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
      textAlign: "center",
      boxSizing: "border-box",
      "&:focus": {
        outline: "none",
        border: "2px solid blue",
      },

    },
  };

  //funcion para imprimir tiquete usando el plugin
  const imprimir = async() => {
    let nombreImpresora = "SAM4S ELLIX20II";
    let api_key = "12345";
   
    const conector = new connetor_plugin()
                conector.fontsize("2")
                conector.textaling("center")
                conector.text("Ferreteria El Chozo")
                conector.fontsize("1")
                conector.text("Calle de las margaritas #45854")
                conector.text("PEC7855452SCC")
                conector.feed("3")
                conector.textaling("left")
                conector.text(`Fecha : ${formattedDate}`)                        
                conector.text("Descripcion         Cant.       Importe")
                conector.text("------------------------------------------")
                shoppingCart.map(ele => {
                   conector.text(`${ele.nombre}  ${ele.cantidad}  ${ele.total} €`)
                })
                conector.feed("1")
                conector.fontsize("2")
                conector.textaling("center")
                conector.text(`Total : ${totalAmount} €`)
                conector.qr("https://abrazasoft.com")
                conector.feed("5")
                conector.cut("0") 

            const resp = await conector.imprimir(nombreImpresora, api_key);
            if (resp === true) {              
            
            } else {
                 console.log("Problema al imprimir: "+resp)                    
            }
  };


  /////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="ml-[90px] font-SFRegular h-screen w-[92%] flex flex-col">
        <HeaderVenta formattedDate={formattedDate} 
                     infoHeader={infoHeader} 
                     handleOpenModalClientes={handleOpenModalClientes}
                     clientes={clientes}/>
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
        
        {pagoModalEfectivo ? (
           <ModalEfectivo 
              totalAmount= {totalAmount}
              onClose={handleModalEfectivo}/>
        ) :  ("")}

        {creaClienteModal ? (
           <ModalCrearCliente onClose={handleCloseModalClientes}/>
        ) : ("")}

        <div className="m-2 flex flex-row gap-2 w-[650px] items-center">
          <input id="codbarra"
          className="text-center rounded-[30px] border-2 border-black p-[2px]"
          type="text"
          placeholder="Codigo de Barra"
          value={codbarra}
          onChange={(e) => setCodbarra(e.target.value)}
          onKeyDown={handleCodbarraKeyDown}
          />

        </div>
        <div
          id="conteiner"
          className="pl-2 flex-grow relative"
          style={{ minHeight: 0 }}
        >
          <div className="flex flex-row gap-2 absolute bg-white">
            <div className="flex flex-row gap-2 w-[650px] items-center ">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                theme={theme}
                inputProps={{
                  placeholder: "Buscar producto",
                  value,
                  onChange,
                  onKeyDown: handleKeyDown,
                  style: theme.input, 
                  ref: inputBuscarRef,
                }}
              />
            </div>


          </div>

          <ShoppingCartTable
            infoHeader={infoHeader}
            shoppingCart={shoppingCart}
            onDeleteFromCart={handleDeleteFromCart}
            onChangeCantidad={handleChangeCantidad}
            onChangeCosto={handleChangeCosto}
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
                      className="ml-3 w-[70px] border border-1 border-black rounded-lg text-center"
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
                autoClose={2000}
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
      
      <div className="h-screen w-[20%] bg-blue-300">
        <h2>Tiquete de Venta</h2>
      </div>  
    </>
  );
};



export default Sales;
