import { Sale } from '../../../context/SaleContext';
import helpers from "../helpers.js";

export default function EraseSaleBtnComponent() {

  const sale = Sale();
  const disabled = sale.customer.id || sale.items.length ? false : true;

  //Functions
  const eraseSale = () => {
      sale.set({
        id: 0,
        customer: {
          id: 0,
          nombre: "venta de mostrador",
          email: "",
          telefonos: {},
          f_nacimiento: null,
          edad: 0,
        },
        contact_id: 2,
        items: [],
        session: helpers.getSession(),
        descuento: 0,
        subtotal: 0,
        total: 0,
        payments: [],
        created_at: new Date(),
      })
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
