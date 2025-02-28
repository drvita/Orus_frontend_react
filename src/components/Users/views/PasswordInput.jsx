/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInputComponent(props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState('primary');
  const [isValid, setIsValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = ({ value }) => setValue(value);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  const handleFocus = () => {
    setIsValid(false);
    setError('');
    setColor('primary');
  };
  const validUser = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;
    const userSearch = value.replace(/\s/g, "");
    if (!regex.test(userSearch)) {
      setError("La contraseña no cumple con los requisitos minimos de seguridad");
      return;
    }

    setIsValid(true);
  };
  React.useEffect(() => {
    if (props.isValid) {
      props.isValid(isValid);
    }
    if (isValid) {
      if (props.onChange) {
        props.onChange({
          name: props.name ?? '',
          value,
        });
      }

      setColor('success');
    }
  }, [isValid]);
  React.useEffect(() => {
    setValue(props.value ?? '');
  }, [props]);

  return (
    <div className={"col-" + props.col}>
      <div className="input-group">
        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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
          disabled={props.disabled ?? false}
          color={color}
          focused
        />
      </div>
    </div>
  );
}
