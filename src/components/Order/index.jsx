import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
//Components
import Inbox from "./views/inbox";
import Asistent from "./asistent";
import AddOrder from "./editOrder";
import Chat from "../Layouts/messenger";
import Pending from "./views/pending";
import ReportOrder from "./ReportOrder";
//Actions
import { orderActions } from "../../redux/order/";
import { saleActions } from "../../redux/sales";
import { contactActions } from "../../redux/contact";
import { DEFAULT_STATE_SALES } from "../../redux/sales/reducer";
import { defaultActions } from "../../redux/default/";

class indexOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panel: 0,
      /**
       * 0 - Dashboard
       * 1 - Pending
       * 2 - Create new
       * 3 - Edit Item
       * 4 - Report
       */
    };
  }
  componentDidMount() {
    const { match, _getOrder, _setPageName } = this.props,
      { id } = match.params;

    if (id && !isNaN(id)) {
      console.log("[OrusSystem] cargando orden al inicio: " + id);
      _getOrder(id);
      this.setState({
        panel: 3,
      });
    } else if (id === "reporte") {
      this.setState({
        panel: 4,
      });
    }
    _setPageName("pedidos");
  }
  componentDidUpdate(props, state) {
    const { order, history, messages: MSGS, _setContact } = this.props,
      { panel } = this.state;

    if (state.panel !== panel) {
      switch (panel) {
        case 1:
          history.push(`/pedidos/pending`);
          break;
        case 2:
          history.push(`/pedidos/new`);
          break;
        case 3: {
          _setContact();
          if (order.id) history.push(`/pedidos/${order.id}`);
          break;
        }
        case 4:
          history.push(`/pedidos/reporte`);
          break;

        default:
          history.push(`/pedidos`);
      }
    }

    if (props.messages.length !== MSGS.length && MSGS.length) {
      MSGS.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
      if (panel && panel !== 4) {
        this.setState({
          panel: 0,
        });
      }
    }
  }
  componentWillUnmount() {
    const { _setList, _setSales } = this.props;
    console.log("[Orus Systme] Cerrando pedido");
    _setList();
    _setSales({
      result: DEFAULT_STATE_SALES,
    });
  }

  render() {
    const { panel } = this.state,
      { order, options, user } = this.props;
    let showpanel = this.showPanel(panel);

    //console.log("[DEBUG] orders", order);

    return (
      <div className="row">
        <div className="col-md-2 col-sm-12 d-print-none">
          <a
            href="#new"
            className={
              panel === 2
                ? "disabled mb-3 btn btn-secondary btn-block"
                : "mb-3 btn btn-warning btn-block"
            }
            onClick={(e) => {
              e.preventDefault();
              this.handleShowPanel(e, 2);
            }}
            disabled={panel === 2 ? true : false}
          >
            <i className="mr-2 fas fa-plus"></i>
            Pedido nuevo
          </a>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title text-dark">
                <i className="mr-2 fas fa-ellipsis-v"></i>Menu y filtros
              </h5>
            </div>
            <div className="p-0 card-body">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a
                    href="#item"
                    className={panel === 1 ? "nav-link active" : "nav-link"}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleShowPanel(e, 1);
                    }}
                  >
                    <i className="mr-2 fas fa-notes-medical"></i> Pendientes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#item"
                    className={!panel ? "nav-link active" : "nav-link"}
                    onClick={(e) => this.handleShowPanel(e, 0)}
                  >
                    <i className="mr-2 fas fa-clipboard-list"></i> Pedidos
                  </a>
                </li>
                {!user.rol ? (
                  <li className="nav-item">
                    <a
                      href="#item"
                      className={panel === 4 ? "nav-link active" : "nav-link"}
                      onClick={this.handleShowReport}
                    >
                      <i className="mr-2 fas fa-folder-open"></i> Reporte
                    </a>
                  </li>
                ) : null}

                {!panel ? (
                  <Fragment>
                    <li className="nav-item">&nbsp;</li>
                    <li className="p-2 nav-item">
                      <label htmlFor="status">Estado del pedido</label>
                      <select
                        className="form-control "
                        name="status"
                        id="status"
                        value={options.status}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="">-- Todos --</option>
                        <option value="0">En proceso</option>
                        <option value="1">Laboratorio</option>
                        <option value="2">Bicelación</option>
                        <option value="3">Terminado</option>
                        <option value="4">Entregado</option>
                        {/* <option value="5">Garantia</option> */}
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="orderby">Ordenar por</label>
                      <select
                        className="form-control "
                        name="orderby"
                        id="orderby"
                        value={options.orderby}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="created_at">Fecha de registro</option>
                        <option value="updated_at">
                          Fecha de modificacion
                        </option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="order">Mostrar por</label>
                      <select
                        className="form-control "
                        name="order"
                        id="order"
                        value={options.order}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="asc">Antiguos</option>
                        <option value="desc">Recientes</option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <label htmlFor="itemsPage">Numero de pedidos</label>
                      <select
                        className="form-control "
                        name="itemsPage"
                        id="itemsPage"
                        value={options.itemsPage}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="10">ver 10</option>
                        <option value="20">ver 20</option>
                        <option value="50">ver 50</option>
                        <option value="100">ver 100</option>
                      </select>
                    </li>
                  </Fragment>
                ) : null}
              </ul>
            </div>
          </div>

          {panel === 3 ? <Chat table="orders" idRow={order.id} /> : null}
        </div>
        <div className="col-md-10 col-sm-12">{showpanel}</div>
      </div>
    );
  }

  handleShowReport = (e) => {
    const { _setList } = this.props;

    _setList();
    this.handleShowPanel(e, 4);
  };
  showPanel = (panel) => {
    switch (panel) {
      case 1:
        return <Pending handleChangePanel={this.handleShowPanel} />;

      case 2:
        return (
          <Asistent handleClose={() => this.handleChangeInput("panel", 0)} />
        );

      case 3:
        return <AddOrder handleChangePanel={this.handleShowPanel} />;
      case 4:
        return <ReportOrder handleChangePanel={this.handleShowPanel} />;
      default:
        return <Inbox handleChangePanel={this.handleShowPanel} />;
    }
  };
  handleSetSelectOptions = ({ target }) => {
    const { _setOptions } = this.props,
      { value, name } = target;
    let val = value;

    if (name === "itemsPage") val = parseInt(val);
    if (name === "status" && val !== "") val = parseInt(val);

    _setOptions({
      key: name,
      value: val,
    });
  };
  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleShowPanel = (e, s) => {
    if (e) e.preventDefault();
    this.handleChangeInput("panel", s);
  };
}

const mapStateToProps = ({ order, users }) => {
    return {
      order: order.order,
      options: order.options,
      messages: order.messages,
      user: users.dataLoggin,
    };
  },
  mapActionsToProps = {
    _getOrder: orderActions.getOrder,
    _setOptions: orderActions.setOptions,
    _setList: orderActions.setListOrder,
    _setContact: contactActions.setContact,
    _setSales: saleActions.setListSales,
    _setPageName: defaultActions.changeNamePage,
  };

export default connect(mapStateToProps, mapActionsToProps)(indexOrderComponent);
