import moment from "moment";
import React from "react";
//import moment from "moment";

const DashboardContactComponent = (props) => {
  const { brands, orders, register, created } = props;
  return (
    <div className="row">
      {brands ? (
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{brands}</h3>

              <p>Marcas</p>
            </div>
            <div className="icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <a href="#end" className="small-box-footer">
              Mas información <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {orders ? (
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{orders}</h3>

              <p>En ordenes</p>
            </div>
            <div className="icon">
              <i className="fas fa-notes-medical"></i>
            </div>
            <a href="#end" className="small-box-footer">
              Mas información <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {register ? (
        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{moment(register).format("L")}</h3>

              <p>Fecha de registro</p>
            </div>
            <div className="icon">
              <i className="fas fa-calendar"></i>
            </div>
            <a href="#end" className="small-box-footer">
              Mas información <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}

      {created ? (
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{created}</h3>

              <p>Registrado por</p>
            </div>
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
            <a href="#end" className="small-box-footer">
              Mas información <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardContactComponent;
