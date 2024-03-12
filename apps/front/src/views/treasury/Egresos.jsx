import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalError from "../../components/ModalError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Egresos() {
   const token = localStorage.getItem("token");
   const notify = () => toast.success("¡Egreso realizado!");
   const [showModalError, setShowModalError] = useState(false); 
   const [ctaBanco, setCtaBanco] = useState([]);
   const [cajas, setCajas] = useState([]);
   const [messageError, setMessageError] = useState("");
   const [selectedCaja, setSelectedCaja] = useState("");
   const [providers, setProviders] = useState([]);
   const [selectedProvider, setSelectedProvider] = useState(0);
   const [facturas, setFacturas] = useState([]);
   const [saldoTotal, setSaldoTotal] = useState(0);
   const [totalAbonos, setTotalAbonos] = useState(0);
   const [formasPago, setFormasPago] = useState([]);
   const [forpagoid, setForpagoid] = useState(0);
   const [selectedCtaBanco, setSelectedCtaBanco] = useState(0);
   const [fuenteId, setFuenteId] = useState(0);

   const date = new Date();
   const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
   }/${date.getFullYear()}`;
   const today = date.toISOString();

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

  const cargarFuente = async() => {
    const result = await axios.get('api/parametros/9', {
      headers: {
        token: token,
      },
    });
    const datos = result.data
    setFuenteId(datos);  
   };

  const infoModalError = {
    showModalError,
    setShowModalError,
    mensaje: messageError,
  };

  //carga de proveedores
  const getProviders = async () => {
    try {
      const response = await axios.get(
        "api/proveedores",
        {
          headers: {
            token: token,
          },
        }
      );

      setProviders(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //carga de formas de pago
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

  const cargarFacturas = async(value) => {
    const result = await axios.get(`api/carteraxpagar/tercero/${value}`, {
      headers: {
        token: token,
      },
    });
    const xdatos = result.data;
    //filtramos solo las pendientes
    const datos = xdatos.filter(elem => elem.cxp_saldo>0 && elem.cxp_anulada==0);
    const array = [];
    let sal = 0;
    datos.forEach(element => {
       const newreg = {
          id: element.id,
          cxp_numero: element.cxp_numero,
          cxp_fecha: element.cxp_fecha,
          cxp_total: element.cxp_total,
          cxp_abonos: element.cxp_abonos,
          cxp_saldo: element.cxp_saldo,
          abonar: 0,
          saldo: element.cxp_saldo,
          puc_id: element.puc_id,
       };
       array.push(newreg);
       sal+=element.cxp_saldo;
    });
    setFacturas(array);
    setSaldoTotal(sal);
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

   const handleCaja = (e) => {
    const value = e.target.value;
    setSelectedCaja(value);
   };

   useEffect(() => {
      getCuentaBancaria();
      cargarCajas();
      getProviders();
      getPaymentMethods();
      cargarFuente();
   }, []);

   const handleProviderChange = (e) => {
      const value = Number(e.target.value);
      setSelectedProvider(value);
      cargarFacturas(value);
   };

   const handleFormaPago = (e) => {
    const value = e.target.value;
    setForpagoid(value);
   };

   const handleCtaBanco = (e) => {
     const value = e.target.value;
     setSelectedCtaBanco(value);
   };

   //aplica abonos a la factura
   const handleChange = (e, indice) => {
    const value = e.target.value;
    const array = [];
    let abo = 0;
    facturas.forEach(element => {
       if(element.id == indice) {
          const reg = {
            id: element.id,
            cxp_numero: element.cxp_numero,
            cxp_fecha: element.cxp_fecha,
            cxp_total: element.cxp_total,
            cxp_abonos: element.cxp_abonos,
            cxp_saldo: element.cxp_saldo,
            abonar: value>element.cxp_saldo ?element.cxp_saldo : value,
            saldo: value>element.cxp_saldo ? 0 : element.cxp_saldo-Number(value),   
            puc_id: element.puc_id,            
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
    if (selectedProvider==0) {
      setMessageError("¡Falta elegir Proveedor!");
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
          const reg = {tipo: 2, carteraid: ele.id, valor: ele.abonar, pucid: ele.puc_id};
          items.push(reg);
       };
    });
    const datos = {
      valor: totalAbonos,
      fecha: today1,
      ctabancoid: selectedCtaBanco,
      cajaid: selectedCaja,
      terceroid: selectedProvider,
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
      setSelectedProvider(0);
      setTotalAbonos(0);        
    } catch (error) {
      console.log("Error al ejecutar Egreso");
      setMessageError("¡Error al grabar Egreso!");
      setShowModalError(true);
      infoModalError.mensaje = messageError;
      return;        
    }

 };

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        {showModalError ? <ModalError infoModalError={infoModalError} /> : ""}
        <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Egresos</h2>
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
            <h2 className="text-l">Proveedor : </h2>
            <select name="proveedor" 
                    className="w-[400px] border-solid"
                    onChange={(e)=>handleProviderChange(e)}>
                    <option value="0">Selecione Proveedor</option>
                    {providers.map(ele =>
                       <option value={ele.id}>{ele.tercero.ter_tercero} - {ele.tercero.ter_documento}</option>
                    )}
           </select>
        </div>
        <br/>
        <hr/>
        <table className="w-3/4 text-sm text-left text-gray-700 dark:text-gray-700">
            <thead>
              <tr><th>Id</th><th>Numero</th><th>Fecha</th><th>Valor</th><th>Abonos</th>
              <th>Saldo Ant.</th><th>Abonar</th><th>Nuevo Saldo</th></tr>
            </thead>
            <tbody>
                {facturas.map(ele =>
                   <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.cxp_numero}</td>
                     <td>{ele.cxp_fecha}</td>
                     <td>{ele.cxp_total}</td>
                     <td>{ele.cxp_abonos}</td>
                     <td>{ele.cxp_saldo}</td>
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
        <h2>Saldo Proveedor : {saldoTotal}</h2>
        <h2>Total abonos    : {totalAbonos}</h2>
        <h2>Nuevo Saldo     : {saldoTotal-totalAbonos}</h2>
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
                }}>Guardar Egreso
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

export default Egresos;