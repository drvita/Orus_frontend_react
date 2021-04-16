import React, { Component } from "react";

export default class contactDataVertical extends Component {
  render() {
    const contact = JSON.parse(localStorage.getItem("OrusContactInUse"));
    console.log("[Contact][Datavertical] Recogiendo valores de localStorage");
    return (
      <div className="col">
        <label>Nombre de paciente: </label>
        <h3 className="ml-2 text-capitalize">
          <i className="fas fa-user"></i> {contact.nombre}
        </h3>
      </div>
    );
  }
}
