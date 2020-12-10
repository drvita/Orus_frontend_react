import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";
import AddAbono from "./abonoAdd";
import Print from "./print_pay";

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
    const { id, date, contact, order, pay, user, sale, cliente } = this.props;

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Metodo de pago</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Recibio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {abonos.length && !load ? (
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
                        ) : null}
                      </td>
                      <td className="text-right">$ {abono.total.toFixed(2)}</td>
                      <td>{abono.created_user}</td>
                      <td className="text-right">
                        {moment(new Date()).isSame(abono.created_at, "day") ? (
                          <button
                            className="btn btn-black btn-sm"
                            onClick={() => {
                              this.delete(abono.id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        ) : null}

                        <button
                          className="btn btn-outline-light btn-sm"
                          onClick={() => {
                            this.print(
                              abono.total,
                              moment(abono.created_at).format("L"),
                              abono.id
                            );
                          }}
                        >
                          <i className="fas fa-print"></i>
                        </button>
                      </td>
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
                ) : null}
                Total: $ {total.toFixed(2)}
              </th>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
        <AddAbono
          pay={pay}
          user={user}
          saleId={sale}
          contactId={contact}
          order={order}
          handleChange={this.handleChange}
          handleLoad={this.handleLoad}
        />
        <Print
          folio={id}
          date={date}
          contact={contact}
          client={cliente}
          id="print_pay"
        />
      </React.Fragment>
    );
  }

  delete = (id) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el abono?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm && id) {
          let ls = JSON.parse(localStorage.getItem("OrusSystem"));

          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de venta por API");
          return fetch("http://" + ls.host + "/api/payments/" + id, {
            method: "DELETE",
            signal: this.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + ls.token,
            },
          })
            .then(async (response) => {
              let back = {};
              if (response.status !== 204) back = await response.json();
              if (!response.ok) {
                throw new Error(back.message);
              }
              return back;
            })
            .catch((e) => {
              console.error("Orus fetch", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        console.log("Abono eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Abono eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getPayments());
      } else if (result && !result.dismiss) {
        console.log("Orus res: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
  };
  print = (total, date, id) => {
    let content = document.getElementById("print_pay"),
      pri = document.getElementById("ifmcontentstoprint").contentWindow;

    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.write("<fieldset><h3>");
    pri.document.write("Fecha: " + date);
    pri.document.write("<br/>Folio: " + id);
    pri.document.write("<br/>Monto: $ " + total.toFixed(2));
    pri.document.write("</h3></fieldset>");
    pri.document.close();
    pri.focus();
    pri.print();
  };
  handleLoad = (load) => {
    this.setState({
      load,
    });
  };
  handleChange = (total) => {
    this.setState({
      total: this.state.total + total,
    });
    this.getPayments();
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

    //Mandamos señal de procesamiento
    if (!this.state.load) {
      this.setState({
        load: true,
      });
    }
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
