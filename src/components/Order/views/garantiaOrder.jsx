import React, { Component } from "react";

export default class garantiaOrder extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label htmlFor="lab">Garantia</label>
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
