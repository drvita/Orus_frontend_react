import { useState } from "react";
import { api, getUrl } from "../../../redux/sagas/api";

export default function UserEmailInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un email",
    searchEmail: false,
  });
  //Vars
  const { col, email, userId, onChange: _onChange } = props,
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
        handleSearchUser(emailSearch, userId).then((response) => {
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
          defaultValue={email}
          onChange={({ target }) => handleChange(target)}
          onBlur={validEmail}
          required="required"
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}

const handleSearchUser = async (email, userId) => {
  const url = getUrl("users", null, { email, userId, deleted: 0 }),
    result = await api(url);

  if (result.data && result.data.length) {
    const { email: user } = result.data[0];

    if (user.toLowerCase() === email) {
      return true;
    }
  }
  return false;
};
