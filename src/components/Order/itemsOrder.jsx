import React, { Component } from "react";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      cant: 1,
      item: "",
      price: 0,
      total: 0,
      itemNew: false,
      items: [],
      itemsDb: [],
    };
    this.total = 0;
  }
  componentDidMount() {
    this.setState({
      items: this.props.items,
    });
  }
  componentDidUpdate(props, state) {
    if (this.state.itemNew && this.state.item.length === 0) {
      this.inputItem.focus();
    }
    /*
    if (this.state.itemNew && this.state.cant === 1 && this.state.id) {
      this.inputCant.focus();
    }
    */
    if (this.props.items.length !== props.items.length) {
      this.setState({
        items: this.props.items,
      });
    }
  }

  render() {
    let { items, itemNew, itemsDb } = this.state;
    this.total = 0;
    if (!items) {
      items = this.props.items;
    }
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
                      this.state.id ? "form-control" : "form-control disabled"
                    }
                    disabled={this.state.id ? false : true}
                    type="number"
                    name="cant"
                    ref={(input) => {
                      this.inputCant = input;
                    }}
                    value={this.state.cant}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className={
                      !this.state.id ? "form-control" : "form-control disabled"
                    }
                    disabled={!this.state.id ? false : true}
                    type="text"
                    name="item"
                    autoComplete="off"
                    ref={(input) => {
                      this.inputItem = input;
                    }}
                    value={this.state.item}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className={
                      this.state.id ? "form-control" : "form-control disabled"
                    }
                    disabled={this.state.id ? false : true}
                    type="number"
                    name="price"
                    value={this.state.price}
                    onChange={this.catchInputs}
                  />
                </td>
                <td>
                  <input
                    className="form-control disabled"
                    type="number"
                    name="total"
                    value={this.state.total}
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
                                db.precio
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
              this.total += item.total * 1;
              return (
                <tr key={item.id}>
                  <td className="text-right">{item.cant}</td>
                  <td>
                    <span className="badge badge-primary">{item.item}</span>
                  </td>
                  <td className="text-right">$ {item.price}</td>
                  <td className="text-right">$ {item.total}</td>
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
              <button
                className={
                  this.props.status
                    ? "btn btn-outline-warning btn-sm disabled"
                    : "btn btn-outline-warning btn-sm"
                }
                disabled={this.props.status ? true : false}
                onClick={this.handleNewItem}
              >
                <i
                  className={itemNew ? "fas fa-times-circle" : "fas fa-plus"}
                ></i>
              </button>
            </td>
            <th scope="row" className="text-right">
              Total
            </th>
            <td className="text-right">$ {this.total}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    );
  }

  handelClickItemDb = (id, item, price) => {
    if (id) {
      this.setState({
        id,
        item,
        price,
        total: this.state.cant * price,
        itemsDb: [],
      });
    }
  };
  deleteItem = (id) => {
    let { items } = this.state;
    items.splice(id, 1);
    this.setState({
      items,
    });
  };
  catchInputs = (e) => {
    let { name, value, type } = e.target,
      total = 0;
    if (name === "cant") {
      total = this.state.price * value;
    } else if (name === "price") {
      total = this.state.cant * value;
    }
    if (type === "number") {
      value = value * 1;
    }
    if (name === "item" && value.length > 3 && !this.state.id) {
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
          } else {
            console.log("Error al almacenar items de la DB", data.message);
          }
        });
    }

    this.setState({
      [name]: value,
      total,
    });
  };
  addItem = (e) => {
    e.preventDefault();
    let items = this.props.items,
      idRandom = Math.floor(Math.random() * 100) + 1,
      find = items.find((item) => {
        return item.item === this.state.item;
      }),
      item = this.state;

    item.id = item.id ? item.id : idRandom;

    if (find) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
          item.cant += items[i].cant;
          item.total = item.cant * item.price;
          items.splice(i, 1);
        }
      }
    }

    delete item.itemNew;
    delete item.itemsDb;
    delete item.items;
    items.push(item);
    this.setState({
      id: 0,
      cant: 1,
      item: "",
      price: 0,
      total: 0,
      itemNew: false,
    });
    this.props.ChangeInput("items", items);
  };
  handleNewItem = (e) => {
    e.preventDefault();
    this.setState({
      itemNew: !this.state.itemNew,
      id: 0,
      cant: 1,
      item: "",
      price: 0,
      total: 0,
      itemsDb: [],
    });
  };
}
