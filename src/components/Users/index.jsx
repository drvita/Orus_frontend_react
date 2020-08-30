import React, { Component } from "react";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "name",
      order: "desc",
      search: "",
    };
    this.changePage = this.changePage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando usuarios");
      this.getUsers();
    }
  }

  render() {
    let { users, load } = this.state,
      pages = [];
    if (users.meta.total > 10) {
      for (var i = 1; i <= users.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              users.meta.current_page === i ? "page-item disabled" : "page-item"
            }
          >
            <a
              href={"#page" + i}
              className="page-link"
              onClick={this.handleChangePage.bind(this, i)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return (
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="ion ion-clipboard mr-1"></i>
            Usuarios registrados
          </h3>
          <div className="card-tools">
            <div className="btn-group">
              <a
                href="#pages"
                className="btn btn-tool"
                data-toggle="modal"
                data-target="#filters"
              >
                <i className="fas fa-filter"></i>
              </a>
            </div>
            {users.meta.total > 10 ? (
              <div className="btn-group">
                <ul className="pagination pagination-sm">{pages}</ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover table-nowrap">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    this.handleOrder("username");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Usuario
                  {this.state.orderby === "username" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    this.handleOrder("name");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Nombre
                  {this.state.orderby === "name" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    this.handleOrder("email");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  E-mail
                  {this.state.orderby === "email" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    this.handleOrder("rol");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Rol
                  {this.state.orderby === "rol" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    this.handleOrder("updated_at");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Actualizado
                  {this.state.orderby === "updated_at" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    this.handleOrder("created_at");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Creado
                  {this.state.orderby === "created_at" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th className="center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(users.data).length ? (
                users.data.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <span className="badge badge-primary text-capitalize">
                          {user.username}
                        </span>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge badge-light text-capitalize">
                          {user.rol > 0
                            ? user.rol === 1
                              ? "Ventas"
                              : "Optometrista"
                            : "Administrador"}
                        </span>
                      </td>
                      <td>{user.updated_at}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <a
                          className="btn-flat text-warning"
                          href="#delete"
                          onClick={this.handleDelete}
                          id={user.id}
                        >
                          <i className="fas fa-trash" id={user.id}></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <Link
                          className="btn-flat blue-text"
                          to={"/usuarios/registro/" + user.id}
                          onClick={this.changePage}
                          id="/usuarios/registro"
                        >
                          <i
                            className="fas fa-pencil-alt"
                            id="/usuarios/registro"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="6" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer clearfix">
          <Link
            to="/usuarios/registro"
            className="btn btn-info float-right"
            onClick={this.changePage}
            id="/usuarios/registro"
          >
            <i className="fas fa-plus" id="/usuarios/registro"></i>
            &nbsp; Nuevo usuario
          </Link>
        </div>
      </div>
    );
  }

  handleOrder = (item) => {
    this.setState({
      orderby: item,
      order: this.state.order === "desc" ? "asc" : "desc",
      load: true,
    });
  };
  handleChangePage = (id, e) => {
    e.preventDefault();
    this.setState({
      page: id,
      load: true,
    });
  };
  changePage(e) {
    this.props.page(e.target.id);
  }
  handleDelete(e) {
    let conf = window.confirm("¿Esta seguro de eliminar el usuario?"),
      id = e.target.id,
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

    if (conf) {
      fetch("http://" + varLocalStorage.host + "/api/users/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((data) => {
          this.setState({
            load: true,
          });
          this.getUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  getUsers() {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/users",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";
    //Realiza la peticion de los usuarios
    fetch(url + page + orderby + search, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Descargando usuarios");
        this.setState({
          users: data,
          load: false,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          users: [],
          load: false,
        });
      });
  }
}

export default Users;
