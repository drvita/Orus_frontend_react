import React from "react";

const DataTelefonosComponent = (props) => {
  const { telefonos, handleChangeData } = props,
    { t_casa = "", t_oficina = "", t_movil = "" } = telefonos;

  const catchInputs = (e) => {
    const { name, value } = e.target,
      pattern = /^\d+$/gim;
    let val = telefonos;

    if (name === "t_casa") {
      if (pattern.test(value)) {
        val.t_casa = value;
        if (val.t_movil.length < 10) val.t_movil = value;
      }
    }
    if (name === "t_oficina") {
      if (pattern.test(value)) val.t_oficina = value;
    }
    if (name === "t_movil") {
      if (pattern.test(value)) val.t_movil = value;
    }
    handleChangeData("telefonos", val);
  };

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Telefono personal</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              name="t_casa"
              value={t_casa}
              onChange={catchInputs}
            />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Telefono para recados</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              name="t_oficina"
              value={t_oficina}
              onChange={catchInputs}
            />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Numero de whatsApp</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              name="t_movil"
              value={t_movil}
              onChange={catchInputs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTelefonosComponent;
