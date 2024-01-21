import React, { useEffect } from "react";
import moment from "moment";

function ModalAlbaran({ props }) {
  moment.locale("es");

  useEffect(() => {
    props.getBillById();
  }, []);

  return (
    <div className=" h-full -mt-3">
      {props.bill ? (
        <div className="w-full h-full  rounded-md overflow-hidden ">
          <div className="p-4 bg-customBlue text-white text-lg font-semibold">
            Factura de Venta
          </div>
          <div className="p-4">
            <div className="mb-4">
              <span className="font-semibold">Número de Factura:</span>{" "}
              {props.bill.cxc_numero}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Fecha de Factura:</span>{" "}
              {moment(props.bill.cxc_fechafac).format("LL")}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Cliente:</span>{" "}
              {props.bill.tercero && props.bill.tercero.ter_tercero}
              {"  "}
              <span className="font-semibold">Doc:</span>{" "}
              {props.bill.tercero && props.bill.tercero.ter_documento}
            </div>
            <div>
              <span className="font-semibold">Método de Pago:</span>{" "}
              {props.bill.contable &&
                props.bill.contable.items_formasdepagos[0].formasdepago &&
                props.bill.contable.items_formasdepagos[0].formasdepago
                  .fpag_detalles}
            </div>
            <div>
              <span className="font-semibold">Cajero:</span>{" "}
              {props.bill.contable &&
                props.bill.contable.caja &&
                props.bill.contable.caja.caj_detalles}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Detalles de Productos:</span>
              <ul>
                {props.bill.items_carteraxcobrars &&
                  props.bill.items_carteraxcobrars.map((item) => (
                    <li key={item.id}>
                      {item.ite_cantidad} x {item.ite_detalles} - $
                      {item.ite_valorunitario * item.ite_cantidad}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                EXPORTAR
              </button>
              <div className="font-semibold">
                <span>Total:</span> ${props.bill.cxc_valor}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ModalAlbaran;
