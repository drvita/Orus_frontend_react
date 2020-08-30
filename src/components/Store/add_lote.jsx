import React, { Component } from "react";

class StoreLote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      bill: "",
      cost: 0,
      price: this.props.price,
      amount: 0,
      lote: {
        data: [],
        meta: {},
      },
      loteNew: false,
      load: true,
      page: 1,
    };
    this.handleNewLote = this.handleNewLote.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.catchInputs = this.catchInputs.bind(this);
    this.handelGetLots = this.handelGetLots.bind(this);
  }

  componentDidMount() {
    this.handelGetLots(this.state.page);
  }

  render() {
    let { lote, load } = this.state,
      pages = [];
    if (this.state.lote.meta.total > 10) {
      for (var i = 1; i <= this.state.lote.meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              this.state.lote.meta.current_page === i
                ? "page-item disabled"
                : "page-item"
            }
          >
            <a
              href="#e"
              id={i}
              className="page-link"
              onClick={this.handleChangePage.bind(this)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return (
      <div className="card card-info card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-list"></i>
            Listado de lotes
          </h3>
          <div className="card-tools">
            {this.state.lote.meta.total > 10 ? (
              <div className="btn-group">
                <ul className="pagination pagination-sm">{pages}</ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover table-nowrap">
            <thead>
              <tr>
                <th>Registrado</th>
                <th style={{ width: 140 }}>Factura</th>
                <th className="text-right" style={{ width: 90 }}>
                  Unidades
                </th>
                <th className="text-right" style={{ width: 110 }}>
                  Costo
                </th>
                <th className="text-right" style={{ width: 110 }}>
                  Precio
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(lote.data).length ? (
                lote.data.map((lot) => {
                  return (
                    <tr key={lot.id}>
                      <td>{lot.created_at}</td>
                      <td className="text-uppercase">
                        {lot.factura ? lot.factura : "XXXX"}
                      </td>
                      <td className="text-right">{lot.cantidades}</td>
                      <td className="text-right">
                        $ {lot.costo ? lot.costo : 0}
                      </td>
                      <td className="text-right">
                        $ {lot.precio ? lot.precio : 0}
                      </td>
                      <td>
                        <a
                          className="btn-flat text-warning"
                          href="#delete"
                          onClick={(e) => {
                            this.handleDelete(e, lot.id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="6" className="text-center">
                    No hay datos para mostrar
                  </th>
                </tr>
              )}
              {this.state.loteNew ? (
                <tr>
                  <th>Nuevo</th>
                  <td>
                    <input
                      className="form-control text-uppercase"
                      type="text"
                      name="bill"
                      value={this.state.bill}
                      onChange={this.catchInputs}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control text-right"
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.catchInputs}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control text-right"
                      type="number"
                      name="cost"
                      value={this.state.cost}
                      onChange={this.catchInputs}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control text-right"
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.catchInputs}
                    />
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={this.handleSave}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={this.handleNewLote}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group float-right" role="group">
                <button
                  className="btn btn-primary"
                  onClick={this.handleNewLote}
                >
                  Nuevo lote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangePage(e) {
    e.preventDefault();
    this.setState({
      page: e.target.id,
    });
    this.handelGetLots(e.target.id);
  }
  handleNewLote() {
    this.setState({
      loteNew: !this.state.loteNew,
    });
  }
  catchInputs(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  }
  validInputs() {
    //Datos del formulario
    let { bill, price, amount } = this.state;
    if (!bill.length) {
      bill = "XXXX";
    }
    if (!price) {
      price = 1000;
    }
    if (!amount) {
      window.alert("La cantidad de articulos no puede ser cero");
      return false;
    }
    return true;
  }
  handleSave(e) {
    e.preventDefault();
    //Validamos campos antes de almacenar
    if (!this.validInputs()) {
      return false;
    }
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de almacenar un nuevo lote?");
    if (conf) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Datos del formulario
      let { id, bill, cost, price, amount } = this.state;
      //Creamos el body
      let body = {
        bill,
        cost,
        price,
        amount,
        store_items_id: id,
      };
      //Creamos lote nuevo
      fetch("http://" + varLocalStorage.host + "/api/items", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            this.setState({
              load: true,
              loteNew: false,
            });
            this.handelGetLots(this.state.page);
            this.props.refresh();
          } else {
            console.log(data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  handelGetLots(page) {
    //Variables
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      id = this.props.id,
      url =
        "http://" + varLocalStorage.host + "/api/items?store_items_id=" + id;
    fetch(url + "&page=" + page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Descargando lotes");
        this.setState({
          id,
          lote: data,
          load: false,
        });
      });
  }
  handleDelete = (e, id) => {
    e.preventDefault();
    const tr = e.target.parentNode.parentNode.parentNode;
    tr.classList.add("bg-danger");

    let conf = window.confirm("¿Esta seguro de eliminar este lote?"),
      varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      deleteColor = setInterval(() => {
        clearInterval(deleteColor);
        tr.classList.remove("bg-danger");
      }, 6500);
    if (conf && id) {
      fetch("http://" + varLocalStorage.host + "/api/items/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((data) => {
          console.log("Eliminando lote");
          if (data.ok && data.status === 204) {
            this.setState({
              load: true,
              loteNew: false,
            });
            this.handelGetLots(this.state.page);
            this.props.refresh();
          } else {
            window.alert(data.statusText);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}

export default StoreLote;
