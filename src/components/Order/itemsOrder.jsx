import React, { Component } from "react";
import AddModal from "./addItemModal";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      store_items_id: 0,
      session: props.session ? props.session : "",
      cantidad: 1,
      precio: 0,
      subtotal: 0,
      inStorage: 0,
      producto: "",
      out: 0,
      descripcion: "",
      itemNew: false,
      itemsDb: [],
      load: false,
    };
    this.total = 0;
  }

  render() {
    const { itemNew, load } = this.state,
      { items, codes } = this.props;
    this.total = 0;

    return (
      <div className="card">
        <div className="card-header">
          <h5>
            <i className="fas fa-shopping-cart"></i> Pedido
          </h5>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-sm m-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: 64 }}>
                  Cantidad
                </th>
                <th scope="col">Descripcion</th>
                <th scope="col" className="text-center" style={{ width: 120 }}>
                  Precio
                </th>
                <th scope="col" className="text-center" style={{ width: 120 }}>
                  Subtotal
                </th>
                <th scope="col" style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.length ? (
                items.map((item, index) => {
                  this.total += item.subtotal * 1;
                  return (
                    <tr key={index}>
                      <td className="text-right">{item.cantidad}</td>
                      <td className="text-truncate">
                        {!item.inStorage ? (
                          <i className="text-warning fas fa-circle mr-1"></i>
                        ) : null}
                        {item.producto}
                        {item.descripcion
                          ? " (" + item.descripcion + ")"
                          : null}
                      </td>
                      <td className="text-right">
                        $ {parseFloat(item.precio).toFixed(2)}
                      </td>
                      <td className="text-right">
                        $ {item.subtotal.toFixed(2)}
                      </td>
                      <td className="d-print-none">
                        <button
                          className={
                            this.props.status
                              ? "btn btn-outline-light btn-sm disabled"
                              : "btn btn-outline-light btn-sm"
                          }
                          disabled={this.props.status ? true : false}
                          onClick={(e) => {
                            if (!this.props.status)
                              this.deleteItem(item.store_items_id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center" colSpan="5">
                    No hay articulos cargados
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-right" colSpan="2">
                  {!this.props.status && !this.props.addCancel ? (
                    <button
                      className={
                        this.props.status
                          ? "btn btn-outline-warning btn-sm disabled"
                          : itemNew
                          ? "btn btn-outline-dark btn-sm"
                          : "btn btn-outline-primary btn-sm"
                      }
                      disabled={this.props.status ? true : false}
                      onClick={(e) => {
                        this.setState({
                          itemNew: !this.state.itemNew,
                        });
                      }}
                    >
                      <i
                        className={itemNew ? "fas fa-undo" : "fas fa-plus"}
                      ></i>
                    </button>
                  ) : null}
                </td>
                <th scope="row" className="text-right">
                  Subtotal
                </th>
                <td className="text-right">$ {this.total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {codes && codes.code ? (
          <div className="card-footer">
            {codes.od === codes.oi ? (
              <div className="row">
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion
                  </label>
                  <span className="text">{codes.code + codes.od}</span>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion ojo derecho
                  </label>
                  <span className="text">{codes.code + codes.od}</span>
                </div>
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion ojo izquierdo
                  </label>
                  <span className="text">{codes.code + codes.oi}</span>
                </div>
              </div>
            )}
          </div>
        ) : null}
        {load ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
        {itemNew ? (
          <AddModal
            handleAddItem={this.handleAddItem}
            handleCloseModal={(e) => {
              this.setState({
                itemNew: false,
              });
            }}
          />
        ) : null}
      </div>
    );
  }

  deleteItem = (id) => {
    const { items } = this.props;
    const itemsToSave = items.filter((e) => e.store_items_id !== id);

    this.props.ChangeInput("items", itemsToSave);
  };
  handleAddItem = (item) => {
    if (item) {
      let { items } = this.props;
      items.push(item);
      this.props.ChangeInput("items", items);
    }
  };
}
