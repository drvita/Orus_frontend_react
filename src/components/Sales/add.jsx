import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchContact from "../Contacts/searchContactCard";
import Items from "../Order/views/listItemsOrder";
import Abonos from "./abonos";
import Print from "./print_sale";
import EdoCuenta from "./edoCuenta";
import Chat from "../Layouts/messenger";

export default class SaleAdd extends Component {
  constructor(props) {
    super(props);
    const contact = JSON.parse(localStorage.getItem("OrusContactInUse")),
      id = this.props.match.params.id,
      contact_id = id ? 0 : 2;
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));

    this.state = {
      id: id,
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
      contact_id: contact && contact.id ? contact.id : contact_id,
      cliente: {},
      order_id: 0,
      status: 0,
      usuario: "",
      date: Date.now(),
      load: true,
      pagado: 0,
      host: ls.host,
      token: ls.token,
    };
    this.total = 0;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    let { id } = this.state;
    this.getSales(id);
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
  }

  render() {
    const {
        contact_id,
        cliente,
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
        usuario,
      } = this.state,
      { data } = this.props,
      chat = order_id ? (
        <Chat data={data} table="orders" idRow={order_id} pagado={pagado} />
      ) : (
        <Chat data={data} table="sales" idRow={id} pagado={pagado} />
      );
    let pay = subtotal - (descuento + pagado);

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
          </div>
          <div className="col">
            <div className="card card-success card-outline">
              <div className="card-body p-0">
                {contact_id && !load ? (
                  <React.Fragment>
                    <div className="row mx-2 my-4">
                      <div className="col-2">
                        <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                          <span className="badge badge-pill badge-success mx-2">
                            Venta
                          </span>
                          <strong>{id ? id : "Nuevo"}</strong>
                        </div>
                      </div>
                      <div className="col">
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
                      {order_id ? (
                        <div className="col-2">
                          <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                            <span className="badge badge-pill badge-warning mx-2">
                              Pedido
                            </span>
                            <strong>
                              {order_id ? (
                                <Link
                                  to={"/pedidos/" + order_id}
                                  onClick={(e) => {
                                    this.changePage("/pedidos/registro");
                                  }}
                                >
                                  {order_id}
                                </Link>
                              ) : null}
                            </strong>
                          </div>
                        </div>
                      ) : null}
                      <div className="col">
                        <div className="border border-success rounded p-2 d-flex justify-content-between align-items-center">
                          <span className="badge badge-pill badge-success mx-2">
                            Fecha
                          </span>
                          <strong>{moment(date).format("ll")}</strong>
                        </div>
                      </div>
                    </div>
                    <Items
                      items={items}
                      status={false}
                      session={session}
                      ChangeInput={this.handleChangeInput}
                      addCancel={order_id ? true : false}
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
                    onClick={(e) => {
                      window.print();
                    }}
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
            {contact_id && id && items.length ? (
              <div className="card card-success card-outline">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    <i className="fas fa-money-bill mr-2"></i>
                    Ultimos Abonos
                  </h5>
                  <Abonos
                    abonos={parseInt(pagado)}
                    sale={parseInt(id)}
                    contact={contact_id}
                    cliente={cliente}
                    pay={parseInt(pay)}
                    order={parseInt(order_id)}
                    data={data}
                    user={usuario}
                    handleChange={this.handleChangeInput}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {id && contact_id ? (
            <div className="col-3 d-print-none">
              {items.length ? (
                <EdoCuenta
                  pay={pay}
                  descuento={descuento}
                  subtotal={subtotal}
                  total={this.total}
                  pagado={pagado}
                  catchInputs={this.catchInputs}
                />
              ) : null}
              {chat}
            </div>
          ) : null}
        </div>
        <Print
          id="print_sale"
          folio={order_id ? "P-" + order_id : "V-" + id}
          date={date}
          items={items}
          descuento={descuento}
          total={this.total}
          saldo={pay}
          abonado={pagado}
          contact={contact_id}
          cliente={cliente}
        />
      </React.Fragment>
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
    let { id } = this.state;

    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar la venta?"
        : "¿Esta seguro de crear una nueva venta?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          //Variables
          let { host, token } = this.state,
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
              descripcion: item.descripcion,
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
          console.log("Enviando datos a API para almacenar");
          return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then(async (response) => {
              let back = {};
              if (response.status !== 204) back = await response.json();
              if (!response.ok) {
                throw new Error(back.message);
              }
              return back;
            })
            .catch((e) => {
              console.error("Orus fetch", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          console.log("Venta almacenada");
          window.Swal.fire({
            icon: "success",
            title: id
              ? "Venta actualizada con exito"
              : "Venta almacenada con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.setState({
              id: data.data.id,
              //order_id: data.data.pedido,
            });
            this.props.history.push(`/notas/registro/${data.data.id}`);
          });
        } else {
          window.Swal.fire("Error", "al almacenar la venta", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getSales = (id) => {
    if (id > 0) {
      //Variables en state
      let { host, token } = this.state;
      //Realiza la peticion del pedido
      console.log("Solicitando datos de pedido a la API");
      fetch("http://" + host + "/api/sales/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (!data.message) {
            const { rol } = this.props.data;
            console.log("Mostrando datos del pedido", data);
            this.setState({
              id: data.data.id,
              session: data.data.session
                ? data.data.session
                : this.state.session,
              items: data.data.productos,
              descuento: data.data.descuento,
              subtotal: data.data.subtotal,
              total: data.data.total,
              contact_id: data.data.cliente.id,
              cliente: data.data.cliente,
              usuario: data.data.created,
              date: data.data.created_at,
              status: !rol ? 0 : 1,
              order_id: data.data.pedido,
              pagado: data.data.pagado,
              load: false,
            });
          } else {
            console.error("Orus: ", data.message);
            window.Swal.fire("Error", data.message, "error");
            this.setState({
              load: false,
            });
          }
        })
        .catch((error) => {
          console.log("Orus:", error);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
          this.setState({
            load: false,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
