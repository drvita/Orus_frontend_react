import React, { Component } from "react";
import moment from "moment";
import LabOrder from "./labOrder";
import Bicelacion from "./bicelacionOrder";
import Exam from "../Exam/examCustomer";
import { Link } from "react-router-dom";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
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
      nota: 0,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    const { order } = this.props;

    this.setState({
      id: order.id,
      paciente: order.paciente,
      lab_id: (order.examen && order.examen.id) ?? 0,
      npedidolab: order.folio_lab,
      observaciones: order.observaciones,
      ncaja: order.caja,
      items: order.productos,
      exam: order.examen ?? {},
      status: order.estado,
      created_at: order.created_at,
      nota: (order.nota && order.nota.id) ?? 0,
      examShow: false,
    });
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
        exam,
        nota,
        status,
        created_at,
        examShow,
      } = this.state,
      { handleDeleteOrder: DORDER, loading: LOADING } = this.props;

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
              {nota ? (
                <Link
                  to={"/notas/registro/" + nota}
                  type="button"
                  className="btn btn-default btn-sm text-success"
                  title={"Ver nota: " + nota}
                >
                  <i className="fas fa-cash-register"></i>
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  title="Delete"
                  onClick={(e) => DORDER(id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              )}

              {paciente.telefonos && paciente.telefonos.t_movil ? (
                <a
                  target="_blank"
                  href={"https://wa.me/52" + paciente.telefonos.t_movil}
                  type="button"
                  className="btn btn-default btn-sm"
                  title="Abrir WhatsApp"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-mobile-alt"></i>
                </a>
              ) : null}
              {exam.id ? (
                <button
                  type="button"
                  className={
                    exam.observaciones
                      ? "btn btn-default btn-sm text-danger"
                      : "btn btn-default btn-sm"
                  }
                  title={
                    examShow
                      ? "Cerrar examen"
                      : "Ver examen: " + moment(exam.created_at).fromNow()
                  }
                  onClick={this.handleWhachExam}
                >
                  <i className="fas fa-notes-medical"></i>
                </button>
              ) : null}
              {/*<button
                type="button"
                className="btn btn-default btn-sm"
                title="Imprimir pedido"
              >
                <i className="fas fa-print"></i>
              </button>*/}
            </div>
          </div>
          {examShow ? (
            <div className="p-2 mailbox-read-message">
              <Exam id={exam.id} examEdit={false} exam={exam} />
            </div>
          ) : null}
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
                className="btn btn-secondary btn-sm"
                onClick={(e) => {
                  const { handleChangeInput } = this.props;
                  e.preventDefault();
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
        {LOADING ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    );
  }

  handleWhachExam = () => {
    this.setState({
      examShow: !this.state.examShow,
    });
  };
  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de actualizar el pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { id, npedidolab, ncaja, status, lab_id, observaciones } =
              this.state,
            { handleSaveOrder: _handleSaveOrder } = this.props;
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
          if (status === 2 && !ncaja) {
            window.Swal.fire(
              "Verificación",
              "El numero de caja esta vacio",
              "error"
            );
            return false;
          }

          _handleSaveOrder(body, id);
        }
      },
    });
  };
}
