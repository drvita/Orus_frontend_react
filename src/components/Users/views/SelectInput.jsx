/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

export default function SelectInputComponent(props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [color, setColor] = React.useState(props.color ?? 'primary');
  const [isValid, setIsValid] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const handleChange = ({ value }) => setValue(value);
  const handleFocus = () => {
    setIsValid(false);
    setError('');
    setColor('primary');
  };
  const validUser = () => {
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
    setOptions(props.options ?? []);
  }, [props]);

  return (
    <div className={"col-" + props.col +" pt-2"}>
      <div className="input-group">
        <TextField
          label={props.label ?? 'label'}
          select
          InputProps={ {
            startAdornment: props.icon && (
              <InputAdornment position="start">
                {props.icon}
              </InputAdornment>
            ),
            style: { textTransform: "uppercase" }
          }}
          fullWidth
          variant={props.variant ?? 'standard'}
          helperText={error}
          error={!!error}
          value={value}
          onChange={({ target }) => handleChange(target)}
          onBlur={validUser}
          onFocus={handleFocus}
          disabled={props.disabled ?? false}
          color={color}
          focused
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}
