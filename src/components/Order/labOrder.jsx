import React, { Component } from "react";

export default class labOrder extends Component {
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
    return (
      <div className="row m-2">
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Laboratorio</label>
            <select
              className={
                this.props.status > 1 ? "form-control disabled" : "form-control"
              }
              disabled={this.props.status > 1 ? true : false}
              name="lab_id"
              value={this.props.lab_id}
              onChange={this.changeInput}
            >
              <option value="0">Seleccione un proveedor</option>
              {this.state.supplies.length
                ? this.state.supplies.map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="border border-warning rounded p-2">
            <label>Folio</label>
            <input
              type="text"
              className={
                this.props.status > 1 ? "form-control disabled" : "form-control"
              }
              disabled={this.props.status > 1 ? true : false}
              name="npedidolab"
              value={this.props.npedidolab ? this.props.npedidolab : ""}
              onChange={this.changeInput}
            />
          </div>
        </div>
      </div>
    );
  }

  changeInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.props.ChangeInput(name, value);
  };
  getContacts = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/contacts",
      type = "&type=1&business=1",
      //search = word ? `&search=${word}` : "",
      page = "?page=1";
    console.log("Descargando proveedores de la API");
    //Realiza la peticion de los contactos
    fetch(url + page + type, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
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
          console.log("Almacenado proveedores");
          this.setState({
            supplies: data.data,
          });
        }
      });
  };
}
