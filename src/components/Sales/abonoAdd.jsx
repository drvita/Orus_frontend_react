import React, { Component } from "react";
import moment from "moment";

export default class AddAbono extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      metodopago: 1,
      total: 0,
      bank_id: 0,
      auth: "",
      details: "",
      listBank: [],
      token: ls.token,
      host: ls.host,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentDidMount() {
    this.getBaks();
  }
  componentDidUpdate(props, state) {
    if (this.state.listBank === undefined || !this.state.listBank.length) {
      this.getBaks();
    }
  }

  render() {
    const { listBank, metodopago, total, bank_id, auth, details } = this.state;

    return (
      <div className="modal" tabIndex="-1" role="dialog" id="abonos">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Abono</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form className="modal-body">
              <div className="row mb-2">
                <div className="col">
                  <label>Fecha</label>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    readOnly={true}
                    value={moment().format("L")}
                  />
                </div>
                <div className="col">
                  <label>Usuario</label>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    readOnly={true}
                    value={this.props.user}
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label>Metodo de pago</label>
                  <select
                    name="metodopago"
                    className="custom-select"
                    value={metodopago}
                    onChange={this.onChangeValue}
                  >
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta de debito</option>
                    <option value="3">Tarjeta de credito</option>
                    <option value="4">La marina</option>
                    <option value="5">Cheque</option>
                    <option value="6">Transferencia</option>
                    <option value="0">Otro</option>
                  </select>
                </div>
                <div className="col">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    min="0"
                    max={this.props.pay}
                    className="form-control text-right"
                    name="total"
                    value={total ? total : ""}
                    onChange={this.onChangeValue}
                  />
                </div>
              </div>

              {metodopago !== 1 ? (
                <div className="row mb-2">
                  <div className="col">
                    {metodopago &&
                    metodopago !== 4 &&
                    listBank &&
                    listBank.length ? (
                      <React.Fragment>
                        <label>Banco</label>
                        <select
                          name="bank_id"
                          className="custom-select text-uppercase"
                          value={bank_id}
                          onChange={this.onChangeValue}
                        >
                          <option value="0">Seleccione un banco</option>
                          {listBank.map((bank) => {
                            return (
                              <option
                                key={bank.id}
                                value={bank.id}
                                className="text-uppercase"
                              >
                                {bank.name}
                              </option>
                            );
                          })}
                        </select>
                      </React.Fragment>
                    ) : !metodopago ? (
                      <React.Fragment>
                        <label>Espesifique</label>
                        <input
                          type="text"
                          name="details"
                          className="form-control"
                          value={details}
                          onChange={this.onChangeValue}
                        />
                      </React.Fragment>
                    ) : (
                      <h4>LA MARINA</h4>
                    )}
                  </div>
                  <div className="col">
                    <label>N. Autorización</label>
                    <input
                      type="text"
                      name="auth"
                      className="form-control"
                      value={auth}
                      onChange={this.onChangeValue}
                    />
                  </div>
                </div>
              ) : null}
            </form>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handlePay}
                data-dismiss="modal"
              >
                Abonar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getBaks = () => {
    const { host, token } = this.state,
      type = "?name=bank";

    //Peticion ajax de listado de bancos
    console.log("[Add pay]Descargando listado de bancos");
    fetch("http://" + host + "/api/config" + type, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
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
      .then((data) => {
        if (data.meta && data.meta.total) {
          console.log("[Add pay] Listado de bancos descargado");
          this.setState({
            listBank: data.data,
          });
        }
      })
      .catch((e) => {
        console.error("[Orus system] ", e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
  handlePay = (e) => {
    e.preventDefault();

    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de realizar el abono?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let body = {
              metodopago: this.state.metodopago,
              total: this.state.total,
              bank_id: this.state.bank_id,
              auth: this.state.auth,
              details: this.state.details,
              //Agregamos parametros de identificación
              sale_id: this.props.saleId,
              contact_id: this.props.contactId,
              order_id: this.props.order,
            },
            ls = JSON.parse(localStorage.getItem("OrusSystem")),
            url = "http://" + ls.host + "/api/payments";

          //Si la variable banco no esta definida la eliminamos no puede ir en cero
          if (!body["bank_id"]) delete body["bank_id"];

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos del pago a API para almacenar");
          return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
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
                throw new Error(response.statusText + "(" + back.message + ")");
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
        let data = result.value;

        if (data.data) {
          console.log("[abonodAdd] Abono almacenado");
          this.props.handleChange(this.state.total);
          this.setState({
            metodopago: 1,
            total: 0,
            bank_id: 0,
            banco: "",
            auth: "",
            details: "",
          });
          window.Swal.fire({
            icon: "success",
            title: "Abono almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          window.Swal.fire("Error", "al almacenar el abono", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  onChangeValue = (e) => {
    let { name, value, type } = e.target;
    if (name === "total") {
      value = parseInt(value);
      if (value > this.props.pay) value = this.props.pay;
      else if (value < 0) value = 0;
    }
    if (name === "metodopago" || type === "number") value = parseInt(value);

    if (name === "metodopago" && value === 1) {
      this.setState({
        metodopago: 1,
        bank_id: 0,
        auth: "",
        details: "",
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };
}
