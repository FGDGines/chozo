import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsBarcode from 'jsbarcode';
import {useReactToPrint} from 'react-to-print';
import Etiqueta from "../../components/Etiqueta";

function Etiquetas() {
   const token = localStorage.getItem("token");
   const [articulos, setArticulos] = useState([]);
   const printRef = useRef();
   const [filas, setFilas] = useState(1);
   const [columnas, setColumnas] = useState(2);
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

   const handleCambiar = (e, tipo) => {
     e.preventDefault();
     const value= e.target.value;
     if(tipo==1) {
       setFilas(value);
     } else {
       setColumnas(value);
     };
   };

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
        <div className="flex justify-center">
           <div className=" shadow-xl w-[50%] p-5">
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
                <div className="flex justify-start">
                  <h1>Filas :</h1>
                  <input type="number" value={filas} min="1" max="6" className="w-20 text-right"
                   onChange={(e)=>handleCambiar(e, 1)}
                  />
                </div>
                <div className="flex justify-start">
                  <h1>Columnas :</h1>
                  <input type="number" value={columnas} min="1" max="3" className="w-20 text-right"
                   onChange={(e)=>handleCambiar(e, 2)}
                  />
                </div>
              </div>
           </div>
        </div>
        <div className="flex justify-center">
           <div className="shadow-xl w-full  p-3">
              <h1 className="w-full bg-blue-400 text-white text-center" >Etiqueta</h1>
              <div ref={printRef} className="">
                <div id="fila1" className="flex justify-between">
                   <div id="col1">
                      <h1 className="text-center">{selectedArt.detalles}</h1>
                      <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                      <div className="flex justify-center">
                         <img src="" id="BarCode" alt="barcode"/>
                      </div>
                      <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                   </div>
                   {columnas>1 ? (
                   <div id="col2">
                      <h1 className="text-center">{selectedArt.detalles}</h1>
                      <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                      <div className="flex justify-center">
                         <img src="" id="BarCode" alt="barcode"/>
                      </div>
                      <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                   </div> ) : (" ")}
                   {columnas==3 ? (
                   <div id="col3">
                      <h1 className="text-center">{selectedArt.detalles}</h1>
                      <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                      <div className="flex justify-center">
                         <img src="" id="BarCode" alt="barcode"/>
                      </div>
                      <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                   </div> ) : (" ") }
                </div>

                {filas>1 ? (
                <div id="fila2" className="flex justify-between">
                <div id="col21">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div>
                {columnas>1 ? (
                <div id="col22">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ")}
                {columnas==3 ? (
                <div id="col23">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ") }
             </div> ): (" ")}

             {filas>2 ? (
                <div id="fila3" className="flex justify-between">
                <div id="col31">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div>
                {columnas>1 ? (
                <div id="col32">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ")}
                {columnas==3 ? (
                <div id="col33">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ") }
             </div> ): (" ")}

             {filas>3 ? (
                <div id="fila4" className="flex justify-between">
                <div id="col41">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div>
                {columnas>1 ? (
                <div id="col42">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ")}
                {columnas==3 ? (
                <div id="col43">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ") }
             </div> ): (" ")}

             {filas>4 ? (
                <div id="fila5" className="flex justify-between">
                <div id="col51">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div>
                {columnas>1 ? (
                <div id="col52">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ")}
                {columnas==3 ? (
                <div id="col53">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ") }
             </div> ): (" ")}

             {filas>5 ? (
                <div id="fila6" className="flex justify-between">
                <div id="col61">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div>
                {columnas>1 ? (
                <div id="col62">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ")}
                {columnas==3 ? (
                <div id="col63">
                   <h1 className="text-center">{selectedArt.detalles}</h1>
                   <h1 className="text-center">Ref: {selectedArt.referen}</h1>
                   <div className="flex justify-center">
                      <img src="" id="BarCode" alt="barcode"/>
                   </div>
                   <h1 className="text-center text-lg">{selectedArt.precio.toFixed(2)}{" "}€</h1>
                </div> ) : (" ") }
             </div> ): (" ")}

             </div> 
           </div>
        </div>  


        <div className="flex justify-center">
             <button className="bg-blue-400 px-3 py-1 text-white rounded-xl hover:blue-700"
              onClick={()=>handlePrint()}
             >
               Imprimir Etiquetas
             </button>
        </div>
     </div>
   )
};

export default Etiquetas;