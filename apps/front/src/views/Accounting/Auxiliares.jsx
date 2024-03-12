import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

function Auxiliares() {
    const token = localStorage.getItem("token");
    const [puc, setPuc] = useState([]);
    const [selectedPuc, setSelectedPuc] = useState(0);
    const [fecha1, setFecha1] = useState(null);
    const [fecha2, setFecha2] = useState(null);
    const [auxiliar, setAuxiliar] = useState([]);
    const [saldoant, setSaldoant] = useState(0);

    const cargarPuc = async() => {
        const result = await axios('api/puc', {
           headers: {
             token: token,
           },
        });
        const datos = result.data
        setPuc(datos);
     };

    useEffect(() => {
       cargarPuc();
    }, []);

    const handlePuc = (e) => {
       const value = e.target.value;
       setSelectedPuc(value);
    };

    const handleFecha = (e) => {
       const property = e.target.name;
       const value = e.target.value;
       if(property=="fecha1") setFecha1(value);
       if(property=="fecha2") setFecha2(value);
    };

    const handleAuxiliar = async(e) => {
        e.preventDefault();
        const result = await axios(`api/contable/auxiliar/${selectedPuc}?fechaInicio=${fecha1}&fechaCorte=${fecha2}`, {
            headers: {
              token: token,
            },
        }); 
        const datos = result.data;
        const ant = datos.filter(ele=>ele.ite_fecha<fecha1 && ele.ite_anulado==0);
        let suma = 0;
        ant.forEach(element => {
            suma+=Number(element.ite_debito)-Number(element.ite_credito)
        });
        setSaldoant(suma);
        const aux = datos.filter(ele=>ele.ite_fecha>=fecha1);
        const array = [];
        aux.forEach(ele => {
            if(ele.ite_anulado==0 ) {
                suma+=Number(ele.ite_debito)-Number(ele.ite_credito);
            };
            const reg = {
               id: ele.id ,
               ite_fuente: ele.fuente.fue_iniciales,
               ite_numero: ele.ite_numero,
               ite_fecha: ele.ite_fecha,
               ite_tercero: ele.tercero.ter_tercero,
               ite_documento: ele.tercero.ter_documento,
               ite_debito: ele.ite_anulado==0 ? ele.ite_debito : 0,
               ite_credito: ele.ite_anulado==0 ? ele.ite_credito: 0,
               ite_saldo: suma,
            };
            array.push(reg);
        });        
        setAuxiliar(array);
    };

      //definimos formato de numeros
    const options = {
       tyle: 'currency',
       currency: 'EUR',
       minimumFractionDigits: 2,
       maximumFractionDigits: 2
    };
    const formatterDolar = new Intl.NumberFormat('en-US', options);

    return (
       <> 
         <div className="ml-[97px] font-SFRegular h-screen w-[98%] flex flex-col mt-5">
             <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Informe Auxiliar por Cuenta</h2>
             <div className="flex flex-row items-center gap-3">
                 <label>Cuenta : </label>
                 <select name="cuenta" onChange={(e)=>handlePuc(e)} value={selectedPuc}>
                    <option value="0">Seleccione Cuenta</option>
                    {puc.map(ele =>
                       <option key={ele.id} value={ele.id}>{ele.puc_codigo}  ------  {ele.puc_cuenta}</option>
                    )}
                 </select>
             </div>
             <div className="flex flex-row items-center gap-3">
                 <label>Fecha Inicial : </label>
                 <input type="date" value={fecha1} name="fecha1" onChange={(e)=>handleFecha(e)}/>
             </div>
             <div className="flex flex-row items-center gap-3">
                 <label>Fecha Final : </label>
                 <input type="date" value={fecha2} name="fecha2" onChange={(e)=>handleFecha(e)}/>
                 <button
                   className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                   onClick={(e)=>handleAuxiliar(e)}
                 >Actualizar</button>
                 <label className="ml-10">Saldo Anterior :</label>
                 {formatterDolar.format(saldoant)}
             </div>
             <br/><hr/>
             <table className="w-[90%] text-sm text-left text-gray-700 dark:text-gray-700">
                <thead>
                    <tr>
                        <td>Fte</td>
                        <td>Numero</td>
                        <td>fecha</td>
                        <td>Tercero</td>
                        <td>Documento</td>
                        <td className="text-right">Debitos</td>
                        <td className="text-right">Creditos</td>
                        <td className="text-right">Saldo</td>
                    </tr>
                </thead>
                <tbody>
                    {auxiliar.map(ele => 
                       <tr key={ele.id}>
                           <td>{ele.ite_fuente}</td>
                           <td>{ele.ite_numero}</td>
                           <td>{ele.ite_fecha}</td>
                           <td>{ele.ite_tercero}</td>
                           <td>{ele.ite_documento}</td>
                           <td className="text-right">{formatterDolar.format(ele.ite_debito)}</td>
                           <td className="text-right">{formatterDolar.format(ele.ite_credito)}</td>
                           <td className="text-right">{formatterDolar.format(ele.ite_saldo)}</td>
                       </tr>
                    )}
                </tbody>
             </table>
         </div> 
       </>
    
    )
};

export default Auxiliares;