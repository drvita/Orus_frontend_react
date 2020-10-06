import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      rol: 1,
      username: "",
      name: "",
      email: "",
      password: "",
      updated_at: "",
      created_at: "",
    };
    this.changePage = this.changePage.bind(this);
    this.catchInputs = this.catchInputs.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    if (id > 0) {
      //Realiza la peticion del usuario seun el id
      fetch("http://" + varLocalStorage.host + "/api/users/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            id: data.data.id,
            rol: data.data.rol,
            username: data.data.username,
            name: data.data.name,
            email: data.data.email,
            updated_at: data.data.updated_at,
            created_at: data.data.created_at,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            id: 0,
            rol: 1,
            username: "",
            name: "",
            email: "",
            updated_at: "",
            created_at: "",
          });
        });
    } else {
      this.setState({
        id: 0,
        rol: 1,
        username: "",
        name: "",
        email: "",
        updated_at: "",
        created_at: "",
      });
    }
  }

  render() {
    //let {data} = this.props;
    return (
      <div className="row">
        <div className="col-md-8">
          <form
            className="card card-primary card-outline"
            onSubmit={this.handleSave}
          >
            <div className="card-header">
              <h1 className="card-title text-primary">
                <i className="fas fa-user mr-2"></i>
                {this.state.id ? "Editar usuario" : "Registrar nuevo usuario"}
              </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      name="password"
                      autoComplete="off"
                      value={this.state.password}
                      onChange={this.catchInputs}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-at"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Correo electronico"
                      name="email"
                      value={this.state.email}
                      onChange={this.catchInputs}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-id-card"></i>
                      </span>
                    </div>
                    <select
                      className="custom-select"
                      name="rol"
                      value={this.state.rol}
                      onChange={this.catchInputs}
                    >
                      <option value="0">Administrador</option>
                      <option value="1">Ventas</option>
                      <option value="2">Optometrista</option>
                    </select>
                  </div>
                </div>
              </div>
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
                      Cancelar
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {this.state.id ? (
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-database"></i>
                  &nbsp; Datos del usuario
                </h3>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="badge badge-info">Registrado</span>
                    <p>{this.state.created_at}</p>
                  </li>
                  <li className="list-group-item">
                    <span className="badge badge-info">
                      Ultima actualizacion
                    </span>
                    <p>{this.state.updated_at}</p>
                  </li>
                  <li className="list-group-item">
                    <span className="badge badge-info">Navegador</span>
                    <p>Mozilla Fire Fox agent</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  changePage(e) {
    this.props.page(e.target.id);
  }
  catchInputs(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  }
  handleSave(e) {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar la accion?");
    if (conf) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Datos del formulario
      let { id, name, username, rol, password, email } = this.state;
      //Creamos el body
      let body = {
        name,
        username,
        rol,
        email,
      };
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      let url = id
          ? "http://" + varLocalStorage.host + "/api/users/" + id
          : "http://" + varLocalStorage.host + "/api/users",
        method = id ? "PUT" : "POST";
      //Agregamos el password si no esta vacio
      if (password.length > 8) body.password = password;
      //Actualiza el usuario o creamos el usuario
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) this.props.history.goBack();
          else console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}

export default UserAdd;
