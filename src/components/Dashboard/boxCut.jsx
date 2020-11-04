import React, { Component } from "react";

export default class BoxCut extends Component {
  render() {
    const { caja, ventas } = this.props;
    const total = caja + ventas;
    return (
      <div className="card">
        <div className="card-body text-right">
          <h5 className="card-title">Corte de caja</h5>
          <p className="card-text">
            <label>caja:</label> ${caja.toFixed(2)}
          </p>
          <p className="card-text">
            <label>Venta:</label> ${ventas.toFixed(2)}
          </p>
        </div>
        <div className="card-footer text-right">
          <label>Total:</label> ${total.toFixed(2)}
        </div>
      </div>
    );
  }
}
