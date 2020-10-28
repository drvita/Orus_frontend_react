import React, { Component } from "react";
import NameInput from "./nameInput";
import EmailInput from "./emailInput";

export default class AddPersonal extends Component {
  render() {
    let {
      type,
      business,
      name,
      rfc,
      email,
      birthday,
      validName,
      validEmail,
    } = this.props;
    return (
      <div className="col ">
        <small>
          <label>Tipo de cliente</label>
        </small>
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-clipboard-check"></i>
            </span>
          </div>
          <select
            className="custom-select"
            name="type"
            value={type}
            onChange={this.catchInputs}
          >
            <option value="0">Cliente</option>
            <option value="1">Proveedor</option>
          </select>
        </div>

        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <input
              type="checkbox"
              name="business"
              className="mr-2"
              checked={business}
              onChange={this.catchInputs}
            />
            <small>
              <label>¿Es una empresa?</label>
            </small>
          </div>
        </div>

        <NameInput
          name={name}
          validName={validName}
          onChange={this.catchInputs}
        />

        {rfc ? (
          <div className="ml-2 mt-1">
            <small>
              <label>RFC</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-file-invoice-dollar"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="RFC"
            name="rfc"
            value={rfc ? rfc : ""}
            onChange={this.catchInputs}
            required={false}
            minLength="10"
          />
        </div>

        <EmailInput
          email={email}
          validEmail={validEmail}
          onChange={this.catchInputs}
        />

        {!business && !type ? (
          <React.Fragment>
            {birthday ? (
              <div className="ml-2 mt-1">
                <small>
                  <label>Fecha de nacimiento</label>
                </small>
              </div>
            ) : (
              <br />
            )}
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-calendar-check"></i>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de nacimiento"
                name="birthday"
                value={birthday ? birthday : ""}
                onChange={this.catchInputs}
              />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  catchInputs = (x) => {
    this.props.onChange(x);
  };
}
