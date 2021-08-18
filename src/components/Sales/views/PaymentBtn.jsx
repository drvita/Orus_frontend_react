import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function PaymentBtnComponent({ sale, paid, forPaid }) {
  const [data, setData] = useState({
    showPayment: false,
  });
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
        disabled={!sale.items.length || paid}
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
