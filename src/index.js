import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routers";
import Login from "./components/Layouts/login";

class App extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let storage = JSON.parse(localStorage.getItem("OrusSystem"));
    //Agregamos los datos a state
    this.state = {
      isLogged: storage ? storage.isLogged : false,
      token: storage ? storage.token : "",
      idUser: storage ? storage.idUser : 0,
      username: storage ? storage.username : "",
      name: storage ? storage.name : "",
      rol: storage ? storage.rol : 0,
      email: storage ? storage.email : "",
      host: storage ? storage.host : window.location.hostname,
      company: storage ? storage.company : "Optica Madero",
    };
  }
  componentDidMount() {
    /*Almacenamos el state en el storage*/
    console.log("Cargando data a storage");
    localStorage.setItem("OrusSystem", JSON.stringify(this.state));
  }
  componentDidUpdate() {
    //Cada que el componnte es redenrizado almacenamos la variables del
    //state en localstorage
    console.log("Actualizando data a storage");
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
    localStorage.setItem("OrusSystem", JSON.stringify(session));
    window.location.href = "/";
  };
}

render(<App />, document.getElementById("root"));
