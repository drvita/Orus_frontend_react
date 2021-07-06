import React, { Component } from "react";
import moment from "moment";
import Graduacion from "./graduacionExam";

export default class printExam extends Component {
  render() {
    const {
      esferaod,
      esferaoi,
      cilindrod,
      cilindroi,
      ejeod,
      ejeoi,
      adiciond,
      adicioni,
      adicion_media_od,
      adicion_media_oi,
      dpod,
      dpoi,
      alturaod,
      alturaoi,
      diagnostico,
      presbicie,
      paciente,
    } = this.props;
    return (
      <div className="card d-none d-print-block">
        <div className="row">
          <div className="col">
            <h4>
              Optica Madero
              <br />
              <small>312 312 5353</small>
            </h4>
          </div>
          <div className="col-3 text-right">{moment().format("LLL")}</div>
        </div>
        <div className="row pt-4">
          <div className="col text-left">
            <label className="mr-2">Nombre del paciente</label>
            <span className="text-uppercase">{paciente.nombre}</span>
          </div>
          <div className="col left">
            <label className="mr-2">Diagnostico:</label>
            {diagnostico}
          </div>
          <div className="col-2 text-right">
            <label className="mr-2">Presbicie:</label>
            {presbicie ? "SI" : "NO"}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Graduacion
              esferaod={esferaod}
              esferaoi={esferaoi}
              cilindrod={cilindrod}
              cilindroi={cilindroi}
              ejeod={ejeod}
              ejeoi={ejeoi}
              adiciond={adiciond}
              adicioni={adicioni}
              adicion_media_od={adicion_media_od}
              adicion_media_oi={adicion_media_oi}
              dpod={dpod}
              dpoi={dpoi}
              alturaod={alturaod}
              alturaoi={alturaoi}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="card-text text-center mt-4 pt-4">
              <h4>Julio Cárdenas Martinez</h4>
              Optometrista contactologo
              <br />
              UAG
              <br />
              CED PROF. 2413419
            </p>
          </div>
        </div>
      </div>
    );
  }
}
