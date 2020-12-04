import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Header from "../Layouts/headerTable";
import Filter from "./index_filter";
import Pagination from "../Layouts/pagination";
import Actions from "../Layouts/actionsTable";

export default class Exam extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let sdd = JSON.parse(localStorage.getItem("OrusExam"));
    this.state = {
      exams: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd && sdd.orderby ? sdd.orderby : "created_at",
      order: sdd && sdd.order ? sdd.order : "desc",
      search: sdd && sdd.search ? sdd.search : "",
      status: sdd && sdd.status >= 0 ? sdd.status : "",
      date: sdd && sdd.date ? sdd.date : "",
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
    localStorage.setItem(
      "OrusExam",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
        status: this.state.status,
        date: this.state.date,
      })
    );
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando examenes");
      this.getExams();
      localStorage.setItem(
        "OrusExam",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
          status: this.state.status,
          date: this.state.date,
        })
      );
    }
  }

  render() {
    let { exams, load } = this.state,
      dataHeaders = [
        { name: "Paciente", type: "name", filter: true },
        { name: "Edad" },
        { name: "Estado" },
        { name: "Esfera" },
        { name: "Cilindro" },
        { name: "Eje" },
        { name: "Adicion" },
        { name: "D/P" },
        { name: "Altura" },
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
            <Link
              to="/consultorio/registro"
              className="btn btn-outline-dark"
              onClick={this.changePage}
            >
              <i className="fas fa-plus"></i>
            </Link>
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
                  <td colSpan="12" className="text-center">
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
                      <td>
                        {exam.esferaod}/{exam.esferaoi}
                      </td>
                      <td>
                        {exam.cilindrod}/{exam.cilindroi}
                      </td>
                      <td>
                        {exam.ejeod}/{exam.ejeoi}
                      </td>
                      <td>
                        {exam.adiciond}/{exam.adicioni}
                      </td>
                      <td>
                        {exam.dpod}/{exam.dpoi}
                      </td>
                      <td>
                        {exam.alturaod}/{exam.alturaoi}
                      </td>
                      <td>{moment(exam.created_at).fromNow()}</td>
                      <td>{moment(exam.updated_at).format("ll")}</td>
                      <Actions
                        id={exam.id}
                        item={exam.paciente.nombre}
                        delete={
                          exam.estado || exam.order_id
                            ? null
                            : this.handleDelete
                        }
                        edit={"/consultorio/registro/"}
                      />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="12" className="text-center">
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
            <i className="fas fa-plus mr-2"></i>
            Nuevo examen
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
  handleDelete = (id, item) => {
    //Confirmación de eliminacion
    window.Swal.fire({
      title: "Eliminar",
      text:
        "¿Esta seguro de eliminar el examen del paciente " +
        item.toUpperCase() +
        "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let { host, token } = this.state;

          //Inicio de proceso de eliminción por API
          return fetch("http://" + host + "/api/exams/" + id, {
            method: "DELETE",
            signal: this.signal,
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
              console.error(e);
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
        console.log("Examen eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Examen eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getExams());
      } else if (result && !result.dismiss) {
        console.log("Orus: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          console.log("Examenes descargados");
          this.setState({
            exams: data,
            load: false,
          });
        } else {
          console.error("Orus: ", data.message);
          window.Swal.fire("Error", "Al descargar examenes", "error");
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
        this.setState({
          load: false,
        });
      });
  }
}
