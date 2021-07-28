import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
//Component
import UserName from "./userNameInput";
import UserEmail from "./userEmailInput";
//Actions
import { userActions } from "../../redux/user/index";
import helper from "./helpers";

class UserAddComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      rol: 1,
      username: "",
      validUserName: false,
      name: "",
      email: "",
      validUserEmail: false,
      password: "",
      updated_at: "",
      created_at: "",
      session: {},
      load: false,
    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) {
      this.setState({
        id: user.id,
        rol: user.rol,
        username: user.username,
        name: user.name,
        email: user.email,
        updated_at: user.updated_at,
        created_at: user.created_at,
        session: user.session,
        validUserName: true,
        validUserEmail: true,
      });
    }
  }

  render() {
    let {
        load,
        id,
        rol,
        username,
        name,
        email,
        password,
        updated_at,
        created_at,
        session,
        validUserName,
        validUserEmail,
      } = this.state,
      send =
        !load && validUserName && name.length && validUserEmail ? false : true;

    return (
      <div className="row">
        <div className={`col-${id ? 8 : 12}`}>
          <form className="card card-primary card-outline" autoComplete="off">
            <div className="card-header">
              <h1 className="card-title text-primary">
                <i className="fas fa-user mr-2"></i>
                {id ? "Editar usuario" : "Registrar nuevo usuario"}
              </h1>
            </div>
            <div className="card-body was-validated">
              {load ? (
                <div className="alert alert-light text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row mb-3">
                    <UserName
                      username={username}
                      col={6}
                      onChange={this.catchInputs}
                    />
                    <div className="col-6">
                      {name.length ? (
                        <small>
                          <label>Nombre completo</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-blue">
                            <i className="fas fa-user-tag"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Nombre completo"
                          name="name"
                          autoComplete="off"
                          value={name}
                          onChange={({ target }) => this.catchInputs(target)}
                          required="required"
                          minLength="8"
                          pattern="^[a-zA-Z]{2,20}[\s]{1}[a-zA-Z]{2,20}.*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {password.length || id ? (
                        <small>
                          <label>Contraseña</label>
                          {!id && (
                            <span className="ml-2 text-muted">
                              De 8 a 16 caracteres, por lo menos una mayuscula,
                              un numero y un caracter especial
                            </span>
                          )}
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-blue">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          name="password"
                          autoComplete="off"
                          value={password}
                          onChange={({ target }) => this.catchInputs(target)}
                          required={id ? false : true}
                          minLength="8"
                          maxLength="16"
                          pattern="^(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$"
                        />
                      </div>
                    </div>
                    <UserEmail
                      email={email}
                      col={6}
                      onChange={this.catchInputs}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <small>
                        <label>Rol</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-blue">
                            <i className="fas fa-id-card"></i>
                          </span>
                        </div>
                        <select
                          className="custom-select"
                          name="rol"
                          value={rol}
                          onChange={({ target }) => this.catchInputs(target)}
                        >
                          <option value="0">Administrador</option>
                          <option value="1">Ventas</option>
                          <option value="2">Optometrista</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12 text-right">
                  <div className="btn-group btn-group-lg" role="group">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={this.handleClosePanel}
                    >
                      <i className="fas fa-ban mr-1"></i>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className={
                        load ? "btn btn-primary disabled" : "btn btn-primary"
                      }
                      disabled={send ? true : false}
                      onClick={this.handleSave}
                    >
                      <i className="fas fa-save mr-1"></i>
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {id ? (
          <div className="col-4">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title text-primary">
                  <i className="fas fa-database mr-2"></i>
                  Metadata
                </h3>
              </div>
              <div className="card-body">
                {session ? (
                  <ul className="list-group">
                    <li className="list-group-item">
                      <h6>Datos del usuario</h6>
                      <div className="row">
                        <div className="col">
                          <span className="text-primary">Registrado</span>
                          <p>{moment(created_at).fromNow()}</p>
                        </div>
                        <div className="col">
                          <span className="text-primary">
                            Ultima actualizacion
                          </span>
                          <p>{moment(updated_at).fromNow()}</p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <h6>Actividad</h6>
                      <div className="row">
                        <div className="col">
                          <span className="text-primary">IP</span>
                          <p>{session.ip_address}</p>
                        </div>
                        <div className="col">
                          <span className="text-primary">Ultima actividad</span>
                          <p>{moment(session.last_activity).fromNow()}</p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <span className="text-primary">Navegador y OS</span>
                      <p>{session.user_agent}</p>
                    </li>
                    <li className="list-group-item">
                      <span className="text-primary">Token</span>
                      <p>{session.user_data}</p>
                    </li>
                  </ul>
                ) : (
                  <p>Usuario no ha registrado actividad.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  handleClosePanel = () => {
    const { _setUser } = this.props;
    _setUser();
  };
  catchInputs = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };
  handleSave = () => {
    const {
        id,
        name,
        username,
        rol,
        password,
        email,
        validUserName,
        validUserEmail,
      } = this.state,
      { options, _saveUser } = this.props;
    let data = {
      name,
      username,
      rol,
      email,
    };
    if (password.length > 8) data.password = password;

    //Valid primary data
    if (!validUserName) {
      window.Swal.fire({
        icon: "error",
        title: "El nombre de usuario ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!validUserEmail) {
      window.Swal.fire({
        icon: "error",
        title: "El correo ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    helper.handleSave(id, data, options, _saveUser);
  };
}

const mapStateToProps = ({ users }) => {
    return {
      loading: users.loading,
      user: users.user,
      options: users.options,
    };
  },
  mapActionsToProps = {
    _setUser: userActions.setUser,
    _saveUser: userActions.saveUser,
  };

export default connect(mapStateToProps, mapActionsToProps)(UserAddComponent);
