import React, { Component } from "react";

export default class ObservacionesExam extends Component {
  render() {
    return (
      <>
        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          name="observaciones"
          id="observaciones"
          className="form-control"
          defaultValue={this.props.observaciones ?? ""}
          onChange={this.catchInputs}
        ></textarea>
      </>
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
