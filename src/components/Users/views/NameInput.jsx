/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';

export default function NameInputComponent(props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState('primary');
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = ({ value }) => setValue(value.toLowerCase());
  const handleFocus = () => {
    setIsValid(false);
    setError('');
    setColor('primary');
  };
  const validUser = () => {
    const regex = /^[\w\s]{4,}$/;
    if (!regex.test(value)) {
      console.log("[DEBUG] Regex", value, regex.test(value));
      setError("El nombre completo debe de tener entre almenos 4 caracteres");
      return;
    }

    setIsValid(true);
  };
  
  React.useEffect(() => {
    if (props.isValid) {
      props.isValid(isValid);
    }
    if (isValid) {
      if(props.onChange){
        props.onChange({
          name: props.name ?? '',
          value: value.toLowerCase(),
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
          label="Nombre completo"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon />
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
