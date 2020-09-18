import React, { Component } from "react";

export default class bicelacionOrder extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label htmlFor="lab">Caja</label>
            <input
              type="text"
              className={
                this.props.status > 2 ? "form-control disabled" : "form-control"
              }
              disabled={this.props.status > 2 ? true : false}
              name="ncaja"
              value={this.props.ncaja ? this.props.ncaja : ""}
              onChange={this.changeInput}
            />
          </div>
        </div>
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Observaciones</label>
            <textarea
              name="observaciones"
              className={
                this.props.status > 2 ? "form-control disabled" : "form-control"
              }
              disabled={this.props.status > 2 ? true : false}
              value={this.props.observaciones ? this.props.observaciones : ""}
              onChange={this.changeInput}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }

  changeInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (name === "caja") value = value * 1;
    this.props.ChangeInput(name, value);
  };
}
