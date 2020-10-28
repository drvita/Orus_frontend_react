import React, { Component } from "react";

export default class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: props.validEmail ? "bg-blue" : "bg-red",
      validate: props.validEmail ? "" : " border border-danger",
      text: "No es un email correcto",
      emailContact: false,
      contacts: [],
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timeFetch = null;
    this.emailOriginal = props.email;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidUpdate(props) {
    if (props.validEmail !== this.props.validEmail) {
      this.setState({
        bgColor: this.props.validEmail ? "bg-blue" : "bg-red",
        validate: this.props.validEmail ? "" : " border border-danger",
      });
    }
  }

  render() {
    let { email, validEmail } = this.props;
    let { bgColor, validate, text, emailContact, contacts } = this.state;
    if (!email) email = "";

    return (
      <React.Fragment>
        {email ? (
          <div className="ml-2 mt-1">
            <small>
              <label>Correo electronico</label>
            </small>
          </div>
        ) : (
          <br />
        )}
        <div className="input-group mt-1">
          <div className="input-group-prepend">
            <span className={"input-group-text " + bgColor}>
              {emailContact ? (
                <i className="fas fa-spinner"></i>
              ) : (
                <i className="fas fa-at"></i>
              )}
            </span>
          </div>
          <input
            type="email"
            className={"form-control" + validate}
            placeholder="Correo electronico"
            name="email"
            value={email}
            onChange={this.handleChange}
            autoComplete="off"
            minLength="8"
            list="email_db"
          />
          {contacts.length ? (
            <datalist id="email_db">
              {contacts.map((contact) => {
                return <option key={contact.id} value={contact.email} />;
              })}
            </datalist>
          ) : null}
        </div>
        {!validEmail ? (
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
    const { id } = this.props;
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      x = {
        target: {
          name: "validEmail",
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
      if (!id) {
        if (this.emailOriginal !== e.target.value)
          this.validUser(e.target.value, x);
      } else {
        this.validUser(e.target.value, x);
      }
    } else {
      this.setState({
        bgColor: "bg-red",
        validate: " border border-danger",
        text: "No es un email correcto",
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
      name = "?email=" + search;

    if (this.timeFetch) clearTimeout(this.timeFetch);
    this.timeFetch = setTimeout(() => {
      //Realiza la peticion de contactos
      this.setState({
        emailContact: true,
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
              if (contacto.email === search) {
                this.setState({
                  bgColor: "bg-red",
                  validate: " border border-danger",
                  text: "El email ya esta registrado",
                  emailContact: false,
                  contacts: [],
                });
                x.target.value = false;
                this.props.onChange(x);
              }
              return false;
            });
            this.setState({
              emailContact: false,
              contacts: data.data,
            });
          } else {
            console.error("Error en la descarga de contactos", data.message);
            this.setState({
              emailContact: false,
            });
            x.target.value = false;
            this.props.onChange(x);
          }
        })
        .catch((e) => {
          console.error(e);
          this.setState({
            emailContact: false,
          });
          x.target.value = false;
          this.props.onChange(x);
        });
    }, 1000);
  };
}
