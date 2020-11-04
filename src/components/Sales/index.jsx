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
    let sdd = JSON.parse(localStorage.getItem("OrusSales"));
    this.state = {
      pedidos: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "created_at",
      order: sdd ? sdd.order : "desc",
      search: sdd ? sdd.search : "",
      type: sdd ? sdd.type : "",
      date: sdd ? sdd.date : "",
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
      "OrusSales",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
        type: this.state.type,
        date: this.state.date,
      })
    );
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando pedidos");
      this.getPedidos();
      localStorage.setItem(
        "OrusSales",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
          type: this.state.type,
          date: this.state.date,
        })
      );
    }
  }

  render() {
    let { pedidos, load, search, type, date } = this.state,
      dataHeaders = [
        { name: "Folio", type: "id", filter: true },
        { name: "Cliente" },
        { name: "Sub-total" },
        { name: "Descuento" },
        { name: "Total", type: "total", filter: true },
        { name: "Abonos" },
        { name: "Por pagar" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            <i className="fas fa-cash-register mr-1"></i>
            Listado de notas
          </h3>
          <div className="card-tools">
            <Filter
              search={search}
              type={type}
              date={date}
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
                  <td colSpan="10" className="text-center p-4">
                    <div
                      className="spinner-border text-primary mr-4"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <span className="font-weight-light font-italic">
                      Espere cargando datos de la venta
                    </span>
                  </td>
                </tr>
              ) : Object.keys(pedidos.data).length ? (
                pedidos.data.map((pedido) => {
                  return (
                    <tr key={pedido.id}>
                      <td>
                        <span className="badge badge-success text-capitalize">
                          {pedido.id}
                        </span>
                      </td>
                      <td className="text-uppercase">
                        <Link to={"/notas/registro/" + pedido.id}>
                          <span className="badge badge-danger text-capitalize p-1">
                            {pedido.cliente.nombre}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td className="text-right">
                        $ {pedido.subtotal ? pedido.subtotal : 0.0}
                      </td>
                      <td className="text-right">
                        $ {pedido.descuento ? pedido.descuento : 0.0}
                      </td>
                      <td className="text-right">
                        $ {pedido.total ? pedido.total : 0.0}
                      </td>
                      <td className="text-right">$ {pedido.pagado}</td>
                      <td className="text-right">
                        {pedido.total - pedido.pagado <= 0 ? (
                          <label className="text-success">
                            <i className="fas fa-check"></i>
                          </label>
                        ) : (
                          "$ " + (pedido.total - pedido.pagado)
                        )}
                      </td>
                      <td className="text-capitalize">
                        {moment(pedido.updated_at).fromNow()}
                      </td>
                      <td className="text-capitalize">
                        {moment(pedido.created_at).format("LL")}
                      </td>
                      <Actions
                        id={pedido.id}
                        item={pedido.cliente.nombre}
                        delete={this.handleDelete}
                        edit={"/notas/registro/"}
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
            to="/notas/registro"
            className="btn btn-outline-success"
            onClick={(e) => {
              this.changePage("/notas/registro");
            }}
          >
            <i className="fas fa-plus mr-2"></i>
            <strong>Nueva nota</strong>
          </Link>
        </div>
      </div>
    );
  }

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
  handleDelete = (id, item) => {
    let conf = window.confirm(
        "¿Esta seguro de eliminar el pedido de " + item.toUpperCase() + "?"
      ),
      { host, token } = this.state;

    if (conf) {
      //Mandamos señal de eliminación
      this.setState({
        load: true,
      });
      //Inicio de proceso de eliminción por API
      console.log("Solicitud de eliminación por API");
      fetch("http://" + host + "/api/sales/" + id, {
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
            window.alert("La venta no puede ser eliminado");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            console.log("Venta eliminada");
            this.getPedidos();
            window.alert("Venta eliminada con exito");
          } else {
            console.error("Error al eliminar la venta", data.message);
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
  getPedidos = () => {
    //Variables en localStorage
    let {
        host,
        token,
        order,
        orderby,
        search,
        page,
        type,
        date,
        load,
      } = this.state,
      url = "http://" + host + "/api/sales",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search}` : "",
      pagina = page > 0 ? "?page=" + page : "?page=1",
      tipo = type === "" ? "" : "&type=" + type,
      fecha = date === "" ? "" : "&date=" + date;

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }

    //Realiza la peticion de ventas
    console.log("Descargando ventas de API");
    fetch(url + pagina + ordenar + buscar + tipo + fecha, {
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
        console.log("Descargando ventas");
        this.setState({
          pedidos: data,
          load: false,
        });
      });
  };
}
