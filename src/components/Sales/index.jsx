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
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      ventas: {
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
      host: ls.host,
      token: ls.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getPedidos();
    console.log("[Sales] Eliminando datos de contacto en uso");
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
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
    let { ventas, load, search, type, date } = this.state,
      dataHeaders = [
        { name: "Folio", type: "id", filter: true },
        { name: "Pedido", type: "pedido", filter: false },
        { name: "Cliente" },
        { name: "Total", type: "total", filter: true },
        { name: "Abonado" },
        { name: "Por pagar" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            <i className="fas fa-cash-register mr-1"></i>
            Listado de ventas
          </h3>
          <div className="card-tools">
            <Link
              to="/notas/registro"
              className="btn btn-outline-dark"
              onClick={(e) => {
                this.changePage("/notas/registro");
              }}
            >
              <i className="fas fa-plus"></i>
            </Link>
            <Filter
              search={search}
              type={type}
              date={date}
              changeFilters={this.onchangeSearch}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={ventas.meta}
              handleChangePage={this.handleChangePage}
            />
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-sm table-bordered table-hover">
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
              ) : Object.keys(ventas.data).length ? (
                ventas.data.map((venta) => {
                  return (
                    <tr key={venta.id}>
                      <td>
                        <span className="badge badge-success text-capitalize">
                          {venta.id}
                        </span>
                      </td>
                      <td>
                        {venta.pedido ? (
                          <span className="badge badge-warning text-capitalize">
                            {venta.pedido}
                          </span>
                        ) : (
                          "--"
                        )}
                      </td>
                      <td className="text-uppercase">
                        <Link to={"/notas/registro/" + venta.id}>
                          <span className="badge badge-danger text-capitalize p-1">
                            {venta.cliente.nombre}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td className="text-right">$ {venta.total.toFixed(2)}</td>
                      <td className="text-right">
                        $ {venta.pagado.toFixed(2)}
                      </td>
                      <td className="text-right">
                        {venta.total - venta.pagado <= 0 ? (
                          <label className="text-success">
                            <i className="fas fa-check"></i>
                          </label>
                        ) : (
                          "$ " + (venta.total - venta.pagado).toFixed(2)
                        )}
                      </td>
                      <td>{moment(venta.updated_at).fromNow()}</td>
                      <td>{moment(venta.created_at).format("ll")}</td>
                      <Actions
                        id={venta.id}
                        item={venta.cliente.nombre}
                        delete={venta.pagado ? null : this.handleDelete}
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
            <strong>Nueva venta</strong>
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
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar la venta de " + item.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { host, token } = this.state;

          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de venta por API");
          return fetch("http://" + host + "/api/sales/" + id, {
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
        console.log("Venta eliminada");
        window.Swal.fire({
          icon: "success",
          title: "Venta eliminada con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getPedidos());
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
  getPedidos = () => {
    //Variables en localStorage
    const { host, token, order, orderby, search, page, type, date, load } =
        this.state,
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
          ventas: data,
          load: false,
        });
      });
  };
}
