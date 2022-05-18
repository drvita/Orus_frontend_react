export default function Input(props) {
  const { showIcon = true } = props;
  
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
        className="custom-select text-uppercase"
        value={props.value ?? ""}
        disabled={props.load ?? false}
        onChange={({ target }) => {
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

        {props.options?.map((cat) => {
          return (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
