import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales/index.js";
import helpers from "../helpers.js";

export default function EraseSaleBtnComponent({ sale, erase: _erase }) {
  const dispatch = useDispatch();
  //Functions
  const eraseSale = () => {
      dispatch(
        saleActions.setSale({
          id: 0,
          customer: {},
          contact_id: null,
          items: [],
          session: helpers.getSession(),
          descuento: 0,
          subtotal: 0,
          total: 0,
          payments: [],
          created_at: null,
        })
      );
      _erase();
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
      disabled={!sale.total}
    >
      <i className="fas fa-backspace"></i>
    </button>
  );
}
