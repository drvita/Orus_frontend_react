import React, { Component } from "react";
import { api, getUrl } from "../../../redux/sagas/api";
import { dollarUS } from "../../../utils/current";

export default class ReportPaymentsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: [],
      meta: {},
      page: 1,
      load: false,
    };

    this.controller = new AbortController();
  }
  componentWillUnmount() {
    this.controller.abort();
  }
  componentDidMount() {
    this.getSaleDay();
  }
  componentDidUpdate(props, state) {
    if (
      props.filters.date_start !== this.props.filters.date_start ||
      props.filters.date_end !== this.props.filters.date_end ||
      props.filters.user !== this.props.filters.user ||
      props.filters.branch_id !== this.props.filters.branch_id ||
      state.page !== this.state.page
    ) {
      this.getSaleDay();
    }
  }

  render() {
    const { payments, meta, page, load } = this.state;
    //console.log("´DEBUG payments", payments);

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
              {load ? (
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
              ) : payments.length ? (
                payments.map((pay) => {
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
                      <td className="text-right">
                        {dollarUS.format(pay.total)}
                      </td>
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
        {meta.total ? (
          <div className="card-footer">
            {meta.current_page === 1 ? (
              <a href="#next" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-step-backward text-dark"></i>
              </a>
            ) : (
              <a
                href="#next"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    page: page - 1,
                  });
                }}
              >
                <i className="fas fa-step-backward"></i>
              </a>
            )}
            {" " + page + " / " + meta.last_page + " "}
            {meta.current_page === meta.last_page ? (
              <a href="#next" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-step-forward text-dark"></i>
              </a>
            ) : (
              <a
                href="#next"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    page: page + 1,
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

  getSaleDay = async () => {
    const { page } = this.state,
      { filters } = this.props;

    const newFiltersDetails = {
      ...filters,
    };

    newFiltersDetails.itemsPage = 12;
    newFiltersDetails.page = page;

    const url = getUrl("payments", null, newFiltersDetails);
    const { data, meta, message } = await api(url);

    //console.log("Report payments details DATA", data);

    if (data) {
      this.setState({
        payments: data,
        meta: meta,
        load: false,
      });
    } else if (message) {
      this.setState({
        load: false,
      });

      console.error("[Orus system] Error in report payments details:", message);
      window.Swal.fire("Fallo de conexion", message, "error");
    }
  };
}
