import React, { Component } from "react";
import Graduacion from "../Exam/graduacionExam";
import Recomendaciones from "../Exam/recomendaciones";
import moment from "moment";

export default class examCustomer extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      id: props.id ? props.id : 0,
      exam: {},
      load: true,
      examEdit: props.examEdit ? props.examEdit : true,
      host: ls.host,
      token: ls.token,
    };
  }
  componentDidMount() {
    const { exam, examEdit } = this.props;
    //this.getExam();
    this.setState({
      exam,
      examEdit,
      load: false,
    });
  }
  componentDidUpdate(props, state) {
    if (props.id !== this.props.id) {
      //this.getExam();
    }
  }

  render() {
    const { load, id, exam, examEdit } = this.state;

    if (exam.id) {
      return (
        <div className="card">
          <div className="card-body card-info">
            <div className="row">
              <div className="col">
                <b>
                  Folio <br />#{exam.id}
                </b>
              </div>
              <div className="col">
                <b>Fecha:</b>
                <br />
                <i className="fas fa-calendar mr-2"></i>
                {moment(exam.created_at).format("L")}
              </div>
              <div className="col">
                <b>Estado:</b>
                <br />
                {exam.estado ? (
                  <span className="badge badge-success">
                    <i className="fas fa-check"></i> Terminado
                  </span>
                ) : (
                  <span className="badge badge-secondary">
                    <i className="fas fa-hourglass"></i> Activo
                  </span>
                )}
              </div>
            </div>

            {exam.observaciones ? (
              <div className="form-group mt-2">
                <div className="callout callout-info">
                  <h5 className="text-info text-bold">
                    <i className="fas fa-info"></i> Observaciones:
                  </h5>
                  {exam.observaciones}
                </div>
              </div>
            ) : null}

            <div className="row mt-2">
              <div className="col">
                <Graduacion
                  esferaod={exam.esferaod ? exam.esferaod : 0}
                  esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                  cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                  cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                  ejeod={exam.ejeod ? exam.ejeod : 0}
                  ejeoi={exam.ejeoi ? exam.ejeoi : 0}
                  adiciond={exam.adiciond ? exam.adiciond : 0}
                  adicioni={exam.adicioni ? exam.adicioni : 0}
                  adicion_media_od={exam.adicion_media_od}
                  adicion_media_oi={exam.adicion_media_oi}
                  dpod={exam.dpod ? exam.dpod : 0}
                  dpoi={exam.dpoi ? exam.dpoi : 0}
                  alturaod={exam.alturaod ? exam.alturaod : 0}
                  alturaoi={exam.alturaoi ? exam.alturaoi : 0}
                  lcmarca={exam.lcmarca ? exam.lcmarca : 0}
                  lcgod={exam.lcgod ? exam.lcgod : 0}
                  lcgoi={exam.lcgoi ? exam.lcgoi : 0}
                  readOnly={!examEdit}
                  onChangeInput={this.handleDataExam}
                />
              </div>
            </div>
            {/*!examEdit && exam.category_id ? (
              <div className="row mt-2">
                <div className="col">
                  <Recomendaciones
                    category_id={exam.category_id}
                    title="Recomendacion principal"
                    esferaod={exam.esferaod ? exam.esferaod : 0}
                    esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                    cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                    cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                    handleCodesItems={this.handelChangeCode}
                  />
                </div>
                {exam.category_ii ? (
                  <div className="col">
                    <Recomendaciones
                      category_id={exam.category_ii}
                      title="Recomendacion adicional"
                      esferaod={exam.esferaod ? exam.esferaod : 0}
                      esferaoi={exam.esferaoi ? exam.esferaoi : 0}
                      cilindrod={exam.cilindrod ? exam.cilindrod : 0}
                      cilindroi={exam.cilindroi ? exam.cilindroi : 0}
                      handleCodesItems={this.handelChangeCode}
                    />
                  </div>
                ) : null}
              </div>
                ) : null*/}
            {examEdit ? (
              <div className="text-right mt-2">
                <div className="btn-group">
                  <button
                    className="btn btn-secondary"
                    onClick={this.handelChangeExam}
                  >
                    <i className="fas fa-times mr-1"></i> Cerrar
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={this.handleSaveExam}
                  >
                    <i className="fas fa-save mr-1"></i> Guardar
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    } else {
      if (load) {
        //Cargamos indicacion de carga
        return (
          <div className="card">
            <div className="card-body">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );
      } else {
        //Regresamos aviso de no haber encontrado datos
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="text-info">
                <i className="fas fa-info mr-2"></i>Examen [{id}] no encontrado.
              </h5>
            </div>
          </div>
        );
      }
    }
  }

  handleDataExam = (key, val) => {
    let { exam } = this.state;
    exam[key] = val;
    this.setState({
      exam,
    });
    const { ChangeInput } = this.props;
    ChangeInput("codes", {});
  };
  handelChangeExam = () => {
    const { ChangeInput } = this.props;
    ChangeInput("examEdit", false);
  };
  handelChangeCode = (codes) => {
    const { ChangeInput } = this.props;
    ChangeInput("codes", codes);
  };
  handleSaveExam = () => {
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de actualizar el examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { host, token } = this.state,
            { exam } = this.state,
            data = {
              esferaod: exam.esferaod,
              esferaoi: exam.esferaoi,
              cilindrod: exam.cilindrod,
              cilindroi: exam.cilindroi,
              ejeod: exam.ejeod,
              ejeoi: exam.ejeoi,
              adiciond: exam.adiciond,
              adicioni: exam.adicioni,
              adicion_media_od: exam.adicion_media_od,
              adicion_media_oi: exam.adicion_media_oi,
              dpod: exam.dpod,
              dpoi: exam.dpoi,
              alturaod: exam.alturaod,
              alturaoi: exam.alturaoi,
              lcmarca: exam.lcmarca,
              lcgod: exam.lcgod,
              lcgoi: exam.lcgoi,
            };

          //Actualiza el examen según el ID
          console.log("[examCustomer] Enviando datos del examen");
          return fetch("http://" + host + "/api/exams/" + exam.id, {
            method: "PUT",
            body: JSON.stringify(data),
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
              console.error("[Orus fetch]", e);
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
        let data = result.value;
        const { ChangeInput } = this.props;

        if (data.data) {
          console.log("[examCustomer] Examen almacenado con exito");

          window.Swal.fire({
            icon: "success",
            title: "Examen actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((e) => {
            ChangeInput("examEdit", false);
          });
        } else {
          window.Swal.fire("Error", "al almacenar el pedido", "error");
          console.error("[Orus res] ", data.message);
        }
      }
    });
  };
}
