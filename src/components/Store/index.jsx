import React, { Component } from "react";
import { Link } from "react-router-dom";
import Filter from "./index_filter";

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "cant",
      order: "desc",
      search: "",
    };
  }

  componentDidMount() {
    this.getItems(this.state.page);
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando productos");
      this.getItems(this.state.page);
    }
  }

  render() {
    let { items, load } = this.state,
      pages = [];
    if (this.state.items.meta.total > 10) {
      for (var i = 1; i <= this.state.items.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              this.state.items.meta.current_page === i
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              href="#e"
              id={i}
              className="page-link"
              onClick={this.handleChangePage}
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
            Productos registrados en almacen
          </h3>
          <div className="card-tools">
            <div className="btn-group">
              <a
                href="#modal"
                className="btn btn-tool"
                data-toggle="modal"
                data-target="#filters"
              >
                <i className="fas fa-search"></i>
              </a>
            </div>
            {this.state.items.meta.total > 10 ? (
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
                    this.handleOrder("code");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                    width: 110,
                  }}
                >
                  Codigo
                  {this.state.orderby === "code" ? (
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
                    this.handleOrder("brand");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Marca
                  {this.state.orderby === "brand" ? (
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
                    this.handleOrder("unit");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  PS
                  {this.state.orderby === "unit" ? (
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
                    this.handleOrder("cant");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                    width: 60,
                  }}
                >
                  UND
                  {this.state.orderby === "cant" ? (
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
                    this.handleOrder("price");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                    width: 90,
                  }}
                  className="text-right"
                >
                  Precio
                  {this.state.orderby === "price" ? (
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
                    this.handleOrder("category_id");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Categoria
                  {this.state.orderby === "category_id" ? (
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
                  <td colSpan="9" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(items.data).length ? (
                items.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.updated_at}</td>
                      <td>
                        <span className="badge badge-primary">
                          {item.codigo}
                        </span>
                      </td>
                      <td>{item.marca}</td>
                      <td>{item.producto}</td>
                      <td>{item.unidad}</td>
                      <td>
                        <span
                          className={
                            item.cantidades
                              ? "badge badge-light"
                              : "badge badge-danger"
                          }
                        >
                          {item.cantidades}
                        </span>
                      </td>
                      <td className="text-right">$ {item.precio}</td>
                      <td>{item.categoria.nombre}</td>
                      <td>
                        <a
                          className="btn-flat text-warning"
                          href="#delete"
                          onClick={this.handleDelete}
                          id={item.id}
                        >
                          <i className="fas fa-trash" id={item.id}></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <Link
                          className="btn-flat blue-text"
                          to={"/almacen/registro/" + item.id}
                          onClick={this.changePage}
                          id="/almacen/registro"
                        >
                          <i
                            className="fas fa-pencil-alt"
                            id="/almacen/registro"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="9" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer clearfix">
          <Link
            to="/almacen/registro"
            className="btn btn-info float-right"
            onClick={this.changePage}
            id="/almacen/registro"
          >
            <i className="fas fa-plus" id="/almacen/registro"></i>
            &nbsp; Nuevo producto
          </Link>
        </div>
        <Filter
          search={this.state.search}
          onChangeValue={this.onchangeSearch}
          handleFilter={this.handleFilter}
        />
      </div>
    );
  }

  handleFilter = () => {
    this.setState({
      load: true,
      page: 1,
    });
  };
  onchangeSearch = (search) => {
    this.setState({
      search,
    });
  };
  handleOrder = (item) => {
    this.setState({
      orderby: item,
      order: this.state.order === "desc" ? "asc" : "desc",
      load: true,
    });
  };
  handleChangePage = (e) => {
    e.preventDefault();
    this.setState({
      page: e.target.id,
      load: true,
    });
  };
  changePage = (e) => {
    this.props.page(e.target.id);
  };
  handleDelete = (e) => {
    e.preventDefault();
    const tr = e.target.parentNode.parentNode.parentNode;
    tr.classList.add("bg-danger");

    let conf = window.confirm("¿Esta seguro de eliminar el producto?"),
      id = e.target.id,
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      deleteColor = setInterval(() => {
        clearInterval(deleteColor);
        tr.classList.remove("bg-danger");
      }, 6500);

    if (conf && id) {
      fetch("http://" + varLocalStorage.host + "/api/store/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((data) => {
          console.log("Eliminando producto");
          if (data.ok && data.status === 204) {
            this.setState({
              load: true,
            });
          } else {
            window.alert(
              data.statusText +
                "\nEl producto tiene lotes registrados, no se puede eliminar"
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  getItems(page) {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/store",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "";
    page = page * 1 > 0 ? "?page=" + page : "?page=1";
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
        console.log("Descargando lista de productos");
        this.setState({
          items: data,
          load: false,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          load: false,
        });
      });
  }
}
