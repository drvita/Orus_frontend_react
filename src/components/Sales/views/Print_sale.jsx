import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales";

export default function PrintSaleComponent({
  sale = {},
  payed: abonado = 0,
  order,
  text,
  btn = "primary",
}) {
  const {
      items,
      descuento,
      total = 0,
      created_at: date,
      id,
      customer: client,
      payments
    } = sale,
    saldo = total - abonado,
    { branch } = useSelector((state) => state.users.dataLoggin),
    dispatch = useDispatch();
  let totalItems = 0;
  //Functions
  const handlePrintShow = () => {
    dispatch(
      saleActions.saveSale({
        id: sale.id,
        data: {
          ...sale,
          items: JSON.stringify(sale.items),
          payments: null,
        },
      })
    );
    window.print();
  };

  // console.log("[DEBUG] branch:", branch);
  

  return (
    <>
      {console.log("------------",branch)}
      <button
        className={`btn btn-${btn} ml-2 d-print-none`}
        disabled={!payments.length}
        onClick={handlePrintShow}
      >
        <i className={text ? "fas fa-print mr-1" : "fas fa-print"}></i>
        {text}
      </button>

      <div
        className="d-none d-print-block fixed-top bg-white"
        style={{ maxWidth: 380 }}
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
                    {order ? "Pedido" : "Nota"}:{" "}
                    <strong>{order ? order : id}</strong>
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
                      <>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Subtotal: <label>$ {totalItems}</label>
                        </h4>
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Descuento: <label>$ {descuento}</label>
                        </h4>
                      </>
                    ) : null}
                    <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                      Total: <label>$ {total}</label>
                    </h4>
                    {abonado ? (
                      <>
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
