import React, { Component } from "react";

export default class InterrogatorioExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="headingThree">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Interrogatorios
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                Interrogatorio
                <textarea
                  name="interrogatorio"
                  className="form-control"
                  value={this.props.interrogatorio}
                  onChange={this.catchInputs}
                ></textarea>
              </li>
              <li className="list-group-item">
                Cirugias oculares
                <textarea
                  name="coa"
                  className="form-control"
                  value={this.props.coa}
                  onChange={this.catchInputs}
                ></textarea>
              </li>
              <li className="list-group-item">
                Antecedentes oculares patologicas personales
                <textarea
                  name="aopp"
                  className="form-control"
                  rows="2"
                  value={this.props.aopp}
                  onChange={this.catchInputs}
                ></textarea>
              </li>
              <li className="list-group-item">
                Antecedentes oculares patologicas familiares
                <textarea
                  name="aopf"
                  className="form-control"
                  rows="2"
                  value={this.props.aopf}
                  onChange={this.catchInputs}
                ></textarea>
              </li>
            </ul>
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
