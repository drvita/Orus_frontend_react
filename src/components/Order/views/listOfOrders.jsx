import React from "react";
import moment from "moment";
import helper from "../helpers";

const ListOfOrdersComponent = (props) => {
  const { orders } = props;
  return (
    <table className="table m-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Folio LAB</th>
          <th>Nota</th>
          <th>Estado</th>
          <th>Registrado</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <th>#{order.id}</th>
              <td>{order.order_foreing ? `#${order.order_foreing}` : "--"}</td>
              <td>{order.nota ? `#${order.nota}` : "--"}</td>
              <td className="text-uppercase">
                <span className="badge badge-secondary">
                  {helper.handleStatusString(order.status)}
                </span>
              </td>
              <td className="text-truncate">
                <i className="fas fa-clock mr-2"></i>
                {moment(order.created_at).fromNow()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListOfOrdersComponent;
