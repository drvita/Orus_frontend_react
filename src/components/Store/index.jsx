import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Header from "../Layouts/headerTable";
import Filter from "./index_filter";
import Pagination from "../Layouts/pagination";
import Actions from "../Layouts/actionsTable";

export default class Store extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let sdd = JSON.parse(localStorage.getItem("OrusStore"));
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      items: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "created_at",
      order: sdd ? sdd.order : "desc",
      search: sdd ? sdd.search : "",
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
    this.getItems();
    localStorage.setItem(
      "OrusStore",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
      })
    );
    console.log("[Store] Eliminando datos de contacto en uso");
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando productos");
      this.getItems();
      localStorage.setItem(
        "OrusStore",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
        })
      );
    }
  }

  render() {
    let { items, load } = this.state,
      dataHeaders = [
        { name: "Codigo" },
        { name: "Marca", type: "brand", filter: true },
        { name: "Producto", type: "name", filter: true },
        { name: "PS" },
        { name: "UND" },
        { name: "Precio", type: "price", filter: true },
        { name: "Proveedor", type: "contact_id ", filter: true },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title text-primary">
            <i className="fas fa-database mr-1"></i>
            Productos en almacen
          </h3>
          <div className="card-tools">
            <Link
              to="/almacen/registro"
              className="btn btn-outline-dark"
              onClick={this.changePage}
              id="/almacen/registro"
            >
              <i className="fas fa-plus"></i>
            </Link>
            <Filter
              search={this.state.search}
              changeFilters={this.onchangeSearch}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={items.meta}
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
                  <td colSpan="10" className="text-center">
                    <span className="text-primary">Cargando productos</span>
                    <div
                      className="spinner-border text-primary ml-4"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(items.data).length ? (
                items.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="text-primary text-uppercase">
                          {item.codigo}
                        </span>
                      </td>
                      <td className="text-uppercase">
                        {item.marca !== null ? item.marca.marca : "--"}
                      </td>
                      <td>
                        <Link to={"/almacen/registro/" + item.id}>
                          <span className="badge badge-primary text-capitalize p-1">
                            {item.producto}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td className="text-right">{item.unidad}</td>
                      <td>
                        <span
                          className={
                            item.cantidades > 0 ? "text-success" : "text-danger"
                          }
                        >
                          {item.cantidades > 0 ? item.cantidades : 0}
                        </span>
                      </td>
                      <td className="text-right">
                        $ {item.precio ? item.precio.toFixed(2) : ""}
                      </td>
                      <td className="text-capitalize">
                        {item.proveedor !== null
                          ? item.proveedor.nombre.split(" ").length
                            ? item.proveedor.nombre.split(" ")[0]
                            : item.proveedor.nombre
                          : "--"}
                      </td>
                      <td className="text-capitalize">
                        {moment(item.updated_at).fromNow()}
                      </td>
                      <td className="text-capitalize">
                        {moment(item.created_at).format("LL")}
                      </td>
                      <Actions
                        id={item.id}
                        item={item.producto}
                        delete={
                          item.lotes || item.cantidades
                            ? null
                            : this.handleDelete
                        }
                        edit={"/almacen/registro/"}
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
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group" role="group">
                <Link
                  to="/almacen/registro"
                  className="btn btn-outline-primary"
                  onClick={this.changePage}
                  id="/almacen/registro"
                >
                  <i className="fas fa-plus mr-1"></i>
                  Nuevo producto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
  changePage = (e) => {
    this.props.page(e.target.id);
  };
  handleDelete = (id, item) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el producto " + item.toUpperCase() + "?",
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
          console.log("Solicitud de eliminación de producto por API");
          return fetch("http://" + host + "/api/store/" + id, {
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
        console.log("Producto eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Producto eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getItems());
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
  getItems() {
    //Variables
    const { load, orderby, order, search, page, host, token } = this.state,
      url = "http://" + host + "/api/store",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search.replace("+", "%2b")}` : "",
      pagina = page > 0 ? "?page=" + page : "?page=1";

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }

    //Realiza la peticion de los contactos
    console.log("Descargando productos de API");
    fetch(url + pagina + ordenar + buscar, {
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
          console.log("Almacenando productos");
          this.setState({
            items: data,
            load: false,
          });
        } else {
          console.error("Orus: ", data.message, data.errors);
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
  }
}
