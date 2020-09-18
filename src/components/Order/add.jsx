import React, { Component } from "react";
import SearchContact from "../Contacts/searchContactCard";
import Items from "./itemsOrder";
import ListExam from "../Exam/listsExams";
import LabOrder from "./labOrder";
import Status from "./statusOrder";
import Bicelacion from "./bicelacionOrder";
import Garantia from "./garantiaOrder";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";

export default class OrderAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      observaciones: "",
      lab_id: 0,
      npedidolab: "",
      ncaja: 0,
      mensajes: [],
      items: [],
      contact_id: 0,
      edad: 0,
      exam_id: 0,
      exam: {},
      status: 0,
      date: "",
      load: true,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    moment.locale("es");
    if (id > 0) {
      //Variables en localStorage
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      //Realiza la peticion del usuario seun el id
      console.log("Descargando datos del pedido");
      fetch("http://" + varLocalStorage.host + "/api/orders/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + varLocalStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Mostrando datos del pedido");
          this.setState({
            id,
            observaciones: data.data.observaciones,
            lab_id: data.data.laboratorio ? data.data.laboratorio.id : 0,
            npedidolab: data.data.folio_lab,
            ncaja: data.data.caja,
            mensajes: JSON.parse(data.data.mensajes),
            items: JSON.parse(data.data.productos),
            contact_id: data.data.paciente.id,
            status: data.data.estado,
            exam_id: data.data.examen !== null ? data.data.examen.id : 0,
            exam: data.data.examen !== null ? data.data.examen : {},
            date: data.data.created_at,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <SearchContact
            contact={this.state.contact_id}
            edad={this.state.edad}
            status={this.state.status}
            getIdContact={this.getIdContact}
            changePage={this.changePage}
          />
          <div className="card card-warning card-outline mt-4">
            <div className="card-body">
              <Status
                status={this.state.status}
                ChangeInput={this.handleChangeInput}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-warning card-outline">
            <div className="card-body">
              {this.state.contact_id ? (
                <React.Fragment>
                  <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
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
                      <div className="row">
                        <div className="col">
                          <div className="border border-warning rounded p-2">
                            <span className="badge badge-pill badge-warning mx-2">
                              Folio
                            </span>
                            <strong>{this.state.id}</strong>
                          </div>
                        </div>
                        <div className="col">
                          <div className="border border-warning rounded p-2">
                            <span className="badge badge-pill badge-warning mx-2">
                              Fecha
                            </span>
                            <strong>{this.state.date}</strong>
                          </div>
                        </div>
                      </div>
                      <Items
                        items={this.state.items}
                        status={this.state.status}
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
                <div className="alert alert-warning">
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
                    this.state.contact_id
                      ? "btn btn-warning"
                      : "btn btn-warning disabled"
                  }
                  onClick={this.handleSave}
                  disabled={this.state.contact_id ? false : true}
                >
                  <i className="fas fa-save mr-1"></i>
                  <strong>Guardar</strong>
                </button>
              </div>
            </div>
          </div>
          <div className="card card-warning card-outline">
            <div className="card-body">Aqui van los mensajes</div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  getIdContact = (id, edad) => {
    this.setState({
      contact_id: id,
      edad,
    });
  };
  changePage = (e) => {
    this.props.page(e);
  };
  handleSave = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de realizar la accion de guardar?"),
      id = this.state.id;
    if (conf) {
      //Variables en localStorage
      console.log("Enviando datos a API para almacenar", id);
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      // Procesamos variables
      //Creamos el body
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      let url = id
          ? "http://" + varLocalStorage.host + "/api/orders/" + id
          : "http://" + varLocalStorage.host + "/api/orders",
        method = id ? "PUT" : "POST",
        body = this.state;

      delete body.exam;
      delete body.date;
      delete body.edad;
      delete body.id;
      if (!body.exam_id) {
        delete body.exam_id;
      }
      body.items = JSON.stringify(body.items);
      body.mensajes = JSON.stringify(body.mensajes);
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
                "Pedido almacenado con exito!.\n¿Desea cerrar este contacto?"
              )
            ) {
              this.props.history.goBack();
            }
          } else console.log(data.message);
        });
    }
  };
}
