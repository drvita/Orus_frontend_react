export default function Code(props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            props.code
              ? !props.id
                ? "input-group-text bg-warning"
                : "input-group-text bg-primary"
              : "input-group-text bg-warning"
          }
        >
          <i className="fas fa-code"></i>
        </span>
      </div>
      <input
        type="text"
        className="form-control text-uppercase"
        placeholder="Codigo"
        name="code"
        defaultValue={props.code}
        onChange={() => {}}
        onBlur={() => {}}
        autoComplete="off"
        maxLength="18"
      />
      {!props.id ? (
        <span className="text-muted text-xs d-block w-100">
          El codigo ya esta en uso
        </span>
      ) : null}
    </div>
  );
}
