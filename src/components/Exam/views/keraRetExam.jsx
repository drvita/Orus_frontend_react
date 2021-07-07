import React from "react";

const KeraRetExamComponent = (props) => {
  const catchInputs = (e) => {
    const { name } = e.target,
      value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value.toLowerCase();
    props.onChangeInput(name, value);
  };

  return (
    <>
      <div className="row">
        <div className="col-6">Keratometria</div>
        <div className="col-6">Retinoscopia</div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <i className="fas fa-eye"></i> <label>Derecho</label>
          <input
            type="text"
            name="keratometriaod"
            maxLength="12"
            className="form-control input-xs"
            value={props.keratometriaod}
            onChange={catchInputs}
          />
        </div>
        <div className="col-3">
          <i className="fas fa-eye"></i> <label>Izquierdo</label>
          <input
            type="text"
            name="keratometriaoi"
            maxLength="12"
            className="form-control input-xs"
            value={props.keratometriaoi}
            onChange={catchInputs}
          />
        </div>
        <div className="col-md-3">
          <i className="fa fa-eye"></i> <label>Derecho</label>
          <input
            type="text"
            name="rsod"
            maxLength="16"
            className="form-control"
            value={props.rsod}
            onChange={catchInputs}
          />
        </div>
        <div className="col-md-3">
          <i className="fa fa-eye"></i> <label>Izquierdo</label>
          <input
            type="text"
            name="rsoi"
            maxLength="16"
            className="form-control"
            value={props.rsoi}
            onChange={catchInputs}
          />
        </div>
      </div>
    </>
  );
};

export default KeraRetExamComponent;
