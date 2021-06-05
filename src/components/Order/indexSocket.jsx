import React, { Component } from "react";
import Inbox from "./inbox";
import Asistent from "./asistent";
import Dashboard from "./addOrder";
import Chat from "../Layouts/messenger";
//import Ws from "../Layouts/ws";

export default class Index extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const sdd = JSON.parse(localStorage.getItem("OrusOrderDashboard"));
    this.state = {
      orderId: sdd ? sdd.orderId : 0,
      panel: sdd ? sdd.panel : 0,
      status: sdd ? sdd.status : "",
      update: false,
      editId: [],
    };
    /*
    //Abrimos conexion con socket
    this.ws = new Ws({
      actions: [
        {
          si: "update",
          so: (res) => {
            const { editId, panel, orderId } = this.state,
              array_editId = editId,
              varorderId = !panel ? 0 : orderId;
            let index = array_editId.indexOf(res.orderId);

            if (res.panel === panel) {
              if (index > -1) {
                array_editId.splice(index, 1);
              }
              this.setState({
                update: true,
                editId: array_editId,
                orderId: varorderId,
              });
            } else if (editId.length) {
              if (index > -1) {
                array_editId.splice(index, 1);
              }
              this.setState({
                update: true,
                editId: array_editId,
                orderId: varorderId,
              });
            } else {
              console.log("[DEBUG] WS no conecto con alguna accion");
            }
          },
        },
        {
          si: "edit",
          so: (res) => {
            let array_editId = this.state.editId;
            if (this.state.editId.indexOf(res.orderId) < 0) {
              array_editId.push(res.orderId);
              this.setState({
                editId: array_editId,
              });
            }
          },
        },
      ],
      canal: "order",
    });
    */
  }
  componentDidMount() {
    localStorage.setItem("OrusOrderDashboard", JSON.stringify(this.state));
  }
  componentDidUpdate(props, state) {
    localStorage.setItem("OrusOrderDashboard", JSON.stringify(this.state));
    /*
    if (!this.state.panel && state.panel !== this.state.panel) {
      //Enviamos actualizacion al socket
      this.ws.onMessage({
        status: this.state.status,
        orderId: this.state.orderId,
        panel: this.state.panel,
        action: "update",
      });
    } else if (this.state.panel === 3 && state.panel !== this.state.panel) {
      //Enviamos actualizacion al socket
      this.ws.onMessage({
        status: this.state.status,
        orderId: this.state.orderId,
        panel: this.state.panel,
        action: "edit",
      });
    }
    */
  }

  render() {
    const { status, panel, orderId, update, editId } = this.state;
    let showpanel = null;

    switch (panel) {
      case 1:
        showpanel = <div className="text-center">Cargando examenes</div>;
        break;
      case 2:
        showpanel = <Asistent handleChangeInput={this.handleChangeInput} />;
        break;
      case 3:
        showpanel = (
          <Dashboard
            handleChangeInput={this.handleChangeInput}
            orderId={orderId}
          />
        );
        break;
      default:
        showpanel = (
          <Inbox
            status={status}
            handleChangeInput={this.handleChangeInput}
            update={update}
            editId={editId}
          />
        );
    }

    return (
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <a
            href="#new"
            className="btn btn-primary btn-block"
            onClick={(e) => this.handleShowPanel(e, 2)}
          >
            <i className="mr-2 fas fa-hands-helping"></i>
            Asistente de pedido
          </a>
          <a
            href="#new"
            className="mb-3 btn btn-outline-primary btn-block"
            onClick={(e) => this.handleShowPanel(e, 3)}
          >
            <i className="mr-2 fas fa-plus"></i>
            Pedido nuevo
          </a>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                <i className="mr-2 fas fa-filter"></i>Filtrado
              </h5>
            </div>
            <div className="p-0 card-body">
              <ul className="nav nav-pills flex-column">
                <li className={panel === 1 ? "nav-item active" : "nav-item"}>
                  <a
                    href="#ex"
                    className="nav-link text-info"
                    onClick={(e) => this.handleShowPanel(e, 1)}
                  >
                    <i className="mr-2 fas fa-notes-medical"></i> Examenes sin
                    pedido
                  </a>
                </li>
                <li className={!panel ? "nav-item" : "nav-item active"}>
                  <a
                    href="#pe"
                    className="nav-link text-warning"
                    onClick={(e) => this.handleShowPanel(e, 0)}
                  >
                    <i className="mr-2 fas fa-clipboard-list"></i> Pedidos
                  </a>
                </li>
                {!panel ? (
                  <li className="p-2 nav-item">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        <i className="mr-2 fas fa-info-circle"></i>
                        Estado
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control "
                          name="status"
                          value={status}
                          onChange={this.handelChangeStatus}
                        >
                          <option value="">Todos</option>
                          <option value="0">En proceso</option>
                          <option value="1">Laboratorio</option>
                          <option value="2">Bicelación</option>
                          <option value="3">Terminado</option>
                          <option value="4">Entregado</option>
                          <option value="5">Garantia</option>
                        </select>
                      </div>
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {panel === 3 ? <Chat table="orders" idRow={orderId} /> : null}
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">{showpanel}</div>
      </div>
    );
  }

  handleChangeInput = (key, value) => {
    if (key === "orderId") {
      this.setState({
        orderId: value,
        panel: 3,
      });
    } else {
      this.setState({
        [key]: value,
      });
    }
  };
  handleShowPanel = (e, s) => {
    e.preventDefault();
    this.setState({
      panel: s,
    });
  };
  handelChangeStatus = (e) => {
    const { value } = e.target;
    this.setState({
      status: parseInt(value) >= 0 ? parseInt(value) : "",
    });
  };
  changePage = (id) => {
    this.props.page(id);
  };
}
