import React from "react";

const DataDomiciliosComponent = (props) => {
  console.log("[DEBUG] Domicilios:", props);
  const { domicilios = {}, handleChangeData } = props,
    { calle, colonia, municipio, estado, cp } = domicilios;
  //const [inputs, setInputs] = useState("");

  const catchInputs = (e) => {
    const { name, value } = e.target;
    let val = domicilios;

    if (name === "calle") {
      val.calle = value;
    }
    if (name === "colonia") {
      val.colonia = value;
    }
    if (name === "municipio") {
      val.municipio = value;
    }
    if (name === "estado") {
      val.estado = value;
    }
    if (name === "cp") {
      val.cp = value;
    }

    handleChangeData("domicilios", val);
  };

  return (
    <>
      <div className="col">
        {calle ? (
          <small>
            <label>Calle y numero</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-road"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Calle y numero"
            name="calle"
            value={calle}
            onChange={catchInputs}
          />
        </div>
        {colonia ? (
          <small>
            <label>Colonia</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Colonia"
            name="colonia"
            value={colonia}
            onChange={catchInputs}
          />
        </div>
        {municipio ? (
          <small>
            <label>Municipio</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-location-arrow"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Municipio"
            name="municipio"
            value={municipio}
            onChange={catchInputs}
          />
        </div>
      </div>
      <div className="col">
        {estado ? (
          <small>
            <label>Estado</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-map-marker"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control text-capitalize"
            placeholder="Estado"
            name="estado"
            value={estado}
            onChange={catchInputs}
          />
        </div>
        {cp ? (
          <small>
            <label>Codigo postal</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-map-marker"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Codigo Postal"
            name="cp"
            value={cp}
            onChange={catchInputs}
          />
        </div>
      </div>
    </>
  );
};

export default DataDomiciliosComponent;
