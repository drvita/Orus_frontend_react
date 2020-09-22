import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
//import "moment/locale/es";

export default class searchContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacto: "",
      data: [],
      dataContact: {},
      load: true,
    };
  }
  componentDidMount() {
    //identificador del contacto
    let id = this.props.contact;
    if (id) {
      this.setState({
        load: true,
      });
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
    if (this.props.contact) {
      if (this.state.load) {
        return (
          <div className="card card-danger card-outline">
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
        let {
            nombre,
            telefonos,
            domicilio,
            id,
            f_nacimiento,
          } = this.state.dataContact,
          edad = this.props.edad
            ? this.props.edad + " años"
            : moment(f_nacimiento).fromNow(true);

        return (
          <div className="card card-danger card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                <img
                  className="profile-user-img img-fluid img-circle"
                  src="https://uybor.uz/borless/uybor/img/user-images/no-avatar.png"
                  alt="User Avatar"
                />
              </div>

              <h3 className="profile-username text-center text-capitalize">
                {nombre}
              </h3>
              <p className="text-muted text-center">
                {telefonos.replace(/,/gi, ", ")}
              </p>
              <p className="text-muted text-center">
                {domicilio.replace(/,/gi, ", ")}
              </p>

              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Edad:</b>
                  <span className="float-right">
                    {f_nacimiento ? edad : "--"}
                  </span>
                </li>
                <li className="list-group-item">
                  <b>#Contacto:</b>
                  <span className="float-right">{id}</span>
                </li>
              </ul>
              {!this.props.status ? (
                <div className="btn-group btn-block" role="group">
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
              ) : (
                ""
              )}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="card card-danger card-outline">
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
                className="form-control"
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
                        className="text-muted text-capitalize"
                        onClick={(e) => {
                          this.handleClickContact(e, contact.id);
                        }}
                      >
                        <i className="fas fa-user mr-1"></i>
                        {contact.nombre}
                      </a>
                      {!contact.id ? (
                        <p>
                          <Link
                            to="/contactos/registro/"
                            className="btn btn-primary"
                            onClick={(e) => {
                              this.handleChangePage("/contactos/registro/");
                            }}
                          >
                            <i className="fas fa-user mr-1"></i>
                            <b>Agregar nuevo paciente</b>
                          </Link>
                        </p>
                      ) : (
                        ""
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  }

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
      .then((res) => res.json())
      .then((data) => {
        console.log("Descargando contacto");
        this.setState({
          dataContact: data.data,
          load: false,
        });
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
    if (window.confirm("¿Realmente desea cambiar de paciente?")) {
      this.setState({
        contacto: "",
        data: [],
        dataContact: {},
      });
      this.props.getIdContact(0);
    }
  };
  handleClickContact = (e, id) => {
    e.preventDefault();
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
        return false;
      } else {
        return true;
      }
    });
  };
  getContacts = (word) => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/contacts",
      type = "&type=0",
      search = word ? `&search=${word}` : "",
      page = "?page=1";
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
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length) {
          console.log("Almacenando contactos");
          this.setState({
            data: data.data,
          });
        } else {
          this.setState({
            data: [
              {
                id: 0,
                nombre: "No hay contactos para: " + word,
              },
            ],
          });
        }
      });
  };
  handleSearcContact = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
}
