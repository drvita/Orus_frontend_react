import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Mapa from "./mapa";
import ListExam from "../Exam/listForId";

export default class ContactsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      rfc: "",
      email: "",
      type: 0,
      birthday: "",
      calle: "",
      colonia: "",
      municipio: "",
      estado: "",
      cp: "",
      t_casa: "",
      t_oficina: "",
      t_movil: "",
      business: false,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    if (id > 0) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Realiza la peticion del usuario seun el id
      console.log("Descargando datos del contacto");
      fetch("http://" + varLocalStorage.host + "/api/contacts/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let domicilio = data.data.domicilio.split(","),
            telefonos = data.data.telefonos.split(",");
          console.log("Mostrando datos del contacto");
          this.setState({
            id: data.data.id,
            name: data.data.nombre,
            rfc: data.data.rfc,
            email: data.data.email,
            type: data.data.tipo,
            business: data.data.empresa,
            birthday: data.data.f_nacimiento,
            calle: domicilio[0] ? domicilio[0].replace(/undefined/g, "") : "",
            colonia: domicilio[1] ? domicilio[1].replace(/undefined/g, "") : "",
            municipio: domicilio[2]
              ? domicilio[2].replace(/undefined/g, "")
              : "",
            estado: domicilio[3] ? domicilio[3].replace(/undefined/g, "") : "",
            cp: domicilio[4] ? domicilio[4].replace(/undefined/g, "") : "",
            t_casa: telefonos[0] ? telefonos[0].replace(/undefined/g, "") : "",
            t_oficina: telefonos[1]
              ? telefonos[1].replace(/undefined/g, "")
              : "",
            t_movil: telefonos[2] ? telefonos[2].replace(/undefined/g, "") : "",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.nameInput.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-danger card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-address-book"></i>
                  &nbsp;&nbsp;&nbsp;
                  {this.state.id
                    ? "Editar contacto"
                    : "Registrar nuevo contacto"}
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <small>
                      <label>Tipo de cliente</label>
                    </small>
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-clipboard-check"></i>
                        </span>
                      </div>
                      <select
                        className="custom-select"
                        name="type"
                        value={this.state.type}
                        onChange={this.catchInputs}
                      >
                        <option value="0">Cliente</option>
                        <option value="1">Proveedor</option>
                      </select>
                    </div>

                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <input
                          type="checkbox"
                          name="business"
                          className="mr-2"
                          checked={this.state.business}
                          onChange={this.catchInputs}
                        />
                        <small>
                          <label>¿Es una empresa?</label>
                        </small>
                      </div>
                    </div>

                    {this.state.name ? (
                      <small>
                        <label>Nombre completo</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-id-card-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Nombre completo"
                        ref={(input) => {
                          this.nameInput = input;
                        }}
                        name="name"
                        value={this.state.name}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.rfc ? (
                      <small>
                        <label>RFC</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-file-invoice-dollar"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-uppercase"
                        placeholder="RFC"
                        name="rfc"
                        value={this.state.rfc ? this.state.rfc : ""}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.email ? (
                      <small>
                        <label>Correo electronico</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-at"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electronico"
                        name="email"
                        value={this.state.email ? this.state.email : ""}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {!this.state.business && !this.state.type ? (
                      <React.Fragment>
                        {this.state.birthday ? (
                          <small>
                            <label>Fecha de nacimiento</label>
                          </small>
                        ) : (
                          <br />
                        )}
                        <div className="input-group mb-1">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-calendar-check"></i>
                            </span>
                          </div>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Fecha de nacimiento"
                            name="birthday"
                            value={
                              this.state.birthday ? this.state.birthday : ""
                            }
                            onChange={this.catchInputs}
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col">
                    {this.state.calle ? (
                      <small>
                        <label>Calle y numero</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-road"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Calle y numero"
                        name="calle"
                        value={this.state.calle}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.colonia ? (
                      <small>
                        <label>Colonia</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-location-arrow"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Colonia"
                        name="colonia"
                        value={this.state.colonia}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.municipio ? (
                      <small>
                        <label>Municipio</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-location-arrow"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Municipio"
                        name="municipio"
                        value={this.state.municipio}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.estado ? (
                      <small>
                        <label>Estado</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-map-marker"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Estado"
                        name="estado"
                        value={this.state.estado}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.cp ? (
                      <small>
                        <label>Codigo postal</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-map-marker"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Codigo Postal"
                        name="cp"
                        value={this.state.cp}
                        onChange={this.catchInputs}
                      />
                    </div>
                  </div>
                  <div className="col">
                    {this.state.t_casa ? (
                      <small>
                        <label>Telefono de casa</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-phone"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefono de casa"
                        name="t_casa"
                        value={this.state.t_casa}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.t_oficina ? (
                      <small>
                        <label>Telefono de oficina</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-phone-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefono de oficina"
                        name="t_oficina"
                        value={this.state.t_oficina}
                        onChange={this.catchInputs}
                      />
                    </div>
                    {this.state.t_movil ? (
                      <small>
                        <label>Telefono celular</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-mobile-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefono celular"
                        name="t_movil"
                        value={this.state.t_movil}
                        onChange={this.catchInputs}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-group float-right" role="group">
                      <Link
                        to="/contactos"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          this.changePage("/contactos");
                        }}
                      >
                        Cancelar
                      </Link>
                      <button
                        type="submit"
                        className={
                          this.state.name &&
                          (this.state.t_casa ||
                            this.state.t_oficina ||
                            this.state.t_movil)
                            ? "btn btn-danger"
                            : "btn btn-danger disabled"
                        }
                        disabled={
                          this.state.name &&
                          (this.state.t_casa ||
                            this.state.t_oficina ||
                            this.state.t_movil)
                            ? ""
                            : "disabled"
                        }
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.calle && !this.state.type ? (
            <div className="col">
              <Mapa
                calle={this.state.calle}
                colonia={this.state.colonia}
                municipio={this.state.municipio}
                estado={this.state.estado}
                cp={this.state.cp}
                changeAddress={this.changeAddress}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.id && !this.state.type ? (
            <div className="col">
              <ListExam
                id={this.state.id}
                page={this.changePage}
                edad={
                  moment(this.state.birthday)
                    .fromNow(true)
                    .replace(/[a-zA-ZñÑ]/gi, "") * 1
                }
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    );
  }

  changeAddress = (json) => {
    this.setState(json);
  };
  changePage = (e) => {
    this.props.page(e);
  };
  catchInputs = (e) => {
    const { name } = e.target,
      value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value.toLowerCase();
    this.setState({
      [name]: value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar la accion?");
    if (conf) {
      //Variables en localStorage
      console.log("Enviando datos a API para almacenar");
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Extraemos Datos del formulario
      let {
        id,
        name,
        rfc,
        email,
        type,
        birthday,
        calle,
        colonia,
        municipio,
        estado,
        cp,
        t_casa,
        t_oficina,
        t_movil,
        business,
      } = this.state;
      // Procesamos variables
      //Creamos el body
      let body = {
        name,
        rfc,
        email,
        type,
        birthday: business ? "" : birthday,
        business,
        domicilio:
          calle + "," + colonia + "," + municipio + "," + estado + "," + cp,
        telnumbers: t_casa + "," + t_oficina + "," + t_movil,
      };
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      let url = id
          ? "http://" + varLocalStorage.host + "/api/contacts/" + id
          : "http://" + varLocalStorage.host + "/api/contacts",
        method = id ? "PUT" : "POST";
      //Actualiza el contacto o creamos el contacto
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
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
            console.log("Contacto almacenado");
            if (
              window.confirm(
                "Contacto almacenado con exito!.\n¿Desea cerrar este contacto?"
              )
            ) {
              this.props.history.goBack();
            }
          } else console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}
