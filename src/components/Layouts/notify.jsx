/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useContext, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NotifyComponent() {
  const { auth, getNotifications, setNotifications } = useContext(AuthContext);
  const [state, setState] = useState({
    notifications: [],
    loading: true,
    mainRole: auth.roles,
  });
  const { notifications, loading, mainRole } = state,
    countNotify = notifications ? notifications.length : 0,
    showNotifications = notifications.slice(0, 10);
  let timerNotify;

  // Functions
  const handleNotifications = () => {
      getNotifications()
        .then((notifications) => {
          setState({
            ...state,
            notifications,
            loading: false,
          });
        })
        .catch(() => {
          setState({
            ...state,
            loading: false,
          });
        });
    },
    handleClickRead = (e, id) => {
      if (id === -1) e.preventDefault();
      setNotifications({ id });
    };

  useEffect(() => {
    handleNotifications();

    timerNotify = setInterval(() => {
      console.log("[Orus system] check notifications");
      setState({
        ...state,
        loading: true,
      });
      handleNotifications();
    }, 60000);

    return () => {
      clearInterval(timerNotify);
    };
  }, []);

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

          if (notiFyType[2] === "ExamNotification") {
            if (mainRole === "doctor") {
              title = "Examen creado";
              url = "/consultorio/registro/" + notify.data.id;
            } else {
              title = "Examen actualizado";
              url = "/pedidos/registro";
            }
            icon = "fa-file-alt";
          }

          return (
            <Link
              to={url}
              className="dropdown-item"
              key={notify.id}
              onClick={(e) => {
                handleClickRead(e, notify.id);
              }}
            >
              <i className={"fas " + icon + " mr-1"}></i> {title}
              <span className="float-right text-sm text-muted">{time}</span>
            </Link>
          );
        })}
        {countNotify ? (
          <Fragment>
            <div className="dropdown-divider"></div>
            <a
              href="#end"
              className="dropdown-item dropdown-footer"
              onClick={(e) => {
                e.preventDefault();
                handleClickRead(e, -1);
              }}
            >
              Marcar todas.
            </a>
          </Fragment>
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
