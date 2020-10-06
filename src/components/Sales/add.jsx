import React, { Component } from "react";
import SearchContact from "../Contacts/searchContactCard";
import Items from "../Order/itemsOrder";
import Abonos from "./abonos";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

export default class SaleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      session:
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(10),
      descuento: 0,
      subtotal: 0,
      total: 0,
      items: [],
      contact_id: 0,
      order_id: 0,
      status: 0,
      usuario: "",
      date: moment().format("LL"),
      load: true,
      pagado: 0,
    };
    this.total = 0;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentDidMount() {
    this.getSales();
    moment.locale("es");
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    let {
        contact_id,
        subtotal,
        descuento,
        pagado,
        items,
        status,
        id,
        session,
        load,
      } = this.state,
      pay = subtotal - (descuento + pagado);
    this.total = subtotal - descuento;
    pay = pay > 0 ? pay : 0;
    return (
      <div className="row">
        <div className="col-4">
          <SearchContact
            contact={contact_id}
            status={this.state.status}
            getIdContact={this.getIdContact}
            changePage={this.changePage}
          />

          {contact_id && items.length ? (
            <div className="card card-success card-outline">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Estado de cuenta
                  {!pay ? (
                    <span className="badge badge-success ml-2">
                      Cuenta liquidada
                    </span>
                  ) : (
                    ""
                  )}
                </h5>

                <div className="card-text form-group row">
                  <label className="col-6">Descuento</label>
                  <div className="col">
                    <input
                      className="form-control text-right text-success"
                      type="number"
                      name="descuento"
                      min="0"
                      max={this.state.subtotal - this.state.descuento}
                      readOnly={pay ? false : true}
                      value={descuento}
                      onChange={this.catchInputs}
                    />
                  </div>
                </div>
                <div className="card-text form-group row">
                  <label className="col-6">Total</label>
                  <div className="col">
                    <input
                      className="form-control text-right text-success"
                      type="number"
                      name="total"
                      value={this.total}
                      onChange={this.catchInputs}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="card-text row">
                  <label className="col-6 p-2">Abonado</label>
                  <h2 className="col text-success p-2 text-right">
                    $ {pagado}
                  </h2>
                </div>
                <div className="card-text row">
                  <label className="col-6 p-2">Faltante</label>
                  <h2 className="col text-success p-2 text-right">$ {pay}</h2>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col">
          <div className="card card-success card-outline">
            <div className="card-body">
              {contact_id ? (
                <React.Fragment>
                  <div className="row mb-4">
                    <div className="col-2">
                      <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-success mx-2">
                          Folio
                        </span>
                        <strong>{id ? id : "Nuevo"}</strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-success mx-2">
                          Creador
                        </span>
                        <strong>
                          {this.state.usuario
                            ? this.state.usuario
                            : this.props.data.name}
                        </strong>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-warning mx-2">
                          Pedido
                        </span>
                        <strong>
                          {this.state.order_id ? (
                            <Link
                              to={"/pedidos/registro/" + this.state.order_id}
                              onClick={(e) => {
                                this.changePage("/pedidos/registro");
                              }}
                            >
                              {this.state.order_id}
                            </Link>
                          ) : (
                            "--"
                          )}
                        </strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-success mx-2">
                          Fecha
                        </span>
                        <strong>{this.state.date}</strong>
                      </div>
                    </div>
                  </div>

                  <Items
                    items={items}
                    status={status}
                    session={session}
                    ChangeInput={this.handleChangeInput}
                  />
                </React.Fragment>
              ) : load ? (
                <div className="text-center p-4">
                  <div
                    className="spinner-border text-primary mr-4"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className="font-weight-light font-italic">
                    Espere cargando datos de la venta
                  </span>
                </div>
              ) : (
                <div className="alert alert-light">
                  <h4 className="alert-heading">Nueva nota</h4>
                  <p>
                    <i className="fas fa-user mr-1"></i> Primero seleccione al
                    cliente!
                  </p>
                </div>
              )}
            </div>
            <div className="card-footer text-right">
              <div className="btn-group" role="group">
                <Link
                  to="/notas"
                  className="btn btn-dark"
                  onClick={(e) => {
                    this.changePage("/notas");
                  }}
                >
                  <i
                    className={
                      id ? "fas fa-arrow-left mr-2" : "fas fa-ban mr-2"
                    }
                  ></i>
                  <strong>{id ? "Regresar" : "Cancelar"}</strong>
                </Link>
                <button
                  className={
                    contact_id && items.length && pay
                      ? "btn btn-success"
                      : "btn btn-success disabled"
                  }
                  onClick={this.handleSave}
                  disabled={contact_id && items.length && pay ? false : true}
                >
                  <i className="fas fa-save mr-2"></i>
                  <strong>Guardar</strong>
                </button>
              </div>
            </div>
          </div>
          {contact_id && id ? (
            <div className="card card-success card-outline">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="fas fa-money-bill mr-2"></i>
                  Abonos
                </h5>
                <Abonos
                  abonos={pagado * 1}
                  sale={id * 1}
                  contact={contact_id}
                  pay={pay * 1}
                  user={this.props.data.name}
                  handleChange={this.handleChangeInput}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    let subtotal = 0;
    if (key === "items") {
      for (var i = 0; i < value.length; i++) {
        subtotal += value[i].cantidad * value[i].precio;
      }
    } else {
      subtotal = this.state.subtotal;
    }
    this.setState({
      [key]: value,
      subtotal,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar la accion de guardar?"),
      id = this.state.id;
    if (conf) {
      //Variables en localStorage
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      //Creamos el body
      console.log("Enviando datos a API para almacenar");
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
        url = id
          ? "http://" + varLocalStorage.host + "/api/sales/" + id
          : "http://" + varLocalStorage.host + "/api/sales",
        method = id ? "PUT" : "POST",
        body = {},
        items = [];

      this.state.items.map((item) => {
        items.push({
          cant: item.cantidad,
          price: item.precio,
          subtotal: item.subtotal,
          inStorage: item.inStorage,
          out: item.out,
          session: item.session,
          store_items_id: item.store_items_id,
        });
        return false;
      });
      body = {
        session: this.state.session,
        descuento: this.state.descuento,
        subtotal: this.state.subtotal,
        total: this.state.subtotal - this.state.descuento,
        contact_id: this.state.contact_id,
        order_id: this.state.order_id ? this.state.order_id : "",
        pagado: this.state.pagado,
        items: JSON.stringify(items),
      };
      //Actualiza el pedido o creamos un pedido nuevo según el ID
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Pedido almacenado");
            if (
              window.confirm(
                "Pedido almacenado con exito!.\n¿Desea cerrar esta venta?"
              )
            ) {
              this.props.history.goBack();
            } else {
              this.setState({
                id: data.data.id,
                usuario: data.data.created,
                date: data.data.created_at,
                status: 1,
              });
            }
          } else console.log(data.message);
        });
    }
  };
  catchInputs = (e) => {
    let { name, value, type } = e.target;
    if (type === "number") value = value * 1;
    if (name === "descuento") {
      if (value >= this.state.subtotal - this.state.descuento) {
        value = this.state.subtotal - 1;
      }
    }
    this.setState({
      [name]: value,
    });
  };
  getIdContact = (contact_id, edad) => {
    this.setState({
      contact_id,
      edad,
    });
  };
  changePage = (e) => {
    this.props.page(e);
  };
  getSales = () => {
    let id = this.props.match.params.id;
    if (id > 0) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Realiza la peticion del usuario seun el id
      console.log("Descargando datos de la venta");
      fetch("http://" + varLocalStorage.host + "/api/sales/" + id, {
        method: "GET",
        signal: this.signal,
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
          console.log("Almacenando datos de la venta");
          this.setState({
            id: data.data.id,
            session: data.data.session ? data.data.session : this.state.session,
            items: data.data.productos,
            descuento: data.data.descuento,
            subtotal: data.data.subtotal,
            total: data.data.total,
            contact_id: data.data.cliente.id,
            usuario: data.data.created,
            date: data.data.created_at,
            status: 1,
            order_id: data.data.pedido,
            pagado: data.data.pagado,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
