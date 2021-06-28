import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Inbox from "../../layouts/list_inbox";
import CardMenu from "../../layouts/card_menu";
import { examActions } from "../../redux/exam/";
import { contactActions } from "../../redux/contact";
import AddOrNew from "./add";

class IndexExamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      exam: {},
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

  render() {
    const { meta, loading, exams } = this.props,
      { newOrEdit, options, examSelected, exam } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-info btn-block mb-3"
            type="button"
            disabled={newOrEdit}
            onClick={(e) => {
              const { _setListContact } = this.props;

              this.setState({
                newOrEdit: true,
              });
              _setListContact({
                result: {
                  list: [],
                  metaList: {},
                },
              });
              this.props.history.push(`/consultorio/new`);
            }}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo examen
          </button>
          {!newOrEdit ? (
            <CardMenu title="Filtros">
              <li className="nav-item p-2">
                <label htmlFor="orderby">Ordenar por</label>
                <select
                  className="form-control "
                  name="orderby"
                  id="orderby"
                  value={options.orderby}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="created_at">Fecha de registro</option>
                  <option value="updated_at">Fecha de modificacion</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="date">Fecha</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={
                    options.date
                      ? moment(options.date).format("YYYY-MM-DD")
                      : ""
                  }
                  className="form-control"
                  onChange={this.handleSetSelectOptions}
                />
                <button
                  type="button"
                  className="btn btn-info btn-block text-bold"
                  onClick={(e) => {
                    const { options } = this.state;

                    this.setState({
                      options: {
                        ...options,
                        date: "",
                      },
                      load: true,
                    });
                  }}
                >
                  <i className="fas fa-trash mr-1"></i>
                  Borrar
                </button>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="order">Mostrar por</label>
                <select
                  className="form-control "
                  name="order"
                  id="order"
                  value={options.order}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="asc">Antiguos</option>
                  <option value="desc">Recientes</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="itemsPage">Numero de examenes</label>
                <select
                  className="form-control "
                  name="itemsPage"
                  id="itemsPage"
                  value={options.itemsPage}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="10">ver 10</option>
                  <option value="20">ver 20</option>
                  <option value="50">ver 50</option>
                  <option value="100">ver 100</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="status">Estado</label>
                <select
                  className="form-control "
                  name="status"
                  id="status"
                  value={options.status}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="">-- Todos --</option>
                  <option value="1">Solo terminados</option>
                  <option value="0">En proceso</option>
                </select>
              </li>
            </CardMenu>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-10">
          {newOrEdit ? (
            <AddOrNew exam={exam} handleClose={this.handleCloseEdit} />
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
              handleEditItem={this.handleEditItem}
              handleSync={this.handleSync}
            >
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>ESF</th>
                    <th>CIL</th>
                    <th>EJE</th>
                    <th>ADC</th>
                    <th>MED</th>
                    <th>DP</th>
                    <th>ALT</th>
                    <th>Realizado</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.length ? (
                    <>
                      {exams.map((exam) => {
                        return (
                          <tr key={exam.id}>
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
                                disabled={exam.estado}
                              />
                              <label
                                htmlFor={"exam_" + exam.id}
                                className="sr-only"
                              ></label>
                            </td>
                            <td className="mailbox-name text-capitalize text-truncate">
                              <a
                                href="#edit"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.handleEditItem(exam.id);
                                }}
                              >
                                <span
                                  className={
                                    exam.estado
                                      ? "text-muted"
                                      : "text-dark text-bold"
                                  }
                                >
                                  <i className="fas fa-user text-sm mr-2"></i>
                                  {exam.paciente.nombre}
                                </span>
                              </a>
                            </td>
                            <td
                              className="text-center"
                              style={{ cursor: "pointer" }}
                            >
                              {exam.estado ? (
                                <i
                                  className="fas fa-clipboard-check text-muted"
                                  title="Terminado"
                                ></i>
                              ) : (
                                <i
                                  className="fas fa-clipboard text-info"
                                  title="En proceso"
                                ></i>
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
                            <td>{moment(exam.created_at).fromNow()}</td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <th className="text-center text-muted" colSpan="12">
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

  handleCloseEdit = () => {
    this.setState({
      newOrEdit: false,
      exam: {},
      examSelected: "",
      load: true,
    });
    this.props.history.push(`/consultorio`);
  };
  handleEditItem = (item = null) => {
    const { examSelected } = this.state,
      { exams } = this.props,
      id = item ?? examSelected,
      exam = exams.filter((e) => e.id === id);

    if (exam.length) {
      console.log("[Orus System] Editar usuario", id);
      this.setState({
        exam: exam[0],
        newOrEdit: true,
        examSelected: id,
      });
      this.props.history.push(`/consultorio/${id}`);
    } else {
      this.setState({
        newOrEdit: false,
        exam: {},
        examSelected: "",
        load: true,
      });
      this.props.history.push(`/consultorio`);
    }
  };
  handleSetSelectOptions = (e) => {
    const { name, value } = e.target,
      { options } = this.state;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);
    if (name === "date") val = value ? value : "";

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
  handleDelete = (id, item) => {
    const { examSelected, options } = this.state,
      { _deleteExam } = this.props;

    if (!examSelected) {
      window.Swal.fire({
        title: "Verificacion",
        text: "Debe de selecionar al menos un contacto para eliminar",
        icon: "warning",
      });
      return false;
    }

    //Confirmación de eliminacion
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (dismiss !== "cancel") {
        console.log("[Orus System] Enviando datos para eliminar", examSelected);
        _deleteExam({
          id: examSelected,
          options,
        });
      }
      this.setState({
        examSelected: "",
      });
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
    _deleteExam: examActions.deleteExam,
    _setListContact: contactActions.setListContact,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexExamComponent);
