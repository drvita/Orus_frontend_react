import moment from "moment";
export default function HTMLOrderPrint(sale, branch) {
  console.log(sale, branch);
  const amount = sale.sale.subtotal - sale.sale.payments;
  console.log(amount);
  

  return `
  <div class="bg-dark">
    <div>
      <div>
        <div>

          <div>

            <h4 style="font-size: 28; font-family:sans-serif>
              <i>
                ${sale.sale.id ? "Pedido" : "Nota"}:
                <strong>
                  ${sale.sale.id}
                </strong>
              </i>
            </h4>
            

            <h6 style="font-size: 18; font-family: sans-serif">
              <strong>22/JUNIO/22</strong>
            </h6>

            <h2 style="font-size: 54; font-family: sans-serif">
              <center>
                <strong>Óptica Madero</strong>
              </center>
            </h2>

            <h4
            class="text-center mb-4"
              style="font-size: 22; font-family: sans-serif"
            >
              <em>
                Julio Cesar Cardenas Martinez
                <br />
                <span>
                  sucursal: ${branch.name}
                </span>
                <br />
                //Telefono de la sucursal
                <span>Tel: ${branch.phone}</span>
                <br />
                <span>${branch.address}</span>
              </em>
            </h4>
            <h4 style="font-size: 20; font-family: sans-serif; text-align: center">
              ${sale.paciente?.name ? sale.paciente.name : "Venta de mostrador"}
              <br />
              <strong>
                <em style="font-size: 24">
                  ${sale.paciente && sale.paciente.phones.lenght
                    ? sale.paciente.phones.t_movil
                      ? sale.paciente.phones.t_movil
                      : sale.paciente.phones.t_casa
                      ? sale.paciente.phones.t_casa
                      : sale.paciente.phones.t_oficina
                    : "--"}
                </em>
              </strong>
            </h4>
          </div>


        </div>
      </div>
    </div>



    <div>
      <div>
        <h2 style= "font-size: 36; font-family:sans-serif">
          <strong>Pedido</strong>
        </h2>
      </div>
    </div>



    <div>
      <div>

        <table class="table" style = "width:100%;">


          <thead style = "display:flex; justify-content: space-around">
            <tr style = "width:100%; display:flex; justify-content: space-around">
              <th style= "font-size: 26; font-family: sans-serif">
                Cant
              </th>
              <th style= "font-size: 26; font-family: sans-serif">
                Descripcion
              </th>
              <th style= "font-size: 26; font-family: sans-serif">
                Total
              </th>
            </tr>
          </thead>
          
          <tbody>
          ${sale.items.map((item, index) => {
            return (
              `
              <tr key=${index} style = "display:flex; justify-content:space-around">
                <td style = "font-size: 22; font-family: sans-serif">
                  ${item.cant}
                </td>
                <td style = "font-size: 22; font-family: sans-serif">
                  ${item.name}
                </td>
                <td
                  class="text-right"
                  style = "font-size: 22; font-family: sans-serif"
                >                    
                  ${item.cant * item.price}
                </td>
              </tr>
              `
            );
          })}
        </tbody>


          <tfoot style="display:flex; align-self:flex-end">
            <tr style = "width:100%; display:flex; justify-content: flex-end">
              <td style="width:100%">
                ${sale.sale.descuento !== 0 ? (
                  `<div style = "width:100%">
                    <h4 style= "font-size: 20; font-family: sans-serif; text-align: right">
                      Subtotal: <label>${sale.sale.subtotal}</label>
                    </h4>
                    <h4 style= "font-size: 20; font-family: sans-serif; text-align: right">
                      Descuento: <label>${sale.sale.descuento}</label>
                    </h4>
                  </div>`                    
                  ) : `<span></span>` 
                }
                <h4 style= "font-size:20; width:100%; font-family: sans-serif; text-align: right">
                  Total: <label>$ ${sale.sale.total}</label>
                </h4>

                ${sale.sale.payments ? (
                  `
                  <div style = "width:100%;">
                    <h4 style= "font-size: 20; font-family: sans-serif; text-align: right">
                      Abonado: <label>$ ${sale.sale.payments}</label>
                    </h4>
                    ${amount ? (
                      `<h4 style= "font-size: 20; font-family: sans-serif; text-align: right">
                        Saldo: <label>$ ${amount}</label>
                      </h4>`                                              
                      ) : (
                        `<div style="text-align:center; width: 100%">
                          <h3 style="font-weight:bold">
                            ::: Cuenta Pagada :::
                          </h3>
                        </div>`                                                
                      )
                    }
                  </div>
                  `                  
                ) : null}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="text-justify text-lg">
      <ul class="d-block" style="font-family:sans-serif">
        <li>
          Armazones usados, viejos y/o resecos son responsabilidad del
          cliente
        </li>
        <li>
          Armazones reparados por el cliente pierden garantia de proovedor
        </li>
      </ul>
    </div>
    <div style = "position: absolute; width:80%; height: 12%; display:flex; justify-content: flex-end; align-items: center">
      <button style="width:25%; background-color: #3DC225; border:none; margin-right:3%; padding: 3%"; border-radius:5px; color:#FFFFFF; font-size:5%">Imprimir</button>
      <button style="width:25%; background-color: #DF1717; border:none; padding: 3%"; border-radius:5px; color:#FFFFFF; font-size:5%">Cancelar</button>
    </div>
  </div>
  `;
}
