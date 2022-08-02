import { useRef } from "react";

export default function Input(props) {
  const { showIcon = true } = props;

  const inputRef = useRef('');
  
  return (
    <div className="input-group mb-3">
      {showIcon && (
        <div className="input-group-prepend">
          <span
            className={
              props.value
                ? "input-group-text bg-primary"
                : "input-group-text bg-warning"
            }
          >
            <i className={`fas fa-${props.icon ?? "sort-amount-down"}`}></i>
          </span>
        </div>
      )}

      <select
        ref={inputRef}
        className="custom-select text-uppercase"
        value={props.value ?? ""}
        disabled={props.load ?? false}
        onChange={({ target }) => {   
          console.log(inputRef.current.options);
          //console.log(inputRef.current.options[inputRef.current.value].text);       
          if (props.handleChange) {
            props.handleChange(parseInt(target.value));
          }
        }}
      >
        {props.load ? (
          <option value="">{props.loadText ?? "Cargando opciones"}</option>
        ) : (
          <>
            {!Boolean(props.options?.length) ? (
              <option value="">{props.emptyText ?? "No hay opciones"}</option>
            ) : (
              <option value="0">--{props.text ?? "Seleccione uno"}--</option>
            )}
          </>
        )}

        {props.options?.map((cat, index) => {
          return (
            <option value={cat.id} key={cat.id} id={index}>
              {cat.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
