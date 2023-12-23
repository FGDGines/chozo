const Header = ({ formattedDate }) => (
  <div className="pl-2">
    <h2 className="text-[30px] font-SFMedium">Pedido de venta</h2>
    <div className="text-gray-500 mt-1">Fecha de la orden: {formattedDate}</div>
    <div className="text-gray-500 mt-1">Punto de venta: Dirección</div>
  </div>
);
export default Header;
