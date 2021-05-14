import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routers";
import Login from "./components/Layouts/login";

class App extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    //Agregamos los datos a state
    this.state = {
      isLogged: ls ? ls.isLogged : false,
      token: ls ? ls.token : "",
      idUser: ls ? ls.idUser : 0,
      username: ls ? ls.username : "",
      name: ls ? ls.name : "",
      rol: ls ? ls.rol : 0,
      email: ls ? ls.email : "",
      host: ls ? ls.host : window.location.hostname,
      company: ls ? ls.company : "Optica Madero",
    };
    console.log("[Orus] ", navigator.userAgent);
  }
  componentDidMount() {
    /*Almacenamos el state en el storage*/
    console.log("[Orus] Cargando datos de sesion en localStorage");
    localStorage.setItem("OrusSystem", JSON.stringify(this.state));
  }
  componentDidUpdate() {
    //Cada que el componnte es redenrizado almacenamos la variables del
    //state en localstorage
    console.log("[Orus] Actualizando datos de sesion en localStorage");
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
            <Login
              company={this.state.company}
              host={this.state.host}
              loginFunction={this.login}
              changeState={this.changeState}
            />
          )}
        </main>
      </Router>
    );
  }

  changeState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  login = (s) => {
    //Funcion que maneja el cambio de sesion en el state
    this.setState({
      isLogged: s.data.id ? true : false,
      idUser: s.data.id,
      username: s.data.username,
      name: s.data.name,
      email: s.data.email,
      rol: s.data.rol,
      token: s.token,
    });
  };
  logOut = () => {
    let session = {
      isLogged: false,
      token: "",
      idUser: 0,
      username: "",
      name: "",
      rol: 0,
      email: "",
      host: this.state.host,
      company: this.state.company,
    };

    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("[ORUS] Verificando permisos de Push");
      if (Notification.permission !== "denied") {
        const title = "Orus bot",
          options = {
            body: `Sesion cerrada correctamente`,
          };
        navigator.serviceWorker.getRegistration().then(function (reg) {
          reg.showNotification(title, options);
        });
      }
    }

    localStorage.setItem("OrusSystem", JSON.stringify(session));
    localStorage.removeItem("OrusContactInUse");
    localStorage.removeItem("OrusContacts");
    localStorage.removeItem("OrusNotify");
    localStorage.removeItem("OrusOrder");
    localStorage.removeItem("OrusSales");
    localStorage.removeItem("OrusExam");
    localStorage.removeItem("OrusStore");
    localStorage.removeItem("OrusUsers");

    window.location.href = "/";
  };
}

render(<App />, document.getElementById("root"));
