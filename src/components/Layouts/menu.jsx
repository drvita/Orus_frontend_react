import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { loggin } from "../../redux/user/actions";

const MenuComponent = (props) => {
  const handleLogOut = (e) => {
    e.preventDefault();
    const { loggin: _LOGOUT } = props;
    window.Swal.fire({
      title: "Session",
      text: "¿Esta seguro de cerrar la sesion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        _LOGOUT({});
      }
    });
  };

  const { companyName, user } = props,
    active = useLocation().pathname.replace("/", "");

  let avatar = "/img/avatars/avatar5.png";
  if (user.rol === 1) avatar = "/img/avatars/avatar2.png";
  if (!user.rol) avatar = "/img/avatars/avatar3.png";
  if (user.idUser === 2) avatar = "/img/avatars/avatar4.png";

  return (
    <aside className="main-sidebar sidebar-dark-primary">
      <Link to="/" className="brand-link">
        <img
          src="/img/AdminLTELogo.png"
          alt={companyName + " logo "}
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light text-uppercase">
          {companyName}
        </span>
      </Link>
      <div className="sidebar">
        <div className="pb-3 mt-3 mb-3 user-panel d-flex">
          <div className="image">
            <img
              src={avatar}
              className="img-circle elevation-2"
              alt={user.name}
            />
          </div>
          <div className="info">
            <a href="#end" className="d-block text-capitalize">
              {user.name}
              <small className="text-lowercase">({user.username})</small>
              <br />
              <span className="badge badge-light">
                {user.rol > 0
                  ? user.rol === 1
                    ? "Ventas"
                    : "Optometrista"
                  : "Administrador"}
              </span>
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {user.rol !== 2 ? (
              <li className="nav-item">
                <Link
                  to="/"
                  className={active === "" ? "nav-link active" : "nav-link"}
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link
                to="/contactos"
                className={
                  active === "contactos" ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-address-book"></i>
                <p>
                  Contactos
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/consultorio"
                className={
                  active === "consultorio" ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-notes-medical"></i>
                <p>
                  Examenes
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
            </li>

            {user.rol <= 1 ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link
                    to="/pedidos"
                    className={
                      active === "pedidos" ? "nav-link active" : "nav-link"
                    }
                  >
                    <i className="nav-icon fas fa-clipboard-list"></i>
                    <p>
                      Pedidos
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/notas"
                    className={
                      active === "notas" ? "nav-link active" : "nav-link"
                    }
                  >
                    <i className="nav-icon fas fa-cash-register"></i>
                    <p>
                      Ventas
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}

            {!user.rol ? (
              <React.Fragment>
                <li
                  className={
                    active === "almacen"
                      ? "nav-item has-treeview menu-open"
                      : "nav-item has-treeview "
                  }
                >
                  <Link
                    to="/almacen"
                    className={
                      active === "almacen" ? "nav-link active" : "nav-link"
                    }
                  >
                    <i className="nav-icon fas fa-database"></i>
                    <p>
                      Almacen
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/usuarios"
                    className={
                      active === "usuarios" ? "nav-link active" : "nav-link"
                    }
                  >
                    <i className="nav-icon fas fa-user"></i>
                    <p>
                      Usuarios
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/configuraciones"
                    className={
                      active === "configuraciones"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i className="nav-icon fas fa-tools"></i>
                    <p>
                      Configuraciones
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}

            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLogOut}>
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Cerrar sesion</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => {
    return {
      user: {
        rol: state.logging.rol,
        name: state.logging.name,
        username: state.logging.username,
      },
      companyName: state.default.company,
      active: "",
    };
  },
  mapDispatchToProps = {
    loggin,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
