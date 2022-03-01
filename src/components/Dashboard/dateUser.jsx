import React, { Component } from "react";
import moment from "moment";

export default class DateUser extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      host: ls.host,
      token: ls.token,
      date: moment().format("YYYY-MM-DD"),
      user: !props.data.rol ? 0 : props.data.idUser,
      users: [],
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { date, user, users } = this.state;
    return (
        <div className="card border border-info rounded">

        <div className="card-body bg-light">

          <div className="row">
            <h5 className="card-title text-secondary">Filtros</h5>
          </div>

          <div className="form-group row col-lg-12">

              <div className="col-lg-2">
                <label className="col-lg-12 col-form-label">Sucursal</label>
                <div className="col-lg-12">
                  <select
                    name="user"
                    className="form-control"
                  >
                    <option value="0">Constitución</option>
                    <option value="0">Tecnológico</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-2">
                <label className="col-lg-12 col-form-label">Usuario</label>
                <div className="col-lg-12">
                  <select
                    name="user"
                    className="form-control"
                    value={user}
                    onChange={this.changeState}
                  >
                    <option value="0">Todos</option>
                    {users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-2">
                <label className="col-lg-12 col-form-label">Fecha Inicial</label>
                <div className="col-lg-12">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={date}
                    onChange={this.changeState}
                  />
                </div>
              </div>

              <div className="col-lg-2">
                <label className="col-lg-12 col-form-label">Fecha Final</label>
                <div className="col-lg-12">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={date}
                    onChange={this.changeState}
                  />
                </div>
              </div>

              <div className="col-lg-4 d-flex justify-content-center align-items-end">
                <button className="btn w-50 btn-success btn-lg">Aplicar Filtro</button>            
              </div>

          </div>
        </div>
      </div>
    );
  }

  changeState = (e) => {
    let { value, name } = e.target;
    this.setState({
      [name]: value,
    });
    this.props.changeState(name, value);
  };
  getUsers = () => {
    let { host, token } = this.state,
      url = "http://" + host + "/api/users",
      orderby = "&orderby=username&order=asc",
      rol = "&rol=10",
      page = "?page=1";

    //Realiza la peticion de los usuarios
    console.log("Descargando usuarios de API");
    fetch(url + page + orderby + rol, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error al descargar usuarios de sistema",
            icon: "error",
            confirmButtonText: "Ok",
          });
          console.error(res);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.message) {
          console.log("Almacenando usuarios");
          this.setState({
            users: data.data,
          });
        } else {
          console.error("Error en la descarga de usuarios", data.message);
        }
      })
      .catch((e) => {
        if (e.code === 20) {
          console.error("[Orus system] Salida por error:", e.code, e.message);
          return false;
        }

        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
}
