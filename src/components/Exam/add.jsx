import React, { Component } from "react";
import moment from "moment";
//import SearchContact from "../Contacts/searchContactCard";
import Recomendaciones from "./recomendaciones";
import Generales from "./generalesExam";
import Interrogatorios from "./interrogatoriosExam";
import KeraRet from "./keraRetExam";
import Diabetes from "./diabetesExam";
import Agudeza from "./agudezaExam";
import Diagnostico from "./diagnosticoExam";
import Graduacion from "./graduacionExam";
import Observaciones from "./observacionesExam";
//import Chat from "../Layouts/messenger";
//import SearchContact from "../Contacts/searchContactLine";
import ShowContact from "../Contacts/ShowContactInLine";
//import PrintExam from "./print_exam";

export default class ExamAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: { id: 0 },
      paciente: { id: 0 },
      panel: 0,
    };
  }

  componentDidMount() {
    this.getExam();
  }

  changeStatus = (e) => {
    const { checked } = e.target;
    //console.log("[DEBUG] Status change:", checked);
    this.handleChangeInput("estado", checked);
  };

  render() {
    const { exam, paciente, panel } = this.state,
      { handleClose: _handleClose } = this.props;
    //console.log("[DEBUG] Paciente", paciente);

    return (
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
              contact={paciente}
              readOnly={exam.id ? true : false}
              title="paciente"
              handleChangeContact={(paciente) => this.setState({ paciente })}
            />

            <div className="custom-control custom-switch mt-4">
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
                    exam.estado ? "fas fa-folder" : "fas fa-folder-open"
                  }
                ></i>
                {exam.estado ? "Examen terminado" : "Examen en proceso"}
              </label>
            </div>
          </div>

          {paciente.id ? (
            <div className="row">
              <div className="col-2">
                <div className="nav flex-column nav-tabs">
                  <a
                    className={!panel ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 0,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Generales
                  </a>

                  <a
                    className={panel === 1 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 1,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Interrogatorio
                  </a>

                  <a
                    className={panel === 2 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 2,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Keratometria
                  </a>

                  <a
                    className={panel === 3 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 3,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Diabetes
                  </a>

                  <a
                    className={panel === 4 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 4,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Agudeza
                  </a>

                  <a
                    className={panel === 5 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 5,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Diagnostico
                  </a>

                  <a
                    className={panel === 6 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 6,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Graduación
                  </a>

                  <a
                    className={panel === 7 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 7,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Observaciones
                  </a>

                  <a
                    className={panel === 8 ? "nav-link active" : "nav-link"}
                    href="#general"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        panel: 8,
                      });
                    }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
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
                        category_id={parseInt(exam.category_id ?? 0)}
                        esferaod={exam.esferaod ?? ""}
                        esferaoi={exam.esferaoi ?? ""}
                        cilindrod={exam.cilindrod ?? ""}
                        cilindroi={exam.cilindroi ?? ""}
                        nameCategory="category_id"
                        nameItem="item1"
                        title="Recomendacion principal"
                        onChangeInput={(obj) => {
                          if (typeof obj === "object") {
                            this.setState(obj);
                          }
                        }}
                        update={true}
                      />
                    </div>
                    {exam.category_id ? (
                      <div className="col">
                        <Recomendaciones
                          category_id={parseInt(exam.category_ii ?? 0)}
                          esferaod={exam.esferaod ?? ""}
                          esferaoi={exam.esferaoi ?? ""}
                          cilindrod={exam.cilindrod ?? ""}
                          cilindroi={exam.cilindroi ?? ""}
                          nameCategory="category_ii"
                          nameItem="item2"
                          title="Recomendacion adicional"
                          onChangeInput={(obj) => {
                            if (typeof obj === "object") {
                              this.setState(obj);
                            }
                          }}
                          update={true}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* 
            
            <PrintExam
              esferaod={esferaod}
              esferaoi={esferaoi}
              cilindrod={cilindrod}
              cilindroi={cilindroi}
              ejeod={ejeod}
              ejeoi={ejeoi}
              adiciond={adiciond}
              adicioni={adicioni}
              adicion_media_od={adicion_media_od}
              adicion_media_oi={adicion_media_oi}
              dpod={dpod}
              dpoi={dpoi}
              alturaod={alturaod}
              alturaoi={alturaoi}
              lcmarca={lcmarca}
              lcgod={lcgod}
              lcgoi={lcgoi}
              diagnostico={diagnostico}
              presbicie={presbicie}
            />
            
            */}
        </div>
        <div className="card-footer text-right">
          <div className="btn-group d-print-none" role="group">
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
              <strong>{exam.id ? "Cerrar" : "Cancelar"}</strong>
            </a>
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
            <button
              type="button"
              className={paciente.id ? "btn btn-info" : "btn btn-info disabled"}
              onClick={this.handleSave}
              disabled={paciente.id ? "" : "disabled"}
            >
              <i className="fas fa-save mr-1"></i>
              <strong>Guardar</strong>
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    const { exam } = this.state;

    this.setState({
      exam: {
        ...exam,
        [key]: value,
      },
    });
  };
  handleStatus = () => {
    this.setState({
      status: !this.state.status,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    const { cilindrod, cilindroi, ejeod, ejeoi, paciente, exam } = this.state,
      id = exam.id,
      { handleSave: _handleSave } = this.props;

    //Verificar si los datos son validos.
    if ((cilindrod < 0 && !ejeod) || (cilindroi < 0 && !ejeoi)) {
      window.Swal.fire("Verificación", "El campo CILINDRO esta vacio", "error");
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
        const edad = moment().diff(paciente.f_nacimiento, "years");

        body.contact_id = paciente.id;
        body.edad = edad < 1 || !edad ? 0 : edad;
        body.status = body.estado;
        delete body.estado;
        if (!body.category_id) delete body.category_id;
        if (!body.category_ii) delete body.category_ii;

        _handleSave(id, body);
      }
    });
  };
  getExam = () => {
    const { exam } = this.props;
    if (exam.id) {
      console.log("[Orus System] Procesando examen", exam.id);
      this.setState({
        exam: exam,
        paciente: exam.paciente ?? { id: 0 },
        load: false,
      });
    }
  };
}
