import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleActions } from "../../../redux/sales";
import PaymentModal from "./PaymentModal";
import helpers from "../helpers";
import PrintSaleComponent from "./Print_sale";

export default function ShowPaymentsComponent({ nota, orderId }) {
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
    },
    handleDeletePayment = ({ id, total, metodoname }) => {
      helpers.confirm(
        `Realmente desea eliminar el pago ${metodoname}, de ${total}`,
        () => {
          dispatch(
            saleActions.deletePayment({
              id,
              sale_id: sale.id,
            })
          );
        }
      );
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
        <div className="row d-print-none">
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

        <div className="row d-print-none">
          <div className="col table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Metodo</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Recibio</th>
                  <th style={{ width: 16 }}>
                    <span className="sr-only">DELETE</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sale.payments.map((pay) => (
                  <tr key={pay.id}>
                    <th>{pay.id}</th>
                    <td className="text-uppercase">{pay.metodoname}</td>
                    <td>${pay.total}</td>
                    <td>{pay.created_at}</td>
                    <td>{pay.created.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => handleDeletePayment(pay)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col text-right">
            <div className="btn-group">
              <PrintSaleComponent
                sale={sale}
                order={orderId}
                payed={data.totalPayments}
                text="Imprimir"
                btn="default"
              />
              <button
                type="button"
                className="btn btn-primary d-print-none"
                disabled={!data.toPaid}
                onClick={handleShowPayment}
              >
                <i className="fas fa-plus mr-1" />
                Agregar
              </button>
            </div>
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
