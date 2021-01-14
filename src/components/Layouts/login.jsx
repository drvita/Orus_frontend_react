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
                    type="email"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                    required="required"
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
                    required="required"
                    minLength="8"
                    maxLength="16"
                    pattern="^(?=.*[A-Z])(?=.*[!@#$&\.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$"
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
    e.preventDefault();
    if (e.key === "Enter") {
      let { host } = this.state;
      window.Swal.fire({
        icon: "success",
        title: "La conexion al servidor fue actualizada con exito: " + host,
        showConfirmButton: false,
        timer: 1500,
      }).then((res) => {
        this.setState({
          hostShow: false,
        });
        this.props.changeState("host", host);
      });
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
    let { username, password } = this.state;
    const regexUser = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      regexPass = /^(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$/;

    username = username.replace(/\s/g, "").toLowerCase();

    if (regexUser.test(username) && regexPass.test(password)) {
      return true;
    } else {
      alert("Los datos ingresados no son validos");
      return false;
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    const { host, username, password, load } = this.state;
    if (!load) {
      this.setState({
        load: true,
      });
    }

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
          .then(async (response) => {
            let back = {};
            if (response.status !== 204) back = await response.json();
            if (!response.ok) {
              console.error(response, back);
              throw new Error(back.message);
            }
            return back;
          })
          .then((response) => {
            if (response.data) {
              console.log("Loggin: realizado con exito");
              this.props.loginFunction(response);
            }
          })
          .catch((message) => {
            console.error("Orus fetch: ", message);
            window.Swal.fire(
              "Fallo de servidor",
              "Los datos no son correctos",
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
