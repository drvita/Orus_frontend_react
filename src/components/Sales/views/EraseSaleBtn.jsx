import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales/index.js";
import helpers from "../helpers.js";

export default function EraseSaleBtnComponent({
  sale,
  defaultState,
  erase: _erase,
}) {
  const dispatch = useDispatch();
  //Functions
  const eraseSale = () => {
      dispatch(
        saleActions.setSale({
          ...defaultState.sale,
          session: helpers.getSession(),
          created_at: new Date(),
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
      disabled={!sale.customer.id || !sale.items.length}
    >
      <i className="fas fa-window-close"></i>
    </button>
  );
}
