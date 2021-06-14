import React, { Component } from "react";
import AddModal from "./addItemModal";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      itemNew: false,
      itemsDb: [],
      load: false,
    };
    this.total = 0;
  }

  render() {
    const { itemNew, load } = this.state,
      { items, codes, session, status = true } = this.props;
    this.total = 0;

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-shopping-cart"></i> Pedido
          </h3>
          <div className="card-tools">
            {session && !itemNew ? (
              <button
                className={
                  !status
                    ? "btn btn-too btn-outline-secondary disabled"
                    : "btn btn-too btn-primary text-bold"
                }
                disabled={!status ? true : false}
                onClick={(e) => {
                  this.setState({
                    itemNew: !this.state.itemNew,
                  });
                }}
              >
                <i className="fas fa-plus mr-1"></i> Agregar
              </button>
            ) : null}
          </div>
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
                <th scope="col" style={{ minWidth: "4rem", maxWidth: "8rem" }}>
                  <span className="sr-only">acciones</span>
                </th>
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
                      <td className="d-print-none text-right">
                        <button
                          className={
                            this.props.status
                              ? "btn btn-outline-secondary btn-sm disabled"
                              : "btn btn-outline-danger btn-sm"
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
                <td className="text-right" colSpan="2"></td>
                <th scope="row" className="text-right">
                  Total
                </th>
                <td className="text-right text-primary">
                  <label>$ {this.total.toFixed(2)}</label>
                </td>
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
      const itemFound = items.findIndex(
        (e) => e.store_items_id === item.store_items_id
      );

      if (itemFound !== -1) {
        const cantidad = items[itemFound].cantidad + item.cantidad,
          precio = item.precio,
          subtotal = items[itemFound].precio * cantidad;

        if (items[itemFound].precio === precio) {
          items[itemFound].cantidad = cantidad;
          items[itemFound].subtotal = subtotal;
        } else {
          items.push(item);
        }
      } else {
        items.push(item);
      }

      console.log(
        "[DEBUG] show item before add finish",
        item,
        items,
        itemFound
      );
      this.props.ChangeInput("items", items);
    }
  };
}
