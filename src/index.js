import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routers";
import Login from "./components/Layouts/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      token: "",
      username: "",
      name: "",
      rol: 0,
      email: "",
      host: "",
      company: "",
    };
    this.logOut = this.logOut.bind(this);
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    //Variables en localStorage
    console.log("Iniciando carga de configuraciones");
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    varLocalStorage = varLocalStorage ? varLocalStorage : [];
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log('Config:',data);
        window.config = data;
        //Las cargamos en el state las confirugaciones
        if (varLocalStorage) {
          console.log("Recogiendo valores de localStorage");
          this.setState({
            isLogged: varLocalStorage.isLogged,
            token: varLocalStorage.token,
            username: varLocalStorage.username,
            name: varLocalStorage.name,
            rol: varLocalStorage.rol,
            email: varLocalStorage.email,
            host: window.config.server,
            company: varLocalStorage.company,
          });
        } else {
          console.log("Estableciendo valores a localStorage");
          varLocalStorage.token = "";
          varLocalStorage.isLogged = false;
          varLocalStorage.username = "";
          varLocalStorage.name = "";
          varLocalStorage.rol = "";
          varLocalStorage.email = "";
          varLocalStorage.company = "";
          varLocalStorage.host = window.config.server;
          localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage));
        }
      })
      .catch((e) => {
        console.log(e);
        window.config = {
          server: "192.168.0.24",
        };
      });
  }

  componentDidUpdate() {
    //Cada que el componnte es redenrizado almacenamos la variables del
    //state en localstorage
    console.log("Actualizando storage");
    localStorage.setItem("OrusSystem", JSON.stringify(this.state));
  }

  render() {
    //Mostramos el componente de login si isLogged no tiene sesion
    //De lo contrario nos dirigimos al compenente de routers
    //donde nos muestra el componente segun el path
    return (
      <Router>
        <main>
          {this.state.isLogged ? (
            <Routers data={this.state} logOut={this.logOut} />
          ) : (
            <Login loginFunction={this.login} />
          )}
        </main>
      </Router>
    );
  }

  login(s) {
    //Funcion que maneja el cambio de sesion en el state
    this.setState({
      isLogged: s.data.id ? true : false,
      username: s.data.username,
      name: s.data.name,
      email: s.data.email,
      rol: s.data.rol,
      token: s.token,
    });
  }
  logOut() {
    localStorage.clear();
    this.setState({
      isLogged: false,
      token: "",
      username: "",
      name: "",
      rol: 0,
      email: "",
    });
  }
}

render(<App />, document.getElementById("root"));
