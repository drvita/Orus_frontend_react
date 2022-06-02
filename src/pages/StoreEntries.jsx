import FormEntries from "../components/Store/FormEntries";

export default function StoreEntries() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h5 className="card-title mt-2 ml-2 text-bold">
              Entradas de productos por lote
            </h5>
            <div className="card-tools">
              <button
                className="btn btn-small btn-primary"
                title="Agregar una linea nueva"
                alt="Agregar una linea nueva"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>

          <div className="card-body">
            <FormEntries />
            <FormEntries />
          </div>
          <div className="card-footer text-right">
            <button className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
