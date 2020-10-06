import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    console.log("date", this.props.date);
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
                  placeholder="Por: paciente o # de venta"
                  value={this.props.search}
                  onChange={this.onChangeValue}
                  onKeyPress={this.onKeyPressSearch}
                />
              </div>

              <div className="input-group mb-3">
                <label>Estado</label>
                <div className="input-group-prepend ml-4">
                  <span className="input-group-text">
                    <i className="fas fa-address-book"></i>
                  </span>
                </div>
                <select
                  className="form-control"
                  name="type"
                  value={this.props.type}
                  onChange={this.onChangeValue}
                >
                  <option value="">Todos</option>
                  <option value="0">Adeudos</option>
                  <option value="1">Pagados</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label>Fecha</label>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={this.props.date}
                  onChange={this.onChangeValue}
                  onKeyPress={this.onKeyPressSearch}
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
                  this.props.search || this.props.type
                    ? "btn btn-warning"
                    : "btn btn-warning disabled"
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
    this.props.onChangeValue("type", "");
    this.props.onChangeValue("date", "");
  };
  onClickFilter = () => {
    this.props.handleFilter();
  };
  onChangeValue = (e) => {
    const { name, value } = e.target;
    console.log("Change", name, value);
    this.props.onChangeValue(name, value);
  };
}
