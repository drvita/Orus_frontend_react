import React, { Component } from "react";

export default class KeraRetExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="heading">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#panel_100"
              aria-expanded="true"
              aria-controls="panel_100"
            >
              Keratrometria y Retinoscopia
            </button>
          </h2>
        </div>
        <div
          id="panel_100"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-md-6">Keratometria</div>
                  <div className="col-md-6">Retinoscopia</div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <i className="fas fa-eye"></i> <label>Izquierdo</label>
                    <input
                      type="text"
                      name="keratometriaoi"
                      maxLength="12"
                      className="form-control input-xs"
                      value={this.props.keratometriaoi}
                      onChange={this.catchInputs}
                    />
                  </div>
                  <div className="col-md-3">
                    <i className="fas fa-eye"></i> <label>Derecho</label>
                    <input
                      type="text"
                      name="keratometriaod"
                      maxLength="12"
                      className="form-control input-xs"
                      value={this.props.keratometriaod}
                      onChange={this.catchInputs}
                    />
                  </div>
                  <div className="col-md-3">
                    <i className="fa fa-eye"></i> <label>Derecho</label>
                    <input
                      type="text"
                      name="rsod"
                      maxLength="16"
                      className="form-control"
                      value={this.props.rsod}
                      onChange={this.catchInputs}
                    />
                  </div>
                  <div className="col-md-3">
                    <i className="fa fa-eye"></i> <label>Izquierdo</label>
                    <input
                      type="text"
                      name="rsoi"
                      maxLength="16"
                      className="form-control"
                      value={this.props.rsoi}
                      onChange={this.catchInputs}
                    />
                  </div>
                </div>
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
