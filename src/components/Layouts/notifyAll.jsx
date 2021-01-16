import React, { Component } from "react";
import moment from "moment";

export default class NotifyAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      rol: 0,
    };
  }
  componentDidMount() {
    this.verifyUser();
  }

  render() {
    const { notifications } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">
            <i className="fas fa-bell mr-2"></i>
            <label>Mis notificaciones</label>
          </h5>
        </div>
        <div className="card-body">
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
                    onClick={(e) => this.handleClickViewNotify(e, url)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{type[2]}</h5>
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

  handleClickViewNotify = (e, url) => {
    const { page } = this.props;
    e.preventDefault();
    page("/consultorio");
    if (url) this.props.history.push(url);
  };
  verifyUser = () => {
    //Constantes de logueo
    const { data } = this.props,
      { host, token } = data;

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
          });
        })
        .catch((e) => {
          console.error("Orus fetch", e);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
        });
    }
  };
}
