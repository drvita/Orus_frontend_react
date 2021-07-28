import { useState } from "react";
import { api, getUrl } from "../../redux/sagas/api";

export default function UserNameInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "Debe de tener al menos 4 caracteres.",
    searchUser: false,
  });
  //Vars
  const { col, username, onChange: _onChange } = props,
    { bgColor, validate, text, searchUser } = state;
  //Functions
  const handleChange = ({ name, value }) => {
      _onChange({
        name,
        value: value.toLowerCase(),
      });
    },
    validUser = () => {
      const regex = /^[\w]{4,16}$/,
        userSearch = username.replace(/\s/g, "");

      if (regex.test(userSearch)) {
        //User valid, next search if exist
        setState({
          ...state,
          searchUser: true,
        });
        handleSearchUser(userSearch).then((response) => {
          if (response) {
            setState({
              ...state,
              bgColor: "bg-red",
              validate: " border border-danger",
              text: "El usuario ya esta registrado.",
              searchUser: false,
            });
            _onChange({
              name: "validUserName",
              value: false,
            });
          } else {
            setState({
              ...state,
              bgColor: "bg-blue",
              validate: "",
              text: "",
              searchUser: false,
            });
            _onChange({
              name: "validUserName",
              value: true,
            });
          }
        });
      } else {
        //User no valid
        if (userSearch.length > 4) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "No tiene el formato de usuario",
          });
          _onChange({
            name: "validUserName",
            value: false,
          });
        } else if (!userSearch.length) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "Debe de tener de 4 a 16 caracteres alfanumericos.",
          });
          _onChange({
            name: "validUserName",
            value: false,
          });
        }
      }
    };

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
          onChange={({ target }) => handleChange(target)}
          onBlur={validUser}
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

const handleSearchUser = async (username) => {
  const url = getUrl("users", null, { username }),
    result = await api(url);

  if (result.data && result.data.length) {
    const { username: user } = result.data[0];

    if (user.toLowerCase() === username) {
      return true;
    }
  }
  return false;
};
