import React, { Component } from "react";
import SearchContact from "../Contacts/searchContactCard";
import Graduacion from "../Exam/graduacionExam";
import Recomendaciones from "../Exam/recomendaciones";
import Items from "./itemsOrder";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";

export default class ContactsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      observaciones: "",
      laboratorio: "",
      npedidolab: "",
      ncaja: 0,
      mensajes: [],
      items: [],
      contact_id: 0,
      exam_id: 0,
      exam: {},
      status: 0,
      edad: 0,
      date: "",
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
            laboratorio: data.data.laboratorio,
            npedidolab: data.data.folio_lab,
            ncaja: data.data.caja,
            mensajes: JSON.parse(data.data.mensajes),
            items: JSON.parse(data.data.productos),
            contact_id: data.data.paciente.id,
            status: data.data.estado,
            exam_id: data.data.examen.id,
            exam: data.data.examen,
            date: data.data.created_at,
          });
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
              <h5 className="card-title">Resumen</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-warning card-outline">
            <div className="card-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#pedido"
                    data-toggle="tab"
                  >
                    Pedido
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#exam">
                    Examen
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#lab">
                    Laboratorio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#bicelacion">
                    Bicelación
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#estado">
                    Estado
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#garantia">
                    Garantia
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade pt-4 show active" id="pedido">
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
                    ChangeInput={this.handleChangeInput}
                  />
                </div>
                <div className="tab-pane fade pt-4" id="exam">
                  <div className="row m-2">
                    <div className="col">
                      <div className="border border-info rounded p-2">
                        <span className="badge badge-pill badge-info mx-2">
                          Examen
                        </span>
                        <strong>{this.state.exam.id}</strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="border border-info rounded p-2">
                        <span className="badge badge-pill badge-info mx-2">
                          Fecha
                        </span>
                        <strong>
                          {moment
                            .utc(this.state.exam.created_at)
                            .local()
                            .format("LL")}
                        </strong>
                      </div>
                    </div>
                    <div className="col-2">
                      <button className="btn btn-info">Cambiar</button>
                    </div>
                  </div>
                  <Graduacion
                    esferaod=""
                    esferaoi=""
                    cilindrod=""
                    cilindroi=""
                    ejeod=""
                    ejeoi=""
                    adiciond=""
                    adicioni=""
                    dpod=""
                    dpoi=""
                    alturaod=""
                    alturaoi=""
                    lcmarca=""
                    lcgod=""
                    lcgoi=""
                    onChangeInput={this.handleChangeInput}
                  />

                  <Recomendaciones
                    category_id={this.state.exam.recomendacion}
                    onChangeInput={this.handleChangeInput}
                  />
                </div>
                <div className="tab-pane fade pt-4" id="lab">
                  <div className="row">
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label htmlFor="lab">Laboratorio</label>
                        <select
                          className="form-control"
                          id="lab"
                          name="laboratorio"
                        >
                          <option>Lab 1</option>
                          <option>Lab 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label>Folio</label>
                        <input
                          type="text"
                          className="form-control"
                          name="folio_lab"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade pt-4" id="bicelacion">
                  <div className="row">
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label htmlFor="lab">Caja</label>
                        <input
                          type="text"
                          className="form-control"
                          name="caja"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label>Observaciones</label>
                        <textarea
                          name="observaciones"
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade pt-4" id="estado">
                  <div className="row">
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label htmlFor="lab">Estado</label>
                        <select className="form-control" name="status">
                          <option value="">Todos</option>
                          <option value="0">En proceso</option>
                          <option value="1">Laboratorio</option>
                          <option value="2">Bicelación</option>
                          <option value="3">Terminado</option>
                          <option value="4">Garantia</option>
                          <option value="5">Baja</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade pt-4" id="garantia">
                  <div className="row">
                    <div className="col">
                      <div className="border border-warning rounded p-2">
                        <label htmlFor="lab">Garantia</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                <button className="btn btn-warning">
                  <i className="fas fa-save mr-1"></i>
                  <strong>Guardar</strong>
                </button>
              </div>
            </div>
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
    let conf = window.confirm("¿Esta seguro de realizar la accion?"),
      id = 0;
    if (conf) {
      //Variables en localStorage
      console.log("Enviando datos a API para almacenar");
      let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
      // Procesamos variables
      //Creamos el body
      let body = this.state;
      //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
      let url = id
          ? "http://" + varLocalStorage.host + "/api/orders/" + id
          : "http://" + varLocalStorage.host + "/api/orders",
        method = id ? "PUT" : "POST";
      //Actualiza el contacto o creamos el contacto
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
            console.log("Contacto almacenado");
            if (
              window.confirm(
                "Contacto almacenado con exito!.\n¿Desea cerrar este contacto?"
              )
            ) {
              this.props.history.goBack();
            }
          } else console.log(data.message);
        });
    }
  };
}
