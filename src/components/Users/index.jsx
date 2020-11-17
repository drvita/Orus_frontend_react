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
    //Variables en localStorage
    let sdd = JSON.parse(localStorage.getItem("OrusUsers"));
    this.state = {
      users: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "created_at",
      order: sdd ? sdd.order : "asc",
      search: sdd ? sdd.search : "",
      rol: sdd ? sdd.rol : "",
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getUsers();
    localStorage.setItem(
      "OrusUsers",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
        rol: this.state.rol,
      })
    );
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando usuarios y almacenando configuracion");
      localStorage.setItem(
        "OrusUsers",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
          rol: this.state.rol,
        })
      );
      this.getUsers();
    }
  }

  render() {
    let { users, load } = this.state,
      dataHeaders = [
        { name: "usuario", type: "username", filter: true },
        { name: "nombre", type: "name", filter: true },
        { name: "e-mail", type: "email", filter: true },
        { name: "Rol", type: "rol", filter: true },
        { name: "Actividad", type: "session" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h2 className="card-title text-primary">
            <i className="fas fa-user mr-1"></i>
            Usuarios registrados
          </h2>
          <div className="card-tools">
            <Filters
              search={this.state.search}
              rol={this.state.rol}
              changeFilters={this.changeFilters}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={users.meta}
              handleChangePage={this.handleChangePage}
            />
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
                  <td colSpan="9" className="alert alert-light text-center p-4">
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
                        <Link to={"/usuarios/registro/" + user.id}>
                          <span className="badge badge-primary text-capitalize p-1">
                            {user.name}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.rol > 0 ? (
                          user.rol === 1 ? (
                            <span className="text-capitalize text-success">
                              <i className="fas fa-user-tag mr-2"></i>
                              Ventas
                            </span>
                          ) : (
                            <span className="text-capitalize text-primary">
                              <i className="fas fa-user-tie mr-2"></i>
                              Optometrista
                            </span>
                          )
                        ) : (
                          <span className="text-capitalize text-danger">
                            <i className="fas fa-user-shield mr-2"></i>
                            Administrador
                          </span>
                        )}
                      </td>
                      <td>
                        {user.session
                          ? moment(user.session.last_activity).fromNow()
                          : "--"}
                      </td>
                      <td>{moment(user.updated_at).fromNow()}</td>
                      <td className="text-right">
                        {moment(user.created_at).format("ll")}
                      </td>
                      <Actions
                        id={user.id}
                        item={user.username}
                        delete={this.handleDelete}
                        edit={"/usuarios/registro/"}
                      />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="8" className="alert alert-info text-center">
                    <i className="fas fa-info mr-2"></i>
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
  handleDelete = (id, item) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el usuario " + item.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let { host, token } = this.state;

          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de usuario por API");
          return fetch("http://" + host + "/api/users/" + id, {
            method: "DELETE",
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
            .catch((e) => {
              console.error("Orus fetch", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        console.log("Usuario eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Usuario eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getUsers());
      } else if (result && !result.dismiss) {
        console.log("Orus res: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
  };
  getUsers = () => {
    let { load, host, token } = this.state,
      url = "http://" + host + "/api/users",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      rol = this.state.rol.length > 0 ? `&rol=${this.state.rol}` : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }

    //Realiza la peticion de los usuarios
    console.log("Solicitando usuarios a la API");
    fetch(url + page + orderby + search + rol, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          console.log("Descargando usuarios");
          this.setState({
            users: data,
            load: false,
          });
        } else {
          console.error("Orus: ", data.message);
          window.Swal.fire("Error", "Al descargar usuarios", "error");
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.error("Orus: " + e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
        this.setState({
          load: false,
        });
      });
  };
}
