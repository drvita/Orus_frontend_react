import React, { Component } from "react";

export default class GeneralesExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="headingOne">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Generales
            </button>
          </h2>
        </div>
        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="row">
              <ul className="list-group">
                <div className="col-md-12">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-3">
                        <span className="label label-default">
                          <i className="fas fa-desktop"></i> PC
                        </span>
                        <input
                          name="pc"
                          type="checkbox"
                          checked={this.props.pc}
                          onChange={this.catchInputs}
                        />
                        <input
                          type="text"
                          name="pc_time"
                          className="form-control input-xs"
                          value={this.props.pc_time}
                          onChange={this.catchInputs}
                          readOnly={this.props.pc ? "" : "readonly"}
                        />
                      </div>
                      <div className="col-md-3">
                        <span className="label label-default">
                          <i className="fas fa-tablet"></i> Tablet
                        </span>
                        <input
                          name="tablet"
                          type="checkbox"
                          checked={this.props.tablet}
                          onChange={this.catchInputs}
                        />
                        <input
                          type="text"
                          name="tablet_time"
                          className="form-control input-xs"
                          value={this.props.tablet_time}
                          onChange={this.catchInputs}
                          readOnly={this.props.tablet ? "" : "readonly"}
                        />
                      </div>
                      <div className="col-md-3">
                        <span className="label label-default">
                          <i className="fas fa-mobile"></i> Telefono
                        </span>
                        <input
                          name="movil"
                          type="checkbox"
                          checked={this.props.movil}
                          onChange={this.catchInputs}
                        />
                        <input
                          type="text"
                          name="movil_time"
                          className="form-control input-xs"
                          value={this.props.movil_time}
                          onChange={this.catchInputs}
                          readOnly={this.props.movil ? "" : "readonly"}
                        />
                      </div>
                      <div className="col-md-3">
                        <span className="label label-default">
                          <i className="fa fa-laptop"></i> Laptop
                        </span>
                        <input
                          name="lap"
                          type="checkbox"
                          checked={this.props.lap}
                          onChange={this.catchInputs}
                        />
                        <input
                          type="text"
                          name="lap_time"
                          className="form-control input-xs"
                          value={this.props.lap_time}
                          onChange={this.catchInputs}
                          readOnly={this.props.lap ? "" : "readonly"}
                        />
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Frontal
                    <span className="badge badge-pill">
                      <input
                        name="frontal"
                        type="checkbox"
                        checked={this.props.frontal}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Occipita
                    <span className="badge badge-pill">
                      <input
                        name="occipital"
                        type="checkbox"
                        checked={this.props.occipital}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    General
                    <span className="badge badge-pill">
                      <input
                        name="generality"
                        type="checkbox"
                        checked={this.props.generality}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Cefalea
                    <span className="badge badge-pill">
                      <input
                        name="cefalea"
                        type="checkbox"
                        checked={this.props.cefalea}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    Temporal
                    <br />
                    <i className="fa fa-eye"></i> Izquierdo
                    <span className="badge badge-pill">
                      <input
                        name="temporaoi"
                        type="checkbox"
                        checked={this.props.temporaoi}
                        onChange={this.catchInputs}
                      />
                    </span>
                    <i className="fa fa-eye"></i> Derecho
                    <span className="badge badge-pill">
                      <input
                        name="temporaod"
                        type="checkbox"
                        checked={this.props.temporaod}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                  <li className="list-group-item">
                    Frecuencia
                    <span className="badge badge-pill">
                      <input
                        type="text"
                        name="c_frecuencia"
                        maxLength="60"
                        className="form-control input-xs"
                        value={this.props.c_frecuencia}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                  <li className="list-group-item">
                    Intensidad
                    <span className="badge badge-pill">
                      <input
                        type="range"
                        name="c_intensidad"
                        min="0"
                        max="4"
                        value={this.props.c_intensidad}
                        onChange={this.catchInputs}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
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
