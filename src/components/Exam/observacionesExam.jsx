import React, { Component } from "react";

export default class ObservacionesExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="heading8">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#caja8"
              aria-expanded="false"
              aria-controls="caja8"
            >
              Observaciones
            </button>
          </h2>
        </div>
        <div
          id="caja8"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <textarea
              name="observaciones"
              className="form-control"
              value={this.props.observaciones}
              onChange={this.catchInputs}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }

  catchInputs = (e) => {
    const { name } = e.target,
      value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value.toLowerCase();
    this.props.onChangeInput(name, value);
  };
}
