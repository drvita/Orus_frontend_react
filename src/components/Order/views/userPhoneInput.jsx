import { useState } from "react";
import useUsers from "../../../hooks/useUsers";

export default function UserPhoneInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un teléfono",
  });

  const user = useUsers();

  const { col, phone, userId, onChange: _onChange } = props;
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
          _onChange("phone", true, phone)
          
      } else {
        //User no valid
        if (phone.length !== 10) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "No tiene el formato de un email valido",
          });
          _onChange("phone",false);
        } else if (!phone.length) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "Escriba un telefono valido",
          });
          _onChange("phone",false);
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
          defaultValue={""}
          onChange={({ target }) => validPhone(target.value)}
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}