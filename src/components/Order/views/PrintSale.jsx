import {useEffect, useContext} from 'react';

//Context
import { AuthContext } from "../../../context/AuthContext";
import { OrderContext } from '../../../context/OderContext';
import moment from "moment";

export default function PrintSaleComponent({ sale }) {


  const {auth} = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const {
      created_at: date,
      id,
      customer: client,
    } = sale;

    const {
        total, 
        subtotal,
        payments,
        descuento,
    } = sale.sale;

    const saldo = subtotal - payments;

    const { branch } = auth;

    const pagado  = payments;
    const paid = payments && sale.total <= pagado ? true : false;

  //Functions
  const handlePrintShow = () => {
    window.print();
  };

  const handleClose = () => {
    orderContext.set({
        ...orderContext,
        panel:'inbox',
    })
    //sale.set(initialSale);
  };

  useEffect(()=>{
    window.addEventListener("afterprint", ()=>{handleClose()});

    return ()=>{
      window.removeEventListener("afterprint", ()=>{handleClose()});
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        className={`btn btn-success ml-2 d-print-none`}
        /* disabled={!paid} */
        onClick={handlePrintShow}
      >
        <i className= "fas fa-print mr-1"></i> 
        Imprimir
      </button>

      <div
        className=" d-none d-print-block w-100 fixed-top bg-white"
        style={{minHeight:'100vh'}}
        id={"print_sale_" + id}
      >
        <div className="row">
          <div className="col">
            <div className="card m-0">
              <div className="card-body">
                <h4
                  className="text-right"
                  style={{ fontSize: 28, fontFamily: "sans-serif" }}
                >
                  <i>
                    {sale.id ? "Pedido" : "Nota"}:{" "}
                    <strong>{sale.id}</strong>
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
                    <span className="text-capitalize">
                      sucursal: {branch.name}
                    </span>
                    <br />
                    <span>Tel: {branch.phone}</span>
                    <br />
                    <span className="text-capitalize">{branch.address}</span>
                  </em>
                </h4>
                <h4
                  className="text-uppercase text-center mb-1"
                  style={{ fontSize: 20, fontFamily: "sans-serif" }}
                >
                  {client && client.name
                    ? client.name
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
                {sale.items.map((item, index) => {
                  const total = parseFloat(item.cant * item.price);
                  return (
                    <tr key={index} className="text-capitalize">
                      <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                        {item.cant}
                      </td>
                      <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                        {item.name}
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
                      <>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Subtotal: <label>$ {subtotal}</label>
                        </h4>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Descuento: <label>$ {descuento}</label>
                        </h4>
                      </>
                    ) : null}
                    <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                      Total: <label>$ {total}</label>
                    </h4>
                    {payments ? (
                      <>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Abonado: <label>$ {payments}</label>
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
                      </>
                    ) : null}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="text-justify text-lg">
          <ul className="d-block" style={{ fontFamily: "sans-serif" }}>
            <li>
              Armazones usados, viejos y/o resecos son responsabilidad del
              cliente
            </li>
            <li>
              Armazones reparados por el cliente pierden garantia de proovedor
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
