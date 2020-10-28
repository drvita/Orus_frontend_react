import React, { Component } from "react";

export default class NameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: props.validName ? "bg-blue" : "bg-red",
      validate: props.validName ? "" : " border border-danger",
      text: "Debe de tener por lo menos nombre y apellido",
      searchUser: false,
      contacts: [],
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timeFetch = null;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidUpdate(props) {
    if (props.validName !== this.props.validName) {
      this.setState({
        bgColor: this.props.validName ? "bg-blue" : "bg-red",
        validate: this.props.validName ? "" : " border border-danger",
      });
    }
  }

  render() {
    let { name, validName } = this.props;
    let { bgColor, validate, text, searchUser, contacts } = this.state;
    if (!name) name = "";
    return (
      <React.Fragment>
        {name ? (
          <div className="ml-2 mt-1">
            <small>
              <label>Nombre completo</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mb-1">
          <div className="input-group-prepend">
            <span className={"input-group-text " + bgColor}>
              {searchUser ? (
                <i className="fas fa-spinner"></i>
              ) : (
                <i className="fas fa-id-card-alt"></i>
              )}
            </span>
          </div>
          <input
            type="text"
            className={"form-control text-capitalize" + validate}
            placeholder="Nombre completo"
            name="name"
            value={name}
            onChange={this.handleChange}
            autoFocus={!name.length ? true : false}
            autoComplete="off"
            required="required"
            pattern="^[a-zA-Z.]{2,20}[\s]{1}[a-zA-Z.]{2,20}.*"
            minLength="8"
            list="contactos_db"
          />
        </div>
        {contacts.length ? (
          <datalist id="contactos_db">
            {contacts.map((contact) => {
              return (
                <option
                  key={contact.id}
                  value={this.eraseTilde(contact.nombre)}
                />
              );
            })}
          </datalist>
        ) : null}
        {!validName ? (
          <div className="p-0">
            <small className="text-danger">{text}</small>
          </div>
        ) : null}
      </React.Fragment>
    );
  }

  eraseTilde = (string) => {
    string = string.replace(new RegExp(/[àáâãäå]/g), "a");
    string = string.replace(new RegExp(/[èéêë]/g), "e");
    string = string.replace(new RegExp(/[ìíîï]/g), "i");
    string = string.replace(new RegExp(/[òóôõö]/g), "o");
    string = string.replace(new RegExp(/[ùúûü]/g), "u");
    return string;
  };
  handleChange = (e) => {
    const { value } = e.target;
    let regex = /^[a-z.]{2,20}[\s]{1}[a-z.]{2,20}.*/,
      x = {
        target: {
          name: "validName",
          value: "",
          target: "",
        },
      },
      stringOk = this.eraseTilde(value.toLowerCase());
    e.target.value = stringOk;

    if (regex.test(value)) {
      this.setState({
        bgColor: "bg-blue",
        validate: "",
      });
      x.target.value = true;
      this.props.onChange(x);
      this.validUser(e.target.value, x);
    } else {
      this.setState({
        bgColor: "bg-red",
        validate: " border border-danger",
        text: "No tiene el formato de nombre de persona",
        contacts: [],
      });
      x.target.value = false;
      this.props.onChange(x);
    }
    this.props.onChange(e);
  };
  validUser = (search, x) => {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/contacts",
      name = "?name=" + search;

    if (this.timeFetch) clearTimeout(this.timeFetch);
    this.timeFetch = setTimeout(() => {
      //Realiza la peticion de contactos
      this.setState({
        searchUser: true,
      });
      fetch(url + name, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Hubo un error, intentelo mas tarde");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            data.data.map((contacto) => {
              let nombre = this.eraseTilde(contacto.nombre);
              if (nombre === search) {
                console.log("Contacto registrado ");
                this.setState({
                  bgColor: "bg-red",
                  validate: " border border-danger",
                  text: "El contacto ya esta registrado",
                  searchUser: false,
                  contacts: [],
                });
                x.target.value = false;
                this.props.onChange(x);
              }
              return false;
            });
            this.setState({
              searchUser: false,
              contacts: data.data,
            });
          } else {
            console.error("Error en la descarga de contactos", data.message);
            this.setState({
              searchUser: false,
            });
            x.target.value = false;
            this.props.onChange(x);
          }
        })
        .catch((e) => {
          console.error(e);
          this.setState({
            searchUser: false,
          });
          x.target.value = false;
          this.props.onChange(x);
        });
    }, 1000);
  };
}
