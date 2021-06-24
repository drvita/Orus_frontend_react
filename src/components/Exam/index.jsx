import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Inbox from "../../layouts/list_inbox";
import CardMenu from "../../layouts/card_menu";
import { examActions } from "../../redux/exam/";

class IndexExamComponent extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      exams: {
        data: [],
        meta: {},
      },
      newOrEdit: false,
      load: false,
      options: {
        page: 1,
        orderby: "created_at",
        order: "desc",
        search: "",
        status: "",
        itemsPage: 10,
        date: "",
      },
      examSelected: "",
      host: ls.host,
      token: ls.token,
    };
  }
  componentDidMount() {
    this.getExams();
  }
  componentDidUpdate(props, state) {
    const { load } = this.state,
      { messages: MSGS } = this.props;

    if (state.load !== load && load === true) {
      console.log("[Orus System] Recargando examenes");
      this.getExams();
    }

    if (props.messages.length !== MSGS.length && MSGS.length) {
      MSGS.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
    }
  }

  handleSetSelectOptions = (e) => {
    const { name, value } = e.target,
      { options } = this.state;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);

    //console.log("[DEBUG] manejando filtros", name, value, val);
    this.setState({
      options: {
        ...options,
        [name]: val,
      },
      load: true,
    });
  };
  handleSearch = () => {
    console.log("search");
  };
  handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      this.setState({
        examSelected: parseInt(value),
      });
    } else {
      this.setState({
        examSelected: "",
      });
    }
  };
  handleSearch = (search) => {
    const { options } = this.state;

    this.setState({
      options: {
        ...options,
        search,
      },
      load: true,
    });
  };
  handleChangePage = (page) => {
    const { options } = this.state;
    console.log("Cambio de pagina", page);
    this.setState({
      options: {
        ...options,
        page,
      },
      load: true,
    });
  };
  handleSync = () => {
    this.getExams();
  };

  render() {
    const { meta, loading, exams } = this.props;
    const { newOrEdit, options, examSelected } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <button
            className="btn bg-info btn-block mb-3"
            type="button"
            disabled={newOrEdit}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo examen
          </button>
          {!newOrEdit ? (
            <CardMenu title="Filtros">
              <li className="nav-item p-2">
                <select
                  className="form-control "
                  name="orderby"
                  value={options.orderby}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="">-- Seleccione orden --</option>
                  <option value="created_at">Fecha de registro</option>
                  <option value="updated_at">Fecha de modificacion</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <select
                  className="form-control "
                  name="order"
                  value={options.order}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="asc">Ultimos</option>
                  <option value="desc">Primeros</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <select
                  className="form-control "
                  name="itemsPage"
                  value={options.itemsPage}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="10">-- ver 10 --</option>
                  <option value="20">-- ver 20 --</option>
                  <option value="50">-- ver 50 --</option>
                  <option value="100">-- ver 100 --</option>
                </select>
              </li>
            </CardMenu>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-9">
          {newOrEdit ? (
            <span>Ediar examenes o crear</span>
          ) : (
            <Inbox
              title="Lista de examenes"
              icon="notes-medical"
              color="info"
              loading={loading}
              meta={meta}
              itemSelected={examSelected}
              handlePagination={this.handleChangePage}
              handleSearch={this.handleSearch}
              handleDeleteItem={this.handleDelete}
              //handleEditItem={this.handleEditItem}
              handleSync={this.handleSync}
            >
              <table className="table table-hover table-striped">
                <tbody>
                  {exams.length ? (
                    <>
                      {exams.map((exam) => {
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
                            <td className="icheck-primary pl-2">
                              <input
                                type="checkbox"
                                className="form-check-input mt-4"
                                value={exam.id}
                                id={"exam_" + exam.id}
                                checked={
                                  examSelected === exam.id ? true : false
                                }
                                onChange={this.handleChangeCheckbox}
                              />
                              <label
                                htmlFor={"exam_" + exam.id}
                                className="sr-only"
                              ></label>
                            </td>
                            <td>
                              <Link
                                to={"/consultorio/registro/" + exam.id}
                                onClick={(e) => {
                                  //e.preventDefault();
                                  console.log(
                                    "[Exams] Almacenando datos de paciente en local storage"
                                  );
                                  localStorage.setItem(
                                    "OrusContactInUse",
                                    JSON.stringify({
                                      id: exam.paciente.id,
                                      nombre: exam.paciente.nombre,
                                    })
                                  );
                                  return true;
                                }}
                              >
                                <span className="badge badge-danger text-capitalize p-1">
                                  {exam.paciente.nombre}
                                  <i className="fas fa-pencil-alt ml-1"></i>
                                </span>
                              </Link>
                            </td>
                            <td className="text-uppercase">
                              {exam.estado ? (
                                <span className="text-secondary">
                                  Terminado
                                </span>
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
                              {exam.adicion_media_od}/{exam.adicion_media_oi}
                            </td>
                            <td>
                              {exam.dpod}/{exam.dpoi}
                            </td>
                            <td>
                              {exam.alturaod}/{exam.alturaoi}
                            </td>
                            <td>
                              {moment(exam.created_at, "YYYY-MM-DD").fromNow()}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <th className="text-center text-muted">
                        No hay examenes registrados
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </Inbox>
          )}
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
  /*
  handleChangePage = (id) => {
    this.setState({
      page: id,
      load: true,
    });
  };
  */
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
    const { _getListExams } = this.props,
      { options } = this.state;

    _getListExams({
      options,
    });

    this.setState({
      load: false,
    });
  }
}

const mapStateToProps = ({ exam }) => {
    return {
      exams: exam.list,
      messages: exam.messages,
      meta: exam.metaList,
      loading: exam.loading,
    };
  },
  mapActionsToProps = {
    _getListExams: examActions.getListExam,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexExamComponent);
