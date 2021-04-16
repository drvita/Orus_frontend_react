import React, { Component } from "react";

export default class statusOrder extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label htmlFor="lab">Estado</label>
            <select
              className="form-control"
              name="status"
              value={this.props.status}
              onChange={this.changeInput}
            >
              <option value="0">En proceso</option>
              <option value="1">Laboratorio</option>
              <option value="2">Bicelación</option>
              <option value="3">Entregado</option>
              <option value="4">Garantia</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  changeInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    value = value * 1;
    this.props.ChangeInput(name, value);
  };
}
