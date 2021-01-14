import React, { Component } from "react";
import { Link } from "react-router-dom";
import Graduacion from "../Exam/graduacionExam";
import Recomendaciones from "../Exam/recomendaciones";
import moment from "moment";

export default class ListsExams extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      id: 0,
      data: {
        data: [],
        meta: {},
      },
      exam: {},
      examEdit: false,
      load: true,
      page: 0,
      host: ls.host,
      token: ls.token,
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
    const { data, load, id, exam, examEdit } = this.state,
      { select, datos } = this.props;

    if (select) {
      return (
        <React.Fragment>
          {id ? (
            <React.Fragment>
              <div className="row d-print-none mb-4">
                <div className="col-2">
                  <div className="border border-info rounded p-2 d-flex justify-content-between align-items-center">
                    <span className="badge badge-pill badge-info mx-2">
                      Folio
                    </span>
                    <strong>{id}</strong>
                  </div>
                </div>
                <div className="col">
                  <div className="border border-info rounded p-2 d-flex justify-content-between align-items-center">
                    <span className="badge badge-pill badge-info mx-2">
                      Estado
                    </span>
                    <strong>
                      {exam.estado ? "Terminado" : "En proceso..."}
                    </strong>
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
                <div className="col-2 d-print-none text-right">
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
                esferaod={exam.esferaod ? exam.esferaod : 0}
                esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                ejeod={exam.ejeod ? exam.ejeod : 0}
                ejeoi={exam.ejeoi ? exam.ejeoi : 0}
                adiciond={exam.adiciond ? exam.adiciond : 0}
                adicioni={exam.adicioni ? exam.adicioni : 0}
                dpod={exam.dpod ? exam.dpod : 0}
                dpoi={exam.dpoi ? exam.dpoi : 0}
                alturaod={exam.alturaod ? exam.alturaod : 0}
                alturaoi={exam.alturaoi ? exam.alturaoi : 0}
                lcmarca={exam.lcmarca ? exam.lcmarca : 0}
                lcgod={exam.lcgod ? exam.lcgod : 0}
                lcgoi={exam.lcgoi ? exam.lcgoi : 0}
                readOnly={!examEdit}
                onChangeInput={this.handleDataExam}
              />

              <div className="row d-print-none">
                <div className="col p-2">
                  <div className="card">
                    <div className="card-body">
                      <label className="card-title text-success">
                        Observaciones
                      </label>
                      <p className="card-text text-muted text-uppercase">
                        {exam.observaciones ? exam.observaciones : "--"}
                      </p>
                    </div>
                  </div>
                </div>
                {exam.category_id ? (
                  <React.Fragment>
                    <div className="col p-2">
                      <Recomendaciones
                        category_id={exam.category_id}
                        title="Recomendacion principal"
                        esferaod={exam.esferaod ? exam.esferaod : 0}
                        esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                        cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                        cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                        data={datos}
                        onChangeInput={this.handleChangeInput}
                      />
                    </div>
                    {exam.category_ii ? (
                      <div className="col p-2">
                        <Recomendaciones
                          category_id={exam.category_ii}
                          title="Recomendacion adicional"
                          esferaod={exam.esferaod ? exam.esferaod : 0}
                          esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                          cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                          cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                          data={datos}
                          onChangeInput={this.handleChangeInput}
                        />
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </div>

              <div className="row d-print-none">
                <div className="col text-right pt-2">
                  <button
                    className={examEdit ? "btn btn-dark" : "btn btn-info"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (examEdit) {
                        this.handleSaveExam(exam);
                      }
                      this.setState({
                        examEdit: !examEdit,
                      });
                    }}
                  >
                    {examEdit ? (
                      <React.Fragment>
                        <i className="fas fa-save mr-2"></i> Guardar
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className="fas fa-pencil-alt mr-2"></i> Editar
                      </React.Fragment>
                    )}
                  </button>
                </div>
              </div>
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

  handleSaveExam = (data) => {
    const { id } = data,
      { paciente, edad } = this.props;
    delete data.id;
    data.contact_id = paciente;
    data.edad = edad;

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de actualizar el examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let { host, token } = this.state;

          //Actualiza el examen según el ID
          console.log("Enviando datos a API para almacenar");
          return fetch("http://" + host + "/api/exams/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
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
        let data = result.value;

        if (data.data) {
          console.log("Examen almacenada");
          window.Swal.fire({
            icon: "success",
            title: "Examen actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          window.Swal.fire("Error", "al almacenar el pedido", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  handleDataExam = (key, value) => {
    let { exam } = this.state;
    exam[key] = value;
    this.setState({
      exam,
    });
  };
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
          let { host, token } = this.state,
            { paciente } = this.props,
            body = {
              contact_id: paciente,
              exam_id: id,
              items: JSON.stringify([]),
            };
          //Crear o modificar examen
          console.log("Enviando datos del pedido a la API");
          return fetch("http://" + host + "/api/orders", {
            method: "POST",
            body: JSON.stringify(body),
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
          let { host, token } = this.state,
            { paciente, edad } = this.props,
            body = {
              contact_id: paciente,
              edad,
            };
          //Crear examen
          console.log("Enviando datos del examen a la API");
          return fetch("http://" + host + "/api/exams", {
            method: "POST",
            body: JSON.stringify(body),
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

          window.Swal.fire({
            icon: "success",
            title: "Examen creado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.getExams();
            this.props.ChangeInput("exam_id", data.data.id);
            this.props.ChangeInput("exam", data.data);
          });
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
    const { load, host, token } = this.state;
    const { paciente } = this.props;

    if (paciente) {
      //Variables en localStorage
      const url = "http://" + host + "/api/exams",
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
          Authorization: "Bearer " + token,
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
