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
      dpod,
      dpoi,
      alturaod,
      alturaoi,
      diagnostico,
      presbicie,
    } = this.props;
    return (
      <div className="card d-none d-print-block">
        <div className="row">
          <div className="col">
            <h5>
              Optica Madero
              <br />
              <small>312 312 5353</small>
            </h5>
          </div>
          <div className="col-3">{moment().format("LLL")}</div>
        </div>
        <div className="row">
          <div className="col">
            <label className="mr-2">Diagnostico:</label>
            {diagnostico}
          </div>
          <div className="col-4">
            <label className="mr-2">presbicie:</label>
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
              dpod={dpod}
              dpoi={dpoi}
              alturaod={alturaod}
              alturaoi={alturaoi}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="card-text text-center">
              Julio Cárdenas Martinez
              <br />
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
