import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
//Component
import UserName from "./views/userNameInput";
import UserEmail from "./views/userEmailInput";
//Actions
import { userActions } from "../../redux/user/index";
import { configActions } from "../../redux/config";
import helper from "./helpers";

class UserAddComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      role: "",
      roles: [],
      permissions: [],
      username: "",
      validUserName: false,
      name: "",
      email: "",
      validUserEmail: false,
      password: "",
      updated_at: "",
      created_at: "",
      session: {},
      branch_id: 12,
      load: false,
    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (user && user.id) {
      this.setState({
        id: user.id,
        role: user.roles[0],
        roles: user.roles,
        permissions: user.permissions,
        username: user.username,
        name: user.name,
        email: user.email,
        updated_at: user.updated_at,
        created_at: user.created_at,
        session: user.session,
        branch_id: user.branch.id,
        validUserName: true,
        validUserEmail: true,
      });
    }
    this.getBranchs();
  }

  render() {
    let {
        load,
        id,
        role,
        permissions,
        username,
        name,
        email,
        password,
        updated_at,
        created_at,
        session,
        branch_id,
        validUserName,
        validUserEmail,
      } = this.state,
      send =
        !load && validUserName && name.length && validUserEmail ? false : true,
      { branchs } = this.props;

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
                      userId={id ? id : ""}
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
                          defaultValue={name}
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
                          defaultValue={password}
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
                      userId={id ? id : ""}
                      col={6}
                      onChange={this.catchInputs}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <small>
                        <label>Tipo de usuario</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-blue">
                            <i className="fas fa-id-card"></i>
                          </span>
                        </div>
                        <select
                          className="custom-select"
                          name="role"
                          value={role}
                          onChange={({ target }) => this.catchInputs(target)}
                        >
                          <option value="admin">Administrador</option>
                          <option value="ventas">Ventas</option>
                          <option value="doctor">Optometrista</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <small>
                        <label>Sucursal</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-blue">
                            <i className="fas fa-store"></i>
                          </span>
                        </div>
                        <select
                          className="custom-select text-uppercase"
                          name="branch_id"
                          value={branch_id}
                          onChange={({ target }) => this.catchInputs(target)}
                        >
                          {branchs.map((branch) => (
                            <option value={branch.id} key={branch.id}>
                              {branch.values.name}
                            </option>
                          ))}
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

          <div className="card card-primary card-outline mt-4">
            <div className="card-header">
              <h5 className="card-title text-primary">Tipo y permisos</h5>
            </div>
            <div className="card-body">
              <span className="badge badge-dark m-1">{role}</span>
              {permissions.map((permission, i) => (
                <span className="badge badge-primary m-1" key={i}>
                  {permission}
                </span>
              ))}
            </div>
          </div>
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
              {session && (
                <div className="card-footer text-right">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => this.handleCloseSession(id)}
                  >
                    <i className="fas fa-sign-out-alt mr-1"></i>
                    Cerrar session
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  getBranchs = () => {
    const { _getBranchs } = this.props;

    _getBranchs({
      page: 1,
      name: "branches",
      itemsPage: 10,
    });
  };
  handleCloseSession = (id) => {
    const { _clearToken } = this.props;

    if (id) {
      window.Swal.fire({
        title: "Almacenamiento",
        text: "Esta seguro de eliminar la sesion del usuario",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then(({ dismiss }) => {
        if (!dismiss && _clearToken) {
          _clearToken(id);
        }
      });
    } else {
      console.error("[Orus System] Id is undefinned", id);
    }
  };
  handleClosePanel = () => {
    const { _setUser } = this.props;
    _setUser();
  };
  catchInputs = ({ name, value, type }) => {
    if (type === "text") {
      value = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
    this.setState({
      [name]: value,
    });
  };
  handleSave = () => {
    const {
        id,
        name,
        username,
        role,
        password,
        email,
        branch_id,
        validUserName,
        validUserEmail,
      } = this.state,
      { _saveUser, options } = this.props;
    let data = {
      name,
      username,
      role,
      email,
      branch_id,
    };
    if (password.length >= 8) data.password = password;

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

const mapStateToProps = ({ users, config }) => {
    return {
      loading: users.loading,
      user: users.user,
      options: users.options,
      branchs: config.list,
    };
  },
  mapActionsToProps = {
    _setUser: userActions.setUser,
    _saveUser: userActions.saveUser,
    _clearToken: userActions.clearTokenUser,
    _getBranchs: configActions.getListConfig,
  };

export default connect(mapStateToProps, mapActionsToProps)(UserAddComponent);
