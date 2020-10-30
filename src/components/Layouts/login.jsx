import React, { Component } from "react";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      host: props.host,
      hostShow: false,
      load: false,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    let { load, username, password, hostShow, host } = this.state,
      { company } = this.props;
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href=".">
              <b className="text-primary">Orus</b> LTE
            </a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">{company}</p>
              <form onSubmit={this.handleLogin}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                    autoFocus={hostShow ? false : true}
                    onChange={this.catchInputs}
                    value={username}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    autoComplete="off"
                    onChange={this.catchInputs}
                    value={password}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-4">
                    <a
                      href="#tools"
                      onClick={this.showTools}
                      className="text-muted"
                    >
                      <i className="fas fa-wifi"></i> Servidor
                    </a>
                    {hostShow ? (
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Servidor"
                          name="host"
                          autoComplete="off"
                          autoFocus={hostShow ? true : false}
                          onChange={this.catchInputs}
                          value={host}
                          onKeyPress={this.pressEnter}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-server"></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    {load ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Iniciar sesion
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  pressEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let { host } = this.state;
      window.alert(
        "La conexion al servidor fue actualizada con exito: \n" + host
      );
      this.setState({
        hostShow: false,
      });
      this.props.changeState("host", host);
    }
  };
  showTools = (e) => {
    e.preventDefault();
    this.setState({
      hostShow: !this.state.hostShow,
    });
  };
  validInputs() {
    //Valida los campos del formulario
    if (this.state.username.length > 4 && this.state.password.length > 7) {
      return true;
    } else {
      alert("Los datos ingresados no son validos");
      return false;
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    let { host, username, password } = this.state;
    this.setState({
      load: true,
    });
    if (host) {
      //Manejamos el inicio de sesion aqui, declaramos primero las variables
      //sobre todo la de localstorage donde viene el host a conectar
      //La variable body con los datos de inicio
      let valid = this.validInputs(),
        body = {
          email: username,
          password,
        };
      //Si los datos de usuario son correctos manda la informacion al servidor
      if (valid) {
        console.log("Enviado credenciales al servidor");
        fetch("http://" + host + "/api/users/login", {
          method: "POST",
          body: JSON.stringify(body),
          signal: this.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              window.alert("Ups!\n Hubo un error, intentelo mas tarde");
              console.error(res);
            }
            return res.json();
          })
          .then((data) => {
            if (data.data) {
              console.log("Loggin: realizado con exito");
              this.props.loginFunction(data);
            } else {
              console.error("Login: Sin acceso", data);
              if (data.message) window.alert(data.message);
              if (data.errors) window.alert(data.errors);
              this.setState({
                username: "",
                password: "",
                load: false,
              });
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    } else {
      console.error("No existe un valor para host");
      this.setState({
        hostShow: true,
        load: false,
      });
    }
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
}
