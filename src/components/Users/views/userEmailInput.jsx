/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useUsers from "../../../hooks/useUsers";
import { InputAdornment, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

export default function UserEmailInputComponent(props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState('primary');
  const [isValid, setIsValid] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const user = useUsers();
  const handleFocus = () => {
    setIsValid(false);
    setError('');
    setColor('primary');
  };
  const handleChange = ({ value }) => setValue(value.toLowerCase());
  const validEmail = () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const emailSearch = value.replace(/\s/g, "");

    if (!regex.test(emailSearch)) {
      setError("El formato de correo electronico no es valido");
      return;
    }

    setLoad(true);
    handleSearchUser(emailSearch, props.userId, user).then((status) => {
      if (status) {
        setError("El correo electronico ya esta registrado");
        return;
      }
      setIsValid(true);
    })
      .finally(() => {
        setLoad(false);
      });
  };

  React.useEffect(() => {
    if (props.isValid) {
      props.isValid(isValid);
    }
    if (isValid) {
      if (props.onChange) {
        props.onChange({
          name: "email",
          value: value.toLowerCase(),
        });
      }
      
      setColor('success');
    }
  }, [isValid]);
  React.useEffect(() => {
    setValue(props.email ?? '');
  }, [props]);

  return (
    <div className={"col-" + props.col}>
      <div className="input-group">
        <TextField
          label="Correo electronico"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="standard"
          helperText={error}
          error={!!error}
          autoComplete="off"
          value={value}
          onChange={({ target }) => handleChange(target)}
          onBlur={validEmail}
          onFocus={handleFocus}
          disabled={load}
          color={color}
          focused
        />
      </div>
    </div>
  );
}

const handleSearchUser = async (email, userId = null, user) => {
  const result = await user.getListUsers({ email, userId, deleted: 0 });

  if (result.data && result.data.length) {
    const { email: user } = result.data[0];

    if (user.toLowerCase() === email) {
      return true;
    }
  }
  return false;
};
