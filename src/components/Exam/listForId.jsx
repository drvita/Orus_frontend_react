import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class ListForId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        data: [],
        meta: {},
      },
      load: true,
      page: 0,
    };
  }
  componentDidMount() {
    this.getExams();
  }
  render() {
    let { data, load } = this.state;
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
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(data.data).length ? (
                data.data.map((exam) => {
                  return (
                    <tr
                      key={exam.id}
                      className={
                        moment
                          .utc(new Date())
                          .isSame(moment.utc(exam.created_at), "day")
                          ? "table-success"
                          : ""
                      }
                    >
                      <td>
                        {moment.utc(exam.created_at).local().format("L LT")}
                        <br />
                        {moment(new Date()).isSame(exam.created_at)}
                      </td>
                      <td>{exam.edad}</td>
                      <td>
                        {exam.estado ? (
                          <span className="badge badge-secondary">
                            Terminado
                          </span>
                        ) : (
                          <span className="badge badge-success">Activo</span>
                        )}
                      </td>
                      <td className="float-right">
                        <Link
                          className="btn btn-outline-secondary btn-sm"
                          to={"/consultorio/registro/" + exam.id}
                          onClick={(e) => {
                            this.changePage("/consultorio/registro/");
                          }}
                        >
                          <i className="fas fa-share"></i>
                        </Link>
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
            className="btn btn-secondary float-right"
            onClick={this.handleNewExam}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }

  handleNewExam = (e) => {
    e.preventDefault();
    console.log("Click a button");
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
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  changePage = (e) => {
    this.props.page(e);
  };
  getExams = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/exams",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1",
      orderby = "&orderby=created_at&order=desc",
      id = "&id=" + this.props.id;

    //Realiza la peticion de examenes a la API
    console.log("Descargando examenes del contacto");
    fetch(url + page + id + orderby, {
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
        console.log("Examenes descargados");
        if (!data.message) {
          this.setState({
            data,
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
  };
}
