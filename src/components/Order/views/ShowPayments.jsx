import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleActions } from "../../../redux/sales";
import PaymentModal from "../../Sales/views/PaymentModal";

export default function ShowPaymentsComponent({ nota }) {
  //State
  const [data, setData] = useState({
    showPayment: false,
    totalPayments: 0,
    toPaid: 0,
  });
  const dispatch = useDispatch(),
    { sale } = useSelector((state) => state.sales);
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
    },
    getSale = (id) => {
      if (id) dispatch(saleActions.getSale(id));
    };

  useEffect(() => {
    let totalPayments = 0;
    sale.payments.forEach((pay) => (totalPayments += parseInt(pay.total)));

    if (!sale.id) getSale(nota.id);

    setData({
      ...data,
      totalPayments,
      toPaid: parseInt(sale.total) - totalPayments,
    });

    //eslint-disable-next-line
  }, [sale]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <label>Nota:</label> {sale.id}
          </div>
          <div className="col">
            <label>Total:</label> ${sale.total}
          </div>
          <div className="col">
            <label>Abonado:</label> ${data.totalPayments}
          </div>
          <div className="col">
            <label>Por pagar:</label>{" "}
            <span className="text-success text-bold">
              ${data.toPaid >= 0 ? data.toPaid : 0}
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Metodo</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Recibio</th>
                </tr>
              </thead>
              <tbody>
                {sale.payments.map((pay) => (
                  <tr key={pay.id}>
                    <td>{pay.id}</td>
                    <td className="text-uppercase">{pay.metodoname}</td>
                    <td>${pay.total}</td>
                    <td>{pay.created_at}</td>
                    <td>{pay.created.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col text-right">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!data.toPaid}
              onClick={handleShowPayment}
            >
              <i className="fas fa-plus mr-1" />
              Agregar
            </button>
          </div>
        </div>

        {data.showPayment && (
          <PaymentModal
            handleClose={handleClosePayment}
            sale={{
              ...sale,
              contact_id: sale.customer.id,
            }}
            forPaid={data.toPaid}
          />
        )}
      </div>
    </div>
  );
}
