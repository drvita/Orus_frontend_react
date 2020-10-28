import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Header from "../Layouts/headerTable";
import Filter from "./index_filter";
import Pagination from "../Layouts/pagination";
import Actions from "../Layouts/actionsTable";

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
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
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
      dataHeaders = [
        { name: "Paciente", type: "name", filter: true },
        { name: "Edad" },
        { name: "Estado" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-info card-outline">
        <div className="card-header">
          <h3 className="card-title text-info">
            <i className="fas fa-notes-medical mr-2"></i>
            Examanes de la vista
          </h3>
          <div className="card-tools">
            <Filter
              search={this.state.search}
              status={this.state.status}
              date={this.state.date}
              changeFilters={this.onchangeSearch}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={exams.meta}
              handleChangePage={this.handleChangePage}
            />
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-bordered table-hover table-nowrap">
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
                        <Link to={"/consultorio/registro/" + exam.id}>
                          <span className="badge badge-danger text-capitalize p-1">
                            {exam.paciente.nombre}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td>{exam.edad ? exam.edad : "--"}</td>
                      <td className="text-uppercase">
                        {exam.estado ? (
                          <span className="text-secondary">Terminado</span>
                        ) : (
                          <span className="text-success">Activo</span>
                        )}
                      </td>
                      <td>{moment(exam.created_at).fromNow()}</td>
                      <td>{moment(exam.updated_at).format("LL")}</td>
                      <Actions
                        id={exam.id}
                        item={exam.paciente.nombre}
                        delete={exam.estado ? null : this.handleDelete}
                        edit={"/consultorio/registro/"}
                      />
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
        <div className="card-footer text-right">
          <Link
            to="/consultorio/registro"
            className="btn btn-outline-info"
            onClick={this.changePage}
            id="/consultorio/registro"
          >
            <i className="fas fa-plus" id="/consultorio/registro"></i>
            &nbsp; Nuevo examen
          </Link>
        </div>
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
    let conf = window.confirm(
        "¿Esta seguro de eliminar el examen del paciente " +
          item.toUpperCase() +
          "?"
      ),
      { host, token } = this.state;

    if (conf) {
      //Mandamos señal de eliminación
      this.setState({
        load: true,
      });
      //Inicio de proceso de eliminción por API
      fetch("http://" + host + "/api/exams/" + id, {
        method: "DELETE",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Hubo un error, intentelo mas tarde");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            console.log("Examen eliminado");
            this.getExams();
            window.alert("Examen eliminado con exito");
          } else {
            console.error("Error al eliminar el examen", data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          this.setState({
            load: false,
          });
        });
    }
  };
  getExams() {
    //Variables
    let {
        host,
        token,
        order,
        orderby,
        search,
        page,
        status,
        load,
        date,
      } = this.state,
      url = "http://" + host + "/api/exams",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search}` : "",
      pagina = page > 0 ? "?page=" + page : "?page=1",
      fecha = date === "" ? "" : "&date=" + date,
      estado = status === "" ? "" : "&status=" + status;

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }
    //Realiza la peticion de los contactos
    fetch(url + pagina + ordenar + estado + fecha + buscar, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
        if (!data.message) {
          console.log("Examenes descargados");
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
