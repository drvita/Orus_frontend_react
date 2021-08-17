import React, { Component } from "react";
import moment from "moment";

export default class printSaleComponent extends Component {
  render() {
    const {
        items,
        descuento,
        total = 0,
        abonado = 0,
        folio,
        date,
        id,
        cliente: client,
      } = this.props,
      saldo = total - abonado;
    let totalItems = 0;

    return (
      <div className="d-none d-print-block" style={{ width: 340 }} id={id}>
        <div className="row">
          <div className="col">
            <div className="card m-0">
              <div className="card-body">
                <h4
                  className="text-right"
                  style={{ fontSize: 28, fontFamily: "sans-serif" }}
                >
                  <i>
                    Folio: <strong>{folio}</strong>
                  </i>
                </h4>
                <h6
                  className="text-right mb-2"
                  style={{ fontSize: 18, fontFamily: "sans-serif" }}
                >
                  <strong>{moment(date).format("LL")}</strong>
                </h6>
                <h2
                  className="text-center"
                  style={{ fontSize: 54, fontFamily: "sans-serif" }}
                >
                  <center>
                    <strong>Óptica Madero</strong>
                  </center>
                </h2>
                <h4
                  className="text-center mb-4"
                  style={{ fontSize: 22, fontFamily: "sans-serif" }}
                >
                  <em>
                    Julio Cesar Cardenas Martinez
                    <br />
                    Tel: 312 312 5353
                    <br />
                    Av. Tecnologico 38-A, Vistahermosa, Colima, Col.
                  </em>
                </h4>
                <h4
                  className="text-uppercase text-center mb-1"
                  style={{ fontSize: 20, fontFamily: "sans-serif" }}
                >
                  {client && client.nombre
                    ? client.nombre
                    : "Venta de mostrador"}
                  <br />
                  <strong>
                    <em style={{ fontSize: 24 }}>
                      {client && client.telefonos
                        ? client.telefonos.t_movil
                          ? client.telefonos.t_movil
                          : client.telefonos.t_casa
                          ? client.telefonos.t_casa
                          : client.telefonos.t_oficina
                        : "--"}
                    </em>
                  </strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <h2 style={{ fontSize: 36, fontFamily: "sans-serif" }}>
              <strong>Pedido</strong>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                    Cant
                  </th>
                  <th style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                    Descripcion
                  </th>
                  <th style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const total = parseFloat(item.cant * item.price);
                  totalItems += total;
                  return (
                    <tr key={index} className="text-capitalize">
                      <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                        {item.cant}
                      </td>
                      <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                        {item.producto}
                      </td>
                      <td
                        className="text-right"
                        style={{ fontSize: 24, fontFamily: "sans-serif" }}
                      >
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-right" colSpan="3">
                    {descuento ? (
                      <React.Fragment>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Subtotal: <label>$ {totalItems}</label>
                        </h4>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Descuento: <label>$ {descuento}</label>
                        </h4>
                      </React.Fragment>
                    ) : null}
                    <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                      Total: <label>$ {total}</label>
                    </h4>
                    {abonado ? (
                      <React.Fragment>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Abonado: <label>$ {abonado}</label>
                        </h4>
                        {saldo ? (
                          <h4
                            style={{ fontSize: 26, fontFamily: "sans-serif" }}
                          >
                            Saldo: <label>$ {saldo}</label>
                          </h4>
                        ) : (
                          <div className="text-center d-block w-100 my-3">
                            <h3 className="text-muted text-bold">
                              ::: Cuenta Pagada :::
                            </h3>
                          </div>
                        )}
                      </React.Fragment>
                    ) : null}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="text-center">
          <em style={{ fontSize: 22, fontFamily: "sans-serif" }}>
            Armazones usados, viejos y/o resecos son responsabilidad del cliente
          </em>
        </div>
      </div>
    );
  }
}
