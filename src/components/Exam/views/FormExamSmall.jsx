/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function FormExamSmall({ data, handleEdit: _handleEdit }) {
  const [state, setState] = useState({
    adicion_media_od: 0,
    adicion_media_oi: 0,
    dpod: 0,
    dpoi: 0,
  });
  const handleOnChange = ({ value, name }) => {
    setState({
      ...state,
      [name]: parseInt(value),
    });
  };

  useEffect(() => {
    setState({
      ...state,
      adicion_media_od: data.adicion_media_od,
      adicion_media_oi: data.adicion_media_od,
      dpod: data.adicion_media_od,
      dpoi: data.adicion_media_od,
    });
  }, []);
  return (
    <>
      <div className="row text-sm">
        <div className="col-md-6 col-sm-12">
          <i className="fas fa-eye mr-1" /> Derecho
        </div>
        <div className="col-md-6 col-sm-12">
          <i className="fas fa-eye mr-1" /> Izquierdo
        </div>
      </div>

      <div className="row mt-2 text-sm">
        <div className="col-12 text-center">
          <label>Adicion media</label>
        </div>
      </div>
      <div className="row mt-2 text-sm">
        <div className="col-md-6 col-sm-12">
          <input
            type="text"
            className="form-control"
            value={state.adicion_media_od}
            name="adicion_media_od"
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <input
            type="text"
            className="form-control"
            value={state.adicion_media_oi}
            name="adicion_media_oi"
            onChange={handleOnChange}
          />
        </div>
      </div>

      <div className="row mt-2 text-sm">
        <div className="col-12 text-center">
          <label>Distancia pupilar</label>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6 col-sm-12">
          <input
            type="text"
            className="form-control"
            value={state.dpod}
            name="dpod"
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <input
            type="text"
            className="form-control"
            value={state.dpoi}
            name="dpoi"
            onChange={handleOnChange}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12 text-right">
          <button className="btn btn-secondary mr-1" onClick={_handleEdit}>
            <i className="fas fa-ban mr-2"></i>
            Cancelar
          </button>
          <button
            className="btn btn-warning"
            disabled={true}
          >
            <i className="fas fa-save mr-2"></i>
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
