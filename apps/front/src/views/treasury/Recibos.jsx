import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalError from "../../components/ModalError";
import ModalForpagos from "../../components/ModalForpagos";

function Recibos() {
   const token = localStorage.getItem("token");
   const notify = () => toast.success("¡Recibo de Caja realizado!");
   const [clientes, setClientes] = useState([]);
   const [facturas, setFacturas] = useState([]);
   const [selectedClient, setSelectedClient] = useState(0);
   const [saldoTotal, setSaldoTotal] = useState(0);
   const [totalAbonos, setTotalAbonos] = useState(0);
   const [showModalError, setShowModalError] = useState(false);
   const [messageError, setMessageError] = useState("");
   const [ctaBanco, setCtaBanco] = useState([]);
   const [cajas, setCajas] = useState([]);
   const [selectedCaja, setSelectedCaja] = useState("");
   const [formasPago, setFormasPago] = useState([]);
   const [forpagoid, setForpagoid] = useState(0);
   const [fuenteId, setFuenteId] = useState(0);
   const [selectedCtaBanco, setSelectedCtaBanco] = useState(0);

   const cargarClientes = async() => {
      const result = await axios.get('api/terceros', {
        headers: {
          token: token,
        },
      });
      const datos = result.data
      setClientes(datos);   
   };

   const cargarFuente = async() => {
    const result = await axios.get('api/parametros/10', {
      headers: {
        token: token,
      },
    });
    const datos = result.data
    setFuenteId(datos);  
   };

   const cargarCajas = async() => {
    const result = await axios.get('api/cajas', {
      headers: {
        token: token,
      },
    });
    const datos = result.data
    setCajas(datos);  
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

   const handleFormaPago = (e) => {
      const value = e.target.value;
      setForpagoid(value);
   };

   const handleCtaBanco = (e) => {
    const value = e.target.value;
    setSelectedCtaBanco(value);
   };

   const handleCaja = (e) => {
    const value = e.target.value;
    setSelectedCaja(value);
   };

   //formas de pago
   const getPaymentMethods = async () => {
      const response = await axios.get(
        "api/formasdepago",
        {
          headers: {
            token: token,
          },
        }
      );
      const xdatos = response.data;
      const datos = xdatos.filter(ele => ele.fpag_manejabanco>0);
      setFormasPago(datos);
  };


   useEffect(() => {
     cargarClientes();
     getCuentaBancaria();
     getPaymentMethods();
     cargarFuente();
     cargarCajas();
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

   const handleGrabar = async() => {
      if (selectedCaja==0) {
         setMessageError("¡Falta elegir Caja!");
         setShowModalError(true);
         infoModalError.mensaje = messageError;
         return;
      };
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
      if(forpagoid==0) {
        setMessageError("¡No ha seleccionado forma de pago!");
        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;        
      };      
      if(selectedCtaBanco==0) {
        setMessageError("¡No ha seleccionado Cta Bancaria!");
        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;        
      };      

      const date = new Date();
      const today1 = date.toISOString();
      const items = [];
      facturas.forEach(ele => {
         if(ele.abonar>0) {
            const reg = {tipo: 1, carteraid: ele.id, valor: ele.abonar, pucid: ele.puc_id};
            items.push(reg);
         };
      });

      const datos = {
        valor: totalAbonos,
        fecha: today1,
        ctabancoid: selectedCtaBanco,
        cajaid: selectedCaja,
        terceroid: selectedClient,
        fuenteid: Number(fuenteId.para_valor),
        items,
        fpagos: [{ctabancoid: selectedCtaBanco,
                  idformapago: forpagoid,
                  valor: totalAbonos}],
        detalles: "Cancelamos Factura"
      };
      try {
        const result = await axios.post('api/tesoreria', datos, {
          headers: {
            token: token,
          },
        });
        notify();
        setFacturas([]);
        setForpagoid(0);
        setSaldoTotal(0);
        setSelectedClient(0);
        setTotalAbonos(0);        
      } catch (error) {
        console.log("Error al ejecutar Recibo");
        setMessageError("¡Error al grabar Recibo!");
        setShowModalError(true);
        infoModalError.mensaje = messageError;
        return;        
      }

   };

  

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}
        <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Recibo de Caja</h2>
        <label>Caja : </label>
        <select name="cajaid"
                value={selectedCaja}
                onChange={(e)=>handleCaja(e)}>
           <option value="0">Seleccione</option>
           {cajas.map(ele =>
              <option value={ele.id}>{ele.caj_detalles}</option>
           )}
        </select><br/>
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
        <br/>
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
        <br/>
        <hr/>
        <h2>Saldo Cliente : {saldoTotal}</h2>
        <h2>Total abonos  : {totalAbonos}</h2>
        <h2>Nuevo Saldo   : {saldoTotal-totalAbonos}</h2>
        <hr/>
        <label>Forma de Pago : </label>
        <select name="forpagoid"
                value={forpagoid}
                onChange={(e)=>handleFormaPago(e)}>
           <option value="0">Seleccione</option>
           {formasPago.map(ele =>
              <option value={ele.id}>{ele.fpag_detalles}</option>
           )}
        </select><br/>
        <label>Cta Bancaria Destino : </label>
        <select name="ctabancaria"
                value={selectedCtaBanco}
                onChange={(e)=>handleCtaBanco(e)}>
           <option value="0">Seleccione</option>
           {ctaBanco.map(ele =>
              <option value={ele.id}>{ele.cue_banco} {ele.cue_numero}</option>
           )}
        </select><br/>
        <button className="bg-blue-500 px-4 py-2 rounded-md mt-4"
                onClick={() => {
                handleGrabar();
                }}>Guardar Recibo
        </button>
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
   )
};

export default Recibos;