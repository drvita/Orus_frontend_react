import React, { Component } from "react";

export default class HeaderTable extends Component {
  render() {
    let { data, order, orderby, actions } = this.props;

    if (data.length) {
      return (
        <thead className="thead-light">
          <tr>
            {data.map((col, index) => {
              return (
                <th
                  scope="col"
                  key={index}
                  onClick={() => {
                    this.handleOrder(col.type);
                  }}
                  style={{
                    cursor: order === "desc" ? "n-resize" : "s-resize",
                  }}
                >
                  {col.name}
                  {orderby === col.type ? (
                    <span className="ml-2">
                      <i className="fas fa-sort text-primary"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </th>
              );
            })}
            {actions ? <th className="text-center">Acciones</th> : ""}
          </tr>
        </thead>
      );
    } else {
      return (
        <thead>
          <tr>
            <th scope="col" className="text-center">
              No hay datos de columnas
            </th>
          </tr>
        </thead>
      );
    }
  }

  handleOrder = (item) => {
    this.props.handleOrder(item);
  };
}
