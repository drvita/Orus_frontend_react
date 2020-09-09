import React, { Component } from "react";
import moment from "moment";

export default class Filter extends Component {
  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog" id="filters">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Busquedas</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form className="modal-body">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  placeholder="Por: nombre"
                  value={this.props.search}
                  onChange={this.onChangeValue}
                  onKeyPress={this.onKeyPressSearch}
                />
              </div>

              <div className="input-group mb-3">
                <label>Estado</label>
                <div className="input-group-prepend ml-4">
                  <span className="input-group-text">
                    <i className="fas fa-toggle-on"></i>
                  </span>
                </div>
                <select
                  className="form-control"
                  name="status"
                  value={this.props.status}
                  onChange={this.onChangeValue}
                >
                  <option value="">Todos</option>
                  <option value="0">Activo</option>
                  <option value="1">Terminado</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label>Fecha</label>
                <div className="input-group-prepend ml-4">
                  <span className="input-group-text">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={this.props.date}
                  onChange={this.onChangeValue}
                />
              </div>
            </form>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className={
                  this.props.search || typeof this.props.status !== "number"
                    ? "btn btn-warning"
                    : "btn btn-warning disabled"
                }
                disabled={
                  this.props.search || typeof this.props.status !== "number"
                    ? ""
                    : "disabled"
                }
                onClick={this.onClickClean}
              >
                Limpiar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClickFilter}
                data-dismiss="modal"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  onClickClean = () => {
    this.props.onChangeValue("search", "");
    this.props.onChangeValue("status", 0);
    this.props.onChangeValue(
      "date",
      moment.utc(new Date()).local().format("YYYY-MM-DD")
    );
  };
  onClickFilter = () => {
    this.props.handleFilter();
  };
  onChangeValue = (e) => {
    const { name, value } = e.target;
    this.props.onChangeValue(name, value);
  };
}
