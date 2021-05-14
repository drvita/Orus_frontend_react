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
      edad: 0,
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
    //console.log("[DEBUG] render: ", this.state.dataContact);

    if (this.props.contact) {
      if (this.state.dataContact && this.state.dataContact.id) {
        const { nombre, id, email } = this.state.dataContact,
          domain = /.*@domain(.com)?/gim;
        console.log(
          "[searchContactCard] Almacenando datos de contacto en local storage"
        );
        localStorage.setItem(
          "OrusContactInUse",
          JSON.stringify({
            id,
            nombre,
          })
        );

        return (
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-user mr-2"></i> Paciente:
              </span>
            </div>
            <input
              type="text"
              className="form-control text-capitalize"
              value={
                email && !domain.exec(email)
                  ? nombre + " [" + email + "]"
                  : nombre
              }
              readOnly={true}
            />

            <div className="float-right">
              {!this.props.status ? (
                <div className="btn-group btn-sm d-print-none">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={this.handleClickChange}
                  >
                    <i className="fas fa-exchange-alt mr-1"></i>
                    <b>Cambiar</b>
                  </button>
                  <Link
                    to={"/contactos/registro/" + id}
                    className="btn btn-danger btn-sm"
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
        return (
          <div className="callout callout-danger">
            <h5>
              <i className="fas fa-danger"></i> Error:
            </h5>
            Se perdio el identificardo del cliente
          </div>
        );
      }
    } else {
      return (
        <React.Fragment>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-user mr-2"></i> Paciente:
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
            {load ? (
              <div className="float-right ml-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
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
                            "[searchContactLine] Almacenando datos de contacto en local storage"
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
          ) : null}
        </React.Fragment>
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
          "[Contact][search] Almacenando datos de contacto en local storage"
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
      console.log("[Contact][search] Eliminando datos local storage");
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
          "[Contact][search] Almacenando datos de contacto en local storage"
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
              "[Contact][search] Almacenando datos de contacto en local storage"
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
