/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import ShowContact from "../Contacts/views/ShowCard";
// import PrintExam from "./views/print_exam";
import useExam from "../../hooks/useExam";

export default function Add(props) {
  const [state, setState] = useState({
    ...getDataDefault(),
    loading: false,
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
  const { id } = props.match.params;
  const _exams = useExam();

  useEffect(() => {
    if (id) {
      _exams.getExam(id).then((res) => {
        setState({
          ...getDataDefault(res),
          loading: false,
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
      });
    }
  }, [id]);

  return (
    <>
      <div className="card card-info card-outline d-print-none">
        <div className="card-header">
          <h3 className="card-title text-info">
            <i className="fas fa-notes-medical mr-1"></i>
            {state.id ? (
              <label>
                Examen <span className="badge badge-info">#{state.id}</span>
              </label>
            ) : (
              "Nuevo examen"
            )}
          </h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <ShowContact
              readOnly={state.id ? true : false}
              title="paciente"
              legend="Busque el paciente por nombre para crear un nuevo examen"
              left="6.5rem"
              data={state.contact}
              handleContactSelect={(doc) => {
                setState({
                  ...state,
                  contact: doc,
                  contact_id: doc.id,
                });
              }}
            />

            {state.contact?.id ? (
              <div className="row my-4">
                <div className="col">
                  {state.id ? (
                    <div className="custom-control custom-switch ">
                      <input
                        name="estado"
                        type="checkbox"
                        className="custom-control-input"
                        id="estado"
                        checked={state.estado}
                        onChange={() => {}}
                      />
                      <label
                        className={
                          state.estado
                            ? "custom-control-label text-muted"
                            : "custom-control-label text-info"
                        }
                        htmlFor="estado"
                      >
                        <i
                          className={
                            state.estado
                              ? "fas fa-folder mr-1"
                              : "fas fa-folder-open mr-1"
                          }
                        ></i>
                        {state.estado
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
                    {moment(state.created_at).format("LL")}
                  </span>
                </div>
                {state.age !== state.contact?.edad ||
                (!state.contact?.edad && !state.id) ? (
                  <div className="col col-sm-12 input-group">
                    <label className="input-group-prepend mr-2">Edad</label>
                    <input
                      type="number"
                      className={
                        state.age
                          ? "form-control text-right mr-2"
                          : "form-control text-right mr-2 bg-info"
                      }
                      defaultValue={state.edad}
                      placeholder="Escriba la edad actual"
                      onChange={(e) => {}}
                      min="1"
                      max="120"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {state.contact?.id ? (
            <div className="row">
              <div className="col-2">
                <div className="nav flex-column nav-tabs">
                  <a
                    className={
                      !state.panel ? "nav-link text-bold active" : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.generales
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Generales {state.used?.generales ? "T" : "F"}
                  </a>

                  <a
                    className={
                      state.panel === 1
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.interrogatorios
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Interrogatorio
                  </a>

                  <a
                    className={
                      state.panel === 2
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.keraRet
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Keratometria
                  </a>

                  <a
                    className={
                      state.panel === 3
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.diabetes
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Diabetes
                  </a>

                  <a
                    className={
                      state.panel === 4
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.agudeza
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Agudeza
                  </a>

                  <a
                    className={
                      state.panel === 5
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.diagnostico
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Diagnostico
                  </a>

                  <a
                    className={
                      state.panel === 6
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.graduacion
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Graduación
                  </a>

                  <a
                    className={
                      state.panel === 7
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.observaciones
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Observaciones
                  </a>

                  <a
                    className={
                      state.panel === 8
                        ? "nav-link text-bold active"
                        : "nav-link"
                    }
                    href="#general"
                    onClick={(e) => {}}
                  >
                    <i
                      className={
                        state.used?.recomendaciones
                          ? "fas fa-check-circle mr-1 text-success"
                          : "fas fa-circle mr-1"
                      }
                    ></i>
                    Recomendaciones
                  </a>
                </div>
              </div>
              <div className="col-10">
                {!state.panel ? (
                  <Generales
                    pc={state.pc ?? ""}
                    tablet={state.tablet ?? ""}
                    movil={state.movil ?? ""}
                    lap={state.lap ?? ""}
                    lap_time={state.lap_time ?? ""}
                    pc_time={state.pc_time ?? ""}
                    tablet_time={state.tablet_time ?? ""}
                    movil_time={state.movil_time ?? ""}
                    cefalea={state.cefalea ?? ""}
                    c_frecuencia={state.c_frecuencia ?? ""}
                    c_intensidad={state.c_intensidad ?? ""}
                    frontal={state.frontal ?? ""}
                    temporal={state.temporal ?? ""}
                    occipital={state.occipital ?? ""}
                    generality={state.generality ?? ""}
                    temporaoi={state.temporaoi ?? ""}
                    temporaod={state.temporaod ?? ""}
                    handleGetData={() => {}}
                  />
                ) : null}
                {state.panel === 1 ? (
                  <Interrogatorios
                    interrogatorio={state.interrogatorio ?? ""}
                    coa={state.coa ?? ""}
                    aopp={state.aopp ?? ""}
                    aopf={state.aopf ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 2 ? (
                  <KeraRet
                    keratometriaoi={state.keratometriaoi ?? ""}
                    keratometriaod={state.keratometriaod ?? ""}
                    rsoi={state.rsoi ?? ""}
                    rsod={state.rsod ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 3 ? (
                  <Diabetes
                    d_time={state.d_time ?? ""}
                    d_media={state.d_media ?? ""}
                    d_test={state.d_test ?? ""}
                    d_fclod={state.d_fclod ?? ""}
                    d_fclod_time={state.d_fclod_time ?? ""}
                    d_fcloi={state.d_fcloi ?? ""}
                    d_fcloi_time={state.d_fcloi_time ?? ""}
                    oftalmoscopia={state.oftalmoscopia ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 4 ? (
                  <Agudeza
                    cvod={state.cvod ?? ""}
                    cvoi={state.cvoi ?? ""}
                    avslod={state.avslod ?? ""}
                    avsloi={state.avsloi ?? ""}
                    avcgaod={state.avcgaod ?? ""}
                    avcgaoi={state.avcgaoi ?? ""}
                    avfod={state.avfod ?? ""}
                    avfoi={state.avfoi ?? ""}
                    avf2o={state.avf2o ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 5 ? (
                  <Diagnostico
                    diagnostico={state.diagnostico ?? ""}
                    presbicie={state.presbicie ?? ""}
                    piod={state.piod ?? ""}
                    pioi={state.pioi ?? ""}
                    txoftalmico={state.txoftalmico ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 6 ? (
                  <Graduacion
                    esferaod={state.esferaod ?? 0}
                    esferaoi={state.esferaoi ?? 0}
                    cilindrod={state.cilindrod ?? 0}
                    cilindroi={state.cilindroi ?? 0}
                    ejeod={state.ejeod ?? 0}
                    ejeoi={state.ejeoi ?? 0}
                    adiciond={state.adiciond ?? 0}
                    adicioni={state.adicioni ?? 0}
                    adicion_media_od={state.adicion_media_od ?? 0}
                    adicion_media_oi={state.adicion_media_oi ?? 0}
                    dpod={state.dpod ?? 0}
                    dpoi={state.dpoi ?? 0}
                    alturaod={state.alturaod ?? 0}
                    alturaoi={state.alturaoi ?? 0}
                    lcmarca={state.lcmarca ?? 0}
                    lcgod={state.lcgod ?? 0}
                    lcgoi={state.lcgoi ?? 0}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 7 ? (
                  <Observaciones
                    observaciones={state.observaciones ?? ""}
                    onChangeInput={() => {}}
                  />
                ) : null}

                {state.panel === 8 ? (
                  <div className="row">
                    <div className="col">
                      <Recomendaciones
                        category_id={state.category_id ?? null}
                        esferaod={state.esferaod ?? ""}
                        esferaoi={state.esferaoi ?? ""}
                        cilindrod={state.cilindrod ?? ""}
                        cilindroi={state.cilindroi ?? ""}
                        nameCategory="category_id"
                        nameItem="item1"
                        title="Recomendacion principal"
                        onChangeInput={() => {}}
                        update={true}
                      />
                    </div>
                    {state.category_id ? (
                      <div className="col">
                        <Recomendaciones
                          category_id={state.category_ii ?? null}
                          esferaod={state.esferaod ?? ""}
                          esferaoi={state.esferaoi ?? ""}
                          cilindrod={state.cilindrod ?? ""}
                          cilindroi={state.cilindroi ?? ""}
                          nameCategory="category_ii"
                          nameItem="item2"
                          title="Recomendacion adicional"
                          onChangeInput={() => {}}
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
            <a href="#close" className="btn btn-default" onClick={(e) => {}}>
              <i
                className={
                  state.id ? "fas fa-arrow-left mr-2" : "fas fa-ban mr-2"
                }
              ></i>
              <strong>{state.id ? "Cancelar" : "Cerrar"}</strong>
            </a>
            {state.id ? (
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
                state.contact?.id ? "btn btn-info" : "btn btn-info disabled"
              }
              onClick={() => {}}
              disabled={state.contact?.id ? false : true}
            >
              <i className="fas fa-save mr-1"></i>
              <strong>{state.id ? "Actualizar" : "Guardar"}</strong>
            </button>
          </div>
        </div>
      </div>
      {/* <PrintExam
        esferaod={state.esferaod ?? ""}
        esferaoi={state.esferaoi ?? ""}
        cilindrod={state.cilindrod ?? ""}
        cilindroi={state.cilindroi ?? ""}
        ejeod={state.ejeod ?? ""}
        ejeoi={state.ejeoi ?? ""}
        adiciond={state.adiciond ?? ""}
        adicioni={state.adicioni ?? ""}
        adicion_media_od={state.adicion_media_od ?? ""}
        adicion_media_oi={state.adicion_media_oi ?? ""}
        dpod={state.dpod ?? ""}
        dpoi={state.dpoi ?? ""}
        alturaod={state.alturaod ?? ""}
        alturaoi={state.alturaoi ?? ""}
        lcmarca={state.lcmarca ?? ""}
        lcgod={state.lcgod ?? ""}
        lcgoi={state.lcgoi ?? ""}
        diagnostico={state.diagnostico ?? ""}
        paciente={state.contact ?? ""}
        presbicie={state.presbicie ?? ""}
      /> */}
    </>
  );
}

function getDataDefault(data = {}) {
  return {
    id: data.id ?? 0,
    age: data.customer?.age ?? 0,
    keratometriaoi: data.keratometriaoi ?? "",
    keratometriaod: data.keratometriaod ?? "",
    pantalleooi: data.pantalleooi ?? "",
    pantalleood: data.pantalleood ?? "",
    interrogatorio: data.interrogatorio ?? "",
    cefalea: data.cefalea ?? 0,
    c_frecuencia: data.c_frecuencia ?? "",
    c_intensidad: data.c_intensidad ?? 0,
    frontal: data.frontal ?? 0,
    temporal: data.temporal ?? 0,
    occipital: data.occipital ?? 0,
    generality: data.generality ?? 0,
    temporaoi: data.temporaoi ?? 0,
    temporaod: data.temporaod ?? 0,
    coa: data.coa ?? "",
    aopp: data.aopp ?? "",
    aopf: data.aopf ?? "",
    avsloi: data.avsloi ?? "",
    avslod: data.avslod ?? "",
    avcgaoi: data.avcgaoi ?? "",
    avcgaod: data.avcgaod ?? "",
    cvoi: data.cvoi ?? "",
    cvod: data.cvod ?? "",
    oftalmoscopia: data.oftalmoscopia ?? "",
    rsoi: data.rsoi ?? "",
    rsod: data.rsod ?? "",
    diagnostico: data.diagnostico ?? "",
    presbicie: data.presbicie ?? 0,
    txoftalmico: data.txoftalmico ?? "",
    esferaoi: data.esferaoi ?? 0,
    esferaod: data.esferaod ?? 0,
    cilindroi: data.cilindroi ?? 0,
    cilindrod: data.cilindrod ?? 0,
    ejeoi: data.ejeoi ?? 0,
    ejeod: data.ejeod ?? 0,
    adicioni: data.adicioni ?? 0,
    adiciond: data.adiciond ?? 0,
    adicion_media_oi: data.adicion_media_oi ?? 0,
    adicion_media_od: data.adicion_media_od ?? 0,
    dpoi: data.dpoi ?? 0,
    dpod: data.dpod ?? 0,
    avfod: data.avfod ?? "",
    avfoi: data.avfoi ?? "",
    avf2o: data.avf2o ?? "",
    lcmarca: data.lcmarca ?? "",
    lcgoi: data.lcgoi ?? "",
    lcgod: data.lcgod ?? "",
    txoptico: data.txoptico ?? "",
    alturaod: data.alturaod ?? 0,
    alturaoi: data.alturaoi ?? 0,
    pioi: data.pioi ?? 0,
    piod: data.piod ?? 0,
    observaciones: data.observaciones ?? "",
    pc: data.pc ?? 0,
    tablet: data.tablet ?? 0,
    movil: data.movil ?? 0,
    lap: data.lap ?? 0,
    lap_time: data.lap_time ?? "00:00",
    pc_time: data.pc_time ?? "00:00",
    tablet_time: data.tablet_time ?? "00:00",
    movil_time: data.movil_time ?? "00:00",
    d_time: data.d_time ?? "",
    d_media: data.d_media ?? "",
    d_test: data.d_test ?? "",
    d_fclod: data.d_fclod ?? 0,
    d_fcloi: data.d_fcloi ?? 0,
    d_fclod_time: data.d_fclod_time ?? "00:00",
    d_fcloi_time: data.d_fcloi_time ?? "00:00",
    contact: data.customer ?? {},
    status: data.status ?? false,
    branch_id: data.branch?.id ?? 12,
    contact_id: data.customer?.id,
    category_id: data.category_id ?? 0,
    category_ii: data.category_ii ?? 0,
  };
}

// class AddComp extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       exam: { id: 0, edad: 20 },
//       panel: 0,
//       used: {
//         generales: false,
//         interrogatorios: false,
//         keraRet: false,
//         diabetes: false,
//         agudeza: false,
//         diagnostico: false,
//         graduacion: false,
//         observaciones: false,
//         recomendaciones: false,
//       },
//     };
//   }

//   componentDidMount() {
//     this.getExam();
//   }

//   componentDidUpdate(props) {
//     const { contact } = this.props,
//       { exam } = this.state;

//     if (props.contact.id !== contact.id && !exam.id) {
//       this.setState({
//         exam: {
//           ...exam,
//           edad: contact.edad,
//         },
//       });
//     }
//   }

//   render() {
//     const { exam, panel, used } = this.state,
//       { contact: paciente, handleClose: _handleClose } = this.props;

//     return (

//     );
//   }

//   handleChangeRecomendations = (obj) => {
//     const { exam, used } = this.state,
//       key = Object.keys(obj);

//     if (typeof obj === "object") {
//       this.setState({
//         exam: {
//           ...exam,
//           category_ii: key[0] === "category_id" ? null : exam.category_ii,
//           ...obj,
//         },
//         used: {
//           ...used,
//           recomendaciones: true,
//         },
//       });
//     }
//   };
//   changeStatus = (e) => {
//     const { checked } = e.target;
//     this.handleChangeInput("estado", checked);
//   };
//   handleChangeInput = (key, value) => {
//     const { exam, used } = this.state,
//       usedto = action.handleTypeInput(key);

//     this.setState({
//       exam: {
//         ...exam,
//         [key]: value,
//       },
//       used: usedto
//         ? {
//             ...used,
//             [usedto]: true,
//           }
//         : used,
//     });
//   };
//   handleStatus = () => {
//     this.setState({
//       status: !this.state.status,
//     });
//   };
//   handleSave = (e) => {
//     e.preventDefault();
//     const {
//         exam: { id, cilindrod, cilindroi, ejeod, ejeoi },
//       } = this.state,
//       {
//         contact: paciente,
//         options,
//         handleClose: _handleClose,
//         _saveExam,
//       } = this.props;

//     //Verificar si los datos son validos.
//     if ((cilindrod < 0 && !ejeod) || (cilindroi < 0 && !ejeoi)) {
//       window.Swal.fire(
//         "Verificación",
//         "El campo CILINDRO esta vacio",
//         "warning"
//       );
//       return false;
//     }

//     //Confirmación de almacenamiento
//     window.Swal.fire({
//       title: "Almacenamiento",
//       text: id
//         ? "¿Esta seguro de actualizar el examen?"
//         : "¿Esta seguro de crear un nuevo examen?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: id ? "Actualizar" : "Crear",
//       cancelButtonText: "Cancelar",
//       showLoaderOnConfirm: true,
//     }).then(({ dismiss }) => {
//       if (!dismiss) {
//         let { exam: body } = this.state;
//         const anos = paciente.f_nacimiento
//             ? moment().diff(paciente.f_nacimiento, "years")
//             : 0,
//           edad = anos < 1 || !anos ? 0 : anos;

//         body.contact_id = paciente.id;
//         body.edad = body.edad ? body.edad : edad;
//         body.status = body.estado;
//         delete body.estado;
//         if (!body.category_id) body.category_id = null;
//         if (!body.category_ii) body.category_ii = null;

//         _saveExam({
//           id,
//           data: body,
//           options,
//         });
//         _handleClose(true);
//       }
//     });
//   };
//   getExam = () => {
//     const { exam, _setContact } = this.props;
//     if (exam.id) {
//       console.log("[Orus System] Procesando examen", exam.id);
//       this.setState({
//         exam: {
//           ...exam,
//           category_id: exam.category_primary ? exam.category_primary.id : null,
//           category_ii: exam.category_secondary
//             ? exam.category_secondary.id
//             : null,
//         },
//         load: false,
//         panel: 0,
//         used: {
//           generales: true,
//           interrogatorios: true,
//           keraRet: true,
//           diabetes: true,
//           agudeza: true,
//           diagnostico: true,
//           graduacion: true,
//           observaciones: true,
//           recomendaciones: true,
//         },
//       });
//       _setContact(exam.paciente ?? { id: 0 });
//     }
//   };
// }
