import React, { Component } from "react";

export default class DiagnosticoExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="heading6">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#caja6"
              aria-expanded="false"
              aria-controls="caja6"
            >
              Diagnostico
            </button>
          </h2>
        </div>
        <div
          id="caja6"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">Tensi&oacute;n ocular</div>
            </div>
            <div className="row">
              <div className="col-md-3">
                Diagnostico
                <select
                  name="diagnostico"
                  className="form-control"
                  value={this.props.diagnostico}
                  onChange={this.catchInputs}
                >
                  <option value="Hemetrope">Hem&eacute;trope</option>
                  <option value="hipermetropia">Hipermetrop&iacute;a</option>
                  <option value="hipermetropia-astigmatismo">
                    Hipermetrop&iacute;a y astigmatismo
                  </option>
                  <option value="hipermetropia-miopia">
                    Hipermetrop&iacute;a y miop&iacute;a
                  </option>
                  <option value="astigmatismo-regla">
                    Astigmatismo con la regla
                  </option>
                  <option value="astigmatismo-contra-regla">
                    Astigmatismo contra la regla
                  </option>
                  <option value="astigmatismo-oblicuo">
                    Astigmatismo oblicuo
                  </option>
                  <option value="astigmatismo-miopia">
                    Astigmatismo/m&iacute;opico
                  </option>
                  <option value="miopia">Miop&iacute;a</option>
                </select>
              </div>
              <div className="col-md-3">
                Presbicie
                <br />
                <input
                  name="presbicie"
                  type="checkbox"
                  checked={this.props.presbicie}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="number"
                  name="piod"
                  min="0"
                  max="40"
                  step="1"
                  className="form-control"
                  value={this.props.piod}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="number"
                  name="pioi"
                  min="0"
                  max="40"
                  step="1"
                  className="form-control"
                  value={this.props.pioi}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>Tratamiento oftalmico</label>
                <textarea
                  name="txoftalmico"
                  className="form-control"
                  value={this.props.txoftalmico}
                  onChange={this.catchInputs}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
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
