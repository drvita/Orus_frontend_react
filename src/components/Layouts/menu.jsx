import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function MenuComponent() {
  const { auth, outSession } = useContext(AuthContext);
  const handleLogOut = (e) => {
    e.preventDefault();

    window.Swal.fire({
      title: "Session",
      text: "¿Esta seguro de cerrar la sesion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(({ dismiss }) => {
      if (!dismiss) {
        outSession();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  // TODO: import auth context
  const companyName = "Optica Madero",
    active = useLocation().pathname.replace("/", "");

  let avatar = "/img/avatars/avatar5.png";
  if (auth.roles === "ventas") avatar = "/img/avatars/avatar2.png";
  if (auth.roles === "admin") avatar = "/img/avatars/avatar3.png";
  if (auth.idUser === 2) avatar = "/img/avatars/avatar4.png";

  return (
    <aside className="main-sidebar sidebar-dark-primary">
      <Link to="/" className="brand-link">
        <img
          src="/img/logo.png"
          alt={companyName + " logo "}
          className="brand-image img-circle elevation-2"
          style={{ opacity: 0.8, maxHeight: 16 }}
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
              alt={auth.name}
            />
          </div>
          <div className="info">
            <a href="#end" className="d-block text-capitalize">
              {auth.name}
              <small className="text-lowercase">({auth.username})</small>
              <br />
              <span className="badge badge-light">
                {auth.roles !== "admin"
                  ? auth.roles === "ventas"
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
            {auth.roles === "admin" ? (
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
                  active === "consultorio" ||
                  (active === "" && auth.roles === "doctor")
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="nav-icon fas fa-notes-medical"></i>
                <p>
                  Examenes
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
            </li>

            {auth.roles !== "doctor" ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/pedidos"
                    className={
                      active === "pedidos" ||
                      (active === "" && auth.roles === "ventas")
                        ? "nav-link active"
                        : "nav-link"
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
              </>
            ) : null}

            {auth.roles === "admin" && (
              <>
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
              </>
            )}

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
}
