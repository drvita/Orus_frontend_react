import { useState } from "react";

export default function UserPhoneInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un teléfono",
  });

  const { col, phone, handleValidData: _handleValidData } = props;
  const { bgColor, validate, text, searchEmail } = state;

  const validPhone = (phone) => {
    const regex = /^\d{10}$/gim;

    if (regex.test(phone)) {
      setState({
        ...state,
        bgColor: "bg-primary",
        validate: " border border-primary",
        text: "",
      });
      _handleValidData("phone", true, phone);
    } else {
      //User no valid
      if (phone.length !== 10) {
        setState({
          ...state,
          bgColor: "bg-red",
          validate: " border border-danger",
          text: "No tiene el formato de un email valido",
        });
        _handleValidData("phone", false);
      } else if (!phone.length) {
        setState({
          ...state,
          bgColor: "bg-red",
          validate: " border border-danger",
          text: "Escriba un telefono valido",
        });
        _handleValidData("phone", false);
      }
    }
  };

  return (
    <div className={"col-" + col}>
      {phone.length ? (
        <small>
          <label>Telefono</label>
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
              <i className="fas fa-phone"></i>
            )}
          </span>
        </div>
        <input
          type="text"
          className={"form-control" + validate}
          placeholder="Teléfono"
          name="phone"
          autoComplete="off"
          value={props.phone}
          maxLength="10"
          onChange={({ target }) => {
            const parse = parseInt(target.value);

            if (!isNaN(parse)) {
              props.onChange(parse.toString());
            } else if (!target.value.length) {
              props.onChange("");
            }
          }}
          onBlur={({ target }) => validPhone(target.value)}
          onKeyPress={({ key, target }) => {
            if (key === "Enter") {
              validPhone(target.value);
            }
          }}
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}
