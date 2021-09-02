import React, { Component } from "react";

export default class LabOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplies: [],
    };
  }
  componentDidMount() {
    this.getContacts();
  }

  render() {
    const { lab_id, status, npedidolab } = this.props,
      { supplies } = this.state;

    return (
      <div className="row m-2">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Laboratorio</label>
            <select
              className={status > 1 ? "form-control disabled" : "form-control"}
              disabled={status > 1 ? true : false}
              name="lab_id"
              defaultValue={lab_id}
              onChange={this.changeInput}
            >
              <option value="0">Seleccione un proveedor</option>
              {supplies && supplies.length
                ? supplies.map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Folio</label>
            <input
              type="text"
              className={status > 1 ? "form-control disabled" : "form-control"}
              disabled={status > 1 ? true : false}
              name="npedidolab"
              defaultValue={npedidolab ? npedidolab : ""}
              onChange={this.changeInput}
            />
          </div>
        </div>
      </div>
    );
  }

  changeInput = (e) => {
    const { ChangeInput } = this.props;

    e.preventDefault();
    let { name, value } = e.target;
    if (ChangeInput) ChangeInput(name, parseInt(value));
  };
  getContacts = () => {
    //Variables en localStorage
    const { host, token } = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + host + "/api/contacts",
      type = "&type=1&business=1",
      page = "?page=1";

    console.log("[Orus System] Descargando proveedores");
    //Realiza la peticion de los contactos
    fetch(url + page + type, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.data) {
          this.setState({
            supplies: data.data,
          });
        }
      });
  };
}
