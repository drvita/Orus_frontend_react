import React, { Component } from "react";
import moment from "moment";
import LabOrder from "./labOrder";
import Bicelacion from "./bicelacionOrder";
import { Link } from "react-router-dom";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    //Recogemos valores de registro previo
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      id: 0,
      paciente: {},
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      items: [],
      exam: {},
      status: 0,
      created_at: null,
      load: false,
      nota: 0,
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
    this.getOrder();
  }

  render() {
    const {
      id,
      paciente,
      lab_id,
      npedidolab,
      ncaja,
      observaciones,
      items,
      nota,
      status,
      created_at,
      load,
    } = this.state;

    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="mr-1 fas fa-clipboard-list"></i>Pedido
            <span className="ml-1 badge badge-pill badge-warning">{id}</span>
          </h3>
          <div className="card-tools">
            <div className="btn-group">
              <button
                className={
                  status === 0
                    ? "btn btn-primary btn-sm"
                    : "btn btn-default btn-sm"
                }
                onClick={(e) => {
                  if (status !== 0) {
                    this.setState({
                      status: 0,
                    });
                  }
                }}
              >
                En proceso
              </button>
              <button
                className={
                  status === 1
                    ? "btn btn-primary btn-sm"
                    : "btn btn-default btn-sm"
                }
                onClick={(e) => {
                  if (status !== 1) {
                    this.setState({
                      status: 1,
                    });
                  }
                }}
              >
                Laboratorio
              </button>
              <button
                className={
                  status === 2
                    ? "btn btn-primary btn-sm"
                    : "btn btn-default btn-sm"
                }
                onClick={(e) => {
                  if (status !== 2) {
                    this.setState({
                      status: 2,
                    });
                  }
                }}
              >
                Bicelacion
              </button>
              <button
                className={
                  status === 3
                    ? "btn btn-primary btn-sm"
                    : "btn btn-default btn-sm"
                }
                onClick={(e) => {
                  if (status !== 3) {
                    this.setState({
                      status: 3,
                    });
                  }
                }}
              >
                Terminado
              </button>
              <button
                className={
                  status === 4
                    ? "btn btn-primary btn-sm"
                    : "btn btn-default btn-sm"
                }
                onClick={(e) => {
                  if (status !== 4) {
                    this.setState({
                      status: 4,
                    });
                  }
                }}
              >
                Entregado
              </button>
            </div>
          </div>
        </div>
        <div className="p-0 card-body">
          <div className="mailbox-read-info">
            <h5 className="text-capitalize">
              <i className="mr-1 fas fa-user"></i>
              {paciente.nombre}
            </h5>
            <h6>
              {paciente.email ? (
                <span>
                  <i className="mr-1 fas fa-envelope"></i>
                  {paciente.email}
                </span>
              ) : null}
              <span className="float-right mailbox-read-time">
                {moment(created_at).fromNow()}
              </span>
            </h6>
          </div>
          <div className="text-center mailbox-controls with-border">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-default btn-sm"
                title="Delete"
              >
                <i className="far fa-trash-alt"></i>
              </button>
              {paciente.telefonos && paciente.telefonos.t_movil ? (
                <a
                  target="_blank"
                  href={"https://wa.me/52" + paciente.telefonos.t_movil}
                  type="button"
                  className="btn btn-default btn-sm"
                  title="WhatsApp"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-mobile-alt"></i>
                </a>
              ) : null}
              <Link
                to={"/notas/registro/" + nota}
                type="button"
                className="btn btn-default btn-sm"
                title={"Ver nota: " + nota}
              >
                <i className="fas fa-cash-register"></i>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-default btn-sm"
              title="Print"
            >
              <i className="fas fa-print"></i>
            </button>
          </div>
          <div className="p-0 mailbox-read-message">
            {status === 0 ? (
              <div className="m-2 form-group">
                <h5>
                  <i className="mr-2 fas fa-shopping-cart"></i>Productos
                </h5>
                <div className="p-0 table-responsive">
                  <table className="table">
                    <tbody>
                      {items.map((item, i) => {
                        return (
                          <tr key={i}>
                            <th colSpan="row">{i}</th>
                            <td>
                              <span className="text text-uppercase">
                                {item.producto}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {status === 1 ? (
              <LabOrder
                lab_id={lab_id}
                npedidolab={npedidolab}
                status={status}
                ChangeInput={this.handleChangeInput}
              />
            ) : null}
            {status === 2 ? (
              <Bicelacion
                ncaja={ncaja}
                observaciones={observaciones}
                status={status}
                ChangeInput={this.handleChangeInput}
              />
            ) : null}
            {status >= 3 ? (
              <div className="m-2 border rounded card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Estado de la entrega</h5>
                  <div className="ml-1 icheck-success d-inline">
                    <input
                      type="checkbox"
                      checked={status === 3 ? false : true}
                      id="checkboxSuccess1"
                      onChange={(e) => {
                        this.handleChangeInput("status", status === 3 ? 4 : 3);
                      }}
                    />
                    <label htmlFor="checkboxSuccess1"></label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="card-footer">
          <div className="text-right mailbox-controls">
            <div className="btn-group">
              <a
                href="#close"
                className="btn btn-default btn-sm"
                onClick={(e) => {
                  const { handleChangeInput } = this.props;
                  handleChangeInput("panel", 0);
                }}
              >
                <i className="mr-2 fas fa-reply"></i> Cancelar
              </a>
              <button
                className="btn btn-warning btn-sm"
                onClick={this.handleSave}
              >
                <i className="mr-2 fas fa-save"></i> Guardar
              </button>
            </div>
          </div>
        </div>
        {load ? (
          <div className="overlay">
            <i className="fas fa-2x fa-sync-alt"></i>
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
    console.log("Edad change: ", contact_id, edad);
    this.setState({
      contact_id,
      edad,
    });
  };
  changePage = (e) => {
    console.log("[Order][form] Eliminando datos en contacto en uso");
    localStorage.setItem("OrusContactInUse", JSON.stringify({}));
    this.props.page(e);
  };
  handleSave = (e) => {
    e.preventDefault();
    const { id } = this.state;

    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar el pedido?"
        : "¿Esta seguro de crear un nuevo pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const {
              npedidolab,
              ncaja,
              status,
              lab_id,
              observaciones,
              host,
              token,
            } = this.state,
            url = "http://" + host + "/api/orders/" + id,
            method = "PUT";
          let body = {};

          body = {
            npedidolab,
            ncaja,
            status,
            observaciones,
          };
          if (lab_id) body.lab_id = lab_id;
          if (status === 1 && !lab_id && toString(npedidolab).length) {
            window.Swal.fire(
              "Verificación",
              "Los campos de laboratorio estan vacios",
              "error"
            );
            return false;
          }
          //Actualiza orden para actualizar
          console.log("[addOrder] Enviando datos a API para almacenar orden");
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
          console.log("[addOrder] Pedido almacenado con exito");
          console.log("[addOrder] Eliminando datos de contacto en uso");
          localStorage.setItem("OrusContactInUse", JSON.stringify({}));
          window.Swal.fire({
            icon: "success",
            title: id
              ? "Pedido actualizado con exito"
              : "Pedido almacenado con exito",
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
  getOrder = () => {
    //Variables en state
    const { host, token } = this.state;
    const { orderId } = this.props;
    //Realiza la peticion del pedido
    this.setState({
      load: true,
    });
    console.log("[addOrder] Solicitando datos de pedido a la API");
    fetch("http://" + host + "/api/orders/" + orderId, {
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
          console.log("[addOrder] Mostrando datos del pedido");
          this.setState({
            id: orderId,
            paciente: data.data.paciente,
            session: data.data.session,
            observaciones: data.data.observaciones,
            lab_id: data.data.laboratorio ? data.data.laboratorio.id : 0,
            npedidolab: data.data.folio_lab,
            ncaja: data.data.caja,
            items: data.data.productos,
            status: data.data.estado,
            usuario: data.data.created,
            exam: data.data.examen ? data.data.examen : {},
            date: data.data.created_at,
            nota: data.data.nota ? data.data.nota.id : 0,
            created_at: data.data.created_at,
            load: false,
          });
        } else {
          console.error("[Orus system]", data.message);
          window.Swal.fire("Error", "Error al descargar los pedidos", "error");
          this.setState({
            load: false,
          });
        }
      })
      .catch((error) => {
        console.log("[Orus system]", error);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
        this.setState({
          load: false,
        });
      });
  };
}
