import React, { Component } from "react";
import { Link } from "react-router-dom";
import Graduacion from "../Exam/graduacionExam";
import Recomendaciones from "../Exam/recomendaciones";
import moment from "moment";

export default class ListsExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      data: {
        data: [],
        meta: {},
      },
      exam: {},
      load: true,
      page: 0,
    };
  }
  componentDidMount() {
    if (!this.props.exam.id) {
      this.getExams();
    }
  }
  componentDidUpdate(props, state) {
    if (!this.props.exam.id && this.props.exam.id !== props.exam.id) {
      this.getExams();
    }
    if (this.props.exam.id !== props.exam.id) {
      this.setState({
        id: this.props.exam.id,
        exam: this.props.exam,
      });
    }
  }

  render() {
    let { data, load, id, exam } = this.state,
      { select } = this.props;

    if (select) {
      return (
        <React.Fragment>
          {id ? (
            <React.Fragment>
              <div className="row mb-4">
                <div className="col">
                  <div className="border border-info rounded p-2">
                    <span className="badge badge-pill badge-info mx-2">
                      Folio
                    </span>
                    <strong>{id}</strong>
                  </div>
                </div>
                <div className="col">
                  <div className="border border-info rounded p-2">
                    <span className="badge badge-pill badge-info mx-2">
                      Fecha
                    </span>
                    <strong>
                      {moment.utc(exam.created_at).local().format("LL")}
                    </strong>
                  </div>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-info"
                    onClick={this.handleClickDeleteExam}
                  >
                    Cambiar
                  </button>
                </div>
              </div>

              <Graduacion
                esferaod={exam.esferaod}
                esferaoi={exam.esferaoi}
                cilindrod={exam.cilindrod}
                cilindroi={exam.cilindroi}
                ejeod={exam.ejeod}
                ejeoi={exam.ejeoi}
                adiciond={exam.adiciond}
                adicioni={exam.adicioni}
                dpod={exam.dpod}
                dpoi={exam.dpoi}
                alturaod={exam.alturaod}
                alturaoi={exam.alturaoi}
                lcmarca={exam.lcmarca}
                lcgod={exam.lcgod}
                lcgoi={exam.lcgoi}
                readOnly={true}
                onChangeInput={this.handleChangeInput}
              />

              {exam.category_id ? (
                <Recomendaciones
                  category_id={exam.category_id}
                  onChangeInput={this.handleChangeInput}
                />
              ) : (
                ""
              )}
            </React.Fragment>
          ) : (
            <table className="table table-hover table-nowrap">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha</th>
                  <th>Edad</th>
                  <th>Estado</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {load ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : Object.keys(data.data).length ? (
                  data.data.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={
                          moment
                            .utc(new Date())
                            .isSame(moment.utc(row.created_at), "day")
                            ? "table-success"
                            : ""
                        }
                      >
                        <td>
                          <span className="badge badge-info">{row.id}</span>
                        </td>
                        <td>
                          {moment.utc(row.created_at).local().format("L")}
                          <br />
                          {moment(new Date()).isSame(row.created_at)}
                        </td>
                        <td>{row.edad}</td>
                        <td>
                          {row.estado ? (
                            <span className="badge badge-secondary">
                              Terminado
                            </span>
                          ) : (
                            <span className="badge badge-success">Activo</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleClickSelect(row);
                            }}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th colSpan="3" className="text-center">
                      Aun no tiene examenes
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </React.Fragment>
      );
    } else {
      return (
        <div className="card card-info card-outline">
          <div className="card-header">
            <i className="fas fa-notes-medical mr-1"></i>
            Examenes realizados
          </div>
          <div className="card-body">
            <table className="table table-hover table-nowrap">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha</th>
                  <th>Edad</th>
                  <th>Estado</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {load ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : Object.keys(data.data).length ? (
                  data.data.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={
                          moment
                            .utc(new Date())
                            .isSame(moment.utc(row.created_at), "day")
                            ? "table-success"
                            : ""
                        }
                      >
                        <td>
                          <span className="badge badge-info">{row.id}</span>
                        </td>
                        <td>
                          {moment.utc(row.created_at).local().format("L")}
                          <br />
                          {moment(new Date()).isSame(row.created_at)}
                        </td>
                        <td>{row.edad}</td>
                        <td>
                          {row.estado ? (
                            <span className="badge badge-secondary">
                              Terminado
                            </span>
                          ) : (
                            <span className="badge badge-success">Activo</span>
                          )}
                        </td>
                        <td className="float-right">
                          <Link
                            className="btn btn-outline-info btn-sm"
                            to={"/consultorio/registro/" + row.id}
                            onClick={(e) => {
                              this.changePage("/consultorio/registro/");
                            }}
                            alt="Ver examen"
                          >
                            <i className="fas fa-share"></i>
                          </Link>
                          {row.estado ? (
                            <button
                              className="btn btn-outline-warning btn-sm ml-2"
                              alt="Crear pedido"
                              onClick={(e) => {
                                e.preventDefault();
                                this.handleNewOrder(row.id);
                              }}
                            >
                              <i className="fas fa-shopping-basket"></i>
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th colSpan="3" className="text-center">
                      Aun no tiene examenes
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-info float-right"
              onClick={this.handleNewExam}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      );
    }
  }

  handleChangeInput = (key, value) => {
    this.props.ChangeInput(key, value);
  };
  handleClickDeleteExam = (e) => {
    e.preventDefault();
    if (window.confirm("¿Realmente desea cambiar de examen?")) {
      this.props.ChangeInput("exam_id", 0);
      this.props.ChangeInput("exam", {});
    }
  };
  handleClickSelect = (exam) => {
    this.props.ChangeInput("exam_id", exam.id);
    this.props.ChangeInput("exam", exam);
  };
  handleNewOrder = (id) => {
    if (window.confirm("¿Desea agregar un pedido a este examen?")) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        body = {
          contact_id: this.props.id,
          exam_id: id,
          items: JSON.stringify([]),
        };
      //Crear o modificar examen
      console.log("Enviando datos del pedido a la API");
      fetch("http://" + varLocalStorage.host + "/api/orders", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Pedido almacenado");
            this.setState({
              load: true,
            });
            this.getExams();
          } else console.log(data.message);
        });
    }
  };
  handleNewExam = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm(
      "¿Desea agregar un nuevo examen a este paciente?"
    );
    if (conf) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        body = {
          contact_id: this.props.id,
          edad: this.props.edad,
        };
      //Crear o modificar examen
      console.log("Enviando datos del examen a la API");
      fetch("http://" + varLocalStorage.host + "/api/exams", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Examen almacenado");
            this.setState({
              load: true,
            });
            this.getExams();
          } else console.log(data.message);
        });
    }
  };
  changePage = (e) => {
    this.props.page(e);
  };
  getExams = () => {
    if (this.props.paciente) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        url = "http://" + varLocalStorage.host + "/api/exams",
        page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1",
        orderby = "&orderby=created_at&order=desc",
        paciente = "&paciente=" + this.props.paciente;

      //Realiza la peticion de examenes a la API
      console.log("Descargando examenes del contacto");
      fetch(url + page + paciente + orderby, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            this.setState({
              load: false,
            });
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Examenes almacenados");
          this.setState({
            data: !data.message ? data : [],
            load: false,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
