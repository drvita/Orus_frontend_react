import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Header from "../Layouts/headerTable";
import Pagination from "../Layouts/pagination";
import Filters from "./index_filter";
import Actions from "../Layouts/actionsTable";

export default class Users extends Component {
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
      order: "asc",
      search: "",
      rol: "",
    };
  }

  componentDidMount() {
    this.getUsers();
    moment.locale("es");
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando usuarios");
      this.getUsers();
    }
  }

  render() {
    let { users, load } = this.state,
      dataHeaders = [
        { name: "usuario", type: "username" },
        { name: "nombre", type: "name" },
        { name: "e-mail", type: "email" },
        { name: "Rol", type: "rol" },
        { name: "Actualizado", type: "updated_at" },
        { name: "Creado", type: "created_at" },
      ];

    return (
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h2 className="card-title text-primary">
            <i className="ion ion-clipboard mr-1"></i>
            Usuarios registrados
          </h2>
          <div className="card-tools">
            <Filters
              search={this.state.search}
              rol={this.state.rol}
              changeFilters={this.changeFilters}
              setFilters={this.setFilter}
            />
            {users.meta.total > 10 ? (
              <Pagination
                meta={users.meta}
                handleChangePage={this.handleChangePage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-bordered table-hover table-nowrap">
            <Header
              orderby={this.state.orderby}
              order={this.state.order}
              data={dataHeaders}
              actions={true}
              handleOrder={this.handleOrder}
            />
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(users.data).length ? (
                users.data.map((user) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">
                        <span className="text-capitalize text-primary">
                          {user.username}
                        </span>
                      </th>
                      <td>
                        <span className="badge badge-primary text-capitalize">
                          {user.name}
                        </span>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.rol > 0 ? (
                          user.rol === 1 ? (
                            <span className="text-capitalize text-success">
                              Ventas
                            </span>
                          ) : (
                            <span className="text-capitalize text-primary">
                              Optometrista
                            </span>
                          )
                        ) : (
                          <span className="text-capitalize text-danger">
                            Administrador
                          </span>
                        )}
                      </td>
                      <td>{moment(user.updated_at).fromNow()}</td>
                      <td className="text-right">
                        {moment(user.created_at).format("LL")}
                      </td>
                      <Actions
                        id={user.id}
                        delete={this.handleDelete}
                        edit={true}
                      />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="7" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right">
          <Link
            to="/usuarios/registro"
            className="btn btn-outline-primary btn-lg"
          >
            <i className="fas fa-plus mr-2"></i>
            Nuevo usuario
          </Link>
        </div>
      </div>
    );
  }

  setFilter = () => {
    this.setState({
      load: true,
      page: 1,
    });
  };
  changeFilters = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleOrder = (item) => {
    this.setState({
      orderby: item,
      order: this.state.order === "desc" ? "asc" : "desc",
      load: true,
    });
  };
  handleChangePage = (page) => {
    this.setState({
      page,
      load: true,
    });
  };
  handleDelete = (id) => {
    let conf = window.confirm("¿Esta seguro de eliminar el usuario?"),
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

    if (conf && id) {
      fetch("http://" + varLocalStorage.host + "/api/users/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Hubo un error, intentelo mas tarde");
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          this.setState({
            load: true,
          });
          this.getUsers();
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          this.setState({
            load: false,
          });
        });
    }
  };
  getUsers = () => {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/users",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      rol = this.state.rol.length > 0 ? `&rol=${this.state.rol}` : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";
    //Realiza la peticion de los usuarios
    console.log("Descargando usuarios de API");
    fetch(url + page + orderby + search + rol, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          console.error(res);
        }
        return res.json();
      })
      .then((data) => {
        if (data.data) {
          console.log("Almacenando usuarios");
          this.setState({
            users: data,
            load: false,
          });
        } else {
          console.error("Error en la descarga", data);
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        window.alert("Ups!\n Hubo un error, intentelo mas tarde");
        this.setState({
          load: false,
        });
      });
  };
}
