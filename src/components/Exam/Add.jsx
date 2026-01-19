/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

//Componentes
import Generales from "./views/GeneralesExam";
import Interrogatorios from "./views/interrogatoriosExam";
import KeraRet from "./views/keraRetExam";
import Diabetes from "./views/diabetesExam";
import Agudeza from "./views/agudezaExam";
import Diagnostico from "./views/diagnosticoExam";
import Graduacion from "./views/graduacionExam";
import Observaciones from "./views/observacionesExam";
import Recomendaciones from "./views/RecomendationGlass";
import ShowContact from "../Contacts/views/ShowCard";
import SideBarRigth from "./views/SideBarRigth";
import useExam from "../../hooks/useExam";
import Activitys from "../Activitys";

export default function Add(props) {


  const [state, setState] = useState({
    ...getDataDefault(),
    loading: false,
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
    activitys:[],
  });

  
  const { id } = props.match.params;
  const _exams = useExam();
  const history = useHistory();

  // Functions
  const handlePanel = (num) => {
    if (isNaN(num)) return;
    if (typeof num === "string") num = parseInt(num);

    setState({
      ...state,
      panel: num,
    });
  };
  const handleSave = () => {

    const data = {
      ...state,
    };



    const { contact } = data;
    delete data.loading;
    delete data.panel;
    delete data.used;
    delete data.contact;

    delete data.activitys;        

    if (!data.category_ii) delete data.category_ii;
    if (!data.category_id) delete data.category_id;

    if (
      (data.cilindrod < 0 && !data.ejeod) ||
      (data.cilindroi < 0 && !data.ejeoi)
    ) {
      window.Swal.fire(
        "Consultorio",
        "El campo CILINDRO esta vacio",
        "warning"
      );
      return false;
    }

    window.Swal.fire({
      title: "Consultorio",
      text: data.id
        ? `¿Desea actualizar el examen de ${contact.name.toUpperCase()}?`
        : `¿Desea crear un nuevo examen para ${contact.name.toUpperCase()}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: data.id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _exams.saveExam(data).then((res) => {
          if (res?.id) {
            console.log("[Orus System] Save exam successfully", res.id);
            props.handleNewOrEdit();
            history.push("/consultorio");
          } else if (res.hasOwnProperty("errors")) {
            const messages = Object.values(res.errors);

            console.error("[Orus System] Message of server:", res.errors);
            window.Swal.fire({
              title: "Consultorio",
              text: messages[0],
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };

  useEffect(() => {    
    if (id) {
      console.log("[Orus System] Loading exam:", id);
      setState({
        ...state,
        loading: false,
      });
      _exams.getExam(id).then((res) => {
        res.category_ii = res.category_ii?.id;
        res.category_id = res.category_id?.id;        

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
          activitys: res.activity ?? [],
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
              age = {state.age}
              handleContactSelect={(doc) => {                
                setState({
                  ...state,
                  contact: doc,
                  contact_id: doc.id,
                  age:doc.age
                });
              }}
            />
          </div>

          {state.contact?.id ? (
            <div className="row">
              <div className="col-2">
                <SideBarRigth
                  state={{ panel: state.panel, ...state.used }}
                  handle={handlePanel}
                />
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
                    handleGetData={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          generales: true,
                        },
                      });
                    }}
                  />
                ) : null}
                {state.panel === 1 ? (
                  <Interrogatorios
                    interrogatorio={state.interrogatorio ?? ""}
                    coa={state.coa ?? ""}
                    aopp={state.aopp ?? ""}
                    aopf={state.aopf ?? ""}
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          interrogatorios: true,
                        },
                      });
                    }}
                  />
                ) : null}

                {state.panel === 2 ? (
                  <KeraRet
                    keratometriaoi={state.keratometriaoi ?? ""}
                    keratometriaod={state.keratometriaod ?? ""}
                    rsoi={state.rsoi ?? ""}
                    rsod={state.rsod ?? ""}
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          keraRet: true,
                        },
                      });
                    }}
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
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          diabetes: true,
                        },
                      });
                    }}
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
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          agudeza: true,
                        },
                      });
                    }}
                  />
                ) : null}

                {state.panel === 5 ? (
                  <Diagnostico
                    diagnostico={state.diagnostico ?? ""}
                    presbicie={state.presbicie ?? ""}
                    piod={state.piod ?? ""}
                    pioi={state.pioi ?? ""}
                    txoftalmico={state.txoftalmico ?? ""}
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          diagnostico: true,
                        },
                      });
                    }}
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
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          graduacion: true,
                        },
                      });
                    }}
                  />
                ) : null}

                {state.panel === 7 ? (
                  <Observaciones
                    observaciones={state.observaciones ?? ""}
                    onChangeInput={(name, value) => {
                      if (!name) return;

                      setState({
                        ...state,
                        [name]: value,
                        used: {
                          ...state.used,
                          observaciones: true,
                        },
                      });
                    }}
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
                        nameItem="item1"
                        title="Recomendacion principal"
                        onChangeInput={(value) => {
                          setState({
                            ...state,
                            category_id: value,
                            category_ii: 0,
                            used: {
                              ...state.used,
                              recomendaciones: true,
                            },
                          });
                        }}
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
                          nameItem="item2"
                          title="Recomendacion adicional"
                          onChangeInput={(value) => {
                            setState({
                              ...state,
                              category_ii: value,
                              used: {
                                ...state.used,
                                recomendaciones: true,
                              },
                            });
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
        </div>
        <div className="card-footer text-right">
          <div className="btn-group" role="group">
            <a
              href="#close"
              className="btn btn-default"
              onClick={(e) => {
                e.preventDefault();
                history.push("/consultorio");
                props.handleNewOrEdit();
              }}
            >
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
                  // window.print();
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
              onClick={handleSave}
              disabled={state.contact?.id ? false : true}
            >
              <i className="fas fa-save mr-1"></i>
              <strong>{state.id ? "Actualizar" : "Guardar"}</strong>
            </button>
          </div>
        </div>
      </div>

      {
        state.activitys.length ? (
          <Activitys
            data = {state.activitys}
          />
        ): null
      }

      
    </>
  );
}

function getDataDefault(data = {}) {    
  let edad = 0;
  if(data?.paciente?.birthday){
    edad = moment().diff(moment(data.paciente.birthday), 'years');
  }

  return {
    id: data.id ?? 0,
    age: data.age ? data.age : edad,    
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
    contact: data.paciente ?? {},
    status: data.status ?? 1,
    contact_id: data.paciente?.id,
    category_id: data.category_id ?? 0,
    category_ii: data.category_ii ?? 0,
  };
}
