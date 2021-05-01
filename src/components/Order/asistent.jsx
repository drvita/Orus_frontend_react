import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContact from "../Contacts/searchContactCard";
import ListExam from "../Exam/listExamsCustomer";
import Exam from "../Exam/examCustomer";
import Items from "./itemsOrder";

export default class Asistent extends Component {
  constructor(props) {
    super(props);
    //Recogemos valores de registro previo
    let contact = JSON.parse(localStorage.getItem("OrusContactInUse"));
    console.log(
      "[OrderAsitent] Contacto en uso: ",
      contact && contact.id ? "Si" : "No"
    );

    this.state = {
      session:
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(10),
      contact_id: contact && contact.id ? contact.id : 0,
      items: [],
      codes: {},
      edad: 0,
      exam_id: contact && contact.exam_id ? contact.exam_id : 0,
      load: true,
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
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
  }

  render() {
    const { contact_id, items, edad, exam_id, codes } = this.state;

    return (
      <React.Fragment>
        <div className="callout callout-warning">
          <div className="row">
            <div className="col-10">
              <h5>
                <i className="fas fa-clipboard-list mr-2"></i>Nuevo pedido
              </h5>
            </div>
            <div className="col">
              <div className="mailbox-controls text-right">
                <div className="btn-group">
                  <Link
                    to="/pedidos"
                    className="btn btn-default btn-sm"
                    onClick={(e) => this.changePage("/pedidos")}
                  >
                    <i className="fas fa-reply mr-2"></i> Cancelar
                  </Link>
                  <button
                    className={
                      contact_id && exam_id && items.length
                        ? "btn btn-warning btn-sm"
                        : "btn btn-warning btn-sm disabled"
                    }
                    onClick={this.handleSave}
                    disabled={
                      contact_id && exam_id && items.length ? false : true
                    }
                  >
                    <i className="fas fa-save mr-2"></i> Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-auto">
            <SearchContact
              contact={contact_id}
              edad={parseInt(this.state.edad)}
              getIdContact={this.getIdContact}
              changePage={this.changePage}
            />
          </div>
          {contact_id ? (
            <React.Fragment>
              {exam_id ? (
                codes.od && codes.oi ? (
                  <div className="col-lg col-md-auto col-sm-auto">
                    <Items
                      items={this.state.items}
                      session={this.state.session}
                      codes={codes}
                      ChangeInput={this.handleChangeInput}
                    />
                  </div>
                ) : (
                  <div className="col-lg col-md-auto col-sm-auto">
                    <Exam
                      id={exam_id}
                      paciente={contact_id}
                      ChangeInput={this.handleChangeInput}
                    />
                  </div>
                )
              ) : (
                <div className="col-lg col-md-auto col-sm-auto">
                  <ListExam
                    paciente={contact_id}
                    edad={edad}
                    ChangeInput={this.handleChangeInput}
                  />
                </div>
              )}
            </React.Fragment>
          ) : null}
        </div>
      </React.Fragment>
    );
  }

  handleChangeInput = (key, value) => {
    if (key === "exam_id") {
      this.setState({
        exam_id: value,
        codes: {},
      });
    }
    if (key === "codes") {
      this.setState({
        codes: value,
      });
    } else {
      this.setState({
        [key]: value,
      });
    }
  };
  getIdContact = (contact_id, edad) => {
    this.setState({
      contact_id,
      edad,
    });
  };
  changePage = (e) => {
    console.log("[OrderAsitent] Eliminando datos en contacto en uso");
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
    this.props.page(e);
  };
  handleSave = (e) => {
    e.preventDefault();
    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear un nuevo pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { host, token } = this.state,
            url = "http://" + host + "/api/orders",
            method = "POST";
          let body = {},
            items = [];

          this.state.items.map((item) => {
            items.push({
              cant: item.cantidad,
              price: item.precio,
              subtotal: item.subtotal,
              inStorage: item.inStorage,
              session: item.session,
              out: item.out,
              descripcion: item.descripcion,
              store_items_id: item.store_items_id,
            });
            return false;
          });
          body = {
            session: this.state.session,
            contact_id: this.state.contact_id,
            items: JSON.stringify(items),
            status: 0,
          };
          if (this.state.exam_id) body.exam_id = parseInt(this.state.exam_id);

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log(
            "[OrderAsitent] Enviando datos del pedido a API para almacenar"
          );
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
              console.error("[Orus fetch] ", e);
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
          console.log("[OrderAsitent] Pedido almacenado con exito");
          console.log("[OrderAsitent] Eliminando datos de contacto en uso");
          localStorage.setItem("OrusContactInUse", JSON.stringify({}));
          window.Swal.fire({
            icon: "success",
            title: "Pedido almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            /*
            this.setState({
              id: data.data.id,
              nota: data.data.nota.id,
            });
            */
            this.props.history.push(`/pedidos/registro/${data.data.id}`);
          });
        } else {
          window.Swal.fire("Error", "al almacenar el pedido", "error");
          console.error("[Orus res] ", data.message);
        }
      }
    });
  };
}
