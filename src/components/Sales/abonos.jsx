import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";
import AddAbono from "./abonoAdd";

export default class ListAbonos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abonos: [],
      total: 0,
      load: true,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentDidMount() {
    this.getPayments();
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    let { abonos, total, load } = this.state;
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Metodo de pago</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Recibio</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {abonos.length ? (
              <React.Fragment>
                {abonos.map((abono) => {
                  return (
                    <tr key={abono.id}>
                      <td>{moment(abono.created_at).format("L")}</td>
                      <td>
                        {this.SetMethodPayment(abono.metodo)}
                        {abono.metodo !== 1 ? (
                          <span className="ml-4">
                            {abono.banco ? abono.banco : "--"} /{" "}
                            {abono.Autorizacion ? abono.Autorizacion : "--"}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="text-right">$ {abono.total}</td>
                      <td>{abono.created_user}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ) : load ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  <div
                    className="spinner-border text-primary mr-4"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className="font-weight-light font-italic">
                    Espere cargando datos de la venta
                  </span>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay abonos registrados
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="3" className="text-right">
                {this.props.pay ? (
                  <a
                    href="#abonos"
                    className={
                      this.props.pay
                        ? "btn btn-outline-success btn-sm mr-2"
                        : "btn btn-outline-success btn-sm mr-2 disabled"
                    }
                    data-toggle="modal"
                    data-target="#abonos"
                    aria-disabled={this.props.pay ? false : true}
                  >
                    <i className="fas fa-money-bill-wave-alt"></i>
                  </a>
                ) : (
                  ""
                )}
                Total: $ {total}
              </th>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
        <AddAbono
          pay={this.props.pay}
          user={this.props.user}
          saleId={this.props.sale}
          contactId={this.props.contact}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  }

  handleChange = (total) => {
    this.getPayments();
    this.setState({
      total: this.state.total + total,
    });
  };
  SetMethodPayment = (status) => {
    switch (status) {
      case 1:
        return (
          <span className="badge badge-success text-uppercase">Efectivo</span>
        );
      case 2:
        return (
          <span className="badge badge-success text-uppercase">
            Tarjeta debito
          </span>
        );
      case 3:
        return (
          <span className="badge badge-success text-uppercase">
            Tarjeta Credito
          </span>
        );
      case 4:
        return (
          <span className="badge badge-success text-uppercase">La marina</span>
        );
      case 5:
        return (
          <span className="badge badge-success text-uppercase">Cheque</span>
        );
      case 6:
        return (
          <span className="badge badge-success text-uppercase">
            Transferencia
          </span>
        );
      default:
        return <span className="badge badge-success text-uppercase">Otro</span>;
    }
  };
  getPayments = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      order = "&order=desc",
      sale = "?sale=" + this.props.sale;
    //Realiza la peticion del usuario seun el id
    console.log("Descargando datos de los pagos");
    fetch("http://" + varLocalStorage.host + "/api/payments" + sale + order, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          console.log(res);
        }
        return res.json();
      })
      .then((data) => {
        if (data.meta && data.meta.total) {
          console.log("Almacenando abonos");
          let total = 0;
          for (var i = 0; i < data.data.length; i++) {
            total += data.data[i].total;
          }
          this.props.handleChange("pagado", total * 1);
          this.setState({
            abonos: data.data,
            total,
            load: false,
          });
        } else {
          this.setState({
            load: false,
          });
        }
      });
  };
}
