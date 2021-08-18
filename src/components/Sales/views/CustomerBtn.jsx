import { useState } from "react";
import { useDispatch } from "react-redux";
//Actions
import { saleActions } from "../../../redux/sales";
import helpers from "../helpers";
//Components
import SearchCustomerModal from "./SearchCustomerModal";

export default function CustomerBtnComponent({ sale, setSale: _setSale }) {
  const [data, setData] = useState(false),
    dispatch = useDispatch();
  //Functions
  const handleSetCustomer = () => {
      setData(true);
    },
    handleCloseShowSearchCustomer = () => {
      setData(false);
    },
    handleSelectCustomer = (customer) => {
      _setSale({
        pagado: 0,
      });
      setData(false);
      dispatch(
        saleActions.setSale({
          id: 0,
          customer,
          contact_id: customer.id,
          items: [],
          session: helpers.getSession(),
          descuento: 0,
          subtotal: 0,
          total: 0,
          pagado: 0,
          payments: [],
          payment: {},
          created_at: null,
        })
      );
    };

  return (
    <>
      <i className="fas fa-user mr-1 text-indigo"></i>
      Cliente:
      <label className="text-capitalize ml-1">
        {sale.customer ? sale.customer.nombre : "XXX"}
      </label>
      <button
        type="button"
        className="btn bg-indigo btn-sm ml-2"
        onClick={handleSetCustomer}
      >
        <i className="fas fa-exchange-alt"></i>
      </button>
      {data && (
        <SearchCustomerModal
          handleClose={handleCloseShowSearchCustomer}
          handleSelect={handleSelectCustomer}
        />
      )}
    </>
  );
}
