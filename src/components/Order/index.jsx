import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Header from "../Layouts/headerTable";
import Filter from "./index_filter";
import Pagination from "../Layouts/pagination";
import Actions from "../Layouts/actionsTable";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let sdd = JSON.parse(localStorage.getItem("OrusOrder"));
    this.state = {
      pedidos: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "created_at",
      order: sdd ? sdd.order : "asc",
      search: sdd ? sdd.search : "",
      status: sdd ? sdd.status : "",
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
    this.getPedidos();
    moment.locale("es");
    localStorage.setItem(
      "OrusOrder",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
        status: this.state.status,
      })
    );
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando pedidos");
      this.getPedidos();
      localStorage.setItem(
        "OrusOrder",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
          status: this.state.status,
        })
      );
    }
  }

  render() {
    let { pedidos, load } = this.state,
      dataHeaders = [
        { name: "Folio", type: "id", filter: true },
        { name: "Caja" },
        { name: "Paciente", type: "contact_id", filter: true },
        { name: "Detalles" },
        { name: "Estado" },
        { name: "Nota" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title text-warning">
            <i className="fas fa-clipboard-list mr-1"></i>
            Listado de pedidos
          </h3>
          <div className="card-tools">
            <Filter
              search={this.state.search}
              status={this.state.status}
              changeFilters={this.onchangeSearch}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={pedidos.meta}
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
                  <td colSpan="10" className="text-center">
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
                        <Link to={"/pedidos/registro/" + pedido.id}>
                          <span className="badge badge-danger text-capitalize p-1">
                            {pedido.paciente.nombre}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td className="text-uppercase">
                        {pedido.estado === 1 ? (
                          <div>
                            <span className="text-danger mr-1">
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
                      <td className="text-right">
                        <Link to={"/notas/registro/" + pedido.nota.id}>
                          <span className="badge badge-success">
                            {pedido.nota.id}
                          </span>
                        </Link>
                      </td>
                      <td className="text-capitalize">
                        {moment(pedido.updated_at).fromNow()}
                      </td>
                      <td className="text-capitalize">
                        {moment(pedido.created_at).format("LL")}
                      </td>
                      <Actions
                        id={pedido.id}
                        item={pedido.paciente.nombre}
                        delete={this.handleDelete}
                        edit={"/pedidos/registro/"}
                      />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="10" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right">
          <Link
            to="/pedidos/registro"
            className="btn btn-outline-warning"
            onClick={(e) => {
              this.changePage("/pedidos/registro");
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            <strong>Nuevo pedido</strong>
          </Link>
        </div>
      </div>
    );
  }

  setStatusString = (status) => {
    switch (status) {
      case 0:
        return <span className="text-warning text-uppercase">En proceso</span>;
      case 1:
        return <span className="text-info text-uppercase">En laboratorio</span>;
      case 2:
        return <span className="text-primary text-uppercase">Bicelación</span>;
      case 3:
        return <span className="text-success text-uppercase">Terminado</span>;
      case 4:
        return <span className="text-info text-uppercase">Garantia</span>;
      default:
        return <span className="text-secondary text-uppercase">Baja</span>;
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
  handleChangePage = (id) => {
    this.setState({
      page: id,
      load: true,
    });
  };
  changePage = (id) => {
    this.props.page(id);
  };
  handleDelete = (id, name) => {
    let conf = window.confirm(
        "¿Esta seguro de eliminar el pedido de " + name.toUpperCase() + "?"
      ),
      { host, token } = this.state;

    if (conf) {
      //Mandamos señal de eliminación
      this.setState({
        load: true,
      });
      //Inicio de proceso de eliminción por API
      console.log("Solicitud de eliminación por API");
      fetch("http://" + host + "/api/orders/" + id, {
        method: "DELETE",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
          if (!data.message) {
            console.log("Pedido eliminado");
            this.getPedidos();
            window.alert("Pedido eliminado con exito");
          } else {
            console.error("Error al eliminar el pedido", data.message);
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
    }
  };
  getPedidos() {
    //Variables en localStorage
    let { search, status, page, order, orderby, host, token } = this.state,
      url = "http://" + host + "/api/orders",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search}` : "",
      estado = status ? "&status=" + status : "",
      pagina = page > 0 ? "?page=" + page : "?page=1";

    //Realiza la peticion de los contactos
    fetch(url + pagina + ordenar + buscar + estado, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
        if (!data.message) {
          console.log("Mostrando datos del pedidos");
          this.setState({
            pedidos: data,
            load: false,
          });
        } else {
          console.error("Error en la descarga los pedidos", data.message);
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
  }
}
