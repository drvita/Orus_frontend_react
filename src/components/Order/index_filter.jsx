import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    const { search, status } = this.props;
    return (
      <React.Fragment>
        <div className="btn-group">
          <a
            href="#Filters"
            className="btn btn-tool text-dark"
            data-toggle="modal"
            data-target="#filters"
          >
            <i className="fas fa-filter"></i>
          </a>
        </div>
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
                    placeholder="Por: paciente o # de orden"
                    value={search}
                    onChange={this.changeFilters}
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
                    name="status"
                    value={status}
                    onChange={this.changeFilters}
                  >
                    <option value="">Todos</option>
                    <option value="0">En proceso</option>
                    <option value="1">Laboratorio</option>
                    <option value="2">Bicelación</option>
                    <option value="3">Entregado</option>
                    <option value="4">Garantia</option>
                    <option value="5">Baja</option>
                  </select>
                </div>
              </form>

              <div className="modal-footer">
                <div className="btn-group btn-group-lg" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-dismiss="modal"
                  >
                    <i className="fas fa-window-close mr-2"></i>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={
                      search
                        ? "btn btn-outline-dark"
                        : "btn btn-outline-dark disabled"
                    }
                    onClick={this.onClickClean}
                  >
                    <i className="fas fa-eraser mr-2"></i>
                    Limpiar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={this.setFilters}
                    data-dismiss="modal"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setFilters();
    }
  };
  onClickClean = () => {
    this.props.changeFilters("search", "");
    this.props.changeFilters("status", "");
    this.setFilters();
  };
  setFilters = () => {
    this.props.handleChangePage(1);
    window.$("#filters").modal("hide");
  };
  changeFilters = (e) => {
    const { name, value } = e.target;
    this.props.changeFilters(name, value);
  };
}
