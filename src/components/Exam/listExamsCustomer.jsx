import React, { Component } from "react";
import moment from "moment";

export default class listExamsCustomer extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      exams: {
        data: [],
        meta: {},
      },
      addExam: false,
      load: true,
      page: 0,
      host: ls.host,
      token: ls.token,
    };
  }
  componentDidMount() {
    this.getExams();
  }
  componentDidUpdate(props, state) {
    if (
      state.exams &&
      state.exams.meta &&
      state.exams.meta.total !== this.state.exams.meta.total
    ) {
      this.getExams();
    }
  }

  render() {
    const { exams, load, addExam } = this.state;

    return (
      <div className="card bg-info">
        <div className="card-header">
          <h5>
            <i className="fas fa-notes-medical mr-2"></i> Examenes del paciente
          </h5>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table m-0">
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">Folio</th>
                <th scope="col">Registro</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : exams.meta && exams.meta.total ? (
                exams.data.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className={
                        moment(new Date()).isSame(moment(row.created_at), "day")
                          ? "table-active"
                          : ""
                      }
                    >
                      <td>
                        <div className="icheck-primary">
                          <input
                            type="checkbox"
                            name={"exam_" + row.id}
                            id={"exam_" + row.id}
                            onChange={(e) => this.handleClickSelect(row)}
                            disabled={row.estado ? false : true}
                          />
                          <label htmlFor={"exam_" + row.id}></label>
                        </div>
                      </td>
                      <th scope="row">
                        <span className="text">#{row.id}</span>
                      </th>
                      <td>
                        <i className="fas fa-clock mr-2"></i>
                        {moment(row.created_at).fromNow()}
                      </td>
                      <td>
                        {row.estado ? (
                          <span className="badge badge-success">
                            <i className="fas fa-check"></i> Terminado
                          </span>
                        ) : (
                          <span className="badge badge-secondary">
                            <i className="fas fa-hourglass"></i> Activo
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="5" className="text-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    Paciente sin examenes encontrados
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-right">
          <div className="btn-group">
            <button className="btn btn-default btn-sm" onClick={this.getExams}>
              <i className="fas fa-sync mr-1"></i> Recargar
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={(e) => this.props.ChangeInput("exam", { id: 0 })}
            >
              <i className="fas fa-file-excel mr-1"></i> Sin examen
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={this.handleNewExam}
              disabled={addExam}
            >
              <i className="fas fa-file-alt mr-1"></i> Nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleClickSelect = (exam) => {
    const { ChangeInput } = this.props;
    console.log("[listExamsCustomer] Selecionado examen: ");
    ChangeInput("exam", exam);
  };
  handleNewExam = (e) => {
    e.preventDefault();

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Consultorio",
      text: "¿Esta seguro de crear un nuevo examen?",
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
              edad: parseInt(edad),
            };
          //Crear examen
          console.log("[listExamsCustomer] Enviando datos del examen a la API");
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
              console.error("[listExamsCustomer] Orus fetch: ", e);
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
          console.log("[listExamsCustomer] Examen almacenado con exito");
          localStorage.setItem("OrusContactNew", JSON.stringify({}));
          window.Swal.fire({
            icon: "success",
            title: "Examen creado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.getExams();
          });
        } else {
          window.Swal.fire("Error", "al almacenar el examen", "error");
          console.error("[Orus res] ", data.message);
        }
      }
    });
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
      console.log("[listExamsCustomer] Descargando examenes del paciente");
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
          if (data.data) {
            let addExam = false;
            console.log(
              "[listExamsCustomer] Examenes descargados con exito",
              data.meta.total
            );
            for (let index = 0; index < data.data.length; index++) {
              const row = data.data[index];
              if (moment(new Date()).isSame(moment(row.created_at), "day")) {
                addExam = true;
              }
            }
            this.setState({
              exams: data,
              load: false,
              addExam,
            });
          }
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
