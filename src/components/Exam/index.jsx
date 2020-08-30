import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Filter from "./index_filter";

export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "created_at",
      order: "desc",
      search: "",
    };
  }

  componentDidMount() {
    this.getExams();
    moment.locale("es");
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando citas");
      this.getExams();
    }
  }

  render() {
    let { contacts, load } = this.state,
      pages = [];
    if (Object.keys(contacts).length && contacts.meta.total > 10) {
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
      <div className="card card-info card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-notes-medical mr-2"></i>
            Citas para examenes
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
          <table className="table table-hover table-nowrap">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    this.handleOrder("paciente");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Nombre del paciente
                  {this.state.orderby === "paciente" ? (
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
                    this.handleOrder("edad");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  Edad
                  {this.state.orderby === "edad" ? (
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
                  Creado
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
                <th>Accion</th>
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
                        <span className="badge badge-primary text-capitalize">
                          {contact.paciente.nombre}
                        </span>
                      </td>
                      <td>{contact.edad}</td>
                      <td>
                        {contact.estado ? (
                          <span className="badge badge-secondary">
                            Bloqueado
                          </span>
                        ) : (
                          <span className="badge badge-success">Activo</span>
                        )}
                      </td>
                      <td>{moment(contact.created_at).format("L")}</td>
                      <td>{moment(contact.updated_at).fromNow(true)}</td>
                      <td>
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
                          to={"/consultorio/registro/" + contact.id}
                          onClick={this.changePage}
                          id="/consultorio/registro"
                        >
                          <i
                            className="fas fa-pencil-alt"
                            id="/consultorio/registro"
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
            to="/consultorio/registro"
            className="btn btn-info float-right"
            onClick={this.changePage}
            id="/consultorio/registro"
          >
            <i className="fas fa-plus" id="/consultorio/registro"></i>
            &nbsp; Nuevo examen
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
    let conf = window.confirm("¿Esta seguro de eliminar el usuario?"),
      id = e.target.id,
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

    if (conf) {
      fetch("http://" + varLocalStorage.host + "/api/exams/" + id, {
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
          this.getUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  getExams() {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/exams",
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
      .then((res) => res.json())
      .then((data) => {
        console.log("Descargando citas");
        if (!data.message) {
          this.setState({
            contacts: data,
            load: false,
          });
        } else {
          window.alert(data.message);
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          load: false,
        });
      });
  }
}
