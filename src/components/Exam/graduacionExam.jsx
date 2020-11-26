import React, { Component } from "react";

export default class GraduacionExam extends Component {
  render() {
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.esferaod ? this.props.esferaod : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.cilindrod ? this.props.cilindrod : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  placeholder="°"
                  value={this.props.ejeod ? this.props.ejeod : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.adiciond ? this.props.adiciond : 0}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dpod"
                  min="0"
                  max="80"
                  step=".1"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.dpod ? this.props.dpod : 0}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="alturaod"
                  min="0"
                  max="80"
                  step=".1"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.alturaod ? this.props.alturaod : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.esferaoi ? this.props.esferaoi : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.cilindroi ? this.props.cilindroi : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  placeholder="°"
                  value={this.props.ejeoi ? this.props.ejeoi : 0}
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
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.adicioni ? this.props.adicioni : 0}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dpoi"
                  min="0"
                  max="80"
                  step=".1"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.dpoi ? this.props.dpoi : 0}
                  onChange={this.catchInputs}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="alturaoi"
                  min="0"
                  max="80"
                  step=".1"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.alturaoi ? this.props.alturaoi : 0}
                  onChange={this.catchInputs}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="list-group mt-4">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-12">
                Lente de contacto
                <input
                  type="text"
                  name="lcmarca"
                  maxLength="70"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.lcmarca}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="text"
                  name="lcgod"
                  maxLength="30"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
                  value={this.props.lcgod ? this.props.lcgod : ""}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-4">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="text"
                  name="lcgoi"
                  maxLength="30"
                  className={
                    this.props.readOnly
                      ? "form-control disabled"
                      : "form-control"
                  }
                  disabled={this.props.readOnly ? true : false}
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
    const { name } = e.target,
      value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value.toLowerCase();
    this.props.onChangeInput(name, value);
  };
}
