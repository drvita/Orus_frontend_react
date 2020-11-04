import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

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
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar el abono?"),
      body = this.state;
    //Agregamos parametros de identificación
    body["sale_id"] = this.props.saleId;
    body["contact_id"] = this.props.contactId;
    body["order_id"] = this.props.order;

    if (conf) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

      this.props.handleLoad(true);

      //Agregamos nuevo abono
      console.log("Enviando datos a API para almacenar abono");
      fetch("http://" + varLocalStorage.host + "/api/payments", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Abono almacenado");
            this.props.handleChange(this.state.total);
            this.setState({
              metodopago: 1,
              total: 0,
              banco: "",
              auth: "",
            });
          } else console.log(data.message);
        });
    }
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
