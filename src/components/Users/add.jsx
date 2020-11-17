import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import UserName from "./userNameInput";
import UserEmail from "./userEmailInput";

export default class UserAdd extends Component {
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
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getUser(id);
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
        <div className="col">
          <form
            className="card card-primary card-outline"
            onSubmit={this.handleSave}
          >
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
                <React.Fragment>
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
                          onChange={this.catchInputs}
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
                          {id ? (
                            ""
                          ) : (
                            <span className="ml-2">
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
                          onChange={this.catchInputs}
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
                          onChange={this.catchInputs}
                        >
                          <option value="0">Administrador</option>
                          <option value="1">Ventas</option>
                          <option value="2">Optometrista</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12 text-right">
                  <div className="btn-group btn-group-lg" role="group">
                    <Link
                      to="/usuarios"
                      className="btn btn-dark"
                      onClick={this.changePage}
                      id="/usuarios"
                    >
                      <i className="fas fa-ban mr-1"></i>
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className={
                        load ? "btn btn-primary disabled" : "btn btn-primary"
                      }
                      disabled={send ? true : false}
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
          <div className="col">
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

  changePage = (e) => {
    this.props.page(e.target.id);
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();

    let { id, validUserName, validUserEmail } = this.state;

    //Verificamos campos validos
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

    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar el usuario?"
        : "¿Esta seguro de crear un nuevo usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let {
              host,
              token,
              id,
              name,
              username,
              rol,
              password,
              email,
            } = this.state,
            body = {
              name,
              username,
              rol,
              email,
            },
            url = id
              ? "http://" + host + "/api/users/" + id
              : "http://" + host + "/api/users",
            method = id ? "PUT" : "POST";

          //Agregamos el password si no esta vacio
          if (password.length > 8) body.password = password;

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos del usuario a API");
          return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((e) => {
              console.error("Orus fetch", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          console.log("Usuario almacenado");
          window.Swal.fire({
            icon: "success",
            title: id
              ? "Usuario actualizado con exito"
              : "Usuario almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => this.props.history.goBack());
        } else {
          window.Swal.fire("Error", "al almacenar el usuario", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getUser = (id) => {
    //Variables en localStorage
    let { host, token } = this.state;
    if (id > 0) {
      fetch("http://" + host + "/api/users/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Cargando datos de usuario");
            this.setState({
              id: data.data.id,
              rol: data.data.rol,
              username: data.data.username,
              name: data.data.name,
              email: data.data.email,
              updated_at: data.data.updated_at,
              created_at: data.data.created_at,
              session: data.data.session,
              load: false,
              validUserName: true,
              validUserEmail: true,
            });
          } else {
            console.error("Orus: ", data.message);
            window.Swal.fire(
              "Error",
              "Error en el sistema, comuniquese con el administrador de sistema",
              "error"
            );
            this.setState({
              load: false,
            });
          }
        })
        .catch((error) => {
          console.log("Orus:", error);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
          this.setState({
            load: false,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
