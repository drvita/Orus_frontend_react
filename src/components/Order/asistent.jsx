import React, { Component } from "react";
import SearchContact from "../Contacts/searchContactLine";
import ListExam from "../Exam/listExamsCustomer";
import Exam from "../Exam/examCustomer";
import Items from "./itemsOrder";

export default class Asistent extends Component {
  constructor(props) {
    super(props);
    //Recogemos valores de registro previo
    let contact = JSON.parse(localStorage.getItem("OrusContactInUse"));
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
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
      exam: {},
      examEdit: false,
      load: true,
      host: ls.host,
      token: ls.token,
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
    const {
      contact_id,
      items,
      edad,
      exam_id,
      exam,
      examEdit,
      codes,
    } = this.state;

    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>Nuevo pedido
          </h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <SearchContact
              contact={contact_id}
              edad={parseInt(this.state.edad)}
              getIdContact={this.getIdContact}
              changePage={this.changePage}
              status={exam_id ? true : false}
            />
          </div>
          {contact_id ? (
            <React.Fragment>
              {exam_id ? (
                <React.Fragment>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-notes-medical mr-2"></i> Examen:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        value={exam_id}
                        readOnly={true}
                      />
                      <div className="float-right">
                        <div className="btn-group btn-sm">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm"
                            onClick={(e) =>
                              this.handleChangeInput("exam_id", 0)
                            }
                          >
                            <i className="fas fa-exchange-alt mr-1"></i>
                            <b>Cambiar</b>
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={(e) =>
                              this.handleChangeInput("examEdit", true)
                            }
                            disabled={examEdit}
                          >
                            <i className="fas fa-edit mr-1"></i>
                            <b>Editar</b>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {examEdit ? (
                    <div className="form-group">
                      <Exam
                        id={exam_id}
                        examEdit={true}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                  ) : (
                    <React.Fragment>
                      {exam.observaciones ? (
                        <div className="form-group">
                          <div className="callout callout-info">
                            <h5>
                              <i className="fas fa-info"></i> Observaciones:
                            </h5>
                            {exam.observaciones}
                          </div>
                        </div>
                      ) : null}
                      <Items
                        items={this.state.items}
                        session={this.state.session}
                        codes={codes}
                        ChangeInput={this.handleChangeInput}
                      />
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <div className="form-group">
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
        <div className="card-footer">
          <div className="mailbox-controls text-right">
            <div className="btn-group">
              <a
                href="#close"
                className="btn btn-default btn-sm"
                onClick={(e) => {
                  const { handleChangeInput } = this.props;
                  handleChangeInput("panel", 0);
                }}
              >
                <i className="fas fa-reply mr-2"></i> Cancelar
              </a>
              <button
                className={
                  contact_id && exam_id && items.length
                    ? "btn btn-warning btn-sm"
                    : "btn btn-warning btn-sm disabled"
                }
                onClick={this.handleSave}
                disabled={contact_id && exam_id && items.length ? false : true}
              >
                <i className="fas fa-save mr-2"></i> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    if (key === "exam") {
      if (value.category_id) {
        this.getCategories(value);
      } else {
        this.setState({
          exam_id: value.id,
          exam: value,
          codes: {},
        });
      }
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
  getCategories = (exam) => {
    const { host, token } = this.state;

    console.log("[Asistent order] Descargando categoria para recomendacion");
    fetch("http://" + host + "/api/categories/" + exam.category_id, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((cat) => {
        if (cat.data) {
          console.log("[Asistent order] Recomendacion descargada");
          const {
              category_id,
              esferaod,
              esferaoi,
              cilindrod,
              cilindroi,
              id,
            } = exam,
            category = cat.data;
          let code =
              category_id && category.id ? this.handleCodeName(category) : "XX",
            gradod = "+000000",
            gradoi = "+000000";

          if (cilindrod || esferaod) {
            gradod = esferaod > 0 ? "+" : "";
            gradod +=
              esferaod.toFixed(2).toString().replace(".", "") +
              cilindrod.toFixed(2).toString().replace("-", "").replace(".", "");
          }
          if (cilindroi || esferaoi) {
            gradoi = esferaoi > 0 ? "+" : "";
            gradoi +=
              esferaoi.toFixed(2).toString().replace(".", "") +
              cilindroi.toFixed(2).toString().replace("-", "").replace(".", "");
          }
          console.log("[DEBUG] fetch category ", code, gradod, gradoi);
          this.setState({
            exam_id: id,
            exam,
            codes: {
              code,
              od: gradod,
              oi: gradoi,
            },
          });
        }
      })
      .catch((e) => {
        console.error("Orus: " + e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
  handleCodeName = (category) => {
    let code = "";
    if (category.depende_de) {
      if (category.depende_de.depende_de) {
        code = category.depende_de.depende_de.meta.code;
        code += category.depende_de.meta.code;
        code += category.meta.code;
      } else {
        code = category.depende_de.meta.code;
        code += category.meta.code;
      }
    } else {
      code = category.meta.code;
    }
    return code;
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
            const { handleChangeInput } = this.props;
            handleChangeInput("panel", 0);
          });
        } else {
          window.Swal.fire("Error", "al almacenar el pedido", "error");
          console.error("[Orus res] ", data.message);
        }
      }
    });
  };
}
