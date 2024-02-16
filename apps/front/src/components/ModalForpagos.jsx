import React, { useState, useEffect } from "react";

function ModalForpagos({
    isOpen,
    onClose,
    totalAmount,
    ctaBancarias,
}) {
    const token = localStorage.getItem("token");
    let localStorageItems = JSON.parse(localStorage.getItem("forpagos"));
    let xforpagos = localStorageItems;
    const [fpagos, setFpagos] = useState(xforpagos);
    const [xsuma, setXsuma] = useState(0);
    //ctabancoid: 0, valor: totalAmount, idformapago:
   const handleChangeBanco = (e) => {
        const indice = Number(e.target.id);
        const value = Number(e.target.value);
        for(let i=0;i<xforpagos.length;i++) {
            if(xforpagos[i].idformapago == indice) {
              xforpagos[i].ctabancoid = value;
            };
        };
        //localStorage.clear("forpagos");
        const updatedItemsJSON = JSON.stringify(xforpagos);
        localStorage.setItem("forpagos", updatedItemsJSON);
        //ahora actualizamos el estado local
        setFpagos(xforpagos);
   };

    const handleChangeValor= (e) => {
      const indice = Number(e.target.id);
      const value = Number(e.target.value);
      if(value<0) value=0;
      let suma = 0;
      for(let i=0;i<xforpagos.length;i++) {
          if(xforpagos[i].idformapago == indice) {
              xforpagos[i].valor = value;
          };
          suma += xforpagos[i].valor;
      };
      setXsuma(suma);
      //localStorage.clear("forpagos");
      const updatedItemsJSON = JSON.stringify(xforpagos);
      localStorage.setItem("forpagos", updatedItemsJSON);
      //ahora actualizamos el estado local
      setFpagos(xforpagos);
    };

    useEffect(() => {
        localStorageItems = JSON.parse(localStorage.getItem("forpagos"));
        xforpagos = localStorageItems || [];
        setFpagos(xforpagos);
        let suma = 0;
        for(let i=0;i<xforpagos.length;i++) {
            suma += xforpagos[i].valor;
        };
        setXsuma(suma);
    },[]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Detalles del pago</h2>
            <form>
            <table className="text-l text-left text-gray-700 dark:text-gray-700">
                <thead>
                    <tr><th>Detalles</th><th>Valor</th><th>Cta Bancaria Destino</th></tr>
                </thead>
                <tbody>
                    {fpagos.map(ele =>
                       <tr key={ele.idformapago}>
                           <td>{ele.detalle} &nbsp;&nbsp;&nbsp;</td>
                          <td><input type="number"
                                     name="valor"
                                     value={ele.valor}
                                     id={ele.idformapago}
                                     onChange={(e)=>handleChangeValor(e)}></input></td>
                          <select name="idbanco" 
                             id={ele.idformapago}
                             value={ele.ctabancoid}
                             onChange={(e)=>handleChangeBanco(e)}>
                             <option value="0">Seleccione</option>
                             {ctaBancarias.map(elemen => 
                                <option value={elemen.id}>{elemen.cue_banco} {elemen.cue_numero}</option>
                             )}
                          </select>
                       </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-end">
               <span className="text-red-500 px-20">
                  Totales: € {xsuma}
               </span>
               <button className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                      onClose();
                  }}>Cancelar
               </button>
               <button className={`${
                   totalAmount == xsuma ? "bg-blue-500 text-white"
                                 : "bg-gray-300 text-gray-500"
                   } px-4 py-2 rounded-md`}
                   onClick={() => {
                       if (totalAmount == xsuma) {
                          onClose();
                       }
                   }}
                   disabled={!(totalAmount == xsuma)}
               >Guardar
               </button>
            </div>
            </form>
        </div>
        </div>  
    )
};

export default ModalForpagos;