import { useState, useContext } from "react";
import PaymentModal from "./PaymentModal";
import { SaleContext } from "../../../context/SaleContext";
import helpers from '../helpers';


export default function PaymentBtnComponent() {


  const [data, setData] = useState({
    showPayment: false,
  });


  const { sale } = useContext(SaleContext);

  const forPaid = helpers.getForPay(sale.items, sale.payments, sale.descuento);

  const pagado  = sale.descuento === 0 ? helpers.getPagado(sale.payments) : helpers.getPagado(sale.payments) + sale.descuento; 
  const paid = sale.total <= pagado ? true : false;

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
        disabled={!sale.items.length || (sale.total && paid)}
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
