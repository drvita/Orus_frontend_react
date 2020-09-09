import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContact from "../Contacts/searchContactCard";
import Recomendaciones from "./recomendaciones";
import Generales from "./generalesExam";
import Interrogatorios from "./interrogatoriosExam";
import KeraRet from "./keraRetExam";
import Diabetes from "./diabetesExam";
import Agudeza from "./agudezaExam";
import Diagnostico from "./diagnosticoExam";
import Graduacion from "./graduacionExam";
import Observaciones from "./observacionesExam";

export default class ExamAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      edad: 0,
      keratometriaoi: "",
      keratometriaod: "",
      pantalleooi: "",
      pantalleood: "",
      interrogatorio: "",
      cefalea: false,
      c_frecuencia: "",
      c_intensidad: 0,
      frontal: false,
      temporal: false,
      occipital: false,
      generality: false,
      temporaoi: false,
      temporaod: false,
      coa: "",
      aopp: "",
      aopf: "",
      avsloi: "",
      avslod: "",
      avcgaoi: "",
      avcgaod: "",
      cvoi: "",
      cvod: "",
      oftalmoscopia: "",
      rsoi: "",
      rsod: "",
      diagnostico: "Hemetrope",
      presbicie: true,
      txoftalmico: "",
      esferaoi: 0,
      esferaod: 0,
      cilindroi: 0,
      cilindrod: 0,
      ejeoi: 0,
      ejeod: 0,
      adicioni: 0,
      adiciond: 0,
      dpoi: 0,
      dpod: 0,
      avfoi: "",
      avfod: "",
      avf2o: "",
      lcmarca: "",
      lcgoi: "",
      lcgod: "",
      txoptico: "",
      alturaoi: 0,
      alturaod: 0,
      pioi: 0,
      piod: 0,
      observaciones: "",
      pc: false,
      tablet: false,
      movil: false,
      lap: false,
      lap_time: "00:00",
      pc_time: "00:00",
      tablet_time: "00:00",
      movil_time: "00:00",
      d_time: "00:00",
      d_media: "",
      d_test: "",
      d_fclod: false,
      d_fcloi: false,
      d_fclod_time: "00:00",
      d_fcloi_time: "00:00",
      contact_id: 0,
      status: 0,
    };
  }

  componentDidMount() {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      id = this.props.match.params.id;

    if (id) {
      //Realiza la peticion de los contactos
      fetch("http://" + varLocalStorage.host + "/api/exams/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Descargando examen");
          this.setState({
            contact_id: data.data.paciente.id,
            edad: data.data.edad,
            id: data.data.id,
            keratometriaoi: data.data.keratometriaoi,
            keratometriaod: data.data.keratometriaod,
            pantalleooi: data.data.pantalleooi,
            pantalleood: data.data.pantalleood,
            interrogatorio: data.data.interrogatorio,
            cefalea: data.data.cefalea,
            c_frecuencia: data.data.c_frecuencia,
            c_intensidad: data.data.c_intensidad,
            frontal: data.data.frontal,
            temporal: data.data.temporal,
            occipital: data.data.occipital,
            generality: data.data.generality,
            temporaoi: data.data.temporaoi,
            temporaod: data.data.temporaod,
            coa: data.data.coa,
            aopp: data.data.aopp,
            aopf: data.data.aopf,
            avsloi: data.data.avsloi,
            avslod: data.data.avslod,
            avcgaoi: data.data.avcgaoi,
            avcgaod: data.data.avcgaod,
            cvoi: data.data.cvoi,
            cvod: data.data.cvod,
            oftalmoscopia: data.data.oftalmoscopia,
            rsoi: data.data.rsoi,
            rsod: data.data.rsod,
            diagnostico: data.data.diagnostico,
            presbicie: data.data.presbicie,
            txoftalmico: data.data.txoftalmico,
            esferaoi: data.data.esferaoi,
            esferaod: data.data.esferaod,
            cilindroi: data.data.cilindroi,
            cilindrod: data.data.cilindrod,
            ejeoi: data.data.ejeoi,
            ejeod: data.data.ejeod,
            adicioni: data.data.adicioni,
            adiciond: data.data.adiciond,
            dpoi: data.data.dpoi,
            dpod: data.data.dpod,
            avfoi: data.data.avfoi,
            avfod: data.data.avfod,
            avf2o: data.data.avf2o,
            lcmarca: data.data.lcmarca,
            lcgoi: data.data.lcgoi,
            lcgod: data.data.lcgod,
            txoptico: data.data.txoptico,
            alturaoi: data.data.alturaoi,
            alturaod: data.data.alturaod,
            pioi: data.data.pioi,
            piod: data.data.piod,
            observaciones: data.data.observaciones,
            pc: data.data.pc,
            tablet: data.data.tablet,
            movil: data.data.movil,
            lap: data.data.lap,
            lap_time: data.data.lap_time,
            pc_time: data.data.pc_time,
            tablet_time: data.data.tablet_time,
            movil_time: data.data.movil_time,
            d_time: data.data.d_time,
            d_media: data.data.d_media,
            d_test: data.data.d_test,
            d_fclod: data.data.d_fclod,
            d_fcloi: data.data.d_fcloi,
            d_fclod_time: data.data.d_fclod_time,
            d_fcloi_time: data.data.d_fcloi_time,
            status: data.data.estado,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    //let {data} = this.props;
    //console.log("Id:", this.state.id);
    return (
      <form className="row">
        <div className="col-md-4">
          <SearchContact
            contact={this.state.contact_id}
            edad={this.state.edad}
            status={this.state.status}
            getIdContact={this.getIdContact}
            changePage={this.changePage}
          />
          <Recomendaciones />
        </div>
        <div className="col-md-8">
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-notes-medical mr-1"></i>
                {this.state.id ? "Examen" : "Nuevo examen"}
              </h3>
            </div>
            <div className="card-body">
              <div className="accordion" id="accordionExample">
                {this.state.contact_id ? (
                  <React.Fragment>
                    <Generales
                      pc={this.state.pc}
                      tablet={this.state.tablet}
                      movil={this.state.movil}
                      lap={this.state.lap}
                      lap_time={this.state.lap_time}
                      pc_time={this.state.pc_time}
                      tablet_time={this.state.tablet_time}
                      movil_time={this.state.movil_time}
                      cefalea={this.state.cefalea}
                      c_frecuencia={this.state.c_frecuencia}
                      c_intensidad={this.state.c_intensidad}
                      frontal={this.state.frontal}
                      temporal={this.state.temporal}
                      occipital={this.state.occipital}
                      generality={this.state.generality}
                      temporaoi={this.state.temporaoi}
                      temporaod={this.state.temporaod}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Interrogatorios
                      interrogatorio={this.state.interrogatorio}
                      coa={this.state.coa}
                      aopp={this.state.aopp}
                      aopf={this.state.aopf}
                      onChangeInput={this.handleChangeInput}
                    />

                    <KeraRet
                      keratometriaoi={this.state.keratometriaoi}
                      keratometriaod={this.state.keratometriaod}
                      rsoi={this.state.rsoi}
                      rsod={this.state.rsod}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Diabetes
                      d_time={this.state.d_time}
                      d_media={this.state.d_media}
                      d_test={this.state.d_test}
                      d_fclod={this.state.d_fclod}
                      d_fclod_time={this.state.d_fclod_time}
                      d_fcloi={this.state.d_fcloi}
                      d_fcloi_time={this.state.d_fcloi_time}
                      oftalmoscopia={this.state.oftalmoscopia}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Agudeza
                      cvod={this.state.cvod}
                      cvoi={this.state.cvoi}
                      avslod={this.state.avslod}
                      avsloi={this.state.avsloi}
                      avcgaod={this.state.avcgaod}
                      avcgaoi={this.state.avcgaoi}
                      avfod={this.state.avfod}
                      avfoi={this.state.avfoi}
                      avf2o={this.state.avf2o}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Diagnostico
                      diagnostico={this.state.diagnostico}
                      presbicie={this.state.presbicie}
                      piod={this.state.piod}
                      pioi={this.state.pioi}
                      txoftalmico={this.state.txoftalmico}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Graduacion
                      esferaod={this.state.esferaod}
                      esferaoi={this.state.esferaoi}
                      cilindrod={this.state.cilindrod}
                      cilindroi={this.state.cilindroi}
                      ejeod={this.state.ejeod}
                      ejeoi={this.state.ejeoi}
                      adiciond={this.state.adiciond}
                      adicioni={this.state.adicioni}
                      dpod={this.state.dpod}
                      dpoi={this.state.dpoi}
                      alturaod={this.state.alturaod}
                      alturaoi={this.state.alturaoi}
                      lcmarca={this.state.lcmarca}
                      lcgod={this.state.lcgod}
                      lcgoi={this.state.lcgoi}
                      onChangeInput={this.handleChangeInput}
                    />

                    <Observaciones
                      observaciones={this.state.observaciones}
                      onChangeInput={this.handleChangeInput}
                    />
                  </React.Fragment>
                ) : (
                  <div className="card">
                    <div className="card-body text-info">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      <label>Elija primero un paciente</label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer text-right">
              <div className="btn-group" role="group">
                <Link
                  to="/consultorio"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    this.changePage("/consultorio");
                  }}
                >
                  <i className="fas fa-ban mr-1"></i>
                  <strong>Cancelar</strong>
                </Link>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleStatus}
                >
                  <i
                    className={
                      this.state.status
                        ? "fas fa-lock-open mr-1"
                        : "fas fa-lock mr-1"
                    }
                  ></i>
                  <strong>{this.state.status ? "Activar" : "Terminar"}</strong>
                </button>
                <button
                  type="button"
                  className={
                    this.state.contact_id
                      ? "btn btn-info"
                      : "btn btn-info disabled"
                  }
                  onClick={this.handleSave}
                  disabled={this.state.contact_id ? "" : "disabled"}
                >
                  <i className="fas fa-save mr-1"></i>
                  <strong>Guardar</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleStatus = () => {
    this.setState({
      status: !this.state.status,
    });
  };
  getIdContact = (id, edad) => {
    this.setState({
      contact_id: id,
      edad,
    });
  };
  changePage = (e) => {
    this.props.page(e);
  };
  catchInputs = (e) => {
    const { name } = e.target,
      value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value.toLowerCase();
    this.setState({
      [name]: value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar la accion?");
    if (conf) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        body = this.state,
        id = this.state.id;
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      let url = id
          ? "http://" + varLocalStorage.host + "/api/exams/" + id
          : "http://" + varLocalStorage.host + "/api/exams",
        method = id ? "PUT" : "POST";
      //Crear o modificar examen
      console.log("Enviando datos del examen a la API");
      fetch(url, {
        method: method,
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
            if (
              window.confirm(
                "Examen almacenado con exito!.\n¿Desea cerrar este examen?"
              )
            ) {
              this.props.history.goBack();
            }
          } else console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}
