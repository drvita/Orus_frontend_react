import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    const { search, type, date } = this.props;
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
                    placeholder="Por: paciente o # de venta"
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
                    name="type"
                    value={type}
                    onChange={this.changeFilters}
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
                    value={date}
                    onChange={this.changeFilters}
                    onKeyPress={this.onKeyPressSearch}
                  />
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
                      search || type
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
    this.props.changeFilters("type", "");
    this.props.changeFilters("date", "");
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
