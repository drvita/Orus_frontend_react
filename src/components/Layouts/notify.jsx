import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/user/";

class NotifyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainRole: props.dataLoggin.roles[0],
    };
    this.timerNotify = null;
  }

  componentDidMount() {
    const { dataLoggin, _getNotifyUser } = this.props;

    if (dataLoggin.isLogged) {
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
    const { notifications, loading } = this.props,
      { mainRole} = this.state,
      countNotify = notifications ? notifications.length : 0,
      showNotifications = notifications.slice(0, 10);

    return (
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#end">
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <>
              <i className="far fa-bell"></i>
              {countNotify ? (
                <span className="badge badge-warning navbar-badge">
                  {countNotify}
                </span>
              ) : null}
            </>
          )}
        </a>

        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-header">{countNotify} Notificaciones</span>
          <div className="dropdown-divider"></div>
          {showNotifications.map((notify) => {
            const notiFyType = notify.type.split("\\", 3);
            let title = "general",
              icon = "fa-file",
              time = moment(notify.created_at).fromNow(),
              url = "#end";
            //page = "/";

            if (notiFyType[2] === "ExamNotification") {
              if (mainRole === 'doctor') {
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
                Marcar todas.
              </a>
            </React.Fragment>
          ) : null}
          {/* <Link
            to="/notificaciones"
            className="dropdown-item dropdown-footer"
            onClick={(e) => {
              //this.props.page("/notificaciones");
            }}
          >
            Ver todas
          </Link> */}
        </div>
      </li>
    );
  }

  handleClickRead = (e, id) => {
    const { _readNotifyUser } = this.props;
    if (id === -1) e.preventDefault();
    _readNotifyUser({ id });
  };
}
const mapStateToProps = ({ users }) => {
    return {
      notifications: users.notifications,
      dataLoggin: users.dataLoggin,
      loading: users.loading_notify,
    };
  },
  mapDispatchToProps = {
    _getNotifyUser: userActions.getNotifyUser,
    _readNotifyUser: userActions.readNotifyUser,
  };

export default connect(mapStateToProps, mapDispatchToProps)(NotifyComponent);
