import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import SearchContact from "../Contacts/searchContactCard";
import Items from "./itemsOrder";
import ListExam from "../Exam/listsExams";
import LabOrder from "./labOrder";
import Status from "./statusOrder";
import Bicelacion from "./bicelacionOrder";
import Garantia from "./garantiaOrder";
import Chat from "../Layouts/messenger";

export default class OrderAdd extends Component {
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
      observaciones: "",
      lab_id: 0,
      npedidolab: "",
      ncaja: 0,
      mensajes: [],
      items: [],
      contact_id: 0,
      usuario: "",
      edad: 0,
      exam_id: 0,
      exam: {},
      status: 0,
      date: Date.now(),
      load: true,
      nota: 0,
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      moment.locale("es");
      this.getOrder(id);
    } else {
      this.setState({
        load: false,
      });
    }
  }
  componentDidUpdate(props, state) {
    //console.log("Renderizando Add en items", state.load, this.state.load);
    if (state.load !== this.state.load && this.state.load === true) {
      //this.getOrder();
    }
  }

  render() {
    let { contact_id, id, load, exam_id, items } = this.state,
      { data } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <SearchContact
            contact={this.state.contact_id}
            edad={this.state.edad}
            status={this.state.status}
            getIdContact={this.getIdContact}
            changePage={this.changePage}
          />
          {contact_id ? (
            <div className="card card-warning card-outline mt-4">
              <div className="card-body">
                <Status
                  status={this.state.status}
                  ChangeInput={this.handleChangeInput}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="col">
          <div className="card card-warning card-outline">
            <div className="card-body">
              {contact_id && !load ? (
                <React.Fragment>
                  <div className="row">
                    <div className="col-2">
                      <div className="border border-warning rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-warning mx-2">
                          Folio
                        </span>
                        <strong>
                          {this.state.id ? this.state.id : "Nuevo"}
                        </strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border border-warning rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-warning mx-2">
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
                      <div className="border border-warning rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-success mx-2">
                          Nota
                        </span>
                        <strong>
                          {this.state.nota ? (
                            <Link
                              to={"/notas/registro/" + this.state.nota}
                              onClick={(e) => {
                                this.changePage("/notas/registro");
                              }}
                            >
                              {this.state.nota}
                            </Link>
                          ) : (
                            "--"
                          )}
                        </strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="border border-warning rounded p-2 d-flex justify-content-between align-items-center">
                        <span className="badge badge-pill badge-warning mx-2">
                          Fecha
                        </span>
                        <strong>{moment(this.state.date).format("LL")}</strong>
                      </div>
                    </div>
                  </div>
                  <ul className="nav nav-tabs mt-4" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className={
                          !this.state.status || this.state.status === 3
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="#pedido"
                        data-toggle="tab"
                      >
                        Nota
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#exam">
                        Examen
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.status === 1
                            ? "nav-link active"
                            : !this.state.status
                            ? "nav-link disabled"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#lab"
                      >
                        Laboratorio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.status === 2
                            ? "nav-link active"
                            : !this.state.status
                            ? "nav-link disabled"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        href="#bicelacion"
                      >
                        Bicelación
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.status === 4
                            ? "nav-link active"
                            : "nav-link disabled"
                        }
                        data-toggle="tab"
                        href="#garantia"
                      >
                        Garantia
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={
                        !this.state.status || this.state.status === 3
                          ? "tab-pane fade pt-4 show active"
                          : "tab-pane fade pt-4"
                      }
                      id="pedido"
                    >
                      <Items
                        items={this.state.items}
                        status={this.state.status}
                        session={this.state.session}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                    <div className="tab-pane fade pt-4" id="exam">
                      <ListExam
                        paciente={this.state.contact_id}
                        edad={this.state.edad}
                        exam={this.state.exam}
                        page={this.changePage}
                        select={true}
                        status={this.state.status}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                    <div
                      className={
                        this.state.status === 1
                          ? "tab-pane fade pt-4 show active"
                          : "tab-pane fade pt-4"
                      }
                      id="lab"
                    >
                      <LabOrder
                        lab_id={this.state.lab_id ? this.state.lab_id : 0}
                        npedidolab={
                          this.state.npedidolab ? this.state.npedidolab : ""
                        }
                        status={this.state.status}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                    <div
                      className={
                        this.state.status === 2
                          ? "tab-pane fade pt-4 show active"
                          : "tab-pane fade pt-4"
                      }
                      id="bicelacion"
                    >
                      <Bicelacion
                        ncaja={this.state.ncaja}
                        observaciones={this.state.observaciones}
                        status={this.state.status}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                    <div
                      className={
                        this.state.status === 4
                          ? "tab-pane fade pt-4 show active"
                          : "tab-pane fade pt-4"
                      }
                      id="garantia"
                    >
                      <Garantia
                        status={this.state.status}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : this.state.load ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="alert alert-light">
                  <h4 className="alert-heading">Nuevo pedido</h4>
                  <p>
                    <i className="fas fa-user mr-1"></i> Primero seleccione al
                    paciente!
                  </p>
                </div>
              )}
            </div>
            <div className="card-footer text-right">
              <div className="btn-group" role="group">
                <Link
                  to="/pedidos"
                  className="btn btn-dark"
                  onClick={(e) => {
                    this.changePage("/pedidos");
                  }}
                >
                  <i className="fas fa-ban mr-1"></i>
                  <strong>Cancelar</strong>
                </Link>
                <button
                  className={
                    contact_id && (items.length || exam_id)
                      ? "btn btn-warning"
                      : "btn btn-warning disabled"
                  }
                  onClick={this.handleSave}
                  disabled={
                    contact_id && (items.length || exam_id) ? false : true
                  }
                >
                  <i className="fas fa-save mr-1"></i>
                  <strong>Guardar</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
        {contact_id && id ? (
          <div className="col-3">
            <Chat data={data} table="orders" idRow={id} />
          </div>
        ) : null}
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
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
    //Confirmación de almacenamiento
    let conf = window.confirm("¿Esta seguro de realizar la accion de guardar?");

    if (conf) {
      //Variables en localStorage
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      //Creamos el body

      let { id, load, host, token } = this.state,
        url = id
          ? "http://" + host + "/api/orders/" + id
          : "http://" + host + "/api/orders",
        method = id ? "PUT" : "POST",
        body = {},
        items = [];

      this.state.items.map((item) => {
        items.push({
          cant: item.cantidad,
          price: item.precio,
          subtotal: item.subtotal,
          inStorage: item.inStorage,
          session: item.session,
          out: item.out,
          store_items_id: item.store_items_id,
        });
        return false;
      });
      body = {
        session: this.state.session,
        observaciones: this.state.observaciones,
        npedidolab: this.state.npedidolab,
        ncaja: this.state.ncaja,
        contact_id: this.state.contact_id,
        status: this.state.status,
        items: JSON.stringify(items),
        mensajes: JSON.stringify(this.state.mensajes),
      };
      if (this.state.exam_id) body.exam_id = this.state.exam_id;
      if (this.state.lab_id) body.lab_id = this.state.lab_id;

      //Verificamos campos validos

      //Mandamos señal de procesamiento
      if (!load) {
        this.setState({
          load: true,
        });
      }

      //Actualiza el pedido o creamos un pedido nuevo según el ID
      console.log("Enviando datos a API para almacenar");
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
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
                "Pedido almacenado con exito!.\n¿Desea cerrar este contacto?"
              )
            ) {
              this.props.history.goBack();
            } else {
              this.getOrder(data.data.id);
            }
          } else {
            window.alert("Error al almacenar el pedido. Intentelo mas tarde");
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
  getOrder = (id) => {
    if (id > 0) {
      //Variables en localStorage
      let { host, token } = this.state;
      //Realiza la peticion del pedido
      console.log("Solicitando datos a la API");
      fetch("http://" + host + "/api/orders/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
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
          if (!data.message) {
            console.log("Mostrando datos del pedido");
            this.setState({
              id,
              session: data.data.session,
              observaciones: data.data.observaciones,
              lab_id: data.data.laboratorio ? data.data.laboratorio.id : 0,
              npedidolab: data.data.folio_lab,
              ncaja: data.data.caja,
              mensajes: data.data.mensajes,
              items: data.data.productos,
              contact_id: data.data.paciente.id,
              status: data.data.estado,
              usuario: data.data.created,
              exam_id: data.data.examen !== null ? data.data.examen.id : 0,
              exam: data.data.examen !== null ? data.data.examen : {},
              date: data.data.created_at,
              nota: data.data.nota ? data.data.nota.id : 0,
              load: false,
            });
          } else {
            console.error("Error al cargar datos del pedido", data.message);
            this.setState({
              load: false,
            });
          }
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
