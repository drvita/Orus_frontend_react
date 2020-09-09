import React, { Component } from "react";

export default class AgudezaExam extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" id="heading5">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left text-info collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#caja5"
              aria-expanded="false"
              aria-controls="caja5"
            >
              Capacidad y agudeza visual
            </button>
          </h2>
        </div>
        <div
          id="caja5"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">Capacidad visual</div>
            </div>
            <div className="row">
              <div className="col-3">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="text"
                  name="cvod"
                  maxLength="12"
                  className="form-control"
                  value={this.props.cvod}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-3">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="text"
                  name="cvoi"
                  maxLength="12"
                  className="form-control"
                  value={this.props.cvoi}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">Agudeza visual (Sin lentes)</div>
              <div className="col-md-6">
                Agudeza visual (con la graduaci&oacute;n anterior)
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="text"
                  name="avslod"
                  maxLength="12"
                  className="form-control"
                  value={this.props.avslod}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-3">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="text"
                  name="avsloi"
                  maxLength="12"
                  className="form-control"
                  value={this.props.avsloi}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <input
                  type="text"
                  name="avcgaod"
                  maxLength="12"
                  className="form-control input-xs"
                  value={this.props.avcgaod}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <input
                  type="text"
                  name="avcgaoi"
                  maxLength="12"
                  className="form-control input-xs"
                  value={this.props.avcgaoi}
                  onChange={this.catchInputs}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">Agudeza visual final</div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Derecho</label>
                <br />
                <input
                  type="text"
                  name="avfod"
                  maxLength="12"
                  className="form-control"
                  value={this.props.avfod}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-3">
                <i className="fa fa-eye"></i> <label>Izquierdo</label>
                <br />
                <input
                  type="text"
                  name="avfoi"
                  maxLength="12"
                  className="form-control"
                  value={this.props.avfoi}
                  onChange={this.catchInputs}
                />
              </div>
              <div className="col-md-4">
                <i className="fa fa-eye"></i>
                <i className="fa fa-eye"></i> <label>Ambos</label>
                <br />
                <input
                  type="text"
                  name="avf2o"
                  maxLength="25"
                  className="form-control"
                  value={this.props.avf2o}
                  onChange={this.catchInputs}
                />
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
