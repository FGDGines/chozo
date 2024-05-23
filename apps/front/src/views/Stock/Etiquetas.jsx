import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsBarcode from 'jsbarcode';
import {useReactToPrint} from 'react-to-print';


function Etiquetas() {
   const token = localStorage.getItem("token");
   const [articulos, setArticulos] = useState([]);
   const printRef = useRef();
   const [selectedArt, setSelectedArt] = useState({
     id: 0,
     detalles: "",
     referen: "",
     marca: "",
     codbarra: "",
     precio: 0,
   });

   const cargarArticulos = async() => {
     const result = await axios('api/articulos', {
       headers: {
         token: token,
       },
     });
     setArticulos(result.data);
   };

   const handleSeleccion = async(e) => {
      e.preventDefault();
      const indice = Number(e.target.value);
      const result = await axios(`api/articulos/${indice}`, {
        headers: {
          token: token,
        },
      });
      const reg = result.data;
      setSelectedArt({
        id: reg.id,
        detalles: reg.art_detalles,
        referen: reg.art_referencia,
        marca: reg.marca.mar_detalles,
        codbarra: reg.art_codbarra,
        precio: reg.art_precioventa,  
      });
      jsBarcode('#BarCode', reg.art_codbarra);
   };
  
   useEffect(() => {
     cargarArticulos();
   }, []);

   const handlePrint = useReactToPrint({
      content: () => printRef.current,
   });

   return (
     <div className="mx-auto mt-10 max-w-[80%]">
        <h2 className="text-2xl bg-customBlue p-2 rounded-[30px] text-white px-5">Impresión Etiquetas</h2>
        <div className="flex justify-center mt-5">
            <select onChange={(e)=>handleSeleccion(e)}>
                <option value="0">Seleccione artículo...</option>
                {articulos.map(ele=>
                    <option key={ele.id} value={ele.id}>{ele.art_detalles}</option>
                )}
            </select>
        </div>
        <div className="flex">
           <div className=" shadow-xl w-[50%] mt-5 p-5">
              <h1 className="w-full bg-blue-400 text-white text-center" >Detalles del Articulo</h1>   
              <div className="grid grid-cols-2 gap-2">
                <div>Articulo</div>
                <div>{selectedArt.detalles}</div>
                <div>Referencia</div>
                <div>{selectedArt.referen}</div>
                <div>Marca</div>
                <div>{selectedArt.marca}</div>
                <div>Codigo de Barra</div>
                <div>{selectedArt.codbarra}</div>
                <div>Precio</div>
                <div>{selectedArt.precio.toFixed(2)}</div>
              </div>
           </div>
           <div className="shadow-xl w-[50%] mt-5 p-5">
              <h1 className="w-full bg-blue-400 text-white text-center" >Etiqueta</h1>
              <div ref={printRef}>
                 <h1 className="text-center">{selectedArt.detalles}</h1>
                 <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                 <div className="flex justify-center">
                    <img src="" id="BarCode" alt="barcode"/>
                 </div>
                 <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
              </div> 
              <div className="flex justify-center">
                 <button className="bg-blue-400 px-3 py-1 text-white rounded-xl hover:blue-700"
                  onClick={()=>handlePrint()}
                 >
                  Imprimir Etiqueta
                 </button>
              </div>
 
           </div>
           
        </div>
     </div>
   )
};

export default Etiquetas;