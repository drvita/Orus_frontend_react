import React, { Component } from "react";
import moment from "moment";

export default class AddAbono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metodopago: 1,
      total: 0,
      banco: "",
      auth: "",
    };
  }
  render() {
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
                    value={this.state.metodopago}
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
                    value={this.state.total ? this.state.total : ""}
                    onChange={this.onChangeValue}
                  />
                </div>
              </div>

              {this.state.metodopago !== 1 ? (
                <div className="row mb-2">
                  <div className="col">
                    <label>Banco</label>
                    <input
                      type="text"
                      name="banco"
                      className="form-control"
                      value={
                        this.state.metodopago === 4
                          ? "La marina"
                          : this.state.banco
                      }
                      disabled={this.state.metodopago === 4 ? true : false}
                      onChange={this.onChangeValue}
                    />
                  </div>
                  <div className="col">
                    <label>N. Autorización</label>
                    <input
                      type="text"
                      name="auth"
                      className="form-control"
                      value={this.state.auth}
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
          let body = this.state,
            ls = JSON.parse(localStorage.getItem("OrusSystem")),
            url = "http://" + ls.host + "/api/payments";

          //Agregamos parametros de identificación
          body["sale_id"] = this.props.saleId;
          body["contact_id"] = this.props.contactId;
          body["order_id"] = this.props.order;

          //this.props.handleLoad(true);

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
          console.log("Abono almacenado");
          this.props.handleChange(this.state.total);
          this.setState({
            metodopago: 1,
            total: 0,
            banco: "",
            auth: "",
          });
          window.Swal.fire("Abono guardado con exito", "", "success");
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
      value = value * 1;
      if (value > this.props.pay) value = this.props.pay;
      else if (value < 0) value = 0;
    }
    if (name === "metodopago" || type === "number") value = value * 1;
    this.setState({
      [name]: value,
    });
  };
}
