import { useState } from "react";
import useUsers from "../../../hooks/useUsers";

export default function UserPhoneInputComponent(props) {
  const [state, setState] = useState({
    bgColor: "bg-blue",
    validate: "",
    text: "No tiene el formato de un teléfono",
    phone:''
  });

  const user = useUsers();

  //Vars
  const { col, phone, userId, onChange: _onChange } = props;
  const { bgColor, validate, text, searchEmail } = state;

  //Functions
  const handleChange = ({ name, value }) => {
      _onChange({
        name,
        value: value.toLowerCase(),
      });
    },

    validPhone = () => {
    const regex = /^\d{10}$/gim;

      if (regex.test(phone)) {
        //User valid, next search if exist
        setState({
          ...state,
          phone: phone,          
        });

        setState({
            ...state,
            bgColor: "bg-success",
            validate: " border border-success",
            text: "Telefono correcto",
          });
        
        /* handleSearchUser(emailSearch, userId, user).then((response) => {
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
        }); */


      } else {
        //User no valid
        if (phone.length > 10) {
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
        } else if (!phone.length) {
          setState({
            ...state,
            bgColor: "bg-red",
            validate: " border border-danger",
            text: "Escriba un telefono valido",
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
          onChange={({ target }) => handleChange(target)}
        />
      </div>
      {validate ? <small className="text-muted">{text}</small> : ""}
    </div>
  );
}


/* const handleSearchUser = async (username, userId = null, user) => {
  const result = await user.getListUsers({ username, userId, deleted: 0 });

  if (result.data && result.data.length) {
    const { username: user } = result.data[0];

    if (user.toLowerCase() === username) {
      return true;
    }
  }
  return false;
}; */



/* const handleSearchUser = async (email, userId = null, user) => {
  const result = await user.getListUser
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
 */
