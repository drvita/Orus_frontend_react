import React, { Component } from "react";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      store_items_id: 0,
      session: "",
      cantidad: 1,
      precio: 0,
      subtotal: 0,
      inStorage: 0,
      producto: "",
      out: 0,
      itemNew: false,
      itemsDb: [],
    };
    this.total = 0;
  }
  componentDidMount() {
    this.setState({
      session: this.props.session,
    });
  }
  componentDidUpdate(props, state) {
    if (this.state.itemNew && this.state.producto.length === 0) {
      this.inputItem.focus();
    }
    /*
    if (this.state.itemNew && this.state.cant === 1 && this.state.id) {
      this.inputCant.focus();
    }
    */
  }

  render() {
    let { itemNew, itemsDb } = this.state;
    let { items } = this.props;
    this.total = 0;

    return (
      <table className="table table-sm table-striped  mt-2">
        <thead>
          <tr>
            <th scope="col" style={{ width: 64 }}>
              Cantidad
            </th>
            <th scope="col">Descripcion</th>
            <th scope="col" style={{ width: 80 }}>
              Precio
            </th>
            <th scope="col" style={{ width: 80 }}>
              Subtotal
            </th>
            <th scope="col" style={{ width: 60 }}></th>
          </tr>
        </thead>
        <tbody>
          {itemNew ? (
            <React.Fragment>
              <tr>
                <td>
                  <input
                    className={
                      this.state.store_items_id
                        ? "form-control"
                        : "form-control disabled"
                    }
                    disabled={this.state.store_items_id ? false : true}
                    type="number"
                    name="cantidad"
                    ref={(input) => {
                      this.inputCant = input;
                    }}
                    value={this.state.cantidad}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className={
                      !this.state.store_items_id
                        ? "form-control"
                        : "form-control disabled"
                    }
                    disabled={!this.state.store_items_id ? false : true}
                    type="text"
                    name="producto"
                    autoComplete="off"
                    ref={(input) => {
                      this.inputItem = input;
                    }}
                    value={this.state.producto}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className={
                      this.state.store_items_id
                        ? "form-control"
                        : "form-control disabled"
                    }
                    disabled={this.state.store_items_id ? false : true}
                    type="number"
                    name="precio"
                    value={this.state.precio}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className="form-control disabled"
                    type="number"
                    name="subtotal"
                    value={this.state.subtotal}
                    readOnly={true}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={this.addItem}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </td>
              </tr>
              {itemsDb.length ? (
                <tr>
                  <td colSpan="5">
                    <div className="list-group">
                      {itemsDb.map((db) => {
                        return (
                          <a
                            className="list-group-item list-group-item-action"
                            href={"#" + db.codigo}
                            key={db.id}
                            onClick={(e) => {
                              e.preventDefault();
                              this.handelClickItemDb(
                                db.id,
                                db.producto,
                                db.precio,
                                db.cantidades
                              );
                            }}
                          >
                            ({db.codigo}){db.producto} / {db.marca}
                          </a>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ) : (
                <tr></tr>
              )}
            </React.Fragment>
          ) : (
            <tr></tr>
          )}
          {items.length ? (
            items.map((item, index) => {
              this.total += item.subtotal * 1;
              return (
                <tr key={index}>
                  <td className="text-right">{item.cantidad}</td>
                  <td>
                    <span
                      className={
                        !item.inStorage
                          ? "badge badge-warning"
                          : "badge badge-primary"
                      }
                    >
                      {item.producto}
                    </span>
                  </td>
                  <td className="text-right">$ {item.precio}</td>
                  <td className="text-right">$ {item.subtotal}</td>
                  <td>
                    <button
                      className={
                        this.props.status
                          ? "btn btn-outline-light btn-sm disabled"
                          : "btn btn-outline-light btn-sm"
                      }
                      disabled={this.props.status ? true : false}
                      onClick={(e) => {
                        if (!this.props.status) this.deleteItem(index);
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
              {!this.props.status ? (
                <button
                  className={
                    this.props.status
                      ? "btn btn-outline-success btn-sm disabled"
                      : "btn btn-outline-success btn-sm"
                  }
                  disabled={this.props.status ? true : false}
                  onClick={this.handleNewItem}
                >
                  <i
                    className={itemNew ? "fas fa-times-circle" : "fas fa-plus"}
                  ></i>
                </button>
              ) : (
                ""
              )}
            </td>
            <th scope="row" className="text-right">
              Subtotal
            </th>
            <td className="text-right">$ {this.total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    );
  }

  handelClickItemDb = (id, producto, precio, cant) => {
    if (id) {
      this.setState({
        id: 0,
        store_items_id: id,
        producto,
        precio,
        subtotal: this.state.cantidad * precio,
        //Verificando que exitan los productos en almacen
        inStorage: cant >= this.state.cantidad ? 1 : 0,
        out: cant,
        itemsDb: [],
      });
    }
  };
  deleteItem = (id) => {
    let { items } = this.props;
    items.splice(id, 1);
    this.props.ChangeInput("items", items);
  };
  catchInputs = (e) => {
    let { name, value, type } = e.target,
      subtotal = 0;
    if (name === "cantidad") {
      subtotal = this.state.precio * value;
    } else if (name === "precio") {
      subtotal = this.state.cantidad * value;
    }
    if (type === "number") {
      value = value * 1;
    }
    if (name === "producto" && value.length > 3 && !this.state.store_items_id) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        url = "http://" + varLocalStorage.host + "/api/store",
        search = "?search=" + value;
      //Realiza la peticion del usuario seun el id
      console.log("Descargando datos del item");
      fetch(url + search, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Hubo un error, intentelo mas tarde");
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          if (data.data && data.data.length) {
            console.log("Almacenando datos del item del DB");
            this.setState({
              itemsDb: data.data,
            });
          } else if (data.message) {
            console.log("Error al almacenar items de la DB", data.message);
          }
        });
    }

    this.setState({
      [name]: value,
      subtotal,
    });
  };
  addItem = (e) => {
    e.preventDefault();
    let items = this.props.items,
      find = items.find((item) => {
        return item.store_items_id === this.state.store_items_id;
      }),
      item = this.state;

    if (find) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].store_items_id === item.store_items_id) {
          item.cantidad += items[i].cantidad;
          item.subtotal = item.cantidad * item.precio;
          items.splice(i, 1);
        }
      }
    }

    item.inStorage = item.out >= item.cantidad ? 1 : 0;
    item.out = item.out >= item.cantidad ? 0 : item.cantidad - item.out;

    delete item.itemNew;
    delete item.itemsDb;
    delete item.items;
    items.push(item);

    this.setState({
      id: 0,
      store_items_id: 0,
      cantidad: 1,
      producto: "",
      precio: 0,
      total: 0,
      inStorage: 0,
      out: 0,
      itemNew: false,
    });
    console.log("Envio de nuevos productos", items);
    this.props.ChangeInput("items", items);
  };
  handleNewItem = (e) => {
    e.preventDefault();
    this.setState({
      itemNew: !this.state.itemNew,
      store_items_id: 0,
      cantidad: 1,
      producto: "",
      precio: 0,
      subtotal: 0,
      inStorage: 0,
      out: 0,
      itemsDb: [],
    });
  };
}
