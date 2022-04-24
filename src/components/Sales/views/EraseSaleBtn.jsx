import { Sale } from '../../../context/SaleContext';
import helpers from "../helpers.js";

export default function EraseSaleBtnComponent() {

  const { sale, resetSale } = Sale();
  const disabled = sale.customer.id || sale.items.length ? false : true;

  //Functions
  const eraseSale = () => {
      resetSale()
    },

    handleEraseSale = () => {
      helpers.confirm(
        "¿Desea terminar esta venta y crear una nueva?",
        eraseSale
      );
    };
  return (
    <button
      className="btn btn-warning ml-1"
      title="Nueva venta"
      onClick={handleEraseSale}
      disabled={ disabled }
    >
      <i className="fas fa-window-close"></i>
    </button>
  );
}
