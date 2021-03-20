import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      rol: -1,
      count: 0,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.verifyUser();
    setInterval(() => {
      console.log("[ORUS] Cron de verificacion de usuario");
      this.verifyUser();
    }, 60000);
  }
  componentDidUpdate() {
    localStorage.setItem("OrusNotify", JSON.stringify(this.state));
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
          {notifications.map((notify, index) => {
            const notiFyType = notify.type.split("\\", 3);
            let title = "general",
              icon = "fa-file",
              time = moment(notify.created_at).fromNow(),
              url = "#end",
              page = "/";

            //Cortamos si son más de 10 notificaciones
            if (index > 10) return false;

            if (notiFyType[2] === "ExamNotification") {
              if (rol === 2) {
                title = "Examen creado";
                url = "/consultorio/registro/" + notify.data.id;
                page = "/consultorio";
              } else {
                title = "Examen actualizado";
                url = "/pedidos/registro";
                page = "/pedidos";
              }
              icon = "fa-file-alt";
            }
            //console.log("Notify num:", index);
            return (
              <Link
                to={url}
                className="dropdown-item"
                key={notify.id}
                onClick={(e) => {
                  this.props.page(page);
                  this.handleClickRead(e, notify.id);
                  console.log(
                    "[Notify] estableciendo datos de contacto en uso"
                  );
                  localStorage.setItem(
                    "OrusContactInUse",
                    JSON.stringify({
                      id: notify.data.contact_id,
                      exam_id: notify.data.id,
                    })
                  );
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClickRead(e, -1);
                }}
              >
                Marcar como leído.
              </a>
            </React.Fragment>
          ) : null}
          <Link
            to="/notificaciones"
            className="dropdown-item dropdown-footer"
            onClick={(e) => {
              this.props.page("/notificaciones");
            }}
          >
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

    console.log("[ORUS] Marcando notificaciones como leidas");
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
          console.log("[ORUS] Notificaciones leeidas");
          this.verifyUser();
        } else {
          console.error("[ORUS] Sin notificaciones", notify);
        }
      })
      .catch((e) => {
        console.error("[ORUS] Notify error \n", e);
      });
  };
  verifyUser = () => {
    //Constantes de logueo
    const { data, logOut } = this.props,
      { host, isLogged, token } = data,
      { count } = this.state;

    //Solo realizamos la verificacion si hay sesion
    if (isLogged && host && token) {
      console.log("[ORUS] Verificando usuario");
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
              console.error("[ORUS] Usuario invalido:", res);
            }
            return res.json();
          })
          .then((data) => {
            if (data.exception || data.message) {
              logOut();
            } else {
              console.log("[ORUS] Usuario validado: ", data.data.username);
              console.log(
                "[ORUS] Buscando notificaciones nuevas",
                data.data.unreadNotifications.length
              );
              if (
                data.data.unreadNotifications.length &&
                data.data.unreadNotifications.length !== count
              ) {
                if ("serviceWorker" in navigator && "PushManager" in window) {
                  console.log("[ORUS] Verificando permisos de Push");
                  if (Notification.permission !== "denied") {
                    const title = "Orus bot",
                      options = {
                        body: "Hay notificaciones nuevas",
                      };
                    navigator.serviceWorker
                      .getRegistration()
                      .then(function (reg) {
                        reg.showNotification(title, options);
                      });
                  }
                }
              }
              this.setState({
                notifications: data.data ? data.data.unreadNotifications : [],
                rol: data.data.rol,
                count: data.data.unreadNotifications.length,
              });
            }
          })
          .catch((error) => {
            console.error(
              "[ORUS] Verificacion de usuario en Notify, error \n",
              error
            );
          });
      }
    } else {
      console.error("[ORUS] La sesion ya no esta activa o se perdio el host");
      logOut();
    }
  };
}
