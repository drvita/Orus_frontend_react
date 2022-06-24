import { useState } from "react";
import useUsers from "../../../hooks/useUsers";

export default function UserEmailInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un email",
    searchEmail: false,
  });
  const user = useUsers();

  const { col, email, userId, onChange: _onChange } = props;
  const { bgColor, validate, text, searchEmail } = state;

const validEmail = (target) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const emailSearch = target.value.replace(/\s/g, "");
      
      if (regex.test(emailSearch)) {
        setState({
          ...state,
          bgColor: "bg-primary",
          validate: " border border-primary",
          text: "",
        });

        _onChange("email", true, emailSearch);

        //TODO: Validar que el correo no exista
        //handleSearchUser(emailSearch, userId, user);

      } else {
        setState({
          ...state,
          bgColor: "bg-red",
          validate: " border border-danger",
          text: "No tiene el formato de un email valido",
        });
        _onChange("email", false);
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
          onChange={({ target }) => validEmail(target)}
          required="required"
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}


const handleSearchUser = async (username, userId = null, user) => {
  const result = await user.getListUsers({ username, userId, deleted: 0 });
  if (result.data && result.data.length) {
    const { username: user } = result.data[0];
  }
  return false;
};
