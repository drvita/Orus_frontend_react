import React, { Component } from "react";
import { Link } from "react-router-dom";
//import moment from "moment";
//import "moment/locale/es";
import Filter from "./index_filter";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "created_at",
      order: "desc",
      search: "",
      status: 0,
    };
  }
  componentDidMount() {
    this.getPedidos();
    //moment.locale("es");
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando pedidos");
      this.getPedidos();
    }
  }

  render() {
    let { pedidos, load } = this.state,
      pages = [];
    if (pedidos.meta.total > 10) {
      for (var i = 1; i <= pedidos.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              pedidos.meta.current_page === i
                ? "page-item disabled"
                : "page-item"
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
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>
            Listado de pedidos
          </h3>
          <div className="card-tools">
            <div className="btn-group">
              <a
                href="#filter"
                className="btn btn-tool"
                data-toggle="modal"
                data-target="#filters"
              >
                <i className="fas fa-search"></i>
              </a>
            </div>
            {pedidos.meta.total > 10 ? (
              <div className="btn-group">
                <ul className="pagination pagination-sm">{pages}</ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-bordered table-hover table-nowrap">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    this.handleOrder("id");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Orden
                  {this.state.orderby === "id" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th>Caja</th>
                <th
                  onClick={() => {
                    this.handleOrder("contact_id");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Paciente
                  {this.state.orderby === "contact_id" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th>Detalles</th>
                <th
                  onClick={() => {
                    this.handleOrder("status");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Estado
                  {this.state.orderby === "status" ? (
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
                  Registrado
                  {this.state.orderby === "created_at" ? (
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
                <th className="text-right">Accion</th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(pedidos.data).length ? (
                pedidos.data.map((pedido) => {
                  return (
                    <tr key={pedido.id}>
                      <td>
                        <span className="badge badge-warning text-capitalize">
                          {pedido.id}
                        </span>
                      </td>
                      <td className="text-uppercase">
                        {pedido.estado === 2 ? (
                          <span>
                            {pedido.caja ? pedido.caja : "Sin asignar"}
                          </span>
                        ) : (
                          "--"
                        )}
                      </td>
                      <td>
                        <span className="badge badge-danger text-capitalize">
                          {pedido.paciente.nombre}
                        </span>
                      </td>
                      <td className="text-uppercase">
                        {pedido.estado === 1 ? (
                          <div>
                            <span className="badge badge-danger mr-1">
                              {pedido.laboratorio
                                ? pedido.laboratorio.nombre
                                : "Sin asignar"}
                            </span>{" "}
                            {pedido.laboratorio ? "/ " + pedido.folio_lab : ""}
                          </div>
                        ) : pedido.estado === 2 ? (
                          <small>
                            {pedido.observaciones
                              ? pedido.observaciones
                              : "sin observaciones"}
                          </small>
                        ) : !pedido.estado ? (
                          <small>
                            {pedido.examen
                              ? pedido.examen.estado === "Terminado"
                                ? "Examen completado"
                                : "Examen no realizado"
                              : "Examen no asignado"}
                          </small>
                        ) : (
                          "--"
                        )}
                      </td>
                      <td>{this.setStatusString(pedido.estado)}</td>
                      <td>{pedido.created_at}</td>
                      <td>{pedido.updated_at}</td>
                      <td className="text-right">
                        <a
                          className="btn-flat text-warning"
                          href="#delete"
                          onClick={this.handleDelete}
                          id={pedido.id}
                        >
                          <i className="fas fa-trash" id={pedido.id}></i>
                        </a>
                        &nbsp;&nbsp;
                        <Link
                          className="btn-flat blue-text"
                          to={"/pedidos/registro/" + pedido.id}
                          onClick={(e) => {
                            this.changePage("/pedidos/registro");
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="8" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer clearfix">
          <Link
            to="/pedidos/registro"
            className="btn btn-warning float-right"
            onClick={(e) => {
              this.changePage("/pedidos/registro");
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            <strong>Nuevo pedido</strong>
          </Link>
        </div>
        <Filter
          search={this.state.search}
          status={this.state.status}
          onChangeValue={this.onchangeSearch}
          handleFilter={this.handleFilter}
        />
      </div>
    );
  }

  setStatusString = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="badge badge-warning text-uppercase">En proceso</span>
        );
      case 1:
        return (
          <span className="badge badge-info text-uppercase">
            En laboratorio
          </span>
        );
      case 2:
        return (
          <span className="badge badge-primary text-uppercase">Bicelación</span>
        );
      case 3:
        return (
          <span className="badge badge-success text-uppercase">Terminado</span>
        );
      case 4:
        return (
          <span className="badge badge-info text-uppercase">Garantia</span>
        );
      default:
        return (
          <span className="badge badge-secondary text-uppercase">Baja</span>
        );
    }
  };
  handleFilter = () => {
    this.setState({
      load: true,
      page: 1,
    });
  };
  onchangeSearch = (key, value) => {
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
  handleChangePage = (id, e) => {
    e.preventDefault();
    this.setState({
      page: id,
      load: true,
    });
  };
  changePage = (id) => {
    this.props.page(id);
  };
  handleDelete = (e) => {
    let conf = window.confirm("¿Esta seguro de eliminar este pedido?"),
      id = e.target.id,
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

    if (conf) {
      fetch("http://" + varLocalStorage.host + "/api/orders/" + id, {
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
          this.getPedidos();
        });
    }
  };
  getPedidos() {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/orders",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";

    //Realiza la peticion de los contactos
    fetch(url + page + orderby + search, {
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
          console.log(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Descargando pedidos");
        this.setState({
          pedidos: data,
          load: false,
        });
      });
  }
}
