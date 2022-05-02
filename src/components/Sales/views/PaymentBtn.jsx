import { useState } from "react";

//Components
import PaymentModal from "./PaymentModal";

//Context
import { Sale } from "../../../context/SaleContext";

//Helper
import helpers from '../helpers';


export default function PaymentBtnComponent() {

  const [data, setData] = useState({
    showPayment: false,
  });

  const sale = Sale();

  const forPaid = helpers.getForPay(sale.items, sale.payments, sale.discount);

  const pagado  = sale.discount === 0 ? helpers.getPagado(sale.payments) : helpers.getPagado(sale.payments) + sale.discount; 
  const paid = sale.subtotal <= pagado ? true : false;

  //Functions
  const handleShowPayment = () => {
      setData({
        ...data,
        showPayment: true,
      });
    },
    handleClosePayment = () => {
      setData({
        ...data,
        showPayment: false,
      });
    };

  return (
    <>
      <button
        className="btn btn-success ml-2 d-print-none"
        onClick={handleShowPayment}
        disabled={!sale.items.length || (sale.subtotal && paid)}
      >
        <i className="fas fa-money-bill-alt"></i>
      </button>
      {data.showPayment && (
        <PaymentModal
          handleClose={handleClosePayment}
          sale={{
            ...sale,
            contact_id: sale.customer.id,
          }}
          forPaid={forPaid}
        />
      )}
    </>
  );
}
