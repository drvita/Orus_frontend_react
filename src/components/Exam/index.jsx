import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Filter from "./index_filter";

export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {
        data: [],
        meta: {},
      },
      load: true,
      page: 1,
      orderby: "created_at",
      order: "desc",
      search: "",
      status: 0,
      date: moment.utc(new Date()).local().format("YYYY-MM-DD"),
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
    let { exams, load } = this.state,
      pages = [];
    if (Object.keys(exams).length && exams.meta.total > 10) {
      for (var i = 1; i <= exams.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              exams.meta.current_page === i ? "page-item disabled" : "page-item"
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
            {exams.meta.total > 10 ? (
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
                    this.handleOrder("paciente");
                  }}
                  style={{
                    cursor:
                      this.state.order === "desc" ? "n-resize" : "s-resize",
                  }}
                  scope="col"
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
                  scope="col"
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
                  scope="col"
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
                  scope="col"
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
                  scope="col"
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
                <th className="text-right" scope="col">
                  Acciones
                </th>
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
              ) : Object.keys(exams.data).length ? (
                exams.data.map((exam) => {
                  return (
                    <tr
                      key={exam.id}
                      className={
                        exam.estado
                          ? "table-secondary"
                          : moment
                              .utc(new Date())
                              .isSame(moment.utc(exam.created_at), "hour")
                          ? "table-success"
                          : ""
                      }
                    >
                      <td>
                        <span
                          className={
                            exam.estado
                              ? "badge badge-secondary text-capitalize"
                              : moment
                                  .utc(new Date())
                                  .isSame(moment.utc(exam.created_at), "hour")
                              ? "badge badge-success text-capitalize"
                              : "badge badge-primary text-capitalize"
                          }
                        >
                          {exam.paciente.nombre}
                        </span>
                      </td>
                      <td>{exam.edad}</td>
                      <td className="text-uppercase">
                        {exam.estado ? (
                          <span className="badge badge-secondary">
                            Terminado
                          </span>
                        ) : (
                          <span className="badge badge-success">Activo</span>
                        )}
                      </td>
                      <td>{moment(exam.created_at).format("L LT")}</td>
                      <td>{moment(exam.updated_at).format("L LT")}</td>
                      <td className="text-right">
                        <a
                          className="btn-flat text-warning mr-2"
                          href="#delete"
                          onClick={this.handleDelete}
                          id={exam.id}
                        >
                          <i className="fas fa-trash" id={exam.id}></i>
                        </a>

                        <Link
                          className="btn-flat blue-text"
                          to={"/consultorio/registro/" + exam.id}
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
          status={this.state.status}
          date={this.state.date}
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
    console.log("Descargando examenes", typeof this.state.status);
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/exams",
      orderby = `&orderby=${this.state.orderby}&order=${this.state.order}`,
      search = this.state.search ? `&search=${this.state.search}` : "",
      date = this.state.date ? `&date=${this.state.date}` : "",
      status =
        typeof this.state.status === "number"
          ? `&status=${this.state.status}`
          : "",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";

    //Realiza la peticion de los contactos
    fetch(url + page + orderby + status + date + search, {
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
        console.log("Examenes descargados");
        if (!data.message) {
          this.setState({
            exams: data,
            load: false,
          });
        } else {
          console.log(data.message);
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
