import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class DateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: props.data.host,
      token: props.data.token,
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
      <div className="card">
        <div className="card-body bg-light">
          <div className="row mb-4">
            <h5 className="card-title text-secondary">Filtros</h5>
          </div>
          <div className="form-group row">
            <label className="col col-form-label">Fecha</label>
            <div className="col">
              <input
                type="date"
                name="date"
                className="form-control"
                value={date}
                onChange={this.changeState}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-form-label">Usuario</label>
            <div className="col">
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
        console.error(e);
        window.Swal.fire({
          title: "Error!",
          text: "Ups!\n Hubo un error de usuario, intentelo mas tarde",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
}
