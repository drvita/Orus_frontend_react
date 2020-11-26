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
    if (this.props.exam && !this.props.exam.id) {
      this.getExams();
    } else {
      this.setState({
        id: this.props.exam.id,
        exam: this.props.exam,
        load: false,
      });
    }
  }
  componentDidUpdate(props, state) {
    if (
      this.props.exam &&
      !this.props.exam.id &&
      this.props.exam.id !== props.exam.id
    ) {
      this.getExams();
    }
    if (this.props.exam && this.props.exam.id !== props.exam.id) {
      this.setState({
        id: this.props.exam.id,
        exam: this.props.exam,
      });
    }
  }

  render() {
    const { data, load, id, exam } = this.state,
      { select, datos } = this.props;

    if (select) {
      return (
        <React.Fragment>
          {id ? (
            <React.Fragment>
              <div className="row mb-4">
                <div className="col-2">
                  <div className="border border-info rounded p-2 d-flex justify-content-between align-items-center">
                    <span className="badge badge-pill badge-info mx-2">
                      Folio
                    </span>
                    <strong>{id}</strong>
                  </div>
                </div>
                <div className="col-3">
                  <div className="border border-info rounded p-2 d-flex justify-content-between align-items-center">
                    <span className="badge badge-pill badge-info mx-2">
                      Estado
                    </span>
                    <strong>{exam.estado}</strong>
                  </div>
                </div>
                <div className="col">
                  <div className="border border-info rounded p-2 d-flex justify-content-between align-items-center">
                    <span className="badge badge-pill badge-info mx-2">
                      Fecha
                    </span>
                    <strong>
                      {moment.utc(exam.created_at).local().format("LL")}
                    </strong>
                  </div>
                </div>
                <div className="col-2 text-right">
                  <button
                    className={
                      this.props.status
                        ? "btn btn-info disabled"
                        : "btn btn-info"
                    }
                    disabled={this.props.status ? true : false}
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
                <div className="row">
                  <div className="col">
                    <Recomendaciones
                      category_id={exam.category_id}
                      title="Recomendacion principal"
                      data={datos}
                      onChangeInput={this.handleChangeInput}
                    />
                  </div>
                  <div className="col">
                    <Recomendaciones
                      category_id={exam.category_ii}
                      title="Recomendacion adicional"
                      data={datos}
                      onChangeInput={this.handleChangeInput}
                    />
                  </div>
                </div>
              ) : null}
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
                    <td colSpan="5" className="text-center">
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
                    <th colSpan="5" className="text-center">
                      Aun no tiene examenes
                      <button
                        className="btn btn-outline-info btn-sm ml-4"
                        onClick={this.handleNewExam}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </React.Fragment>
      );
    } else {
      let examToday = false,
        newExam = false;
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
                  <th className="text-center">Acciones</th>
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
                    examToday = moment(new Date()).isSame(
                      moment(row.created_at),
                      "day"
                    );
                    newExam = newExam ? true : examToday;
                    console.log("Hoy: ", examToday, newExam);
                    return (
                      <tr
                        key={row.id}
                        className={examToday ? "table-success" : ""}
                      >
                        <td>
                          <span className="badge badge-info">{row.id}</span>
                        </td>
                        <td>{moment(row.created_at).format("L")}</td>
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
                        <td className="text-right">
                          <Link
                            className="btn btn-outline-info btn-sm"
                            to={"/consultorio/registro/" + row.id}
                            onClick={(e) => {
                              this.changePage("/consultorio/registro/");
                            }}
                            alt="Ver examen"
                          >
                            <i className="fas fa-share"></i> Ver examen
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th colSpan="5" className="text-center">
                      Aun no tiene examenes
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            {!newExam ? (
              <button
                type="button"
                className="btn btn-info float-right"
                onClick={this.handleNewExam}
              >
                <i className="fas fa-plus"></i>
              </button>
            ) : null}
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
    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear una nueva orden?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          //Variables en localStorage
          let ls = JSON.parse(localStorage.getItem("OrusSystem")),
            { paciente } = this.props,
            body = {
              contact_id: paciente,
              exam_id: id,
              items: JSON.stringify([]),
            };
          //Crear o modificar examen
          console.log("Enviando datos del pedido a la API");
          return fetch("http://" + ls.host + "/api/orders", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + ls.token,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((e) => {
              console.error("Orus fetch: ", e);
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
        let data = result.value;
        if (data.data) {
          console.log("Orden almacenada");
          localStorage.setItem("OrusContactNew", JSON.stringify({}));
          window.Swal.fire(
            "Orden creada con exito",
            "",
            "success"
          ).then((res) => this.getExams());
        } else {
          window.Swal.fire("Error", "al almacenar la orden", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  handleNewExam = (e) => {
    e.preventDefault();

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear un nueva examen?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          //Variables en localStorage
          let ls = JSON.parse(localStorage.getItem("OrusSystem")),
            { paciente, edad } = this.props,
            body = {
              contact_id: paciente,
              edad,
            };
          //Crear examen
          console.log("Enviando datos del examen a la API");
          return fetch("http://" + ls.host + "/api/exams", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + ls.token,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((e) => {
              console.error("Orus fetch: ", e);
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
        let data = result.value;
        if (data.data) {
          console.log("Examen almacenado");
          localStorage.setItem("OrusContactNew", JSON.stringify({}));
          window.Swal.fire(
            "Examen creado con exito",
            "",
            "success"
          ).then((res) => this.getExams());
        } else {
          window.Swal.fire("Error", "al almacenar el examen", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  changePage = (e) => {
    this.props.page(e);
  };
  getExams = () => {
    const { load } = this.state;
    const { paciente } = this.props;

    if (paciente) {
      //Variables en localStorage
      let ls = JSON.parse(localStorage.getItem("OrusSystem")),
        url = "http://" + ls.host + "/api/exams",
        page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1",
        orderby = "&orderby=created_at&order=desc",
        client = "&paciente=" + paciente;

      //Mandamos señal de carga si no lo he hecho
      if (!load) {
        this.setState({
          load: true,
        });
      }

      //Realiza la peticion de examenes a la API
      console.log("Descargando examenes del contacto");
      fetch(url + page + client + orderby, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + ls.token,
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
