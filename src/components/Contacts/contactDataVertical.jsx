import React, { Component } from "react";

export default class contactDataVertical extends Component {
  render() {
    const contact = JSON.parse(localStorage.getItem("OrusContactInUse"));
    console.log(
      "[Contact][Datavertical] Recogiendo valores de localStorage",
      contact
    );
    return (
      <div className="col">
        <label>Nombre de paciente: </label>
        <span className="ml-2 text-capitalize">{contact.nombre}</span>
      </div>
    );
  }
}
