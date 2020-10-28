import React, { Component } from "react";

export default class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "bg-blue",
      validate: "",
      text: "Debe de tener al menos 4 caracteres.",
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
    let { col, username } = this.props;
    let { bgColor, validate, text, searchUser } = this.state;

    return (
      <div className={"col-" + col}>
        {username.length ? (
          <small>
            <label>Usuario</label>
          </small>
        ) : (
          <br />
        )}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className={"input-group-text " + bgColor}>
              {searchUser ? (
                <i className="fas fa-spinner"></i>
              ) : (
                <i className="fas fa-user-check"></i>
              )}
            </span>
          </div>
          <input
            type="text"
            className={"form-control" + validate}
            placeholder="Usuario"
            name="username"
            autoComplete="off"
            autoFocus="autofocus"
            value={username}
            onChange={this.handleChange}
            required="required"
            minLength="4"
            maxLength="16"
            pattern="^[\w]{4,16}$"
          />
        </div>
        {validate ? <small className="text-muted">{text}</small> : ""}
      </div>
    );
  }

  handleChange = (e) => {
    const { value } = e.target;
    let regex = /^[\w]{4,16}$/,
      x = {
        target: {
          name: "validUserName",
          value: "",
        },
      };
    e.target.value = value.replace(/ /g, "").toLowerCase();

    if (regex.test(value)) {
      this.validUser(e.target.value, x);
    } else {
      if (value.length > 4) {
        this.setState({
          bgColor: "bg-red",
          validate: " border border-danger",
          text: "No tiene el formato de usuario",
        });
        x.target.value = false;
        this.props.onChange(x);
      } else if (!value.length) {
        this.setState({
          bgColor: "bg-blue",
          validate: " border border-danger",
          text: "Debe de tener de 4 a 16 caracteres alfanumericos.",
        });
        x.target.value = false;
        this.props.onChange(x);
      }
    }
    this.props.onChange(e);
  };
  validUser = (name, x) => {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/users",
      username = "?username=" + name;

    if (this.timeFetch) clearTimeout(this.timeFetch);
    this.timeFetch = setTimeout(() => {
      //Realiza la peticion de los usuarios
      this.setState({
        searchUser: true,
      });
      fetch(url + username, {
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
              data.data[0].username.toLowerCase() === name
            ) {
              this.setState({
                bgColor: "bg-red",
                validate: " border border-danger",
                text: "El usuario ya esta registrado.",
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
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }, 1000);
  };
}
