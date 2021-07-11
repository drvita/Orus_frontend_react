import React from "react";
import moment from "moment";

const ListOfSalesComponent = (props) => {
  const { sales } = props;
  return (
    <table className="table m-0">
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Total</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => {
          return (
            <tr key={sale.id}>
              <td>#{sale.pedido}</td>
              <td>$ {sale.total.toFixed(2)}</td>
              <td>{moment(sale.created_at).fromNow()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListOfSalesComponent;
