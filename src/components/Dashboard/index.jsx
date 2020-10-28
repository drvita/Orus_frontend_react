import React, { Component } from "react";
import SalesOutStock from "../Sales/salesOutStock";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-4">
          <div className="card card-success card-outline">
            <div className="card-body">
              <h5 className="card-title mb-2">Articulos en pedido sin stock</h5>
              <SalesOutStock data={this.props.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
