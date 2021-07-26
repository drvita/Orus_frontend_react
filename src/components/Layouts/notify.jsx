import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/user/";

class NotifyComponent extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      rol: ls.rol,
    };
    this.timerNotify = null;
  }

  componentDidMount() {
    const { isLogged, getNotifyUser: _getNotifyUser } = this.props;

    if (isLogged) {
      _getNotifyUser();
      this.timerNotify = setInterval(() => {
        _getNotifyUser();
      }, 60000);
    }
  }

  componentWillUnmount() {
    if (this.timerNotify) clearInterval(this.timerNotify);
  }

  render() {
    const { notifications } = this.props,
      { rol } = this.state,
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
              url = "#end";
            //page = "/";

            //Cortamos si son más de 10 notificaciones
            if (index > 10) return false;

            if (notiFyType[2] === "ExamNotification") {
              if (rol === 2) {
                title = "Examen creado";
                url = "/consultorio/registro/" + notify.data.id;
                //page = "/consultorio";
              } else {
                title = "Examen actualizado";
                url = "/pedidos/registro";
                //page = "/pedidos";
              }
              icon = "fa-file-alt";
            }

            return (
              <Link
                to={url}
                className="dropdown-item"
                key={notify.id}
                onClick={(e) => {
                  //this.props.page(page);
                  this.handleClickRead(e, notify.id);
                }}
              >
                <i className={"fas " + icon + " mr-1"}></i> {title}
                <span className="float-right text-sm text-muted">{time}</span>
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
              //this.props.page("/notificaciones");
            }}
          >
            Ver todas
          </Link>
        </div>
      </li>
    );
  }

  handleClickRead = (e, id) => {
    const { readNotifyUser } = this.props;
    if (id === -1) e.preventDefault();
    readNotifyUser({ id });
  };
}
const mapStateToProps = ({ users }) => {
    return {
      notifications: users.notifications,
      dataLoggin: users.dataLoggin,
    };
  },
  mapDispatchToProps = {
    getNotifyUser: userActions.getNotifyUser,
    readNotifyUser: userActions.readNotifyUser,
  };

export default connect(mapStateToProps, mapDispatchToProps)(NotifyComponent);
