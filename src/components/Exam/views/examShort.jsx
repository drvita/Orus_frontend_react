import React, { useState } from "react";
import moment from "moment";
//Views and actions
import Graduacion from "./graduacionExam";

const ExamCustomerComponent = (props) => {
  const {
    exam = {},
    examEdit = false,
    ChangeInput: _ChangeInput,
    _saveExam,
  } = props;

  const [newExam, setNewExam] = useState({
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
  });

  const handleDataExam = (key, val) => {
    const data = {
      ...newExam,
      [key]: parseFloat(val),
    };
    setNewExam(data);
    _ChangeInput("codes", {});
  };

  const handelChangeExam = () => {
    _ChangeInput("examEdit", false);
  };

  const handleSaveExam = () => {
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de actualizar el examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (!result.dismiss) {
        _saveExam({
          id: exam.id,
          data: newExam,
        });
        handelChangeExam();
      }
    });
  };

  return (
    <>
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
            esferaod={newExam.esferaod ?? 0}
            esferaoi={newExam.esferaoi ?? 0}
            cilindrod={newExam.cilindrod ?? 0}
            cilindroi={newExam.cilindroi ?? 0}
            ejeod={newExam.ejeod ?? 0}
            ejeoi={newExam.ejeoi ?? 0}
            adiciond={newExam.adiciond ?? 0}
            adicioni={newExam.adicioni ?? 0}
            adicion_media_od={newExam.adicion_media_od}
            adicion_media_oi={newExam.adicion_media_oi}
            dpod={newExam.dpod ?? 0}
            dpoi={newExam.dpoi ?? 0}
            alturaod={newExam.alturaod ?? 0}
            alturaoi={newExam.alturaoi ?? 0}
            lcmarca={newExam.lcmarca ?? 0}
            lcgod={newExam.lcgod ?? 0}
            lcgoi={newExam.lcgoi ?? 0}
            readOnly={!examEdit}
            onChangeInput={handleDataExam}
          />
        </div>
      </div>
      {examEdit ? (
        <div className="text-right mt-2">
          <div className="btn-group">
            <button className="btn btn-default" onClick={handelChangeExam}>
              <i className="fas fa-times mr-1"></i> Cerrar
            </button>
            <button className="btn btn-info" onClick={handleSaveExam}>
              <i className="fas fa-save mr-1"></i> Guardar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};


export default ExamCustomerComponent;
