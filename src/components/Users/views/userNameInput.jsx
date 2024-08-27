/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useUsers from "../../../hooks/useUsers";
import { InputAdornment, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function UserNameInputComponent(props) {
  const user = useUsers();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState('primary');
  const [isValid, setIsValid] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const handleChange = ({ value }) => setValue(value.toLowerCase());
  const handleFocus = () => {
    setIsValid(false);
    setError('');
    setColor('primary');
  };
  const validUser = () => {
    const regex = /^[\w]{4,16}$/;
    const userSearch = value.replace(/\s/g, "");
    if (!regex.test(userSearch)) {
      setError("El usuario debe de tener entre 4 y 16 caracteres");
      return;
    }

    setLoad(true);
    handleSearchUser(userSearch, props.userId, user).then((status) => {
      if (status) {
        setError("El usuario ya esta registrado");
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
      if(props.onChange){
        props.onChange({
          name: "username",
          value: value.toLowerCase(),
        });
      }
      
      setColor('success');
    }
  }, [isValid]);
  React.useEffect(() => {
    setValue(props.username ?? '');
  }, [props]);

  return (
    <div className={"col-" + props.col}>
      <div className="input-group">
        <TextField
          label="Usuario"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
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
          onBlur={validUser}
          onFocus={handleFocus}
          disabled={load}
          color={color}
          focused
        />
      </div>
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
