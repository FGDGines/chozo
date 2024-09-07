import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {useReactToPrint} from 'react-to-print';

function Labels() {
   const token = localStorage.getItem("token");
   const [articulos, setArticulos] = useState([]);
   const [array, setArray] = useState([]);
   const [item, setItem] = useState(0);
   const printRef = useRef();

   const cargarArticulos = async() => {
      const result = await axios('api/articulos', {
        headers: {
          token: token,
        },
      });
      setArticulos(result.data);
   };

   useEffect(() => {
      cargarArticulos();
   }, []);

   const handlePrint = useReactToPrint({
      content: () => printRef.current,
   });

   const handleSeleccion = (e) => {
      const id = Number(e.target.value)
      const reg = articulos.find(ele=>ele.id==id);
      const newReg = {
        id: reg.id,
        registro: item + 1,
        art_detalles: reg.art_detalles,
        art_referencia: reg.art_referencia,
        precio: reg.art_precioventa,
        unidad: reg.unidade.uni_abreviatura,
        etiqueta: reg.etiqueta==null ? " " : reg.etiqueta,
      };
      setArray([...array, newReg]);
      setItem(item+1);
   };

   const handleEliminar = (e, nreg) => {
      const id = Number(nreg)
      const filtro = array.filter(ele=>ele.registro!==id);
      setArray(filtro);
   };
   
   const handleAdd = (e, id) => {
      const filtro = array.find(ele=>ele.id==id);
      const newreg = {
         id: filtro.id,
         registro: item + 1,
         art_detalles: filtro.art_detalles,
         art_referencia: filtro.art_referencia,
         precio: filtro.precio,
         unidad: filtro.unidad,
         etiqueta: filtro.etiqueta,         
      };
      setArray([...array, newreg]);
      setItem(item+1);
   };

   const handleCambiarEtiqueta = (e, id) => {
      const value = e.target.value;
      const newArray = [];
      array.forEach(ele=> {
        if(ele.id==id) {
            const nregis = {
                id: ele.id,
                registro: ele.registro,
                art_detalles: ele.art_detalles,
                art_referencia: ele.art_referencia,
                precio: ele.precio,
                unidad: ele.unidad,
                etiqueta: value,
            };
            newArray.push(nregis);
        } else {
            newArray.push(ele);
        };
      });
      setArray(newArray);      
   };

   const handleActualizar = async(e, id) => {
      e.preventDefault();
      const registro = array.find(ele=>ele.id==id);
      const datos = {etiqueta: registro.etiqueta};
      const result = await axios.put(`api/articulos/etiqueta/${id}`, datos, {
        headers: {
          token: token,
        },
      });
      cargarArticulos();
   };

   return (
    <div className="mx-auto mt-10 max-w-[80%]">
        <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Impresión Labels</h2>
        <div className="flex justify-center mt-5">
            <select onChange={(e)=>handleSeleccion(e)}>
                <option value="0">Seleccione artículo...</option>
                {articulos.map(ele=>
                    <option key={ele.id} value={ele.id}>{ele.art_detalles}</option>
                )}
            </select>
        </div>
        <div className="flex justify-center mt-3">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="text-left">
                        <th>Id</th>
                        <th>Detalles</th>
                        <th>Referencia</th>
                        <th>Und</th>
                        <th>Precio</th>
                        <th>PxUnd_Med</th>
                        <th>Accion</th>
                        <th>Accion</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map(ele=>
                        <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td>{ele.art_detalles}</td>
                            <td>{ele.art_referencia}</td>
                            <td>{ele.unidad}</td>
                            <td>{ele.precio.toFixed(2)}</td>
                            <td><input type="text" value={ele.etiqueta}
                              onChange={(e)=>handleCambiarEtiqueta(e, ele.id)}
                            /></td>
                            <td><button className="bg-green-400 px-2 rounded-lg text-white hover:bg-green-600"
                              onClick={(e)=>handleAdd(e, ele.id)}
                            >+</button></td>                         
                            <td><button className="bg-red-400 px-2 rounded-lg text-white hover:bg-red-600"
                              onClick={(e)=>handleEliminar(e, ele.registro)}
                            >X</button></td>
                            <td><button className="bg-blue-400 px-2 rounded-lg text-white hover:bg-blue-600"
                              onClick={(e)=>handleActualizar(e, ele.id)}
                            >Actualizar</button></td>   
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div className="flex bg-blue-400 w-full rounded-lg justify-evenly mt-5">
            <h1 className="text-white text-2xl">Etiquetas a Imprimir</h1>
            <button className="bg-gray-500 text-white rounded-lg px-2 hover:bg-gray-700"
            onClick={()=>handlePrint()}>
            Imprimir</button> 
        </div>

        <div  ref={printRef} className="grid grid-cols-3 gap-1">
            {array.map(h=>
                <div className="shadow-lg p-4">
                    <h1 className="text-center">{h.art_detalles}</h1>
                    <h1 className="text-center text-xl font-semibold">PVP : {h.precio.toFixed(2)}€</h1>
                    <h1 className="text-center">{h.etiqueta}</h1>
                </div>    
            )}
        </div>
    </div>    
   )
};

export default Labels;