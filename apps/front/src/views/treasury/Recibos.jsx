import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalError from "../../components/ModalError";
import ModalForpagos from "../../components/ModalForpagos";

function Recibos() {
   const token = localStorage.getItem("token");
   const [clientes, setClientes] = useState([]);
   const [facturas, setFacturas] = useState([]);
   const [selectedClient, setSelectedClient] = useState(0);
   const [saldoTotal, setSaldoTotal] = useState(0);
   const [totalAbonos, setTotalAbonos] = useState(0);
   const [showModalError, setShowModalError] = useState(false);
   const [messageError, setMessageError] = useState("");
   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
   const [selectedPaymentMethod, setSelectedPaymentMethod] =  useState("Efectivo");
   const [ctaBanco, setCtaBanco] = useState([]);

   const cargarClientes = async() => {
      const result = await axios.get('api/terceros', {
        headers: {
          token: token,
        },
      });
      const datos = result.data
      setClientes(datos);   
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

   const infoModalError = {
      showModalError,
      setShowModalError,
      mensaje: messageError,
  };

   const date = new Date();
   const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
   }/${date.getFullYear()}`;
   const today = date.toISOString();


   //formas de pago
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
     cargarClientes();
     getCuentaBancaria();
     getPaymentMethods();
   }, []);

   const handleClientChange = (e) => {
      e.preventDefault();
      const value= e.target.value;
      setSelectedClient(value);
      cargarFacturas(value);
   };

   const cargarFacturas = async(value) => {
    const result = await axios.get(`api/carteraxcobrar/tercero/${value}`, {
      headers: {
        token: token,
      },
    });
    const xdatos = result.data;
    //filtramos solo las pendientes
    const datos = xdatos.filter(elem => elem.cxc_saldo>0 && elem.cxc_anulada==0);
    const array = [];
    let sal = 0;
    datos.forEach(element => {
       const newreg = {
          id: element.id,
          cxc_numero: element.cxc_numero,
          cxc_fechafac: element.cxc_fechafac,
          cxc_valor: element.cxc_valor,
          cxc_abonos: element.cxc_abonos,
          cxc_saldo: element.cxc_saldo,
          abonar: 0,
          saldo: element.cxc_saldo,
       };
       array.push(newreg);
       sal+=element.cxc_saldo;
    });
    setFacturas(array);
    setSaldoTotal(sal);
   };

   const handleChange = (e, indice) => {
      const value = e.target.value;
      const array = [];
      let abo = 0;
      facturas.forEach(element => {
         if(element.id == indice) {
            const reg = {
              id: element.id,
              cxc_numero: element.cxc_numero,
              cxc_fechafac: element.cxc_fechafac,
              cxc_valor: element.cxc_valor,
              cxc_abonos: element.cxc_abonos,
              cxc_saldo: element.cxc_saldo,
              abonar: value>element.cxc_saldo ?element.cxc_saldo : value,
              saldo: value>element.cxc_saldo ? 0 : element.cxc_saldo-Number(value),               
            };
            array.push(reg);
            abo+=Number(reg.abonar);
         } else {
           array.push(element);
           abo+=Number(element.abonar);
         }
      });
      setFacturas(array);
      setTotalAbonos(abo);
   };

   const handleGrabar = () => {
      if (selectedClient==0) {
          setMessageError("¡Falta elegir Cliente!");
          setShowModalError(true);
          infoModalError.mensaje = messageError;
          return;
      };
      if(totalAbonos==0) {
        setMessageError("¡No hay valores por abonar!");
        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;        
      };
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
  };

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}
        {paymentModalOpen ? (
          <ModalForpagos
              isOpen={paymentModalOpen}
              onClose={handleClosePaymentModal}
              totalAmount={totalAbonos}
              ctaBancarias={ctaBanco} /> ) : ( "" )}
        <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Recibo de Caja</h2>
        <h2>Fecha : {formattedDate}</h2>
        <div className="flex flex-row items-center gap-3">
            <h2 className="text-l">Cliente : </h2>
            <select name="cliente" 
                    className="w-[400px] border-solid"
                    onChange={(e)=>handleClientChange(e)}>
                    <option value="0">Selecione Cliente</option>
                    {clientes.map(ele =>
                       <option value={ele.id}>{ele.ter_tercero} - {ele.ter_documento}</option>
                    )}
           </select>
        </div>
        <hr/>
        <table className="w-3/4 text-sm text-left text-gray-700 dark:text-gray-700">
            <thead>
              <tr><th>Numero</th><th>Fecha</th><th>Valor</th><th>Abonos</th>
              <th>Saldo Ant.</th><th>Abonar</th><th>Nuevo Saldo</th></tr>
            </thead>
            <tbody>
                {facturas.map(ele =>
                   <tr key={ele.id}>
                     <td>{ele.cxc_numero}</td>
                     <td>{ele.cxc_fechafac}</td>
                     <td>{ele.cxc_valor}</td>
                     <td>{ele.cxc_abonos}</td>
                     <td>{ele.cxc_saldo}</td>
                     <td><input type="number" 
                         name="abonar" 
                         onChange={(e)=>handleChange(e, ele.id)}
                         value={ele.abonar}/></td>
                     <td>{ele.saldo}</td>
                   </tr>
                )}
            </tbody>
        </table>
        <hr/>
        <h2>Saldo Cliente : {saldoTotal}</h2><br/>
        <h2>Total abonos  : {totalAbonos}</h2><br/>
        <h2>Nuevo Saldo   : {saldoTotal-totalAbonos}</h2>
        <hr/>
        <div className="flex flex-col gap-3  items-center">
              <div>Seleccionar metodo de pago</div>
              <div className="flex flex-row gap-2 justify-around items-center">
                  <button
                      onClick={() => handlePaymentMethod("Efectivo")}
                      className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                      selectedPaymentMethod === "Efectivo"
                      ? "bg-customBlue text-white"
                      : "" }`}
                  >Efectivo
                  </button>
                  <button
                      onClick={() => handlePaymentMethod("Credito")}
                      className={`border-2 border-customBlue rounded-2xl px-2 py-1 ${
                      selectedPaymentMethod === "Credito"
                         ? "bg-customBlue text-white"
                         : "" }`}
                  >Formas de Pago
                  </button>
              </div>
        </div><br/>
        <button className="bg-blue-500 px-4 py-2 rounded-md mx-2"
                onClick={() => {
                handleGrabar();
                }}>Guardar Recibo
        </button>

    </div>
   )
};

export default Recibos;