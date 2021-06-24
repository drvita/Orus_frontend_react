import React from "react";
//import NameInput from "./nameInput";
//import EmailInput from "./emailInput";

const DataPersonalComponent = (props) => {
  const {
    type,
    business,
    name,
    rfc,
    email,
    birthday,
    handleChangeData,
    verification,
  } = props;

  const catchInputs = (e) => {
    const { name, value, checked } = e.target;
    let val = value;

    if (name === "type") val = parseInt(value);
    if (name === "business") val = checked;
    //console.log("[DEBUG] catch input:", name, value, checked, val);
    handleChangeData(name, val);
  };

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Tipo de contacto</label>
          <select
            className="custom-select"
            name="type"
            value={type ?? ""}
            onChange={catchInputs}
          >
            <option value="0">Cliente</option>
            <option value="1">Proveedor</option>
          </select>
        </div>
        <div className="form-group custom-control custom-checkbox">
          <input
            type="checkbox"
            name="business"
            className="custom-control-input"
            checked={business ?? ""}
            onChange={catchInputs}
            id="business_checkbox"
          />
          <label
            htmlFor="business_checkbox"
            className="custom-control-label cursor-pointer"
          >
            <small>¿Es una empresa?</small>
          </label>
        </div>
        {!type ? (
          <div className="form-group">
            <label>RFC</label>
            <input
              type="text"
              className="form-control text-uppercase text-truncate"
              placeholder="Para facturas"
              name="rfc"
              value={rfc ?? ""}
              onChange={catchInputs}
              minLength="10"
            />
          </div>
        ) : null}
      </div>
      <div className="col">
        <div className="form-group">
          <label>
            Nombre completo <span className="text-orange">*</span>
          </label>
          <input
            type="text"
            className="form-control text-capitalize text-truncate"
            placeholder="Ej: Juan Perez G"
            name="name"
            value={name ?? ""}
            onChange={catchInputs}
          />
          {!name | !verification.name ? (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label>
            Correo electr&oacute;nico <span className="text-orange">*</span>
          </label>
          <input
            type="email"
            className="form-control text-lowercase text-truncate"
            placeholder="Ej: correo@domain.com"
            name="email"
            value={email ?? ""}
            onChange={catchInputs}
          />
          {!email | !verification.email ? (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          ) : null}
        </div>
        {!type ? (
          <div className="form-group">
            <label>
              Fecha de nacimiento <span className="text-orange">*</span>
            </label>
            <input
              type="date"
              className="form-control text-truncate"
              placeholder=""
              data-inputmask-alias="datetime"
              data-inputmask-inputformat="dd/mm/yyyy"
              data-mask=""
              im-insert="false"
              name="birthday"
              value={birthday ?? ""}
              onChange={catchInputs}
            />
            {!birthday | !verification.birthday ? (
              <small>
                <span className="text-orange">Este campo es requerido</span>
              </small>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DataPersonalComponent;
