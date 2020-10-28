import React, { Component } from "react";

export default class edoCuenta extends Component {
  render() {
    const { pay, descuento, subtotal, total, pagado } = this.props;
    return (
      <div className="card card-success card-outline">
        <div className="card-body">
          <h5 className="card-title mb-4">
            <i className="fas fa-shield-alt mr-2"></i>
            Estado de cuenta
            {!pay ? (
              <span className="badge badge-success ml-2">Cuenta liquidada</span>
            ) : (
              ""
            )}
          </h5>

          <div className="card-text form-group row">
            <label className="col-6">Descuento</label>
            <div className="col">
              <input
                className="form-control text-right text-success"
                type="number"
                name="descuento"
                min="0"
                max={subtotal - descuento}
                readOnly={pay ? false : true}
                value={descuento ? descuento.toFixed(2) : ""}
                onChange={this.catchInputs}
              />
            </div>
          </div>
          <div className="card-text form-group row">
            <label className="col-6">Total</label>
            <div className="col">
              <input
                className="form-control text-right text-success"
                type="number"
                name="total"
                value={total.toFixed(2)}
                onChange={this.catchInputs}
                readOnly={true}
              />
            </div>
          </div>

          <div className="card-text row">
            <label className="col-6 p-2">Abonado</label>
            <h2 className="col text-success p-2 text-right">
              $ {pagado.toFixed(2)}
            </h2>
          </div>
          <div className="card-text row">
            <label className="col-6 p-2">Saldo</label>
            <h2 className="col text-success p-2 text-right">
              $ {pay.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  catchInputs = (e) => {
    this.props.catchInputs(e);
  };
}
