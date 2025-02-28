export default function Address({ data, handleChange }) {  
  return (
    <>
      <div className="col">
        {data.address_street ? (
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
            value={data.address_street ?? ""}
            onChange={({ target }) =>{
              console.log("FUNCTION COMPONENT", target.value);
              handleChange("address_street", target.value.toLowerCase());
            }}
          />
        </div>
        {data.address_neighborhood ? (
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
            defaultValue={data.address_neighborhood ?? ""}
            onChange={({ target }) =>
              handleChange("address_neighborhood", target.value.toLowerCase())
            }
          />
        </div>
        {data.address_location ? (
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
            defaultValue={data.address_location ? data.address_location : ""}
            onChange={({ target }) =>
              handleChange("address_location", target.value.toLowerCase())
            }
          />
        </div>
      </div>
      <div className="col">
        {data.address_state ? (
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
            defaultValue={data.address_state ? data.address_state : ""}
            onChange={({ target }) =>
              handleChange("address_state", target.value.toLowerCase())
            }
          />
        </div>
        {data.address_zip ? (
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
            defaultValue={data.address_zip ?? ""}
            onChange={({ target }) =>
              handleChange("address_zip", target.value.toLowerCase())
            }
          />
        </div>
      </div>
    </>
  );
}
