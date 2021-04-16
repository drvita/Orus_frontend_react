import React, { Component } from "react";

export default class GraduacionExam extends Component {
  render() {
    const {
      readOnly,
      cilindrod,
      cilindroi,
      esferaod,
      esferaoi,
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
      lcmarca,
      lcgod,
      lcgoi,
    } = this.props;

    return (
      <React.Fragment>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Esfera</th>
              <th>Cilindro</th>
              <th>Eje</th>
              <th>Adici&oacute;n</th>
              <th>Adici&oacute;n media</th>
              <th>D/P</th>
              <th>Altura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label>D</label>
                <i className="fa fa-eye"></i>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="esferaod"
                  min="-20"
                  max="20"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={esferaod ? esferaod.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{esferaod.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="cilindrod"
                  min="-20"
                  max="0"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={cilindrod ? cilindrod.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{cilindrod.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="ejeod"
                  min="0"
                  max="180"
                  step="1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  placeholder="°"
                  value={ejeod ? parseInt(ejeod) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{parseInt(ejeod)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="adiciond"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={adiciond ? adiciond.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{adiciond.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="adicion_media_od"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={adicion_media_od ? adicion_media_od.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">
                  {adicion_media_od.toFixed(2)}
                </h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="dpod"
                  min="40"
                  max="80"
                  step=".1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={dpod ? dpod.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{dpod.toFixed(1)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="alturaod"
                  min="0"
                  max="35"
                  step=".1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={alturaod ? alturaod.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{alturaod.toFixed(1)}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <label>I</label>
                <i className="fa fa-eye"></i>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="esferaoi"
                  min="-20"
                  max="20"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={esferaoi ? esferaoi.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{esferaoi.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="cilindroi"
                  min="-20"
                  max="0"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={cilindroi ? cilindroi.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{cilindroi.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="ejeoi"
                  min="0"
                  max="180"
                  step="1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  placeholder="°"
                  value={ejeoi ? parseInt(ejeoi) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{parseInt(ejeoi)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="adicioni"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={adicioni ? adicioni.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{adicioni.toFixed(2)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="adicion_media_oi"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={adicion_media_oi ? adicion_media_oi.toFixed(2) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">
                  {adicion_media_oi.toFixed(2)}
                </h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="dpoi"
                  min="40"
                  max="80"
                  step=".1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={dpoi ? dpoi.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{dpoi.toFixed(1)}</h5>
              </td>
              <td className="text-right">
                <input
                  type="number"
                  name="alturaoi"
                  min="0"
                  max="35"
                  step=".1"
                  className={
                    readOnly
                      ? "form-control d-print-none disabled"
                      : "form-control d-print-none"
                  }
                  disabled={readOnly ? true : false}
                  value={alturaoi ? alturaoi.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{alturaoi.toFixed(1)}</h5>
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="list-group d-print-none mt-4">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-12">
                Lente de contacto
                <input
                  type="text"
                  name="lcmarca"
                  maxLength="70"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={lcmarca}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="text"
                  name="lcgod"
                  maxLength="30"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={lcgod ? lcgod : ""}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="text"
                  name="lcgoi"
                  maxLength="30"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={lcgoi ? lcgoi : ""}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
          </li>
        </ul>
      </React.Fragment>
    );
  }

  catchInputs = (e) => {
    const { name, type, value, checked } = e.target;
    let val = value;

    if (type === "checkbox") val = checked;
    if (type === "text") val = value.toLowerCase();
    if (type === "number") {
      if (name === "ejeod" || name === "ejeoi") {
        val = parseInt(value);
      } else {
        val = parseFloat(value);
        val = val.toFixed(2);
        val = parseFloat(val);
      }
    }
    this.props.onChangeInput(name, val);
  };
}
