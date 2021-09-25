import React, { Component } from "react";
import Category from "./views/tools_category";
import BranchsList from "./views/Branchs";
//import { Link } from 'react-router-dom';

export default class StoreAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      server: "",
      company: "",
      email: "",
      name: "",
      username: "",
      password: "",
      category_list: [],
    };
  }

  componentDidMount() {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    this.setState({
      server: varLocalStorage.host
        ? varLocalStorage.host
        : window.location.host.split(":")[0],
      company: varLocalStorage.company ? varLocalStorage.company : "",
      email: varLocalStorage.email ? varLocalStorage.email : "",
      name: varLocalStorage.name ? varLocalStorage.name : "",
      username: varLocalStorage.username ? varLocalStorage.username : "",
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="row">
        <div className="col-6">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h5 className="card-title">Generales</h5>
              <p>&nbsp;</p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-server"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Servidor"
                  name="server"
                  value={this.state.server}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-building"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-capitalize"
                  placeholder="Nombre de la empresa"
                  name="company"
                  value={this.state.company}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="card-footer text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.clickSave}
              >
                Guardar
              </button>
            </div>
          </div>

          <Category data={data} />
        </div>
        <div className="col-6">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h5 className="card-title">Usuario</h5>
              <p>&nbsp;</p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-at"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user-tag"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-capitalize"
                  placeholder="Nombre completo"
                  name="name"
                  value={this.state.name}
                  onChange={this.catchInputs}
                />
              </div>
              <hr />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user-check"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  name="username"
                  value={this.state.username}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={this.state.password}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="card-footer text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.clickSaveUser}
              >
                Guardar
              </button>
            </div>
          </div>

          <BranchsList />
        </div>
      </div>
    );
  }

  clickSave = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    varLocalStorage.company = this.state.company;
    varLocalStorage.host = this.state.server;
    localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage));
  };
  clickSaveUser = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    varLocalStorage.email = this.state.email;
    varLocalStorage.name = this.state.name;
    varLocalStorage.username = this.state.username;
    localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage));
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
}
