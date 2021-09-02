import React, { Component } from "react";

export default class BicelacionOrderComponent extends Component {
  render() {
    const { status, ncaja, observaciones } = this.props;
    return (
      <div className="row m-2">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label htmlFor="lab">Caja</label>
            <input
              type="text"
              className={status > 2 ? "form-control disabled" : "form-control"}
              disabled={status > 2 ? true : false}
              name="ncaja"
              defaultValue={ncaja ? ncaja : ""}
              onChange={this.changeInput}
            />
          </div>
        </div>
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Observaciones</label>
            <textarea
              name="observaciones"
              className={status > 2 ? "form-control disabled" : "form-control"}
              disabled={status > 2 ? true : false}
              defaultValue={observaciones ? observaciones : ""}
              onChange={this.changeInput}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }

  changeInput = (e) => {
    const { ChangeInput } = this.props;

    e.preventDefault();
    let { name, value } = e.target;
    if (name === "caja") value = parseInt(value);
    if (ChangeInput) ChangeInput(name, value);
  };
}
