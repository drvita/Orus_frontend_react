import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import SearchContact from "../Contacts/searchContactCard";
import Items from "../Order/itemsOrder";
import Abonos from "./abonos";
import Print from "./print_sale";
import EdoCuenta from "./edoCuenta";
import Chat from "../Layouts/messenger";

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
      host: props.data.host,
      token: props.data.token,
    };
    this.total = 0;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    moment.locale("es");
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getSales();
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
        date,
        order_id,
      } = this.state,
      pay = subtotal - (descuento + pagado),
      { data } = this.props,
      chat = order_id ? (
        <Chat data={data} table="orders" idRow={order_id} />
      ) : (
        <Chat data={data} table="sales" idRow={id} />
      );

    this.total = subtotal - descuento;
    pay = pay > 0 ? pay : 0;
    return (
      <React.Fragment>
        <div className="row d-print-none">
          <div className="col-3">
            <SearchContact
              contact={contact_id}
              status={status}
              getIdContact={this.getIdContact}
              changePage={this.changePage}
            />

            {contact_id && items.length ? (
              <EdoCuenta
                pay={pay}
                descuento={descuento}
                subtotal={subtotal}
                total={this.total}
                pagado={pagado}
                catchInputs={this.catchInputs}
              />
            ) : null}
          </div>
          <div className="col-6">
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
                            {order_id ? (
                              <Link
                                to={"/pedidos/registro/" + order_id}
                                onClick={(e) => {
                                  this.changePage("/pedidos/registro");
                                }}
                              >
                                {order_id}
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
                          <strong>{date}</strong>
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
                      contact_id && items.length
                        ? "btn btn-dark"
                        : "btn btn-dark disabled"
                    }
                    onClick={this.printSale}
                    disabled={contact_id && items.length ? false : true}
                  >
                    <i className="fas fa-print mr-2"></i>
                    <strong>Imprimir</strong>
                  </button>
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
            ) : null}
          </div>
          <div className="col">{contact_id ? chat : null}</div>
        </div>
        <Print
          id="print_sale"
          folio={id}
          date={date}
          items={items}
          descuento={descuento}
          total={this.total}
          saldo={pay}
          abonado={pagado}
          contact={contact_id}
        />
      </React.Fragment>
    );
  }

  printSale = () => {
    let content = document.getElementById("print_sale"),
      pri = document.getElementById("ifmcontentstoprint").contentWindow;

    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
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
  handleSave = (e) => {
    e.preventDefault();
    //Confirmacion de almacenamiento
    let conf = window.confirm("¿Esta seguro de almacenar esta venta?");

    if (conf) {
      //Variables
      let { id, host, token, load } = this.state,
        url = id
          ? "http://" + host + "/api/sales/" + id
          : "http://" + host + "/api/sales",
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

      //Verificamos datos

      //Mandamos señal de procesamiento
      if (!load) {
        this.setState({
          load: true,
        });
      }

      //Actualiza el pedido o creamos un pedido nuevo según el ID
      console.log("Enviando datos a API");
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
                "Venta almacenada con exito!.\n¿Desea cerrar esta venta?"
              )
            ) {
              this.props.history.goBack();
            } else {
              this.setState({
                id: data.data.id,
                usuario: data.data.created,
                date: data.data.created_at,
                status: 1,
                load: false,
              });
            }
          } else {
            window.alert("Error al almacenar la venta. Intentelo mas tarde");
            console.error(data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          this.setState({
            load: false,
          });
        });
    }
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
            date: moment(data.data.created_at).format("LL"),
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
