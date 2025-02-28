import { useState } from "react";
import useContact from "../../../hooks/useContact";

export default function UserEmailInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un email",
    searchEmail: false,
  });

  const { col, email, handleValidData: _handleValidData } = props;
  const { bgColor, validate, text, searchEmail } = state;

  const contactHook = useContact();

  const handleSearchUser = (email) => {
    contactHook.getContacts({ email }).then((data) => {
      if (data) {
        if (data.data.length) {
          setState({
            ...state,
            bgColor: "bg-warning",
            validate: "border border-warning",
            text: `El email ${email} ya está registrado`,
          });

          _handleValidData("email", false, email);
        } else {
          _handleValidData("email", true, email);
        }
      } else {
        console.error("[Orus System] When get data from users:", data);
      }
    });
  };

  const validEmail = (target) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const emailSearch = target.value.replace(/\s/g, "");

    if (regex.test(emailSearch)) {
      setState({
        ...state,
        bgColor: "bg-primary",
        validate: " border border-primary",
        text: "",
      });

      handleSearchUser(emailSearch);
    } else {
      setState({
        ...state,
        bgColor: "bg-red",
        validate: " border border-danger",
        text: "No tiene el formato de un email valido",
      });
      _handleValidData("email", false);
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
          onChange={({ target }) => props.onChange(target.value)}
          onBlur={({ target }) => validEmail(target)}
          onKeyPress={({ key, target }) => {
            if (key === "Enter") {
              validEmail(target);
            }
          }}
          required="required"
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}
