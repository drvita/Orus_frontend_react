import React, { Component } from "react";

export default class BoxCut extends Component {
  render() {
    const { caja, ventas } = this.props;
    const total = caja + ventas;
    return (
      <div className="card border border-info rounded">
        <div className="card-body bg-light text-right">
          <h5 className="card-title text-secondary">Corte de caja</h5>
          <br />
          <div className="row">
            <div className="col">
              <label>caja:</label>
              <br /> <span className="text-success">${caja.toFixed(2)}</span>
            </div>
            <div className="col">
              <label>Efectivo:</label>
              <br /> <span className="text-success">${ventas.toFixed(2)}</span>
            </div>
            <div className="col">
              <label>Total:</label>
              <br /> <span className="text-success">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
