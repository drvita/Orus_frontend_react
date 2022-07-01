import moment from "moment";
import "moment/locale/es";
import helpers from "../../Sales/helpers";
moment.locale("es");

export default function HTMLOrderPrint(sale, branch) {
  const paid = helpers.getPagado(sale.payments);
  let amount = sale.total - paid;

  const phone = Object.values(sale.customer?.phones ?? {}).filter(
    (phone) => phone
  );

  return `
  <div style="width:100%; padding: 0px; margin: 0px;">
    <h6 style="font-size: 14; font-family:sans-serif; text-align: right; margin: 0px">
      ${sale.order_id ? "Pedido" : "Nota"}:
      <strong>${sale.order_id ? sale.order_id : sale.id}</strong>
    </h6> 
    
    <h2 style="font-size: 28; font-family: sans-serif; margin: 24px 0px;">
      <center>
        <strong>Óptica Madero</strong>
      </center>
    </h2>

    <h4 style="font-size: 22; font-family: sans-serif; text-align: center; margin:10px 0px;">
      Julio Cesar Cardenas Martinez
    </h4>

    <div style="font-size: 14; font-family: sans-serif; width:100%; text-align: center; margin: 0px 5px">
      <span style="text-transform: uppercase;">
        ${branch.name}
      </span>
      <br />
      <span>${branch.phone}</span>
      <br />
      <span>${branch.address}</span>
      <br/>
      <strong>${moment().format("LLLL")}</strong>
    </div>

    <h4 style="font-size: 22; font-family: sans-serif; text-align: center; text-transform: uppercase;">
      ${sale.customer?.name ? sale.customer.name : "Venta de mostrador"}
      <br />
      <strong>
        <em style="font-size: 18">
          ${phone.length ? phone : "--"}
        </em>
      </strong>
    </h4>

    <h2 style= "font-size: 22; font-family:sans-serif">
      <center><strong>${sale.order_id ? "Pedido" : "Nota"}</strong></center>
    </h2>

    <table style="width:100%;">
      <thead>
        <tr>
          <th style="font-size: 12; font-family: sans-serif; text-align:left; width:24px">
            Cant
          </th>
          <th style="font-size: 12; font-family: sans-serif">
            Descripcion
          </th>
          <th style="font-size: 12; font-family: sans-serif; text-align:right; width:48px">
            Total
          </th>
        </tr>
      </thead>
          
      <tbody>
        ${sale.items.map((item, index) => {
          return `<tr key=${index} style="">
            <td style="font-size: 16; font-family: sans-serif; text-align:left">
              ${item.cant}
            </td>
            <td style="font-size: 14; font-family: sans-serif">
              ${item.name ?? item.producto}
            </td>
            <td style="font-size: 16; font-family: sans-serif; text-align:right;">                    
              $ ${item.cant * item.price}
            </td>
          </tr>`;
        })}
      </tbody>

      <tfoot>
        <tr>
          <td colspan="3">
            ${
              sale.discount !== 0
                ? `<div style = "width:100%">
                  <h4 style= "font-size: 18; font-family: sans-serif; text-align: right; margin:0px; margin-top:12px">
                    Subtotal: <label>${sale.subtotal ?? 0}</label>
                  </h4>
                  <h4 style= "font-size: 18; font-family: sans-serif; text-align: right; margin:0px;">
                    Descuento: <label>${sale.discount}</label>
                  </h4>
                </div>
                <h4 style= "font-size:18; width:100%; font-family: sans-serif; text-align: right; margin:0px;">
                  Total: <label>$ ${sale.total ?? 0}</label>
                </h4>`
                : `<h4 style= "font-size:18; width:100%; font-family: sans-serif; text-align: right; margin:0px; margin-top:12px">
                  Total: <label>$ ${sale.total ?? 0}</label>
                </h4>`
            }
            

            <div style = "width:100%;">
              <h4 style= "font-size: 18; font-family: sans-serif; text-align: right; margin:0px;">
                Abonado: <label>$ ${paid}</label>
              </h4>
              ${
                amount
                  ? `<h4 style= "font-size: 18; font-family: sans-serif; text-align: right; margin:0px;">
                    Saldo: <label>$ ${amount}</label>
                    </h4>`
                  : `<div style="text-align:center; width: 100%">
                     <h3 style="font-weight:bold">
                      ::: Cuenta Pagada :::                      
                    </h3>
                  </div>`
              }
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
      
    <div>
      <ul style="font-family:sans-serif; font-size: 12;">
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
  `;
}
