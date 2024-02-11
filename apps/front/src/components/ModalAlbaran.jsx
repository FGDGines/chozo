import React, { useEffect } from "react";
import { RiLoader2Fill } from "react-icons/ri";
import moment from "moment";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ModalAlbaran({ props }) {
  moment.locale("es");

  useEffect(() => {
    props.getBillById();
  }, []);

  const exportToPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="h-full  -mt-3 overflow-auto">
      {" "}
      {props.bill ? (
        <div
          id="invoice"
          className="w-full bg-white rounded-md overflow-hidden shadow-lg"
          style={{ minHeight: "100%" }}
        >
          <div className="bg-customBlue text-white text-lg font-semibold py-4 px-6 flex justify-between items-center">
            <div>Albaran de venta</div>
            <div className="text-sm">
              Número de Albaran: {props.bill.cxc_numero}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div>
                <span className="font-semibold">Fecha:</span>{" "}
                {props.bill.cxc_fechafac ? (
                  <>
                    {format(new Date(props.bill.cxc_fechafac), "dd MMMM yyyy", {
                      locale: es,
                    })}{" "}
                    - {moment(props.bill.cxc_fechafac).format("LT")}
                  </>
                ) : (
                  "Fecha no disponible"
                )}
              </div>
              <div>
                <span className="font-semibold">Método de Pago:</span>{" "}
                {props.bill.contable &&
                  props.bill.contable.items_formasdepagos[0].formasdepago &&
                  props.bill.contable.items_formasdepagos[0].formasdepago
                    .fpag_detalles}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Cliente:</span>{" "}
              {props.bill.tercero && props.bill.tercero.ter_tercero}
              {"  "}
              <span className="font-semibold">Doc:</span>{" "}
              {props.bill.tercero && props.bill.tercero.ter_documento}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Detalles de Productos:</span>
              <table className="w-full mt-2 border border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Producto</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Precio Unitario</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props.bill.items_carteraxcobrars &&
                    props.bill.items_carteraxcobrars.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-2">{item.ite_detalles}</td>
                        <td className="px-4 py-2 text-center">
                          {item.ite_cantidad}
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${item.ite_valorunitario}
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${item.ite_valorunitario * item.ite_cantidad}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="font-semibold mr-4">
                <span>Total:</span> ${props.bill.cxc_valor}
              </div>
              <button
                onClick={() => exportToPDF()}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                EXPORTAR
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 flex justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center">
            <RiLoader2Fill className="text-[60px] mr-5 text-customBlue" />
            Cargando...
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalAlbaran;
