import React, { Component } from "react";

export default class Recomendaciones extends Component {
  render() {
    return (
      <div className="card card-info card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-thumbs-up mr-1"></i>
            Recomendaciones
          </h3>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Tipo de lente</span>
            </div>
            <select className="custom-select">
              <option>Policarbonato</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Material</span>
            </div>
            <select className="custom-select">
              <option>Blanco</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Tratamiento</span>
            </div>
            <select className="custom-select">
              <option>Antirreflejante</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
