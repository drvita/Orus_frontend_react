import React, { Component } from "react";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    //Recogemos valores de registro previo
    this.state = {
      name: "",
      validName: false,
      rfc: "",
      email: "",
      validEmail: false,
      type: 0,
      birthday: "",
      t_casa: "",
      t_oficina: "",
      t_movil: "",
      business: false,
      load: false,
      host: ls.host,
      token: ls.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timeSave = null;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    let {
      name,
      email,
      birthday,
      t_casa,
      t_oficina,
      t_movil,
      load,
      validName,
      validEmail,
    } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-danger card-outline">
            <div className="card-header">
              <h3 className="card-title text-danger">
                <i className="fas fa-address-book mr-2"></i>
                Pacientes
              </h3>
            </div>

            <div className="card-body">
              <div className="row was-validated">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className={"input-group-text "}>
                      <i className="fas fa-id-card-alt"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={"form-control text-capitalize"}
                    placeholder="Nombre completo"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    autoFocus={!name.length ? true : false}
                    autoComplete="off"
                    required="required"
                    pattern="^[a-zA-Z.]{2,20}[\s]{1}[a-zA-Z.]{2,20}.*"
                    minLength="8"
                    list="contactos_db"
                  />
                </div>

                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className={"input-group-text "}>
                      <i className="fas fa-at"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className={"form-control"}
                    placeholder="Correo electronico"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    autoComplete="off"
                    minLength="8"
                    list="email_db"
                  />
                </div>

                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Telefono"
                    name="t_movil"
                    value={t_movil}
                    onChange={this.catchInputs}
                    pattern="^[\d]{10}$"
                    maxLength="10"
                  />
                </div>
              </div>

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
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12">
                  {load ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group float-right" role="group">
                      <button
                        type="submit"
                        className={
                          validName &&
                          validEmail &&
                          (t_casa || t_oficina || t_movil)
                            ? "btn btn-danger"
                            : "btn btn-danger disabled"
                        }
                        disabled={
                          validName &&
                          validEmail &&
                          (t_casa || t_oficina || t_movil)
                            ? ""
                            : "disabled"
                        }
                      >
                        <i className="fas fa-save mr-1"></i>
                        Guardar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
