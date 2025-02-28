/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import PaymentModal from "./PaymentModal";

export default function CardOrderPayments({
  data = {
    subtotal: 0,
    total: 0,
    discount: 0,
  },
  disabled,
  handleSetPayments: _handleSetPayments,
}) {
  const [state, setState] = useState({
    showModal: false,
    amount: 0,
    toPaid: 0,
  });

  const handleToPaid = () => {
    if(!data.subtotal) data.subtotal = 0;
    if(!data.total) data.total = 0;
    if(!data.discount) data.discount = 0;
    let amount = data.payments?.reduce((back, pay) => pay.total + back, 0);
    if(!amount) amount = 0;
    const toPaid = (data.subtotal ? data.subtotal : data.total) - (amount ?? 0) - data.discount;

    setState({
      ...state,
      toPaid,
      amount: amount ?? 0,
    });
  };

  useEffect(() => {
    handleToPaid();
  }, [data.total, data.discount, data.payments, state.showModal]);

  return (
    <>
      <div className="card col-lg-8 ml-2">
        <div className="card-header border-primary">
          <h3 className="card-title">
            <i className="fas fa-money-bill-alt mr-1"></i>
            Lista de abonos
          </h3>
        </div>

        <div className="card-body">
          {data.payments?.length ? (
            <div className="col-lg-12">
              {data.payments.map((payment, index) => (
                <div className="row" id={payment.id} key={index}>
                  <div className="col-1">{index + 1}</div>
                  <div className="col-6 text-uppercase font-weight-bold">
                    <h6
                      className={
                        payment.metodoname === "efectivo"
                          ? "text-success"
                          : "text-dark"
                      }
                    >
                      <span className="text-dark mr-2">
                        {payment.metodoname}
                      </span>
                      {payment.auth && (
                        <span className="text-muted text-sm">{payment.auth}</span>
                      )}
                    </h6>
                  </div>
                  <div className="col-3 text-right">
                    <h6>${payment.total}</h6>
                  </div>
                  <div className="col-2 text-right">
                    <button
                      className="btn btn-sm btn-muted"
                      id={payment.id}
                      onClick={() => {
                        const payments = data.payments.filter(
                          (pay) => pay.id !== payment.id
                        );

                        _handleSetPayments("sale", {
                          ...data,
                          payments,
                        });
                      }}
                      disabled={Boolean(state.toPaid) || disabled}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5 className="text-center bg-warning">
              <i className="fas fa-info-circle p-2"></i>
              No tiene abonos en este pedido
            </h5>
          )}

          <div className="card-footer text-right d-flex justify-content-end">
            <div className="mr-4">
              <button
                className="btn btn-success ml-3"
                onClick={() => {
                  setState({
                    ...state,
                    showModal: true,
                  });
                }}
                disabled={!Boolean(state.toPaid) || disabled}
              >
                <i className="fas fa-money-bill-alt mr-2"></i>
                Abonar
              </button>
            </div>
            <h4 className="mr-4 text-success">
              <label className="font-weight-bold text-dark mr-2 block">
                Abono total:
              </label>
              <span>$ {state.amount}</span>
            </h4>
            <h4 className="text-danger">
              <label className="font-weight-bold text-dark mr-2 block">
                Por pagar:
              </label>
              <span>$ {state.toPaid}</span>
            </h4>
          </div>
        </div>
      </div>

      {state.showModal ? (
        <PaymentModal
          handleClose={() => {
            setState({
              ...state,
              showModal: false,
            });
          }}
          sale={data}
          forPaid={state.toPaid}
          handleSetPayments={(pay) => {
            const payments = data.payments;
            const index = payments.findIndex(
              (p) => p.metodopago === pay.metodopago
            );

            if (index < 0) {
              payments.push(pay);
            } else {
              payments[index].total += pay.total;
            }

            _handleSetPayments("sale", {
              ...data,
              payments,
            });
            setState({
              ...state,
              showModal: false,
            });
          }}
        />
      ) : null}
    </>
  );
}
