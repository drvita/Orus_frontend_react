import React, { Component } from "react";

export default class GraduacionExam extends Component {
  render() {
    const { readOnly } = this.props;

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
              <td>
                <input
                  type="number"
                  name="esferaod"
                  min="-20"
                  max="20"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.esferaod ? this.props.esferaod.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="cilindrod"
                  min="-20"
                  max="0"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.cilindrod ? this.props.cilindrod.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="ejeod"
                  min="0"
                  max="180"
                  step="1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  placeholder="°"
                  value={this.props.ejeod ? parseInt(this.props.ejeod) : ""}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="adiciond"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.adiciond ? this.props.adiciond.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dpod"
                  min="40"
                  max="80"
                  step=".1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={this.props.dpod ? this.props.dpod.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="alturaod"
                  min="0"
                  max="35"
                  step=".1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.alturaod ? this.props.alturaod.toFixed(1) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>I</label>
                <i className="fa fa-eye"></i>
              </td>
              <td>
                <input
                  type="number"
                  name="esferaoi"
                  min="-20"
                  max="20"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.esferaoi ? this.props.esferaoi.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="cilindroi"
                  min="-20"
                  max="0"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.cilindroi ? this.props.cilindroi.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="ejeoi"
                  min="0"
                  max="180"
                  step="1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  placeholder="°"
                  value={this.props.ejeoi ? parseInt(this.props.ejeoi) : ""}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="adicioni"
                  min="0"
                  max="3"
                  step=".25"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.adicioni ? this.props.adicioni.toFixed(2) : ""
                  }
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dpoi"
                  min="40"
                  max="80"
                  step=".1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={this.props.dpoi ? this.props.dpoi.toFixed(1) : ""}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="alturaoi"
                  min="0"
                  max="35"
                  step=".1"
                  className={
                    readOnly ? "form-control disabled" : "form-control"
                  }
                  disabled={readOnly ? true : false}
                  value={
                    this.props.alturaoi ? this.props.alturaoi.toFixed(1) : ""
                  }
                  onChange={this.catchInputs}
                />
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
                  value={this.props.lcmarca}
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
                  value={this.props.lcgod ? this.props.lcgod : ""}
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
                  value={this.props.lcgoi ? this.props.lcgoi : ""}
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
