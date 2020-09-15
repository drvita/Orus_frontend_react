import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Filter from "./index_filter";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "name",
      order: "asc",
      search: "",
      type: "",
      business: "",
    };
  }

  componentDidMount() {
    this.getContacts();
    moment.locale("es");
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando contactos");
      this.getContacts();
    }
  }

  render() {
    let { contacts, load } = this.state,
      pages = [];
    if (this.state.contacts.meta.total > 10) {
      for (var i = 1; i <= this.state.contacts.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              this.state.contacts.meta.current_page === i
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
      <div className="card card-danger card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="ion ion-clipboard mr-1"></i>
            Contactos registrados
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
            {this.state.contacts.meta.total > 10 ? (
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
                    this.handleOrder("rfc");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  RFC
                  {this.state.orderby === "rfc" ? (
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
                    this.handleOrder("type");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Tipo
                  {this.state.orderby === "type" ? (
                    <span>
                      &nbsp;
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
                <th>Telefono</th>
                <th
                  onClick={() => {
                    this.handleOrder("domicilio");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Domicilios
                  {this.state.orderby === "domicilio" ? (
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
                    this.handleOrder("birthday");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Nacimiento
                  {this.state.orderby === "birthday" ? (
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
              ) : Object.keys(contacts.data).length ? (
                contacts.data.map((contact) => {
                  contact.telefonos =
                    typeof contact.telefonos === "string"
                      ? contact.telefonos.split(",")
                      : contact.telefonos;
                  return (
                    <tr key={contact.id}>
                      <td>
                        <span className="badge badge-danger text-capitalize">
                          {contact.nombre}
                        </span>
                      </td>
                      <td className="text-uppercase">
                        {contact.rfc ? contact.rfc : "--"}
                      </td>
                      <td className="text-lowercase">
                        {contact.email ? contact.email : "--"}
                      </td>
                      <td className="text-uppercase">
                        {contact.tipo ? (
                          <span className="badge badge-secondary">
                            Proveedor
                          </span>
                        ) : (
                          <span className="badge badge-success">Cliente</span>
                        )}
                      </td>
                      <td>
                        {contact.telefonos[2]
                          ? contact.telefonos[2]
                          : contact.telefonos[0]}
                      </td>
                      <td className="text-capitalize">
                        {contact.domicilio.split(",")[0]}
                      </td>
                      <td>
                        {contact.f_nacimiento
                          ? moment(contact.f_nacimiento).fromNow()
                          : "--"}
                      </td>
                      <td className="text-right">
                        <a
                          className="btn-flat text-warning"
                          href="#delete"
                          onClick={this.handleDelete}
                          id={contact.id}
                        >
                          <i className="fas fa-trash" id={contact.id}></i>
                        </a>
                        &nbsp;&nbsp;
                        <Link
                          className="btn-flat blue-text"
                          to={"/contactos/registro/" + contact.id}
                          onClick={this.changePage}
                          id="/contactos/registro"
                        >
                          <i
                            className="fas fa-pencil-alt"
                            id="/contactos/registro"
                          ></i>
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
            to="/contactos/registro"
            className="btn btn-danger float-right"
            onClick={this.changePage}
            id="/contactos/registro"
          >
            <i className="fas fa-plus" id="/contactos/registro"></i>
            &nbsp; Nuevo contacto
          </Link>
        </div>
        <Filter
          search={this.state.search}
          type={this.state.type}
          business={this.state.business}
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
  changePage = (e) => {
    this.props.page(e.target.id);
  };
  handleDelete = (e) => {
    let conf = window.confirm("¿Esta seguro de eliminar el contacto?"),
      id = e.target.id,
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

    if (conf) {
      fetch("http://" + varLocalStorage.host + "/api/contacts/" + id, {
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
          this.getContacts();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  getContacts() {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/contacts",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1",
      type = this.state.type === "" ? "" : "&type=" + this.state.type,
      business =
        this.state.business === "" ? "" : "&business=" + this.state.business;

    //Realiza la peticion de los contactos
    fetch(url + page + orderby + search + type + business, {
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
        console.log("Descargando contactos");
        this.setState({
          contacts: data,
          load: false,
        });
      });
  }
}
