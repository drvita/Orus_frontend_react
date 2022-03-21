import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
//Componentes
import Generales from "./views/generalesExam";
import Interrogatorios from "./views/interrogatoriosExam";
import KeraRet from "./views/keraRetExam";
import Diabetes from "./views/diabetesExam";
import Agudeza from "./views/agudezaExam";
import Diagnostico from "./views/diagnosticoExam";
import Graduacion from "./views/graduacionExam";
import Observaciones from "./views/observacionesExam";
import Recomendaciones from "./views/recomendaciones";
import ShowContact from "../Contacts/views/showContactInLine";
import PrintExam from "./views/print_exam";
//logic
import action from "./helpers";
import { examActions } from "../../redux/exam/";
import { contactActions } from "../../redux/contact";

class ExamAddComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: { id: 0, edad: 20 },
      panel: 0,
      used: {
        generales: false,
        interrogatorios: false,
        keraRet: false,
        diabetes: false,
        agudeza: false,
        diagnostico: false,
        graduacion: false,
        observaciones: false,
        recomendaciones: false,
      },
    };
  }

  componentDidMount() {
    this.getExam();
  }

  componentDidUpdate(props) {
    const { contact } = this.props,
      { exam } = this.state;

    if (props.contact.id !== contact.id && !exam.id) {
      this.setState({
        exam: {
          ...exam,
          edad: contact.edad,
        },
      });
    }
  }

  render() {
    const { exam, panel, used } = this.state,
      { contact: paciente, handleClose: _handleClose } = this.props;

    return (
      <>
        <div className="card card-info card-outline d-print-none">
          <div className="card-header">
            <h3 className="card-title text-info">
              <i className="fas fa-notes-medical mr-1"></i>
              {exam.id ? (
                <label>
                  Examen <span className="badge badge-info">#{exam.id}</span>
                </label>
              ) : (
                "Nuevo examen"
              )}
            </h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <ShowContact
                readOnly={exam.id ? true : false}
                title="paciente"
                legend="Busque el paciente por nombre para crear un nuevo examen"
                left="6.5rem"
                edad={exam.edad}
                handleChangeContact={(paciente) => this.setState({ paciente })}
              />

              {paciente.id ? (
                <div className="row my-4">
                  <div className="col">
                    {exam.id ? (
                      <div className="custom-control custom-switch ">
                        <input
                          name="estado"
                          type="checkbox"
                          className="custom-control-input"
                          id="estado"
                          checked={exam.estado}
                          onChange={this.changeStatus}
                        />
                        <label
                          className={
                            exam.estado
                              ? "custom-control-label text-muted"
                              : "custom-control-label text-info"
                          }
                          htmlFor="estado"
                        >
                          <i
                            className={
                              exam.estado
                                ? "fas fa-folder mr-1"
                                : "fas fa-folder-open mr-1"
                            }
                          ></i>
                          {exam.estado
                            ? "Examen terminado"
                            : "Examen en proceso"}
                        </label>
                      </div>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>
                      <i className="fas fa-calendar mr-1"></i>
                      Creado:
                    </label>
                    <span className="ml-1">
                      {moment(exam.created_at).format("LL")}
                    </span>
                  </div>
                  {exam.edad !== paciente.edad ||
                  (!paciente.edad && !exam.id) ? (
                    <div className="col col-sm-12 input-group">
                      <label className="input-group-prepend mr-2">Edad</label>
                      <input
                        type="number"
                        className={
                          exam.edad
                            ? "form-control text-right mr-2"
                            : "form-control text-right mr-2 bg-info"
                        }
                        defaultValue={exam.edad}
                        placeholder="Escriba la edad actual"
                        onChange={(e) => {
                          const { value } = e.target,
                            val = parseInt(value);

                          if (val) {
                            this.handleChangeInput("edad", val);
                          }
                        }}
                        min="1"
                        max="120"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            {paciente.id ? (
              <div className="row">
                <div className="col-2">
                  <div className="nav flex-column nav-tabs">
                    <a
                      className={
                        !panel ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 0,
                        });
                      }}
                    >
                      <i
                        className={
                          used.generales
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Generales {used.generales ? "T" : "F"}
                    </a>

                    <a
                      className={
                        panel === 1 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 1,
                        });
                      }}
                    >
                      <i
                        className={
                          used.interrogatorios
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Interrogatorio
                    </a>

                    <a
                      className={
                        panel === 2 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 2,
                        });
                      }}
                    >
                      <i
                        className={
                          used.keraRet
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Keratometria
                    </a>

                    <a
                      className={
                        panel === 3 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 3,
                        });
                      }}
                    >
                      <i
                        className={
                          used.diabetes
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Diabetes
                    </a>

                    <a
                      className={
                        panel === 4 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 4,
                        });
                      }}
                    >
                      <i
                        className={
                          used.agudeza
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Agudeza
                    </a>

                    <a
                      className={
                        panel === 5 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 5,
                        });
                      }}
                    >
                      <i
                        className={
                          used.diagnostico
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Diagnostico
                    </a>

                    <a
                      className={
                        panel === 6 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 6,
                        });
                      }}
                    >
                      <i
                        className={
                          used.graduacion
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Graduación
                    </a>

                    <a
                      className={
                        panel === 7 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 7,
                        });
                      }}
                    >
                      <i
                        className={
                          used.observaciones
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Observaciones
                    </a>

                    <a
                      className={
                        panel === 8 ? "nav-link text-bold active" : "nav-link"
                      }
                      href="#general"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          panel: 8,
                        });
                      }}
                    >
                      <i
                        className={
                          used.recomendaciones
                            ? "fas fa-check-circle mr-1 text-success"
                            : "fas fa-circle mr-1"
                        }
                      ></i>
                      Recomendaciones
                    </a>
                  </div>
                </div>
                <div className="col-10">
                  {!panel ? (
                    <Generales
                      pc={exam.pc ?? ""}
                      tablet={exam.tablet ?? ""}
                      movil={exam.movil ?? ""}
                      lap={exam.lap ?? ""}
                      lap_time={exam.lap_time ?? ""}
                      pc_time={exam.pc_time ?? ""}
                      tablet_time={exam.tablet_time ?? ""}
                      movil_time={exam.movil_time ?? ""}
                      cefalea={exam.cefalea ?? ""}
                      c_frecuencia={exam.c_frecuencia ?? ""}
                      c_intensidad={exam.c_intensidad ?? ""}
                      frontal={exam.frontal ?? ""}
                      temporal={exam.temporal ?? ""}
                      occipital={exam.occipital ?? ""}
                      generality={exam.generality ?? ""}
                      temporaoi={exam.temporaoi ?? ""}
                      temporaod={exam.temporaod ?? ""}
                      handleGetData={this.handleChangeInput}
                    />
                  ) : null}
                  {panel === 1 ? (
                    <Interrogatorios
                      interrogatorio={exam.interrogatorio ?? ""}
                      coa={exam.coa ?? ""}
                      aopp={exam.aopp ?? ""}
                      aopf={exam.aopf ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 2 ? (
                    <KeraRet
                      keratometriaoi={exam.keratometriaoi ?? ""}
                      keratometriaod={exam.keratometriaod ?? ""}
                      rsoi={exam.rsoi ?? ""}
                      rsod={exam.rsod ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 3 ? (
                    <Diabetes
                      d_time={exam.d_time ?? ""}
                      d_media={exam.d_media ?? ""}
                      d_test={exam.d_test ?? ""}
                      d_fclod={exam.d_fclod ?? ""}
                      d_fclod_time={exam.d_fclod_time ?? ""}
                      d_fcloi={exam.d_fcloi ?? ""}
                      d_fcloi_time={exam.d_fcloi_time ?? ""}
                      oftalmoscopia={exam.oftalmoscopia ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 4 ? (
                    <Agudeza
                      cvod={exam.cvod ?? ""}
                      cvoi={exam.cvoi ?? ""}
                      avslod={exam.avslod ?? ""}
                      avsloi={exam.avsloi ?? ""}
                      avcgaod={exam.avcgaod ?? ""}
                      avcgaoi={exam.avcgaoi ?? ""}
                      avfod={exam.avfod ?? ""}
                      avfoi={exam.avfoi ?? ""}
                      avf2o={exam.avf2o ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 5 ? (
                    <Diagnostico
                      diagnostico={exam.diagnostico ?? ""}
                      presbicie={exam.presbicie ?? ""}
                      piod={exam.piod ?? ""}
                      pioi={exam.pioi ?? ""}
                      txoftalmico={exam.txoftalmico ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 6 ? (
                    <Graduacion
                      esferaod={exam.esferaod ?? 0}
                      esferaoi={exam.esferaoi ?? 0}
                      cilindrod={exam.cilindrod ?? 0}
                      cilindroi={exam.cilindroi ?? 0}
                      ejeod={exam.ejeod ?? 0}
                      ejeoi={exam.ejeoi ?? 0}
                      adiciond={exam.adiciond ?? 0}
                      adicioni={exam.adicioni ?? 0}
                      adicion_media_od={exam.adicion_media_od ?? 0}
                      adicion_media_oi={exam.adicion_media_oi ?? 0}
                      dpod={exam.dpod ?? 0}
                      dpoi={exam.dpoi ?? 0}
                      alturaod={exam.alturaod ?? 0}
                      alturaoi={exam.alturaoi ?? 0}
                      lcmarca={exam.lcmarca ?? 0}
                      lcgod={exam.lcgod ?? 0}
                      lcgoi={exam.lcgoi ?? 0}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 7 ? (
                    <Observaciones
                      observaciones={exam.observaciones ?? ""}
                      onChangeInput={this.handleChangeInput}
                    />
                  ) : null}

                  {panel === 8 ? (
                    <div className="row">
                      <div className="col">
                        <Recomendaciones
                          category_id={exam.category_id ?? null}
                          esferaod={exam.esferaod ?? ""}
                          esferaoi={exam.esferaoi ?? ""}
                          cilindrod={exam.cilindrod ?? ""}
                          cilindroi={exam.cilindroi ?? ""}
                          nameCategory="category_id"
                          nameItem="item1"
                          title="Recomendacion principal"
                          onChangeInput={this.handleChangeRecomendations}
                          update={true}
                        />
                      </div>
                      {exam.category_id ? (
                        <div className="col">
                          <Recomendaciones
                            category_id={exam.category_ii ?? null}
                            esferaod={exam.esferaod ?? ""}
                            esferaoi={exam.esferaoi ?? ""}
                            cilindrod={exam.cilindrod ?? ""}
                            cilindroi={exam.cilindroi ?? ""}
                            nameCategory="category_ii"
                            nameItem="item2"
                            title="Recomendacion adicional"
                            onChangeInput={this.handleChangeRecomendations}
                            update={true}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <div className="card-footer text-right">
            <div className="btn-group" role="group">
              <a
                href="#close"
                className="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  _handleClose();
                }}
              >
                <i
                  className={
                    exam.id ? "fas fa-arrow-left mr-2" : "fas fa-ban mr-2"
                  }
                ></i>
                <strong>{exam.id ? "Cancelar" : "Cerrar"}</strong>
              </a>
              {exam.id ? (
                <button
                  className="btn btn-default"
                  onClick={(e) => {
                    e.preventDefault();
                    window.print();
                  }}
                >
                  <i className="fas fa-print mr-2"></i>
                  Imprimir
                </button>
              ) : null}
              <button
                type="button"
                className={
                  paciente.id ? "btn btn-info" : "btn btn-info disabled"
                }
                onClick={this.handleSave}
                disabled={paciente.id ? false : true}
              >
                <i className="fas fa-save mr-1"></i>
                <strong>{exam.id ? "Actualizar" : "Guardar"}</strong>
              </button>
            </div>
          </div>
        </div>
        <PrintExam
          esferaod={exam.esferaod ?? ""}
          esferaoi={exam.esferaoi ?? ""}
          cilindrod={exam.cilindrod ?? ""}
          cilindroi={exam.cilindroi ?? ""}
          ejeod={exam.ejeod ?? ""}
          ejeoi={exam.ejeoi ?? ""}
          adiciond={exam.adiciond ?? ""}
          adicioni={exam.adicioni ?? ""}
          adicion_media_od={exam.adicion_media_od ?? ""}
          adicion_media_oi={exam.adicion_media_oi ?? ""}
          dpod={exam.dpod ?? ""}
          dpoi={exam.dpoi ?? ""}
          alturaod={exam.alturaod ?? ""}
          alturaoi={exam.alturaoi ?? ""}
          lcmarca={exam.lcmarca ?? ""}
          lcgod={exam.lcgod ?? ""}
          lcgoi={exam.lcgoi ?? ""}
          diagnostico={exam.diagnostico ?? ""}
          paciente={paciente ?? ""}
          presbicie={exam.presbicie ?? ""}
        />
      </>
    );
  }

  handleChangeRecomendations = (obj) => {
    const { exam, used } = this.state,
      key = Object.keys(obj);

    if (typeof obj === "object") {
      this.setState({
        exam: {
          ...exam,
          category_ii: key[0] === "category_id" ? null : exam.category_ii,
          ...obj,
        },
        used: {
          ...used,
          recomendaciones: true,
        },
      });
    }
  };
  changeStatus = (e) => {
    const { checked } = e.target;
    this.handleChangeInput("estado", checked);
  };
  handleChangeInput = (key, value) => {
    const { exam, used } = this.state,
      usedto = action.handleTypeInput(key);

    this.setState({
      exam: {
        ...exam,
        [key]: value,
      },
      used: usedto
        ? {
            ...used,
            [usedto]: true,
          }
        : used,
    });
  };
  handleStatus = () => {
    this.setState({
      status: !this.state.status,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    const {
        exam: { id, cilindrod, cilindroi, ejeod, ejeoi },
      } = this.state,
      {
        contact: paciente,
        options,
        handleClose: _handleClose,
        _saveExam,
      } = this.props;

    //Verificar si los datos son validos.
    if ((cilindrod < 0 && !ejeod) || (cilindroi < 0 && !ejeoi)) {
      window.Swal.fire(
        "Verificación",
        "El campo CILINDRO esta vacio",
        "warning"
      );
      return false;
    }

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar el examen?"
        : "¿Esta seguro de crear un nuevo examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        let { exam: body } = this.state;
        const anos = paciente.f_nacimiento
            ? moment().diff(paciente.f_nacimiento, "years")
            : 0,
          edad = anos < 1 || !anos ? 0 : anos;

        body.contact_id = paciente.id;
        body.edad = body.edad ? body.edad : edad;
        body.status = body.estado;
        delete body.estado;
        if (!body.category_id) body.category_id = null;
        if (!body.category_ii) body.category_ii = null;

        _saveExam({
          id,
          data: body,
          options,
        });
        _handleClose(true);
      }
    });
  };
  getExam = () => {
    const { exam, _setContact } = this.props;
    if (exam.id) {
      console.log("[Orus System] Procesando examen", exam.id);
      this.setState({
        exam: {
          ...exam,
          category_id: exam.category_primary ? exam.category_primary.id : null,
          category_ii: exam.category_secondary
            ? exam.category_secondary.id
            : null,
        },
        load: false,
        panel: 0,
        used: {
          generales: true,
          interrogatorios: true,
          keraRet: true,
          diabetes: true,
          agudeza: true,
          diagnostico: true,
          graduacion: true,
          observaciones: true,
          recomendaciones: true,
        },
      });
      _setContact(exam.paciente ?? { id: 0 });
    }
  };
}

const mapStateToProps = ({ exam, contact }) => {
    return {
      messages: exam.messages,
      contact: contact.contact,
    };
  },
  mapActionsToProps = {
    _deleteExam: examActions.deleteExam,
    _saveExam: examActions.saveExam,
    _setContact: contactActions.setContact,
  };

export default connect(mapStateToProps, mapActionsToProps)(ExamAddComponent);
