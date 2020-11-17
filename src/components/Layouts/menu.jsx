import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    let { companyName, user, active } = this.props,
      avatar = "/img/avatars/avatar5.png";
    if (user.rol === 1) avatar = "/img/avatars/avatar2.png";
    if (!user.rol) avatar = "/img/avatars/avatar3.png";
    if (user.idUser === 2) avatar = "/img/avatars/avatar4.png";

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link
          to="/"
          className="brand-link"
          onClick={(e) => {
            this.changePage("/");
          }}
        >
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
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
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
              <li className="nav-item has-treeview">
                <Link
                  to="/"
                  className={
                    active === "dashboard" ? "nav-link active" : "nav-link"
                  }
                  onClick={(e) => {
                    this.changePage("/");
                  }}
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link
                  to="/contactos"
                  className={
                    active === "contactos" ? "nav-link active" : "nav-link"
                  }
                  onClick={(e) => {
                    this.changePage("/contactos");
                  }}
                >
                  <i className="nav-icon fas fa-address-book"></i>
                  <p>
                    Contactos
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {user.rol === 2 || !user.rol ? (
                <li className="nav-item has-treeview">
                  <Link
                    to="/consultorio"
                    className={
                      active === "consultorio" ? "nav-link active" : "nav-link"
                    }
                    onClick={(e) => {
                      this.changePage("/consultorio");
                    }}
                  >
                    <i className="nav-icon fas fa-notes-medical"></i>
                    <p>
                      Consultorio
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
              ) : null}

              {user.rol <= 1 ? (
                <li className="nav-item has-treeview">
                  <Link
                    to="/pedidos"
                    className={
                      active === "pedidos" ? "nav-link active" : "nav-link"
                    }
                    onClick={(e) => {
                      this.changePage("/pedidos");
                    }}
                  >
                    <i className="nav-icon fas fa-clipboard-list"></i>
                    <p>
                      Pedidos
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
              ) : null}

              {user.rol <= 1 ? (
                <li className="nav-item has-treeview">
                  <Link
                    to="/notas"
                    className={
                      active === "notas" ? "nav-link active" : "nav-link"
                    }
                    onClick={(e) => {
                      this.changePage("/Ventas");
                    }}
                  >
                    <i className="nav-icon fas fa-cash-register"></i>
                    <p>
                      Ventas
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                </li>
              ) : null}

              {!user.rol ? (
                <React.Fragment>
                  <li className="nav-item has-treeview">
                    <Link
                      to="/almacen"
                      className={
                        active === "almacen" ? "nav-link active" : "nav-link"
                      }
                      onClick={(e) => {
                        this.changePage("/almacen");
                      }}
                    >
                      <i className="nav-icon fas fa-database"></i>
                      <p>
                        Almacen
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item has-treeview">
                    <Link
                      to="/usuarios"
                      className={
                        active === "usuarios" ? "nav-link active" : "nav-link"
                      }
                      onClick={(e) => {
                        this.changePage("/usuarios");
                      }}
                    >
                      <i className="nav-icon fas fa-user"></i>
                      <p>
                        Usuarios
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item has-treeview">
                    <Link
                      to="/configuraciones"
                      className={
                        active === "configuraciones"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={(e) => {
                        this.changePage("/configuraciones");
                      }}
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

              <li className="nav-item has-treeview">
                <Link to="/" className="nav-link" onClick={this.handleLogOut}>
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Cerrar sesion</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }

  changePage = (e) => {
    this.props.page(e);
  };

  handleLogOut = (e) => {
    e.preventDefault();
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
        this.props.logOut();
        this.changePage("/");
      }
    });
  };
}

export default Menu;
