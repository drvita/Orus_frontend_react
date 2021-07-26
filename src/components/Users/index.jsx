import React, { Component } from "react";
//Components
import Inbox from "./views/Inbox";

export default class Users extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const sdd = JSON.parse(localStorage.getItem("OrusUsers"));
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
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
      host: ls.host,
      token: ls.token,
      //New
      panel: "inbox",
    };
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
    console.log("[Users] Eliminando datos de contacto en uso");
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
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
    const { panel, options = {} } = this.state;

    return (
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <a
            href="#new"
            className={
              panel !== "inbox"
                ? "disabled mb-3 btn btn-secondary btn-block"
                : "mb-3 btn btn-primary btn-block"
            }
            onClick={(e) => {
              e.preventDefault();
              this.handleShowPanel(e, 2);
            }}
            disabled={panel !== "inbox" ? true : false}
          >
            <i className="mr-2 fas fa-plus"></i>
            Usuario nuevo
          </a>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title text-dark">
                <i className="mr-2 fas fa-ellipsis-v"></i>Menu y filtros
              </h5>
            </div>
            <div className="p-0 card-body">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a
                    href="#item"
                    className={panel === 1 ? "nav-link active" : "nav-link"}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleShowPanel(e, 1);
                    }}
                  >
                    <i className="mr-2 fas fa-notes-medical"></i> Pendientes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#item"
                    className={!panel ? "nav-link active" : "nav-link"}
                    onClick={(e) => this.handleShowPanel(e, 0)}
                  >
                    <i className="mr-2 fas fa-clipboard-list"></i> Pedidos
                  </a>
                </li>
                {!panel ? (
                  <>
                    <li className="nav-item">&nbsp;</li>
                    <li className="p-2 nav-item">
                      <label htmlFor="status">Estado del pedido</label>
                      <select
                        className="form-control "
                        name="status"
                        id="status"
                        value={options.status}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="">-- Todos --</option>
                        <option value="0">En proceso</option>
                        <option value="1">Laboratorio</option>
                        <option value="2">Bicelación</option>
                        <option value="3">Terminado</option>
                        <option value="4">Entregado</option>
                        {/* <option value="5">Garantia</option> */}
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="orderby">Ordenar por</label>
                      <select
                        className="form-control "
                        name="orderby"
                        id="orderby"
                        value={options.orderby}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="created_at">Fecha de registro</option>
                        <option value="updated_at">
                          Fecha de modificacion
                        </option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="order">Mostrar por</label>
                      <select
                        className="form-control "
                        name="order"
                        id="order"
                        value={options.order}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="asc">Antiguos</option>
                        <option value="desc">Recientes</option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="itemsPage">Numero de pedidos</label>
                      <select
                        className="form-control "
                        name="itemsPage"
                        id="itemsPage"
                        value={options.itemsPage}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="10">ver 10</option>
                        <option value="20">ver 20</option>
                        <option value="50">ver 50</option>
                        <option value="100">ver 100</option>
                      </select>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
          {panel === "inbox" && <Inbox />}
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
