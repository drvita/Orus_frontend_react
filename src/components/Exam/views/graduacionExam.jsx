import { Component } from "react";

export default class GraduacionExamComponent extends Component {
  render() {
    const {
      readOnly = false,
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
      showContactGlasses = true,
    } = this.props;

    return (
      <>
        <table className="table">
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
                <i className="fa fa-eye mr-1" title="Ojo derecho"></i>
                <span className="text-sm d-block">Derecho</span>
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
                  defaultValue={esferaod ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{esferaod ?? ""}</h5>
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
                  defaultValue={cilindrod ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{cilindrod ?? ""}</h5>
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
                  defaultValue={ejeod ? parseInt(ejeod) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{ejeod ?? ""}</h5>
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
                  defaultValue={adiciond ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{adiciond ?? ""}</h5>
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
                  defaultValue={adicion_media_od ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">
                  {adicion_media_od ?? ""}
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
                  defaultValue={dpod ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{dpod ?? ""}</h5>
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
                  defaultValue={alturaod ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{alturaod ?? ""}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-eye ml-1" title="Ojo izquierdo"></i>
                <span className="text-sm d-block">Izquierdo</span>
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
                  defaultValue={esferaoi ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{esferaoi ?? ""}</h5>
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
                  defaultValue={cilindroi ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{cilindroi ?? ""}</h5>
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
                  defaultValue={ejeoi ? parseInt(ejeoi) : ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{ejeoi ?? ""}</h5>
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
                  defaultValue={adicioni ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{adicioni ?? ""}</h5>
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
                  defaultValue={adicion_media_oi ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">
                  {adicion_media_oi ?? ""}
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
                  defaultValue={dpoi ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{dpoi ?? ""}</h5>
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
                  defaultValue={alturaoi ?? ""}
                  onChange={this.catchInputs}
                />
                <h5 className="d-none d-print-block">{alturaoi ?? ""}</h5>
              </td>
            </tr>
          </tbody>
        </table>
        {showContactGlasses && (
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
                    defaultValue={lcmarca ?? ""}
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
                    defaultValue={lcgod ? lcgod : ""}
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
                    defaultValue={lcgoi ? lcgoi : ""}
                    onChange={this.catchInputs}
                  />
                </div>
              </div>
            </li>
          </ul>
        )}
      </>
    );
  }

  catchInputs = (e) => {
    const { name, type, value, checked } = e.target,
      { onChangeInput } = this.props;
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
    if (onChangeInput) onChangeInput(name, val);
  };
}
