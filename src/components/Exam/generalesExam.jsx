import React from "react";

const GeneralesExamComponent = (props) => {
  const catchInputs = (e) => {
    const { name, type, checked, value } = e.target,
      val = type === "checkbox" ? checked : value.toLowerCase();
    props.handleGetData(name, val);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="custom-control custom-switch">
            <input
              name="pc"
              type="checkbox"
              className="custom-control-input"
              id="pc"
              checked={props.pc}
              onChange={catchInputs}
            />
            <label className="custom-control-label" htmlFor="pc">
              <i className="fas fa-desktop"></i> PC
            </label>
          </div>

          <input
            type="text"
            name="pc_time"
            className="form-control input-xs"
            value={props.pc_time}
            onChange={catchInputs}
            readOnly={props.pc ? "" : "readonly"}
          />
        </div>
        <div className="col-md-3">
          <div className="custom-control custom-switch">
            <input
              name="tablet"
              type="checkbox"
              className="custom-control-input"
              id="tablet"
              checked={props.tablet}
              onChange={catchInputs}
            />
            <label className="custom-control-label" htmlFor="tablet">
              <i className="fas fa-tablet-alt"></i> Tablet
            </label>
          </div>

          <input
            type="text"
            name="tablet_time"
            className="form-control input-xs"
            value={props.tablet_time}
            onChange={catchInputs}
            readOnly={props.tablet ? "" : "readonly"}
          />
        </div>
        <div className="col-md-3">
          <div className="custom-control custom-switch">
            <input
              name="movil"
              type="checkbox"
              className="custom-control-input"
              id="movil"
              checked={props.movil}
              onChange={catchInputs}
            />
            <label className="custom-control-label" htmlFor="movil">
              <i className="fas fa-mobile-alt"></i> Telefono
            </label>
          </div>

          <input
            type="text"
            name="movil_time"
            className="form-control input-xs"
            value={props.movil_time}
            onChange={catchInputs}
            readOnly={props.movil ? "" : "readonly"}
          />
        </div>
        <div className="col-md-3">
          <div className="custom-control custom-switch">
            <input
              name="lap"
              type="checkbox"
              className="custom-control-input"
              id="lap"
              checked={props.lap}
              onChange={catchInputs}
            />
            <label className="custom-control-label" htmlFor="lap">
              <i className="fas fa-laptop"></i> Laptop
            </label>
          </div>

          <input
            type="text"
            name="lap_time"
            className="form-control input-xs"
            value={props.lap_time}
            onChange={catchInputs}
            readOnly={props.lap ? "" : "readonly"}
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
                  checked={props.frontal}
                  onChange={catchInputs}
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
                  checked={props.occipital}
                  onChange={catchInputs}
                />
                <label className="custom-control-label" htmlFor="occipital">
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
                  checked={props.generality}
                  onChange={catchInputs}
                />
                <label className="custom-control-label" htmlFor="generality">
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
                  checked={props.cefalea}
                  onChange={catchInputs}
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
                      checked={props.temporaod}
                      onChange={catchInputs}
                    />
                    <label className="custom-control-label" htmlFor="temporaod">
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
                      checked={props.temporaoi}
                      onChange={catchInputs}
                    />
                    <label className="custom-control-label" htmlFor="temporaoi">
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
                  value={props.c_frecuencia}
                  onChange={catchInputs}
                />
              </span>
            </li>
            <li className="list-group-item">
              <label htmlFor="c_intensidad">Intensidad</label>
              <div className="row">
                <div className="col-11">
                  <input
                    type="range"
                    name="c_intensidad"
                    className="custom-range custom-range-info"
                    id="c_intensidad"
                    min="0"
                    max="4"
                    value={props.c_intensidad}
                    onChange={catchInputs}
                  />
                </div>
                <div className="col-1">
                  <h6>{props.c_intensidad}</h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GeneralesExamComponent;
