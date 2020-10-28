import React, { Component } from "react";

export default class AddTelefonos extends Component {
  render() {
    let { t_casa, t_oficina, t_movil } = this.props,
      verify =
        t_casa.length === 10 ||
        t_movil.length === 10 ||
        t_oficina.length === 10;

    return (
      <div className="col">
        {t_casa ? (
          <div className="ml-1 mt-1">
            <small>
              <label>Telefono de casa</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-phone"></i>
            </span>
          </div>
          <input
            type="tel"
            className="form-control"
            placeholder="Telefono de casa"
            name="t_casa"
            value={t_casa}
            onChange={this.catchInputs}
            pattern="^[\d]{10}$"
            maxLength="10"
          />
        </div>
        {t_oficina ? (
          <div className="ml-1 mt-1">
            <small>
              <label>Telefono de oficina</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-phone-alt"></i>
            </span>
          </div>
          <input
            type="tel"
            className="form-control"
            placeholder="Telefono de oficina"
            name="t_oficina"
            value={t_oficina}
            onChange={this.catchInputs}
            pattern="^[\d]{10}$"
            maxLength="10"
          />
        </div>
        {t_movil ? (
          <div className="ml-1 mt-1">
            <small>
              <label>Telefono celular</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </span>
          </div>
          <input
            type="tel"
            className="form-control"
            placeholder="Telefono celular"
            name="t_movil"
            value={t_movil}
            onChange={this.catchInputs}
            pattern="^[\d]{10}$"
            required={
              t_casa.length !== 10 && t_oficina.length !== 10 ? true : false
            }
            maxLength="10"
          />
        </div>
        {!verify ? (
          <div className="mt-2 p-0 text-danger">
            <small>Por lo menos capture un telefono</small>
          </div>
        ) : null}
      </div>
    );
  }

  catchInputs = (x) => {
    this.props.onChange(x);
  };
}
