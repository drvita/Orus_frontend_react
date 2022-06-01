export default function FormEntries() {
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
      <div className="form-group col-3">
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
        <select id="branch" className="form-control">
          <option>--- Seleccione una sucursal ---</option>
          <option>Branch 1</option>
        </select>
      </div>
      <div className="form-group col-2">
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
      <div className="form-group col-2">
        <label htmlFor="cant">Ingreso</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevas entradas"
          id="cant"
        />
      </div>
    </div>
  );
}
