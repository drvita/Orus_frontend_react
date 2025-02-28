import moment from "moment";

export default function Dashboard({ analytics, metadata }) {
  const { purchases, exams, brands, orders, suppliers } = analytics;
  const { created_at, created, updated, updated_at } = metadata;

  return (
    <div className="row">
      {brands ? (
        <div className="col">
          <div className="small-box bg-orange">
            <div className="inner">
              <h5>{brands}</h5>

              <p>Marcas</p>
            </div>
            <div className="icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Mas <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {suppliers ? (
        <div className="col">
          <div className="small-box bg-indigo">
            <div className="inner">
              <h5>{suppliers}</h5>

              <p>Laboratorio</p>
            </div>
            <div className="icon">
              <i className="fas fa-building"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Mas <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {purchases ? (
        <div className="col">
          <div className="small-box bg-success">
            <div className="inner">
              <h5>{purchases}</h5>

              <p>Compras</p>
            </div>
            <div className="icon">
              <i className="fas fa-money-bill"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Mas <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {exams ? (
        <div className="col">
          <div className="small-box bg-info">
            <div className="inner">
              <h5>{exams}</h5>

              <p>Examenes</p>
            </div>
            <div className="icon">
              <i className="fas fa-notes-medical"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Mas <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {orders ? (
        <div className="col">
          <div className="small-box bg-warning">
            <div className="inner">
              <h5>{orders}</h5>

              <p>Pedidos</p>
            </div>
            <div className="icon">
              <i className="fas fa-shopping-basket"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Mas <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {created_at && (
        <div className="col">
          <div className="small-box bg-primary">
            <div className="inner">
              <h5>
                {moment().diff(created_at, "days") >= 0
                  ? created_at.format("DD/MMMM/Y")
                  : "--/--/--"}
              </h5>

              <p>Registrado</p>
            </div>
            <div className="icon">
              <i className="fas fa-calendar"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              {moment().diff(updated_at, "days") >= 0
                ? `Modificado: ${updated_at.format("DD/MMMM/Y")}`
                : "Modificado --/--/--"}
            </a>
          </div>
        </div>
      )}

      {created && (
        <div className="col">
          <div className="small-box bg-primary">
            <div className="inner text-capitalize">
              <h5 className="text-truncate">{created}</h5>

              <p>Registrado por</p>
            </div>
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
            <a
              href="#details"
              className="small-box-footer text-xs text-truncate text-capitalize"
            >
              Modificado: {updated}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
