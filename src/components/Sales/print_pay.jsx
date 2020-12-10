import React, { Component } from "react";

export default class printPay extends Component {
  render() {
    const { id, client } = this.props;

    return (
      <div className="d-none d-print-block" style={{ width: 340 }} id={id}>
        <div className="row">
          <div className="col">
            <div className="card m-0">
              <div className="card-body">
                <h1 className="text-center">
                  <center>
                    <strong>Óptica Madero</strong>
                  </center>
                </h1>
                <h3>
                  <em>
                    Julio Cesar Cardenas Martinez
                    <br />
                    Tel: 312 312 5353
                    <br />
                    Av. Tecnologico 38-A, Vistahermosa, Colima, Col.
                  </em>
                </h3>
                <hr />
                <h4 className="text-uppercase">
                  {client && client.nombre ? client.nombre.toUpperCase() : null}
                  <br />
                  {client.telefonos
                    ? client.telefonos[0]
                      ? client.telefonos[0]
                      : client.telefonos[2]
                    : "--"}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <center>
              <h2 className="text-center">Abono</h2>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
