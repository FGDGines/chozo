import React, { useState, useEffect } from "react";

function PaymentModal({
  isOpen,
  onClose,
  paymentMethods,
  onPaymentDetailsChange,
  paymentDetails,
  totalAmount,
}) {
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const sum = paymentDetails.reduce(
      (total, current) => total + parseFloat(current.valor || 0),
      0
    );
    setTotalPaid(sum);
  }, [paymentDetails]);

  // Calcular la cantidad restante que falta pagar
  const remainingAmount = totalAmount - totalPaid;

  // Verificar si el botón "Guardar" debe estar habilitado
  const isSaveEnabled = remainingAmount === 0;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Detalles del pago</h2>
        {paymentMethods.map((method, index) => (
          <div key={method.id} className="mb-4">
            <label htmlFor={`amount_${method.id}`} className="mr-2">
              {method.fpag_detalles}
            </label>
            <input
              type="number"
              id={`amount_${method.id}`}
              value={paymentDetails[index] ? paymentDetails[index].valor : 0}
              onChange={(e) =>
                onPaymentDetailsChange(index, "valor", e.target.value)
              }
              className="border border-gray-300 rounded-md p-1"
            />
          </div>
        ))}
        <div className="flex justify-end">
          {/* Mostrar la cantidad restante */}
          <span className={remainingAmount > 0 ? "text-red-500" : ""}>
            Faltan: ${remainingAmount.toFixed(2)}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md mr-2"
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </button>
          <button
            className={`${
              isSaveEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            } px-4 py-2 rounded-md`}
            onClick={() => {
              if (isSaveEnabled) {
                onClose();
              }
            }}
            disabled={!isSaveEnabled}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
