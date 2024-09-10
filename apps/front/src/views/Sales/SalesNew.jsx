import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo/elChozo.png";
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineCreateNewFolder, MdPrint } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaSearch, FaEdit, FaSave } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from "react-router-dom";
import ModalCrearCliente from "../../components/ModalCrearCliente";
import { ColorRing } from 'react-loader-spinner';
import ModalBuscarFacturas from "../../components/ModalBuscarFacturas";
import ModalEditRegistro from "../../components/ModalEditRegistro";


function SalesNew(){
    const token = localStorage.getItem("token");
    let localStorageItems = JSON.parse(localStorage.getItem("Carrito"));
    const [carrito, setCarrito] = useState(localStorageItems || []);

    const date = new Date();
    const navigate = useNavigate();
    const printRef = useRef();
    const [selectedCaja, setSelectedCaja] = useState({});
    const [selectedArticulo, setSelectedArticulo] = useState(0);
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState({id: 0, ter_tercero: ""});
    const [articles, setArticles] = useState([]);
    const [xitem, setXitem] = useState(0);
    const [ctaBanco, setCtaBanco] = useState([]);
    const [totales, setTotales] = useState({bruto: 0, impuesto: 0, total: 0, fpagos: 0, efectivo: 0, entregado: 0, cambio: 0});
    const [selectedFpago, setSelectedFpago] = useState({id: 0, manejabanco: 0, detalles: ""});
    const [selectedCtaBan, setSelectedCtaBan] = useState({id: 0, cuenta: "", idpuc: 0});
    const [valorFpago, setValorFpago] = useState(0);
    const [fpagos, setFpagos] = useState([]);
    const [forpagos, setForpagos] = useState([]);
    const [numero, setNumero] = useState("");
    const [swnuevo, setSwnuevo] = useState(true);
    const [codbarra, setCodbarra] = useState("");
    const [modalClientes, setModalClientes] = useState(false);
    const [viewSpinner, setViewSpinner] = useState(false);
    const [viewBuscar, setViewBuscar] = useState(false);
    const [viewEditar, setViewEditar] = useState(false);
    const [record, setRecord] = useState(0);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const today = date.toISOString();

    const handleCloseModalClientes = () => setModalClientes(false);

    const handleCloseEditar = () => {
      setViewEditar(false);
      const StorageItems = JSON.parse(localStorage.getItem("Carrito"));
      setCarrito(StorageItems);
      let bru = 0;
      let imp = 0;
      let tot = 0;
      StorageItems.forEach(i=>{
        tot+=i.vtotal;
        imp+=i.vimpuesto;
      });
      bru = tot - imp;
      bru = Number(bru.toFixed(2));
      imp = Number(imp.toFixed(2));
      setTotales({bruto: bru, impuesto: imp, total: tot, fpagos: 0});
      setValorFpago(tot);
    };

    const closeEditarSinCambios = () => setViewEditar(false);

    const openModalClientes = () => setModalClientes(true);

    const handleEditar = (e, reg) => {
      setRecord(reg);
      setViewEditar(true);
    };
  
    //carga las cajs del usuarios activo
    const getCajeros = async() => {
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

    function blanquear(){
       setSelectedClient({});
       setCarrito([]);
       setForpagos([]);
       setViewSpinner(false);
       setTotales({bruto: 0, impuesto: 0, total: 0, fpagos: 0, efectivo: 0, entregado: 0, cambio: 0});
       setXitem(0);
       setCodbarra("");
       //localSorage.removeItem("Carrito");
       const updatedItemsJSON = JSON.stringify([]);
       localStorage.setItem("Carrito", updatedItemsJSON);
       setSelectedArticulo(0);
    };

    //funcion para una nueva venta
    function handleNuevo(){
      blanquear();
      setSwnuevo(true);
    };

    //funcion para buscar una factura
    function handleBuscar(){
       setSwnuevo(false);
       blanquear();
       setViewBuscar(true);
    };

    const closeBuscarFacturas = () => {
      setViewBuscar(false);
    };

    //carga el proximo consecutivo
    const getConsecutivo = async() => {
      const anual = date.getFullYear();
      const fuente = 3; //fuente de factura de ventas
      const resp = await axios.get(`api/carteraxcobrar/consecutivo?anual=${anual}&fuente=${fuente}`, {headers: {token}});
      const resul = resp.data;
      const num = resul;
      setNumero(num);
    };

    //carga formas de pago
    const getFpagos = async() => {
       const resp = await axios.get("api/formasdepago", {headers: {token}});
       setFpagos(resp.data);
    };

    //carga las cuenats bancaria de la entidad
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
    
    const salir = () => navigate("/");

   //agrega items al carrito
   const agregarCarrito = (e) => {
       setSelectedArticulo(e.target.value);
       if(!swnuevo) return;
       e.preventDefault();
       const id = e.target.value;
       const ele = articles.find(ele=>ele.id==id);
       const vau = Number(ele.art_precioventa)/(1+Number(ele.art_impuestoventa)/100);
       const vimp = Number(ele.art_precioventa) - vau;
       const newReg =  {
           id: ele.id,
           detalles: ele.art_detalles,
           cantidad: 1,
           valoruni: vau,
           vtotal: Number(ele.art_precioventa),
           nitem: xitem + 1,
           impuesto: Number(ele.art_impuestoventa),
           vimpuesto: vimp,
           preciocosto: Number(ele.art_ultimocosto),
           precioventa: Number(ele.art_precioventa),
           vtotal_str: ele.art_precioventa.toFixed(2),
       };
       setCarrito([...carrito, newReg]);
       setXitem(xitem + 1);
       let bru = totales.bruto + newReg.valoruni;
       let imp = totales.impuesto + vimp;
       bru = Number(bru.toFixed(2));
       imp = Number(imp.toFixed(2));
       let tot = totales.total + newReg.vtotal;
       setTotales({bruto: bru, impuesto: imp, total: tot, fpagos: 0, efectivo: 0, entregado: 0, cambio: 0})
       setSelectedArticulo(0);
       setValorFpago(tot);
       //localSorage.removeItem("Carrito");
       const updatedItemsJSON = JSON.stringify([...carrito, newReg]);
       localStorage.setItem("Carrito", updatedItemsJSON);
   };

    //carga de clientes
    const getClient = async () => {
        const response = await axios.get("api/terceros", {
           headers: {
             token: token,
           },
        });
         setClientes(response.data);
    };

    //carga de articulos
    const getArticles = async () => {
       const response = await axios.get("api/articulos", {
          headers: {
            token: token,
          },
       });
       setArticles(response.data);
    };

    //cambiar cantidades
    const handleCantidad = (e, reg) => {
      if(!swnuevo) return;
      let can = Number(e.target.value);
      let bru = 0;
      let imp = 0;
      let tot = 0;
      if(can<0) can = 0;
      const elementos = [];
      carrito.forEach(ele=>{
        if(ele.nitem==reg){
            const vt = Number(ele.precioventa) * can;
            const vimp = vt - Number(ele.valoruni) * can;
            const k = {
                id: ele.id,
                detalles: ele.detalles,
                valoruni: ele.valoruni,
                cantidad: can,
                vtotal: vt,
                nitem: ele.nitem,
                impuesto: ele.impuesto,
                vimpuesto: vimp,
                preciocosto: ele.preciocosto,
                precioventa: ele.precioventa,
                vtotal_str: vt.toFixed(2),
            };
            bru+= k.valoruni * can;
            imp+= k.vimpuesto;
            tot+= vt;
            elementos.push(k);
        } else {
            bru+= ele.valoruni * ele.cantidad;
            imp+= ele.vimpuesto;
            tot+= ele.vtotal;
            elementos.push(ele);
        };
      });
      bru = Number(bru.toFixed(2));
      imp = Number(imp.toFixed(2));
      setCarrito(elementos);
      setTotales({bruto: bru, impuesto: imp, total: tot, fpagos: 0, efectivo: 0, entregado: 0, cambio: 0})
      //localSorage.removeItem("Carrito");
      setValorFpago(tot);
      const updatedItemsJSON = JSON.stringify(elementos);
      localStorage.setItem("Carrito", updatedItemsJSON);
   };
  
    //seleccionar cliente
    const seleccionarCliente = (e) => {
       if(!swnuevo) return;
       const reg = e.target.value;
       if(reg==0) {
         setSelectedClient({id: 0, ter_tercero: ""});
         return;
       };
       const cli = clientes.find(ele=>ele.id==reg);
       setSelectedClient(cli);
    };

    function handleCodbarraKeyDown(){
      if(!swnuevo) return;
      if(codbarra.length==0) return;
      const ele = articles.find(ele=>ele.art_codbarra==codbarra);
      if(!ele) {
         toast.warning("Codigo de barra inexistente");
         return;
      };
      const vau = Number(ele.art_precioventa)/(1+Number(ele.art_impuestoventa)/100);
      const vimp = Number(ele.art_precioventa) - vau;
      const newReg =  {
          id: ele.id,
          detalles: ele.art_detalles,
          cantidad: 1,
          valoruni: vau,
          vtotal: Number(ele.art_precioventa),
          nitem: xitem + 1,
          impuesto: Number(ele.art_impuestoventa),
          vimpuesto: vimp,
          preciocosto: Number(ele.art_ultimocosto),
          precioventa: Number(ele.art_precioventa),
          vtotal_str: ele.art_precioventa.toFixed(2),
      };

      setCarrito([...carrito, newReg]);
      setXitem(xitem + 1);
      let bru = totales.bruto + newReg.valoruni;
      let imp = totales.impuesto + vimp;
      let tot = totales.total + newReg.vtotal;
      bru = Number(bru.toFixed(2));
      imp = Number(imp.toFixed(2));

      setTotales({bruto: bru, impuesto: imp, total: tot, fpagos: 0, efectivo: 0, entregado: 0, cambio: 0})
      setCodbarra("");
      //localSorage.removeItem("Carrito");
      const updatedItemsJSON = JSON.stringify([...carrito, newReg]);
      localStorage.setItem("Carrito", updatedItemsJSON);
   };
    
    //eliminar item
    const handleEliminar = (e, reg) => {
      if(!swnuevo) return;
      const nuevo = carrito.filter(ele=>ele.nitem!==reg);
      setCarrito(nuevo);
      let bru = 0;
      let imp = 0;
      let tot = 0;
      nuevo.forEach(i=>{
        bru+=i.valoruni*i.cantidad;
        tot+=i.vtotal;
        imp+=i.vimpuesto;
      });
      bru = Number(bru.toFixed(2));
      imp = Number(imp.toFixed(2));
      setTotales({bruto: bru, impuesto: imp, total: tot, fpagos: 0});
      //localSorage.removeItem("Carrito");
      setValorFpago(tot);
      const updatedItemsJSON = JSON.stringify(nuevo);
      localStorage.setItem("Carrito", updatedItemsJSON);
    };

    useEffect(() => {
      getCajeros();  
      getClient();
      getArticles();
      getCuentaBancaria();
      getFpagos();
      getConsecutivo();
    }, []);

    //cambiar forma de pago seleccionado o cta bancaria seleccionada
    const cambioFormapago = (e, tipo) => {
      if(!swnuevo) return;
      const value = e.target.value;
      if(tipo==1) {
         if(value==0) {
          setSelectedFpago({id: 0, detalles: "", manejabanco: 0});
          return;
         };
         const reg = fpagos.find(ele=>ele.id==value);
         setSelectedFpago({id: value, detalles: reg.fpag_detalles, manejabanco: reg.fpag_manejabanco});
         return;
      };
      if(tipo==2) {
        if(value==0) {
          setSelectedCtaBan({id: 0, cuenta: "", idpuc: 0});
          return;
        };
        const reg = ctaBanco.find(ele=>ele.id==value);
        setSelectedCtaBan({id: reg.id, cuenta: reg.cue_numero+" "+reg.cue_banco, idpuc: reg.puc.puc_id});
      };
    };

    //cambia valor forma de pago
    const cambiaValorFpago = (e) => {
        if(!swnuevo) return;
        let value = Number(e.target.value);
        if(value<0) value = 0;
        setValorFpago(value);
    };

    //insertar forma de pago
    const agregaFpago = () => {
       if(!swnuevo) return;
       if(valorFpago==0) {
         toast.warning("Digite valor forma de pago");
         return;
       };
       if(selectedFpago.id==0) {
        toast.warning("Debe seleccionar forma de pago");
        return;
      };
      const existe = forpagos.find(j=>j.id==selectedFpago.id);
      if(existe) return;
      if(selectedFpago.manejabanco==1 && selectedCtaBan.id==0) {
        toast.warning("Esta forma de pago requiere seleccionar una cta bancaria");
        return;
      };
      const reg = {
        id: selectedFpago.id,
        detalles: selectedFpago.detalles,
        cuenta: selectedCtaBan.cuenta,
        valor: valorFpago,
        idbanco: selectedCtaBan.id,
        manejabanco: selectedFpago.manejabanco,
      };
      let suma = 0;
      forpagos.forEach(i=>suma+=i.valor);  
  
      suma+=reg.valor;
      setForpagos([...forpagos, reg]);
      setSelectedFpago({id:0, detalles: "", manejabanco: 0});
      setSelectedCtaBan({id: 0, idbanco: 0, cuenta: ""});
      if(selectedFpago.id==1) {  //forma de pago efectivo
        let efe = valorFpago;
        setTotales({...totales, fpagos: suma, efectivo: efe, entregado: 0, cambio: 0});
      } else setTotales({...totales, fpagos: suma});
      setValorFpago(0);
    };

    //elimina forma de pago
    const eliminaFpagos = (e, reg) => {
       if(!swnuevo) return;
       const nuevo = forpagos.filter(ele=>ele.id!==reg);
       let suma = 0;
       nuevo.forEach(i=>suma+=i.valor);       
       setForpagos(nuevo);
       if(reg==1) {
         setTotales({...totales, fpagos: suma, efectivo: 0, entregado: 0, cambio: 0});
       } else setTotales({...totales, fpagos: suma});
    };

    //efectivo
    const handleEfectivo = (e) => {
       let value = Number(e.target.value);
       if(value<0) {
          setTotales({...totales, entregado: 0, cambio: 0});
          return;
       };
       let cam = value - totales.efectivo;
       setTotales({...totales, entregado: value, cambio: cam});   
    };

    //funcion de grabacion de la venta
    const grabaVenta = async() => {
       if(!swnuevo) return;
       if(!selectedClient.id) {
          toast.warning("No ha seleccionado cliente");
          return;
       };
       if(totales.total==0) {
          toast.warning("No hay valores por facturar");
          return;
       };
       if(totales.total!==totales.fpagos){
          toast.warning("Formas de pago no concuerdan con total de la factura");
          return;
       };
       setViewSpinner(true);
       const resp1 = await axios.get("api/parametros/8", {headers: {token}});  //id forma de pago credito
       const datos1 = resp1.data;
       const idFpagoCredito = Number(datos1.para_valor);
       //buscamos si dentro de las formas de pago esta definido cargo a cuenta
       const existe1 = forpagos.find(fp=>fp.id==idFpagoCredito);
       if(existe1) { //averiguamos si el cliente tiene permiso para ventas a credito
          if(selectedClient.ter_credito==0) {
             toast.warning("Cliente no tiene permitido Cargo a Cuenta");
             setViewSpinner(false);
             return;
          }
       };
       const date = new Date();
       const today1 = date.toISOString();
       const venceFac = date.setFullYear(date.getFullYear() + 1);

       const formasdepago = [];
       forpagos.forEach(fpag=>{
          const nreg = {
            idformapago: fpag.id,
            detalle: fpag.detalles,
            manejabanco: fpag.manejabanco,
            valor: fpag.valor,
            ctabancoid: fpag.idbanco,
          };  
          formasdepago.push(nreg);      
       });
      
       const saleData = {
         fecha: today1,
         vence: today1,
         bruto: parseFloat(totales.bruto.toFixed(2)),
         impuesto: parseFloat(totales.impuesto.toFixed(2)),
         total: parseFloat(totales.total.toFixed(2)),
         metodopago: existe1 ? 2 : 1,
         terceroid: selectedClient.id,
         cajaid: selectedCaja.id,
         items: carrito.map((item) => ({
           articuloId: item.id,
           valoruni: item.valoruni,
           impuesto: item.impuesto,
           preciocosto: item.preciocosto,
           cantidad: parseFloat(item.cantidad),
         })),
         fpagos: formasdepago,
         token: token,
       };
       try {
          const response = await axios.post("api/carteraxcobrar", saleData);
       } catch (error) {
          toast.error("Error al guardar la venta!");
          setViewSpinner(false);
          return;
       };
       setSwnuevo(false);
       setViewSpinner(false);
    };  //aqui termina la fase de guardado de la factura de venta

    //funcion de impresion tiquete de venta
    const handleImprimir = () => {
      if(swnuevo) {
        toast.warning("La factura debe estar salvada en el sistema");
        return;
      };
      handlePrint();
    };

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    return (
     <div className="bg-blue-50 px-10 py-5 w-full h-screen m-2 rounded-lg">
        {modalClientes && 
           <ModalCrearCliente onClose={handleCloseModalClientes}/>
        }
        {viewBuscar &&
           <ModalBuscarFacturas onClose={closeBuscarFacturas} />
        }
        {viewEditar &&
           <ModalEditRegistro onClose={handleCloseEditar}
                              closeSinCambios = {closeEditarSinCambios}
                              record={record} 
                              carrito={carrito} />
        }
        <div className="flex">
            <div  ref={printRef} className="w-[30%] border-2 h-screen py-5 px-2 bg-white">
                <div className="flex">
                  <img src={logo} className="w-14 h-14"/>
                  <div className="ml-3">
                    <h2 className="text-center upperCase font-bold text-[18px]">SUPERMERCADO EL CHOZO</h2>
                    <h2 className="text-center upperCase font-bold text-[14px]">Tiquete de Venta</h2>
                  </div>
                </div>
                <br/>
                <hr/>
                <div className="grid grid-cols-2 gap-1 text-[12px]">
                    <h2>Número</h2>
                    <h2>{numero}</h2>
                    <h2>Fecha</h2>
                    <h2>{today.slice(0,10)}</h2>
                    <h2>Cliente</h2>
                    <h2>{selectedClient.ter_tercero}</h2>
                </div>
                <br/>
                <hr/>
                <table className="w-full mb-12">
                    <thead>
                       <tr className="text-[10px]">
                          <th className="text-left">Detalles</th>
                          <th className="text-center">Cantidad</th>
                          <th className="text-right">Total</th>
                          {swnuevo && <th classNem="text-rigth">Edit</th> }
                          {swnuevo && <th classNem="text-rigth">Borrar</th> }
                       </tr> 
                    </thead>
                    <tbody>
                       {carrito.map(car=>
                         <tr className="text-[10px]">
                            <td className="text-left w-60">{car.detalles}</td>
                            <td><input type="number"
                                       name="cantidad"
                                       className="w-12 text-right"
                                       value={car.cantidad}
                                       onChange={(e)=>handleCantidad(e, car.nitem)}/></td>
                            <td className="text-right w-20">{car.vtotal_str}€</td>
                            {swnuevo &&
                              <td className="px-3 cursor-pointer hover:text-red-700"
                              onClick={(e)=>handleEditar(e, car.nitem)}><FaEdit size="14"/></td>
                            }

                            {swnuevo &&
                              <td className="px-3 cursor-pointer hover:text-red-700"
                              onClick={(e)=>handleEliminar(e, car.nitem)}><MdDeleteSweep size="14"/></td>
                            }
                         </tr>
                       )} 
                    </tbody>
                    <tr><td></td><td></td><td className="text-right">____________</td></tr>
                    <tr className="text-[10px] text-right">
                        <td>SUBTOTAL</td>
                        <td></td>
                        <td>{totales.bruto}€</td>
                    </tr>
                    <tr className="text-[10px] text-right">
                        <td>IMPUESTOS</td>
                        <td></td>
                        <td>{totales.impuesto}€</td>
                    </tr>
                    <tr className="text-[10px] text-right">
                        <td>TOTAL</td>
                        <td></td>
                        <td>{totales.total}€</td>
                    </tr>
                </table>
                <hr/>
                <h2 className="text-center text-[12px] font-semibold">FORMAS DE PAGO</h2>
                <table className="w-full text-[12px]">
                  <thead className="">
                    <tr className="text-left">
                       <th className="border">Detalles</th>
                       <th className="border">Cta Bancaria</th>
                       <th className="text-right border">Valor</th>
                      </tr>
                  </thead>
                  <tbody>
                     {forpagos.map(fp=>
                       <tr>
                          <td className="w-24 border">{fp.detalles}</td>
                          <td className="w-40 border">{fp.cuenta}</td>
                          <td className="w-20 text-right border">{fp.valor}</td> 
                       </tr>
                     )}
                  </tbody>
                  <tr>
                    <td className="border"></td><td className="border p-1">TOTALES</td>
                    <td className="text-right border">{totales.fpagos}</td>
                  </tr>
                </table>
                <h2 className="text-center text-[12px] mt-10 mb-5">*** GRACIAS POR SU COMPRA ***</h2>

            </div>
            <div className="w-[70%] px-5">
                <div className="w-full bg-blue-400 p-2 rounded-lg flex justify-between text-white">
                   <img src={logo} className="h-18 w-32"/>
                   <h2 className="font-bold text-[28px] mt-2">PEDIDO DE VENTA</h2>
                   <h3 className="text-[18px] mt-4">Fecha : {today.slice(0,10)}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <h2 className="border-2 p-2 text-[20px]">Caja</h2>
                    <h2 className="border-2 p-2 text-[20px]">{selectedCaja.caj_detalles}</h2>
                    <h2 className="border-2 p-2 text-[20px]">Cliente</h2>
                    <div className="flex">
                       <select name="cliente" value={selectedClient.id} className="w-[90%]" onChange={(e)=>seleccionarCliente(e)}>
                       <option value="0">Seleccione Cliente</option>
                       {clientes.map(cli=>
                          <option key={cli.id} value={cli.id}>{cli.ter_tercero.toUpperCase()}</option>
                       )}
                       </select>
                       <button className="bg-blue-300 text-white p-2 text-[20px] w-[10%] rounded-lg font-bold"
                       onClick={openModalClientes}>+</button>
                    </div>
                    <select name="articulo" className="text-[20px] p-2 border border-gray-700" 
                        onChange={(e)=>agregarCarrito(e)} value={selectedArticulo}>
                        <option value="0">Seleccione Artículo</option>
                        {articles.map(art=>
                            <option value={art.id}>{art.art_detalles} Ref: {art.art_referencia}</option>
                        )}
                    </select>
                    <input type="text"
                           name="cbarra" 
                           value={codbarra}
                           onChange={(e) => setCodbarra(e.target.value)}
                           onKeyDown={handleCodbarraKeyDown}
                           className="text-[20px] text-center p-2 border border-gray-700" 
                           placeholder="Código de Barra"/>
                    
                    <div className="">
                       <h1 className="bg-blue-400 text-white text-center w-full rounded-md">FORMAS DE PAGO</h1> 
                       <table className="border-collapse border border-gray-300 rounded-xl w-full">
                         <thead className="sticky top-0 bg-white">
                            <tr className="text-left">
                               <th className="border p-1">Detalles</th>
                               <th className="border p-1">Cta Bancaria</th>
                               <th className="text-right border p-1">Valor</th>
                               <th className="border p-1">Borrar</th> 
                            </tr>
                         </thead>
                         <tbody>
                            {forpagos.map(fp=>
                                <tr>
                                   <td className="w-24 border p-1">{fp.detalles}</td>
                                   <td className="w-40 border p-1">{fp.cuenta}</td>
                                   <td className="w-20 text-right border p-1">{fp.valor.toFixed(2)}</td> 
                                   <td className="w-20 border px-5 text-center cursor-pointer hover:text-red-700"
                                   onClick={(e)=>eliminaFpagos(e, fp.id)}><MdDeleteSweep size="24"/></td>
                                </tr>
                            )}
                         </tbody>
                         <tr>
                            <td className="border p-1"></td><td className="border p-1">TOTALES</td>
                            <td className="text-right border p-1">{totales.fpagos.toFixed(2)}</td>
                            <td className="border p-1"></td>
                         </tr>
                       </table>
                       <div className="mt-5 border flex">
                          <div className="w-[70%]">
                            <select name="fpago" className="w-full" value={selectedFpago.id} onChange={(e)=>cambioFormapago(e,1)}>
                              <option value="0">Seleccione Forma de Pago</option>
                              {fpagos.map(fpa=>
                                <option value={fpa.id}>{fpa.fpag_detalles}</option>
                              )}
                            </select>
                            <select name="ctaban" className="w-full mt-2" value={selectedCtaBan.id} onChange={(e)=>cambioFormapago(e,2)}>
                              <option value="0">Seleccione Cuenta Bancaria</option>
                              {ctaBanco.map(cban=>
                                <option value={cban.id}>{cban.cue_numero} - {cban.cue_banco}</option>
                              )}
                            </select>
                          </div>
                          <div className="w-[30%]">
                             <h2 className="bg-blue-400 text-white rounded-md text-center">Digite Valor</h2>
                             <input type="number" name="valorFP" className="w-24 mt-2 text-right" value={valorFpago} onChange={(e)=>cambiaValorFpago(e)}/>
                          </div>
                       </div>
                       <button className="bg-blue-400 rounded-lg p-1 text-white w-[50%]"
                       onClick={agregaFpago}>Agregar</button>
                    </div>
                    <div className="border">
                       <h2 className="bg-blue-400 text-white text-center rounded-md">RESUMEN PEDIDO</h2>
                       <div className="grid grid-cols-2 gap-2 p-5 text-[24px]">
                          <h2>SUBTOTAL</h2>
                          <h2>{totales.bruto}€</h2>
                          <h2>IMPUESTOS</h2>
                          <h2>{totales.impuesto}€</h2>
                          <h2>GRAN TOTAL</h2>
                          <h2>{totales.total}€</h2>
                          <hr/>
                          <hr/>
                          <h2>EFECTIVO</h2>
                          <h2>{totales.efectivo}€</h2>
                          <h2>ENTREGADO</h2>
                          <input type="number" value={totales.entregado} onChange={(e)=>handleEfectivo(e)}/>
                          <h2>SU CAMBIO</h2>
                          <h2>{totales.cambio}€</h2>
                       </div>
                       <hr/>

                       {viewSpinner 
                       ? <div className="flex justify-center shadow-lg p-2 bg-gray-100 border-black border rounded-md">
                           <ColorRing
                             visible={true}
                             height="80"
                             width="80"
                             ariaLabel="color-ring-loading"
                             wrapperStyle={{}}
                             wrapperClass="color-ring-wrapper"
                             colors={['#0f0b65', ' #211c80', ' #221bbb', '#423bda', '#938ef8']}
                          /> 
                          <h2 className="mt-6 font-semibold text-[20px] text-blue-700">Guardando Pedido...</h2>
                        </div>
                       :
                       <div className="flex justify-center shadow-lg p-2 bg-gray-100 border-black border rounded-md">
                          <div className="p-2 bg-gray-300 rounded-lg border border-gray-950 ml-2 cursor-pointer"
                             onClick={()=>handleBuscar()}>
                             <FaSearch size="24"/>
                             <h2 className="font-semibold text-[14px]">Buscar</h2>
                          </div>
                          <div className="p-2 bg-gray-300 rounded-lg border border-gray-950 ml-2 cursor-pointer"
                            onClick={()=>handleNuevo()}>
                            <MdOutlineCreateNewFolder size="24" />
                             <h2 className="font-semibold text-[14px]">Nuevo</h2>
                          </div>
                          <div className="p-2 bg-gray-300 rounded-lg border border-gray-950 ml-2 cursor-pointer"
                             onClick={()=>grabaVenta()}>
                             <FaSave size="24"/>
                             <h2 className="font-semibold text-[14px]">Salvar</h2>
                          </div>
                          <div className="p-2 bg-gray-300 rounded-lg border border-gray-950 ml-2 cursor-pointer"
                              onClick={()=>handleImprimir()}>
                             <MdPrint size="24"/>
                             <h2 className="font-semibold text-[14px]">Imprimir</h2>
                          </div>
                          <div className="p-2 bg-gray-300 rounded-lg border border-gray-950 ml-2 cursor-pointer"
                             onClick={salir}>
                             <IoLogOutOutline size="24"/>
                             <h2 className="font-semibold text-[14px]">Salir</h2>
                          </div>

                       </div>
                       }
                    </div>
                </div>
            </div>
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
   )
};

export default SalesNew; 