import { useContext } from 'react';
import { Sale } from '../../../context/SaleContext';
import helpers from "../helpers.js";


import { AuthContext } from '../../../context/AuthContext';

export default function EraseSaleBtnComponent() {

  const sale = Sale();
  const disabled = sale.customer.id || sale.items.length ? false : true;

  const {auth} = useContext(AuthContext);

  //Functions
  const eraseSale = () => {
    console.log("Borrar venta con boton");
      sale.set({
        id: 0,
        customer: {
          id: 0,
          name: "venta de mostrador",
        },
        contact_id: 2,
        items: [],
        session: helpers.getSession(),
        discount: 0,
        subtotal: 0,
        total: 0,
        payments: [],
        branch_id: auth.branch.id,
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
