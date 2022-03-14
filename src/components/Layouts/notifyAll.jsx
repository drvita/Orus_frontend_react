import React, { Component } from "react";
import moment from "moment";

export default class NotifyAll extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let notify = JSON.parse(localStorage.getItem("OrusNotify"));
    this.state = {
      notifications: notify.notifications.length ? notify.notifications : [],
      rol: notify ? notify.rol : -1,
      count: notify ? notify.count : 0,
      load: false,
    };
  }

  render() {
    const { notifications, load } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">
            <i className="fas fa-bell mr-2"></i>
            <label>Mis notificaciones</label>
          </h5>
        </div>
        <div className="card-body">
          {!load ? (
            <React.Fragment>
              {notifications.length ? (
                <div className="list-group">
                  {notifications.map((notify) => {
                    const type = notify.type.split("\\");
                    let url = "";
                    if (type.length === 3 && type[2] === "ExamNotification") {
                      url = "/consultorio/registro/" + notify.data.id;
                    }
                    return (
                      <a
                        href={url}
                        className={
                          notify.read_at
                            ? "list-group-item list-group-item-action flex-column align-items-start"
                            : "list-group-item list-group-item-action flex-column align-items-start active"
                        }
                        key={notify.id}
                        onClick={(e) =>
                          this.handleClickViewNotify(e, url, notify.id)
                        }
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{type[2] === "" ? "" : ""}</h5>
                          <small>{moment(notify.created_at).fromNow()}</small>
                        </div>
                        <p className="mb-1 text-capitalize">
                          <strong>{notify.data.paciente}</strong>
                        </p>
                        <small className="text-capitalize">
                          {notify.data.user}
                        </small>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="card-text">Sin notificaciones</p>
              )}
            </React.Fragment>
          ) : (
            <div className="card-text text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleClickViewNotify = (e, url, id) => {
    const { page } = this.props,
      seccion = url.split("/");
    e.preventDefault();

    //Constantes
    const ls = JSON.parse(localStorage.getItem("OrusSystem")),
      { host, token } = ls;

    console.log("[Orus System] Enviando datos de leidos");

    
    //TODO:Revisar funcion fetch
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
          console.log("[Orus] Notificaciones leeidas");
        } else {
          console.log("[Orus] Sin notificaciones");
        }
        page(seccion[1]);
        if (url) this.props.history.push(url);
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
  checkNotify = () => {
    //Constantes de logueo
    const ls = JSON.parse(localStorage.getItem("OrusSystem")),
      { host, token } = ls;

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
        .then(async (response) => {
          let back = {};
          if (response.status !== 204) back = await response.json();
          if (!response.ok) {
            throw new Error(back.message);
          }
          return back;
        })
        .then((notify) => {
          this.setState({
            notifications: notify.data ? notify.data.notifications : [],
            rol: notify.data.rol,
            load: false,
          });
        })
        .catch((e) => {
          this.setState({
            load: false,
          });

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
    }
  };
}
