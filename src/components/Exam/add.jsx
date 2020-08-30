import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContact from "../Contacts/searchContactCard";
import Recomendaciones from "./recomendaciones";
import Generales from "./generalesExam";
import Interrogatorios from "./interrogatoriosExam";
import KeraRet from "./keraRetExam";
import Diabetes from "./diabetesExam";

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
      esferaoi: "",
      esferaod: "",
      cilindroi: "",
      cilindrod: "",
      ejeoi: "",
      ejeod: "",
      adicioni: "",
      adiciond: "",
      dpoi: "",
      dpod: "",
      avfoi: "",
      avfod: "",
      avf2o: "",
      lcmarca: "",
      lcgoi: "",
      lcgod: "",
      txoptico: "",
      alturaoi: "",
      alturaod: "",
      pioi: 0,
      piod: 0,
      observaciones: "",
      pc: false,
      tablet: false,
      movil: false,
      lap: false,
      lap_time: "",
      pc_time: "",
      tablet_time: "",
      movil_time: "",
      d_time: "",
      d_media: "",
      d_test: "",
      d_fclod: false,
      d_fcloi: false,
      d_fclod_time: "",
      d_fcloi_time: "",
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
                Nuevo examen
              </h3>
            </div>
            <div className="card-body">
              <div className="accordion" id="accordionExample">
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

                <div className="card">
                  <div className="card-header" id="heading5">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left text-info collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#caja5"
                        aria-expanded="false"
                        aria-controls="caja5"
                      >
                        Capacidad y agudeza visual
                      </button>
                    </h2>
                  </div>
                  <div
                    id="caja5"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6">Capacidad visual</div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <input
                                type="text"
                                name="cvod"
                                maxLength="12"
                                className="form-control"
                                value={this.state.cvod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <input
                                type="text"
                                name="cvoi"
                                maxLength="12"
                                className="form-control"
                                value={this.state.cvoi}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6">
                              Agudeza visual (Sin lentes)
                            </div>
                            <div className="col-md-6">
                              Agudeza visual (con la graduaci&oacute;n anterior)
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <input
                                type="text"
                                name="avslod"
                                maxLength="12"
                                className="form-control"
                                value={this.state.avslod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <input
                                type="text"
                                name="avsloi"
                                maxLength="12"
                                className="form-control"
                                value={this.state.avsloi}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <input
                                type="text"
                                name="avcgaod"
                                maxLength="12"
                                className="form-control input-xs"
                                value={this.state.avcgaod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <input
                                type="text"
                                name="avcgaoi"
                                maxLength="12"
                                className="form-control input-xs"
                                value={this.state.avcgaoi}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6">Agudeza visual final</div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <br />
                              <input
                                type="text"
                                name="avfod"
                                maxLength="12"
                                className="form-control"
                                value={this.state.avfod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <br />
                              <input
                                type="text"
                                name="avfoi"
                                maxLength="12"
                                className="form-control"
                                value={this.state.avfoi}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-4">
                              <i className="fa fa-eye"></i>
                              <i className="fa fa-eye"></i> <label>Ambos</label>
                              <br />
                              <input
                                type="text"
                                name="avf2o"
                                maxLength="25"
                                className="form-control"
                                value={this.state.avf2o}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="heading6">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left text-info collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#caja6"
                        aria-expanded="false"
                        aria-controls="caja6"
                      >
                        Diagnostico
                      </button>
                    </h2>
                  </div>
                  <div
                    id="caja6"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                              Tensi&oacute;n ocular
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              Diagnostico
                              <select
                                name="diagnostico"
                                className="form-control"
                                value={this.state.diagnostico}
                                onChange={this.catchInputs}
                              >
                                <option value="Hemetrope">
                                  Hem&eacute;trope
                                </option>
                                <option value="hipermetropia">
                                  Hipermetrop&iacute;a
                                </option>
                                <option value="hipermetropia-astigmatismo">
                                  Hipermetrop&iacute;a y astigmatismo
                                </option>
                                <option value="hipermetropia-miopia">
                                  Hipermetrop&iacute;a y miop&iacute;a
                                </option>
                                <option value="astigmatismo-regla">
                                  Astigmatismo con la regla
                                </option>
                                <option value="astigmatismo-contra-regla">
                                  Astigmatismo contra la regla
                                </option>
                                <option value="astigmatismo-oblicuo">
                                  Astigmatismo oblicuo
                                </option>
                                <option value="astigmatismo-miopia">
                                  Astigmatismo/m&iacute;opico
                                </option>
                                <option value="miopia">Miop&iacute;a</option>
                              </select>
                            </div>
                            <div className="col-md-3">
                              Presbicie
                              <br />
                              <input
                                name="presbicie"
                                type="checkbox"
                                checked={this.state.presbicie}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <input
                                type="number"
                                name="piod"
                                min="0"
                                max="40"
                                step="1"
                                className="form-control"
                                value={this.state.piod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-3">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <input
                                type="number"
                                name="pioi"
                                min="0"
                                max="40"
                                step="1"
                                className="form-control"
                                value={this.state.pioi}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          Tratamiento oftalmico
                          <textarea
                            name="txoftalmico"
                            className="form-control"
                            value={this.state.txoftalmico}
                            onChange={this.catchInputs}
                          ></textarea>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="heading7">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left text-info collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#caja7"
                        aria-expanded="false"
                        aria-controls="caja7"
                      >
                        Graduaci&oacute;n
                      </button>
                    </h2>
                  </div>
                  <div
                    id="caja7"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table table-bordered table-hover">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Esfera</th>
                                    <th>Cilindro</th>
                                    <th>Eje</th>
                                    <th>Adici&oacute;n</th>
                                    <th>D/P</th>
                                    <th>Altura</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <label>D</label>
                                      <i className="fa fa-eye"></i>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="esferaod"
                                        min="-20"
                                        max="20"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.esferaod}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="cilindrod"
                                        min="-20"
                                        max="0"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.cilindrod}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="ejeod"
                                        min="0"
                                        max="180"
                                        step="1"
                                        className="form-control"
                                        placeholder="°"
                                        value={this.state.ejeod}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="adiciond"
                                        min="0"
                                        max="3"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.adiciond}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="dpod"
                                        min="0"
                                        max="80"
                                        step=".1"
                                        className="form-control"
                                        value={this.state.dpod}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="alturaod"
                                        min="0"
                                        max="80"
                                        step=".1"
                                        className="form-control"
                                        value={this.state.alturaod}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <label>I</label>
                                      <i className="fa fa-eye"></i>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="esferaoi"
                                        min="-20"
                                        max="20"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.esferaoi}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="cilindroi"
                                        min="-20"
                                        max="0"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.cilindroi}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="ejeoi"
                                        min="0"
                                        max="180"
                                        step="1"
                                        className="form-control"
                                        placeholder="°"
                                        value={this.state.ejeoi}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="adicioni"
                                        min="0"
                                        max="3"
                                        step=".25"
                                        className="form-control"
                                        value={this.state.adicioni}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="dpoi"
                                        min="0"
                                        max="80"
                                        step=".1"
                                        className="form-control"
                                        value={this.state.dpoi}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        name="alturaoi"
                                        min="0"
                                        max="80"
                                        step=".1"
                                        className="form-control"
                                        value={this.state.alturaoi}
                                        onChange={this.catchInputs}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-12">
                              Lente de contacto
                              <input
                                type="text"
                                name="lcmarca"
                                maxLength="70"
                                className="form-control"
                                value={this.state.lcmarca}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Derecho</label>
                              <input
                                type="text"
                                name="lcgod"
                                maxLength="30"
                                className="form-control"
                                value={this.state.lcgod}
                                onChange={this.catchInputs}
                              />
                            </div>
                            <div className="col-md-4">
                              <i className="fa fa-eye"></i>{" "}
                              <label>Izquierdo</label>
                              <input
                                type="text"
                                name="lcgoi"
                                maxLength="30"
                                className="form-control"
                                value={this.state.lcgoi}
                                onChange={this.catchInputs}
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="heading8">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left text-info collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#caja8"
                        aria-expanded="false"
                        aria-controls="caja8"
                      >
                        Observaciones
                      </button>
                    </h2>
                  </div>
                  <div
                    id="caja8"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <textarea
                            name="observaciones"
                            className="form-control"
                            value={this.state.observaciones}
                            onChange={this.catchInputs}
                          ></textarea>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-right">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
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
                  <strong>
                    {this.state.status ? "Desbloquear" : "Bloquear"}
                  </strong>
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
      //Actualiza el contacto o creamos el contacto
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) this.props.history.goBack();
          else console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}
