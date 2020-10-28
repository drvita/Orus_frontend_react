import React, { Component } from "react";

export default class AddDomicilio extends Component {
  render() {
    let { calle, colonia, municipio, estado, cp } = this.props;
    return (
      <div className="col">
        {calle ? (
          <small>
            <label>Calle y numero</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-road"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Calle y numero"
            name="calle"
            value={calle}
            onChange={this.catchInputs}
          />
        </div>
        {colonia ? (
          <small>
            <label>Colonia</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Colonia"
            name="colonia"
            value={colonia}
            onChange={this.catchInputs}
          />
        </div>
        {municipio ? (
          <small>
            <label>Municipio</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Municipio"
            name="municipio"
            value={municipio}
            onChange={this.catchInputs}
          />
        </div>
        {estado ? (
          <small>
            <label>Estado</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-map-marker"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Estado"
            name="estado"
            value={estado}
            onChange={this.catchInputs}
          />
        </div>
        {cp ? (
          <small>
            <label>Codigo postal</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-map-marker"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Codigo Postal"
            name="cp"
            value={cp}
            onChange={this.catchInputs}
          />
        </div>
      </div>
    );
  }

  catchInputs = (x) => {
    this.props.onChange(x);
  };
}
