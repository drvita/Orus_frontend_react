import React, { Component } from "react";

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
                  className="form-control"
                  placeholder="Por: nombre, RFC o email"
                  value={this.props.search}
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
                  this.props.search
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
    this.props.onChangeValue("");
  };
  onClickFilter = () => {
    this.props.handleFilter();
  };
  onChangeValue = (e) => {
    this.props.onChangeValue(e.target.value);
  };
}
