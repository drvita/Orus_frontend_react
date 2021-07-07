import React, { Component } from "react";

export default class InterrogatorioExam extends Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <label>Interrogatorio inicial</label>
            <textarea
              name="interrogatorio"
              className="form-control"
              value={this.props.interrogatorio}
              onChange={this.catchInputs}
            ></textarea>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <label>Cirugias oculares</label>
            <textarea
              name="coa"
              className="form-control"
              value={this.props.coa}
              onChange={this.catchInputs}
            ></textarea>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <label>Antecedentes oculares patologicas personales</label>
            <textarea
              name="aopp"
              className="form-control"
              rows="2"
              value={this.props.aopp}
              onChange={this.catchInputs}
            ></textarea>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <label>Antecedentes oculares patologicas familiares</label>
            <textarea
              name="aopf"
              className="form-control"
              rows="2"
              value={this.props.aopf}
              onChange={this.catchInputs}
            ></textarea>
          </div>
        </div>
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
