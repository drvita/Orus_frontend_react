import React, { Component } from "react";

export default class ReportPaymentsDetails extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      host: ls.host,
      rol: ls.rol,
      token: ls.token,
      payments: [],
      meta: {},
      page: 1,
      load: false,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getSaleDay();
  }
  componentDidUpdate(props, state) {
    if (
      props.date !== this.props.date ||
      props.user !== this.props.user ||
      state.page !== this.state.page
    ) {
      console.log("[reportPaymentsDetails] Recarga datos");
      this.getSaleDay();
    }
  }

  render() {
    const { data } = this.props;
    const { payments, meta, page, load } = this.state;

    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            {data.rol
              ? "Mis pagos del dia [Detallado]"
              : "Pagos del dia [Detallado]"}
          </h3>
        </div>
        <div className="card-body">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Metodo</th>
                <th>Cliente</th>
                <th>Nota</th>
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
                          {pay.sale.id}
                        </span>
                      </td>
                      <td className="text-right">$ {pay.total.toFixed(2)}</td>
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

  getSaleDay = () => {
    //Variables en localStorage
    let { host, token, page } = this.state,
      { date, user } = this.props,
      url = "http://" + host + "/api/payments",
      saleDay = "?date=" + date,
      pagina = page > 0 ? "&page=" + page : "&page=1",
      itemsShow = "&itemsPage=10",
      saleUser = user ? "&user=" + user : "";

    if (token && host) {
      //Realiza la peticion del pedido
      console.log("[ReportPaymentsDetails] Solicitando datos a la API");
      this.setState({
        load: true,
      });
      fetch(url + saleDay + saleUser + itemsShow + pagina, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            throw new Error(res);
          }
          return res.json();
        })
        .then(async (data) => {
          if (!data.message) {
            console.log(
              "[ReportPayments] Almacenando datos de la venta del dia"
            );
            if (data.data) {
              this.setState({
                payments: data.data,
                meta: data.meta,
                load: false,
              });
            }
          } else {
            throw new Error(data.message);
          }
        })
        .catch((e) => {
          console.error(e);
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error de procesamiento, intentelo mas tarde",
            icon: "error",
            confirmButtonText: "Ok",
          });
          this.setState({
            load: false,
          });
        });
    }
  };
}
