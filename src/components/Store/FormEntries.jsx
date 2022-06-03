import { Config } from "../../context/ConfigContext";

export default function FormEntries({ data, eraseItem }) {
  const configContext = Config();
  const branches = configContext?.data.filter(
    (conf) => conf.name === "branches"
  );

  return (
    <div className="form-row border-bottom mt-2">
      <div className="form-group col-2">
        <label htmlFor="code">Codigo</label>
        <input
          type="text"
          className="form-control"
          placeholder="Codigo del producto"
          id="code"
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="name">Producto</label>
        <input
          type="text"
          className="form-control"
          placeholder="Codigo del producto"
          id="name"
          defaultValue={"Nombre del producto"}
          disabled={true}
          onChange={() => {}}
        />
      </div>
      <div className="form-group col-3">
        <label htmlFor="branch">Sucursal</label>
        <select
          id="branch"
          className="form-control text-uppercase"
          disabled={typeof data?.id === "string" ? true : false}
        >
          <option value={0}>--- Seleccione una sucursal ---</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.data?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-1">
        <label htmlFor="current">Actual</label>
        <input
          type="text"
          className="form-control"
          id="current"
          defaultValue={5}
          disabled={true}
          onChange={() => {}}
        />
      </div>
      <div className="form-group col-1">
        <label htmlFor="cant">Ingreso</label>
        <input
          type="text"
          className="form-control"
          placeholder="Cantidad"
          id="cant"
          disabled={typeof data?.id === "string" ? true : false}
        />
      </div>
      <div className="form-group col-1 text-right pt-4">
        <div
          className="btn-group btn-group-sm mt-2"
          role="group"
          aria-label="..."
        >
          <button
            className="btn btn-sm btn-warning"
            onClick={() => eraseItem(data)}
          >
            <i className="fas fa-trash" />
          </button>
          <button
            className="btn btn-sm btn-success"
            disabled={typeof data?.id === "string" ? true : false}
          >
            <i className="fas fa-check" />
          </button>
        </div>
      </div>
    </div>
  );
}
