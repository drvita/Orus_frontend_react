import React, { Component } from "react";
import { Link } from "react-router-dom";
import Easycontact from "./easyContact";
import moment from "moment";

export default class searchContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacto: "",
      data: [],
      dataContact: {},
      load: false,
      edad: 30,
    };
  }
  componentDidMount() {
    //identificador del contacto
    let id = this.props.contact;
    if (id) {
      this.getContact(id);
    } else {
      this.contactInput.focus();
    }
  }
  componentDidUpdate(props, state) {
    if (state.contacto !== this.state.contacto) {
      if (this.state.contacto.length > 2) {
        this.getContacts(this.state.contacto);
      } else {
        this.setState({
          data: [],
        });
      }
    }
    if (props.contact !== this.props.contact && this.props.contact) {
      this.setState({
        load: true,
      });
      this.getContact(this.props.contact);
    }
  }

  render() {
    const { load } = this.state;

    if (this.props.contact) {
      if (load) {
        return (
          <div className="card card-danger card-outline d-print-none">
            <div className="card-body box-profile">
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (Object.keys(this.state.dataContact).length) {
        const {
            nombre,
            telefonos,
            domicilio,
            id,
            f_nacimiento,
          } = this.state.dataContact,
          edad =
            typeof this.props.edad === "number" && this.props.edad
              ? this.props.edad + " años"
              : f_nacimiento
              ? moment(f_nacimiento).fromNow(true)
              : 0;

        return (
          <div className="card card-danger card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                <img
                  className="profile-user-img img-fluid img-circle"
                  src="/img/avatars/no-avatar.png"
                  alt="User Avatar"
                />
              </div>

              <h3 className="profile-username text-center text-capitalize">
                {nombre}
              </h3>
              <h6 className="text-muted text-center">
                {telefonos.t_movil ? (
                  <span>Movil: {telefonos.t_movil}</span>
                ) : telefonos.t_casa ? (
                  <span>Casa: {telefonos.t_casa}</span>
                ) : telefonos.t_oficina ? (
                  <span>Oficina: {telefonos.t_oficina}</span>
                ) : (
                  <span className="text-danger">Capture el telefono</span>
                )}
              </h6>
              <p className="text-muted text-center">
                {domicilio && domicilio.calle.length > 6
                  ? domicilio.calle
                  : null}
              </p>

              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <b>Edad:</b>

                  {edad ? (
                    <span className="badge badge-primary badge-pill">
                      {edad}
                    </span>
                  ) : (
                    <input
                      type="number"
                      name="edad"
                      className="form-control"
                      value={this.state.edad}
                      onChange={this.handleSearcContact}
                      onBlur={this.sendAge}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.sendAge(e);
                        }
                      }}
                    />
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <b>#Contacto:</b>
                  <span className="badge badge-primary badge-pill">{id}</span>
                </li>
              </ul>
              {!this.props.status ? (
                <div className="btn-group btn-block d-print-none" role="group">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.handleClickChange}
                  >
                    <i className="fas fa-exchange-alt mr-1"></i>
                    <b>Cambiar</b>
                  </button>
                  <Link
                    to={"/contactos/registro/" + id}
                    className="btn btn-danger"
                    onClick={(e) => {
                      this.handleChangePage("/contactos/registro/");
                    }}
                  >
                    <i className="fas fa-edit mr-1"></i>
                    <b>Editar</b>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return (
        <div className="card card-danger card-outline d-print-none">
          <div className="card-body">
            <label>Buscar paciente</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control text-capitalize"
                placeholder="Nombre del paciente"
                name="contacto"
                autoComplete="off"
                value={this.state.contacto}
                onChange={this.handleSearcContact}
                ref={(input) => {
                  this.contactInput = input;
                }}
              />
            </div>
            {this.state.data.length ? (
              <ul className="list-group">
                {this.state.data.map((contact) => {
                  return (
                    <li key={contact.id} className="list-group-item">
                      <a
                        href="#contact"
                        className={
                          !contact.id
                            ? "text-danger text-capitalize"
                            : "text-muted text-capitalize"
                        }
                        onClick={(e) => {
                          this.handleClickContact(e, contact.id);
                        }}
                      >
                        <i className="fas fa-user mr-1"></i>
                        {contact.nombre}
                      </a>
                      {!contact.id ? (
                        <Easycontact
                          name={this.state.contacto}
                          setContac={(id, date) => {
                            let edad =
                              moment(date)
                                .fromNow(true)
                                .replace(/[a-zA-ZñÑ]/gi, "") * 1;
                            this.setState({
                              contacto: "",
                              data: [],
                              dataContact: {},
                            });
                            console.log(
                              "[Contact][search] Almacenando datos de contacto en local storage (222)"
                            );
                            localStorage.setItem(
                              "OrusContactInUse",
                              JSON.stringify({})
                            );
                            this.props.getIdContact(id, edad);
                          }}
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : load ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  }

  sendAge = (e) => {
    const { value } = e.target,
      { id } = this.state.dataContact;

    if (value > 0 && value < 110 && id) {
      this.props.getIdContact(id, value * 1);
    }
  };
  getContact = (id) => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    //Realiza busqueda de contacto
    fetch("http://" + varLocalStorage.host + "/api/contacts/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then(async (response) => {
        let back = {};
        if (response.status !== 204) back = await response.json();
        if (!response.ok) {
          throw new Error(back.message);
        }
        return back;
      })
      .then((data) => {
        console.log("Descargando contacto");
        this.setState({
          dataContact: data.data,
          load: false,
        });
        console.log(
          "[Contact][search] Almacenando datos de contacto en local storage (284)"
        );
        localStorage.setItem("OrusContactInUse", JSON.stringify(data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleChangePage = (page) => {
    this.props.changePage(page);
  };
  handleClickChange = (e) => {
    e.preventDefault();
    if (window.confirm("¿Esta seguro?")) {
      this.setState({
        contacto: "",
        data: [],
        dataContact: {},
      });
      console.log("[Contact][search] Eliminando datos local storage (302)");
      localStorage.setItem("OrusContactInUse", JSON.stringify({}));
      this.props.getIdContact(0);
    }
  };
  handleClickContact = (e, id) => {
    if (e) e.preventDefault();
    this.state.data.map((contact) => {
      if (contact.id === id) {
        this.setState({
          contacto: "",
          data: [],
          dataContact: contact,
        });
        let edad =
          moment(contact.f_nacimiento)
            .fromNow(true)
            .replace(/[a-zA-ZñÑ]/gi, "") * 1;
        this.props.getIdContact(id, edad);
        console.log(
          "[Contact][search] Almacenando datos de contacto en local storage (323)"
        );
        localStorage.setItem("OrusContactInUse", JSON.stringify({ id }));
        return false;
      } else {
        return true;
      }
    });
  };
  getContacts = (word) => {
    let { load } = this.state;

    //Revisamos que ya este cargando
    if (!load) {
      this.setState({
        load: true,
      });
    }

    if (this.timeSave) clearTimeout(this.timeSave);
    this.timeSave = setTimeout(() => {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        url = "http://" + varLocalStorage.host + "/api/contacts",
        type = "&type=0",
        search = word ? `&search=${word}` : "",
        page = "?page=1&itemsPage=4";
      console.log("Descargando contactos de la API");
      //Realiza la peticion de los contactos
      fetch(url + page + search + type, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then(async (response) => {
          let back = {};
          if (response.status !== 204) back = await response.json();
          if (!response.ok) {
            throw new Error(back.message);
          }
          return back;
        })
        .then((data) => {
          if (data.data && data.data.length) {
            console.log("Mostrando información del contacto");
            this.setState({
              data: data.data,
              load: false,
            });
          } else {
            this.setState({
              data: [
                {
                  id: 0,
                  nombre: "No hay contactos para: " + word,
                },
              ],
              load: false,
            });
            console.log(
              "[Contact][search] Almacenando datos de contacto en local storage (387)"
            );
            localStorage.setItem(
              "OrusContactInUse",
              JSON.stringify({ name: word.toLowerCase() })
            );
          }
        })
        .catch((e) => {
          console.error("Orus fetch", e);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
        });
    }, 1500);
  };
  handleSearcContact = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === "number") val = parseInt(value);
    if (type === "text") val = value.toLowerCase();
    this.setState({
      [name]: val,
    });
  };
}
