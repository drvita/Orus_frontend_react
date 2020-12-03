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
              <div className="col-md-3">
                <div className="custom-control custom-switch">
                  <input
                    name="pc"
                    type="checkbox"
                    className="custom-control-input"
                    id="pc"
                    checked={this.props.pc}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="pc">
                    <i className="fas fa-desktop"></i> PC
                  </label>
                </div>

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
                <div className="custom-control custom-switch">
                  <input
                    name="tablet"
                    type="checkbox"
                    className="custom-control-input"
                    id="tablet"
                    checked={this.props.tablet}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="tablet">
                    <i className="fas fa-tablet-alt"></i> Tablet
                  </label>
                </div>

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
                <div className="custom-control custom-switch">
                  <input
                    name="movil"
                    type="checkbox"
                    className="custom-control-input"
                    id="movil"
                    checked={this.props.movil}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="movil">
                    <i className="fas fa-mobile-alt"></i> Telefono
                  </label>
                </div>

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
                <div className="custom-control custom-switch">
                  <input
                    name="lap"
                    type="checkbox"
                    className="custom-control-input"
                    id="lap"
                    checked={this.props.lap}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="lap">
                    <i className="fas fa-laptop"></i> Laptop
                  </label>
                </div>

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
            <div className="row mt-1">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="custom-control custom-switch">
                      <input
                        name="frontal"
                        type="checkbox"
                        className="custom-control-input"
                        id="frontal"
                        checked={this.props.frontal}
                        onChange={this.catchInputs}
                      />
                      <label className="custom-control-label" htmlFor="frontal">
                        Frontal
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="custom-control custom-switch">
                      <input
                        name="occipital"
                        type="checkbox"
                        className="custom-control-input"
                        id="occipital"
                        checked={this.props.occipital}
                        onChange={this.catchInputs}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="occipital"
                      >
                        Occipital
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="custom-control custom-switch">
                      <input
                        name="generality"
                        type="checkbox"
                        className="custom-control-input"
                        id="generality"
                        checked={this.props.generality}
                        onChange={this.catchInputs}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="generality"
                      >
                        General
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="custom-control custom-switch">
                      <input
                        name="cefalea"
                        type="checkbox"
                        className="custom-control-input"
                        id="cefalea"
                        checked={this.props.cefalea}
                        onChange={this.catchInputs}
                      />
                      <label className="custom-control-label" htmlFor="cefalea">
                        Cefalea
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    Temporal
                    <br />
                    <div className="row mt-2">
                      <div className="col">
                        <div className="custom-control custom-switch">
                          <input
                            name="temporaod"
                            type="checkbox"
                            className="custom-control-input"
                            id="temporaod"
                            checked={this.props.temporaod}
                            onChange={this.catchInputs}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="temporaod"
                          >
                            <i className="fa fa-eye"></i> Derecho
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="custom-control custom-switch">
                          <input
                            name="temporaoi"
                            type="checkbox"
                            className="custom-control-input"
                            id="temporaoi"
                            checked={this.props.temporaoi}
                            onChange={this.catchInputs}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="temporaoi"
                          >
                            <i className="fa fa-eye"></i> Izquierdo
                          </label>
                        </div>
                      </div>
                    </div>
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
                    <label htmlFor="c_intensidad">Intensidad</label>
                    <input
                      type="range"
                      name="c_intensidad"
                      className="custom-range custom-range-info"
                      id="c_intensidad"
                      min="0"
                      max="4"
                      value={this.props.c_intensidad}
                      onChange={this.catchInputs}
                    />
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
