import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      rol: -1,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.verifyUser();
  }

  render() {
    const { notifications, rol } = this.state,
      countNotify = notifications ? notifications.length : 0;
    return (
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#end">
          <i className="far fa-bell"></i>
          {countNotify ? (
            <span className="badge badge-warning navbar-badge">
              {countNotify}
            </span>
          ) : null}
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-header">{countNotify} Notificaciones</span>
          <div className="dropdown-divider"></div>
          {notifications.map((notify) => {
            const notiFyType = notify.type.split("\\", 3);
            let title = "general",
              icon = "fa-file",
              time = moment(notify.created_at).fromNow(),
              url = "#end";
            if (notiFyType[2] === "ExamNotification") {
              if (rol === 2) {
                title = "Examen creado";
                url = "/consultorio/registro/" + notify.data.id;
              } else {
                title = "Examen actualizado";
                url = "/pedidos/registro";
                localStorage.setItem(
                  "OrusContactInUse",
                  JSON.stringify({
                    id: notify.data.contact_id,
                    exam_id: notify.data.id,
                  })
                );
              }
              icon = "fa-file-alt";
            }
            //console.log("Notify:", notify.read_at);
            return (
              <Link
                to={url}
                className="dropdown-item"
                key={notify.id}
                onClick={(e) => this.handleClickRead(e, notify.id)}
              >
                <i className={"fas " + icon + " mr-1"}></i> {title}
                <span className="float-right text-muted text-sm">{time}</span>
              </Link>
            );
          })}
          {countNotify ? (
            <React.Fragment>
              <div className="dropdown-divider"></div>
              <a
                href="#end"
                className="dropdown-item dropdown-footer"
                onClick={(e) => this.handleClickRead(e, -1)}
              >
                Marcar como leído.
              </a>
            </React.Fragment>
          ) : null}
          <Link to="/notificaciones" className="dropdown-item dropdown-footer">
            Ver todas
          </Link>
        </div>
      </li>
    );
  }

  handleClickRead = (e, id, notify) => {
    //Constantes
    const { host, token } = this.props.data;
    if (id === -1) e.preventDefault();

    console.log("Enviando datos de leidos");
    fetch("http://" + host + "/api/user/readAllNotifications", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(async (response) => {
        let back = {};
        if (response.status !== 204) back = await response.json();
        if (!response.ok) {
          throw new Error(back.message);
        }
        return back;
      })
      .then((notify) => {
        if (notify.success) {
          console.log("Notificaciones leeidas");
          this.verifyUser();
        } else {
          console.error("Sin notificaciones", notify);
        }
      })
      .catch((e) => {
        console.error("Orus fetch", e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
  verifyUser = () => {
    //Constantes de logueo
    const { data, logOut } = this.props,
      { host, isLogged, token } = data;

    //Solo realizamos la verificacion si hay sesion
    if (isLogged && host && token) {
      console.log("Verificando usuario");
      //Realizando verificación de usuarios
      if (token !== "" && host !== "") {
        fetch("http://" + host + "/api/user", {
          method: "GET",
          signal: this.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            if (!res.ok && token !== "") {
              console.error("Usuario invalido:", res.statusText);
              logOut();
            }
            return res.json();
          })
          .then((data) => {
            if (data.data && !data.data.message) {
              this.setState({
                notifications: data.data.notifications,
                rol: data.data.rol,
              });
              console.log("Usuario valido:", data.data.username);
            }
          });
      }
    } else {
      console.error("La sesion ya no esta activa o se perdio el host");
      logOut();
    }
  };
}
