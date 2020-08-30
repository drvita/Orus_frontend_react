import React, { Component } from "react";
//import { Link } from "react-router-dom";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      host: "",
      hostShow: false,
    };
  }

  componentDidMount() {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    this.setState({
      host: varLocalStorage ? varLocalStorage.host : "",
    });
  }

  render() {
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
              <p className="login-box-msg">Inicio de sesion</p>
              <form onSubmit={this.handleLogin}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                    onChange={this.catchInputs}
                    value={this.state.username}
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
                    value={this.state.password}
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
                    {this.state.hostShow ? (
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Servidor"
                          name="host"
                          onChange={this.catchInputs}
                          value={this.state.host}
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
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Iniciar sesion
                    </button>
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
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      varLocalStorage.host = this.state.host;
      localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage));
      window.alert(
        "La conexion al servidor fue actualizada con exito: \n" +
          this.state.host
      );
      this.setState({
        hostShow: false,
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
    if (this.state.username.length > 4 && this.state.password.length > 7) {
      return true;
    } else {
      alert("Los datos ingresados no son validos");
      return false;
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    //Manejamos el inicio de sesion aqui, declaramos primero las variables
    //sobre todo la de localstorage donde viene el host a conectar
    //La variable body con los datos de inicio
    let valid = this.validInputs(),
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      body = {
        email: this.state.username,
        password: this.state.password,
      };
    //Si los datos de usuario son correctos manda la informacion al servidor
    if (valid) {
      fetch("http://" + varLocalStorage.host + "/api/users/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            this.setState({
              username: "",
              password: "",
            });
            this.props.loginFunction(data);
          } else {
            console.log("Login status fetch:", data);
            if (data.message) window.alert(data.message);
            if (data.errors) window.alert(data.errors);
          }
        })
        .catch((e) => {
          console.log(e);
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
