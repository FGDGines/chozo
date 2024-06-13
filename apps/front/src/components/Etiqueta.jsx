function Etiqueta({detalles, referencia, precio, printRef}) {
    <div ref={printRef}>
       <h1 className="text-center">{detalles}</h1>
       <h1 className="text-center">Ref: {referencia}</h1>
       <div className="flex justify-center">
          <img src="" id="BarCode" alt="barcode"/>
       </div>
       <h1 className="text-center text-lg">{precio.toFixed(2)}{" "}€</h1>
    </div> 
};

export default Etiqueta;