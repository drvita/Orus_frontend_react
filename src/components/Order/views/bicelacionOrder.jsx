export default function BicelacionOrderComponent({
  status = false,
  ncaja = "",
  observaciones = "",
  handleChange: _handleChange,
}) {
  const changeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let val = value;

    if (name === "caja") val = parseInt(value);

    if (_handleChange) _handleChange(name, val);
  };

  return (
    <div className="row m-2">
      <div className="col">
        <div className="border border-warning rounded p-2">
          <label htmlFor="lab">Caja</label>
          <input
            type="number"
            className={status > 2 ? "form-control disabled" : "form-control"}
            disabled={status > 2 ? true : false}
            name="ncaja"
            min="1"
            defaultValue={ncaja}
            onChange={changeInput}
          />
        </div>
      </div>
      <div className="col">
        <div className="border border-warning rounded p-2">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            className={status > 2 ? "form-control disabled" : "form-control"}
            disabled={status > 2 ? true : false}
            defaultValue={observaciones}
            onChange={changeInput}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
