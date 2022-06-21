export default function HTMLOrderPrint(sale, branch) {
  const amount = sale.total - sale.payment;

  return `<div
    class="w-100 fixed-top bg-white"
    style={{minHeight:'100vh'}}
  >
    <div class="row">
      <div class="col">
        <div class="card m-0">
          <div class="card-body">
            <h4
            class="text-right"
              style={{ fontSize: 28, fontFamily: "sans-serif" }}
            >
              <i>
                ${sale.id ? "Pedido" : "Nota"}:
                <strong>${sale.id}</strong>
              </i>
            </h4>
            <h6
            class="text-right mb-2"
              style={{ fontSize: 18, fontFamily: "sans-serif" }}
            >
              <strong>{moment(${sale.date}).format("LL")}</strong>
            </h6>
            <h2
            class="text-center"
              style={{ fontSize: 54, fontFamily: "sans-serif" }}
            >
              <center>
                <strong>Óptica Madero</strong>
              </center>
            </h2>
            <h4
            class="text-center mb-4"
              style={{ fontSize: 22, fontFamily: "sans-serif" }}
            >
              <em>
                Julio Cesar Cardenas Martinez
                <br />
                <span class="text-capitalize">
                  sucursal: ${branch.name}
                </span>
                <br />
                <span>Tel: ${branch.phone}</span>
                <br />
                <span class="text-capitalize">${branch.address}</span>
              </em>
            </h4>
            <h4
            class="text-uppercase text-center mb-1"
              style={{ fontSize: 20, fontFamily: "sans-serif" }}
            >
              ${sale.customer?.name ? sale.customer.name : "Venta de mostrador"}
              <br />
              <strong>
                <em style={{ fontSize: 24 }}>
                  {client && client.telefonos
                    ? sale.customer.telefonos.t_movil
                      ? sale.customer.telefonos.t_movil
                      : sale.customer.telefonos.t_casa
                      ? sale.customer.telefonos.t_casa
                      : sale.customer.telefonos.t_oficina
                    : "--"}
                </em>
              </strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <h2 style={{ fontSize: 36, fontFamily: "sans-serif" }}>
          <strong>Pedido</strong>
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
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
            ${sale.items?.map((item, index) => {
              const total = parseFloat(item.cant * item.price);

              return (
                <tr key={index} class="text-capitalize">
                  <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                    {item.cant}
                  </td>
                  <td style={{ fontSize: 22, fontFamily: "sans-serif" }}>
                    {item.name}
                  </td>
                  <td
                    class="text-right"
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
              <td class="text-right" colSpan="3">
                ${
                  sale.descuento ? (
                    <>
                      <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                        Subtotal: <label>$ {sale.subtotal}</label>
                      </h4>
                      <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                        Descuento: <label>$ {sale.descuento}</label>
                      </h4>
                    </>
                  ) : null
                }
                <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                  Total: <label>$ ${sale.total}</label>
                </h4>
                {payments ? (
                  <>
                    <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                      Abonado: <label>$ ${sale.payment}</label>
                    </h4>
                    ${
                      amount ? (
                        <h4 style={{ fontSize: 26, fontFamily: "sans-serif" }}>
                          Saldo: <label>$ ${amount}</label>
                        </h4>
                      ) : (
                        <div class="text-center d-block w-100 my-3">
                          <h3 class="text-muted text-bold">
                            ::: Cuenta Pagada :::
                          </h3>
                        </div>
                      )
                    }
                  </>
                ) : null}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="text-justify text-lg">
      <ul class="d-block" style={{ fontFamily: "sans-serif" }}>
        <li>
          Armazones usados, viejos y/o resecos son responsabilidad del
          cliente
        </li>
        <li>
          Armazones reparados por el cliente pierden garantia de proovedor
        </li>
      </ul>
    </div>
  </div>`;
}
