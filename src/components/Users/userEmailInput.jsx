import React, { Component } from "react";

export default class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "bg-blue",
      validate: "",
      text: "No tiene el formato de un email",
      searchUser: false,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timeFetch = null;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    let { col, email } = this.props;
    let { bgColor, validate, text } = this.state;

    return (
      <div className={"col-" + col}>
        {email.length ? (
          <small>
            <label>Usuario</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className={"input-group-text " + bgColor}>
              <i className="fas fa-at"></i>
            </span>
          </div>
          <input
            type="email"
            className={"form-control" + validate}
            placeholder="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={this.handleChange}
            required="required"
          />
        </div>
        {validate ? <small className="text-muted">{text}</small> : ""}
      </div>
    );
  }

  handleChange = (e) => {
    const { value } = e.target;
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      x = {
        target: {
          name: "validUserEmail",
          value: true,
        },
      };
    e.target.value = value.replace(/\s/g, "").toLowerCase();
    if (regex.test(value)) {
      this.validEmail(e.target.value, x);
    } else {
      if (value.length > 8) {
        this.setState({
          bgColor: "bg-red",
          validate: " border border-danger",
          text: "No tiene el formato de un email",
        });
        x.target.value = false;
        this.props.onChange(x);
      } else if (!value.length) {
        this.setState({
          bgColor: "bg-blue",
          validate: "",
          text: "No tiene el formato de un email",
        });
        x.target.value = false;
        this.props.onChange(x);
      }
    }
    this.props.onChange(e);
  };
  validEmail = (search, x) => {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/users",
      email = "?email=" + search;

    if (this.timeFetch) clearTimeout(this.timeFetch);
    this.timeFetch = setTimeout(() => {
      //Realiza la peticion de los usuarios
      this.setState({
        searchUser: true,
      });
      //Realiza la peticion de los usuarios
      fetch(url + email, {
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
            if (
              data.data.length &&
              data.data[0].email.toLowerCase() === search
            ) {
              this.setState({
                bgColor: "bg-red",
                validate: " border border-danger",
                text: "El email ya esta registrado.",
                searchUser: false,
              });
              x.target.value = false;
              this.props.onChange(x);
            } else {
              this.setState({
                bgColor: "bg-blue",
                validate: "",
                searchUser: false,
              });
              x.target.value = true;
              this.props.onChange(x);
            }
          } else {
            console.error("Error en la descarga de usuarios", data.message);
            this.setState({
              bgColor: "bg-red",
              validate: " border border-danger",
              text: "Error en la consulta",
              searchUser: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }, 1000);
  };
}
