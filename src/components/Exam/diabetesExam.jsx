import React, { Component } from "react";

export default class DiabetesExam extends Component {
  render() {
    return (
      <div className="card d-print-none">
        <div className="card-header" id="heading4">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#caja4"
              aria-expanded="false"
              aria-controls="caja4"
            >
              Diabetes
            </button>
          </h2>
        </div>
        <div
          id="caja4"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <label>Diab&eacute;tico</label>
              </div>
              <div className="col-md-4">
                <label>Fotocoagulaci&oacute;n laser</label>
              </div>
            </div>
            <div className="row">
              <div className="col-3">Fecha</div>
              <div className="col-2">Rango de glucosa</div>
              <div className="col-3">Ultimo examen</div>
              <div className="col-2">
                <div className="custom-control custom-switch">
                  <input
                    name="d_fclod"
                    type="checkbox"
                    className="custom-control-input"
                    id="d_fclod"
                    checked={this.props.d_fclod}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="d_fclod">
                    <i className="fa fa-eye"></i> Derecho
                  </label>
                </div>
              </div>
              <div className="col-2">
                <div className="custom-control custom-switch">
                  <input
                    name="d_fcloi"
                    type="checkbox"
                    className="custom-control-input"
                    id="d_fcloi"
                    checked={this.props.d_fcloi}
                    onChange={this.catchInputs}
                  />
                  <label className="custom-control-label" htmlFor="d_fcloi">
                    <i className="fa fa-eye"></i> Izquierdo
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="date"
                  name="d_time"
                  className="form-control"
                  value={this.props.d_time}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="d_media"
                  className="form-control"
                  value={this.props.d_media}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  name="d_test"
                  className="form-control"
                  value={this.props.d_test}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="d_fclod_time"
                  className="form-control"
                  value={this.props.d_fclod_time}
                  onChange={this.catchInputs}
                  readOnly={this.props.d_fclod ? "" : "readonly"}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="d_fcloi_time"
                  className="form-control"
                  value={this.props.d_fcloi_time}
                  onChange={this.catchInputs}
                  readOnly={this.props.d_fcloi ? "" : "readonly"}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>Oftalmoscopia</label>
                <textarea
                  name="oftalmoscopia"
                  className="form-control"
                  value={this.props.oftalmoscopia}
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
