import React from "react";
import moment from "moment";

const DashboardContactComponent = (props) => {
  const {
    purchases,
    exams,
    register,
    created,
    updated,
    updated_at,
    brands,
    orders,
    suppliers,
  } = props;
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

      {register ? (
        <div className="col">
          <div className="small-box bg-primary">
            <div className="inner">
              <h5>{moment(register).format("L")}</h5>

              <p>Registrado</p>
            </div>
            <div className="icon">
              <i className="fas fa-calendar"></i>
            </div>
            <a href="#details" className="small-box-footer text-xs">
              Modificado: {updated_at ? moment(updated_at).format("L") : "--"}
            </a>
          </div>
        </div>
      ) : null}

      {created ? (
        <div className="col">
          <div className="small-box bg-primary">
            <div className="inner">
              <h5 className="text-truncate">{created}</h5>

              <p>Registrado por</p>
            </div>
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
            <a
              href="#details"
              className="small-box-footer text-xs text-truncate"
            >
              Modificado: {updated ? updated : "--"}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardContactComponent;
