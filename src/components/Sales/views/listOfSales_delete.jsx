import React from "react";
import moment from "moment";

const ListOfSalesComponent = (props) => {
  const { sales } = props;
  return (
    <table className="table m-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Total</th>
          <th>Orden</th>
          <th>Registrado</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => {
          return (
            <tr key={sale.id}>
              <th>#{sale.id}</th>
              <td>$ {sale.total.toFixed(2)}</td>
              <td>#{sale.pedido}</td>
              <td className="text-truncate">
                <i className="fas fa-clock mr-2"></i>
                {moment(sale.created_at).fromNow()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListOfSalesComponent;
