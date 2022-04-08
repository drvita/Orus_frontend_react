/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { dollarUS } from "../../../utils/current";
import { api, setUrl } from "../../../utils/url";

export default function ReportPaymentsDetails({ filters }) {
  const [state, setState] = useState({
    payments: [],
    meta: {},
    page: 1,
    load: false,
  });

  const getSaleDay = async () => {
    const paymentsFilters = {
      ...filters,
    };

    paymentsFilters.itemsPage = 12;
    paymentsFilters.page = state.page;

    const paymentsUrl = setUrl("payments", null, paymentsFilters);

    console.log("REPORT PAYMENTS DETAILS URL", paymentsUrl);

    const { data, message, meta } = await api(paymentsUrl);

    if (data) {
      setState({
        ...state,
        payments: data,
        meta: meta,
        load: false,
      });
    } else if (message) {
      console.log(message);
      setState({
        ...state,
        load: false,
      });

      console.error("[Orus system] Error in report payments details:", message);
      window.Swal.fire("Fallo de conexion", message, "error");
    }
  };

  useEffect(() => {
    getSaleDay();
  }, [filters, state.page]);

  return (
    <div className="card card-success card-outline">
      <div className="card-header">
        <h3 className="card-title text-success">Detallado</h3>
      </div>
      <div className="card-body">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Metodo</th>
              <th>Cliente</th>
              <th>Pedido</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {state.load ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  <div
                    className="spinner-border text-primary mr-4"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className="font-weight-light font-italic">
                    Espere cargando datos de pagos
                  </span>
                </td>
              </tr>
            ) : state.payments.length ? (
              state.payments.map((pay) => {
                return (
                  <tr
                    key={pay.id}
                    className={pay.metodo === 1 ? "text-success" : ""}
                  >
                    <th className="text-uppercase">{pay.metodoname}</th>
                    <td className="text-capitalize">
                      {pay.sale && pay.sale.customer
                        ? pay.sale.customer.nombre
                        : "--"}
                    </td>
                    <td>
                      <span
                        className="badge badge-primary"
                        alt={"Cobrado por: " + pay.created_user}
                        title={"Cobrado por: " + pay.created_user}
                      >
                        {pay.sale && pay.sale.pedido ? pay.sale.pedido : "--"}
                      </span>
                    </td>
                    <td className="text-right">{dollarUS.format(pay.total)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th colSpan="4" className="text-center">
                  <h6 className="text-warning">
                    <i className="fas fa-info mr-2"></i>
                    No hay datos para este dia
                  </h6>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {state.meta.total ? (
        <div className="card-footer">
          {state.meta.current_page === 1 ? (
            <a href="#next" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-step-backward text-dark"></i>
            </a>
          ) : (
            <a
              href="#next"
              onClick={(e) => {
                e.preventDefault();
                setState({
                  ...state,
                  page: state.page - 1,
                });
              }}
            >
              <i className="fas fa-step-backward"></i>
            </a>
          )}
          {" " + state.page + " / " + state.meta.last_page + " "}
          {state.meta.current_page === state.meta.last_page ? (
            <a href="#next" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-step-forward text-dark"></i>
            </a>
          ) : (
            <a
              href="#next"
              onClick={(e) => {
                e.preventDefault();
                setState({
                  ...state,
                  page: state.page + 1,
                });
              }}
            >
              <i className="fas fa-step-forward"></i>
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
