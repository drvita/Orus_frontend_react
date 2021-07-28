import React, { Component } from "react";
import { useState } from "react";
import { api, getUrl } from "../../redux/sagas/api";

export default function UserEmailInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un email",
    searchEmail: false,
  });
  //Vars
  const { col, email, onChange: _onChange } = props,
    { bgColor, validate, text, searchEmail } = state;
  //Functions
  const handleChange = ({ name, value }) => {
      _onChange({
        name,
        value: value.toLowerCase(),
      });
    },
    validEmail = () => {
      const regex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        emailSearch = email.replace(/\s/g, "");

      if (regex.test(emailSearch)) {
        //User valid, next search if exist
        setState({
          ...state,
          searchUser: true,
        });
        handleSearchUser(emailSearch).then((response) => {
          if (response) {
            setState({
              bgColor: "bg-red",
              validate: " border border-danger",
              text: "El usuario ya esta registrado.",
              searchUser: false,
            });
            _onChange({
              name: "validUserEmail",
              value: false,
            });
          } else {
            setState({
              ...state,
              bgColor: "bg-blue",
              validate: "",
              text: "",
            });
            _onChange({
              name: "validUserEmail",
              value: true,
            });
          }
        });
      } else {
        //User no valid
        if (emailSearch.length > 8) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "No tiene el formato de un email valido",
          });
          _onChange({
            name: "validUserEmail",
            value: false,
          });
        } else if (!emailSearch.length) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "Escriba un email valido",
          });
          _onChange({
            name: "validUserEmail",
            value: false,
          });
        }
      }
    };

  return (
    <div className={"col-" + col}>
      {email.length ? (
        <small>
          <label>Email</label>
        </small>
      ) : (
        <br />
      )}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className={"input-group-text " + bgColor}>
            {searchEmail ? (
              <i className="fas fa-spinner"></i>
            ) : (
              <i className="fas fa-at"></i>
            )}
          </span>
        </div>
        <input
          type="email"
          className={"form-control" + validate}
          placeholder="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={({ target }) => handleChange(target)}
          onBlur={validEmail}
          required="required"
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}

const handleSearchUser = async (email) => {
  const url = getUrl("users", null, { email }),
    result = await api(url);

  if (result.data && result.data.length) {
    const { email: user } = result.data[0];

    if (user.toLowerCase() === email) {
      return true;
    }
  }
  return false;
};

export class UserName extends Component {
  handleChange = (e) => {
    const { value } = e.target;
    let regex = 56,
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
