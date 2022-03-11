import React, { Component } from "react";

export default class BoxCut extends Component {
  render() {
    const { ventas } = this.props;

    return (
      <div className="card border border-info rounded">
        <div className="card-body bg-light">
          <h2 className="card-title text-secondary">Efectivo de caja</h2>
          <br />
          <div className="row">
            <div className="col">
              <h5 className="text-success">
                $ {ventas.toLocaleString("es-MX") + ".00"}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
