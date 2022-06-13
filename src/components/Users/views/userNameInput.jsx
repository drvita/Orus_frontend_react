import { useState } from "react";
import useUsers from "../../../hooks/useUsers";

export default function UserNameInputComponent(props) {
  const user = useUsers();
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "Debe de tener al menos 4 caracteres.",
    searchUser: false,
  });
  const { onChange: _onChange, handleValidate: _handleValidate } = props;

  const handleChange = ({ value }) => {
    _onChange({
      name: "username",
      value: value.toLowerCase(),
    });
  };
  const validUser = () => {
    const regex = /^[\w]{4,16}$/,
      userSearch = props.username.replace(/\s/g, "");

    if (regex.test(userSearch)) {
      //User valid, next search if exist
      setState({
        ...state,
        searchUser: true,
      });

      handleSearchUser(userSearch, props.userId, user).then((status) => {
        if (status) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "El usuario ya esta registrado.",
            searchUser: false,
          });
          _handleValidate({
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
          _handleValidate({
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
        _handleValidate({
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
        _handleValidate({
          name: "validUserName",
          value: false,
        });
      }
    }
  };

  return (
    <div className={"col-" + props.col}>
      {props.username.length ? (
        <small>
          <label>Usuario</label>
        </small>
      ) : (
        <br />
      )}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className={"input-group-text " + state.bgColor}>
            {state.searchUser ? (
              <i className="fas fa-spinner"></i>
            ) : (
              <i className="fas fa-user-check"></i>
            )}
          </span>
        </div>
        <input
          type="text"
          className={"form-control" + state.validate}
          placeholder="Usuario"
          autoComplete="off"
          autoFocus="autofocus"
          defaultValue={props.username}
          onChange={({ target }) => handleChange(target)}
          onBlur={validUser}
          required="required"
          minLength="4"
          maxLength="16"
          pattern="^[\w]{4,16}$"
        />
      </div>
      {state.validate ? <small className="text-muted">{state.text}</small> : ""}
    </div>
  );
}

const handleSearchUser = async (username, userId = null, user) => {
  const result = await user.getListUsers({ username, userId, deleted: 0 });

  if (result.data && result.data.length) {
    const { username: user } = result.data[0];

    if (user.toLowerCase() === username) {
      return true;
    }
  }
  return false;
};
