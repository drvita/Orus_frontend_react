import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
//Components
import Inbox from "./views/inbox";
import Asistent from "./views/asistent";
import AddOrder from "./addOrder";
import Chat from "../Layouts/messenger";
//Actions
import { categoryActions } from "../../redux/category/";
import { orderActions } from "../../redux/order/";

class indexOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panel: 0,
      order: {},
    };
  }
  componentDidMount() {
    const { match, _getOrder } = this.props,
      { id } = match.params;

    if (id) {
      console.log("[OrusSystem] cargando orden al inicio: " + id);
      _getOrder(id);
    }
  }
  componentDidUpdate(props) {
    const {
      order,
      messages: MSGS,
      //Functions
    } = this.props;

    if (props.order.id !== order.id && order.id) {
      this.setState({
        order,
        panel: 3,
      });
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
      if (this.state.panel) {
        this.setState({
          panel: 0,
        });
      }
    }
  }

  render() {
    const { panel, order } = this.state,
      {
        loading: LOADING,
        //categories: CATEGORY_LIST = {},
        userRole: ROL = null,
        options,
      } = this.props;
    let showpanel = this.showPanel(panel, order, LOADING, [], ROL);

    //console.log("[DEBUG] List of orders", ORDERS_LIST);

    return (
      <div className="row">
        <div className="col-md-2 col-sm-12">
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
                    <i className="mr-2 fas fa-notes-medical"></i> Examenes sin
                    pedido
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

  showPanel = (panel, order, loading, category, rol) => {
    switch (panel) {
      case 1:
        return <div className="text-center">Cargando examenes</div>;

      case 2:
        return (
          <Asistent handleClose={() => this.handleChangeInput("panel", 0)} />
        );

      case 3:
        return (
          <AddOrder
            order={order}
            loading={loading}
            userRole={rol}
            handleSaveOrder={this.handleSaveOrder}
            handleChangeInput={this.handleChangeInput}
            handleDeleteOrder={this.handleDeleteOrder}
          />
        );
      default:
        return <Inbox />;
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
  handleSaveOrder = (order = {}, id = null) => {
    const { saveOrder: _saveOrder } = this.props,
      { options } = this.state;
    _saveOrder({
      order,
      id,
      options,
    });
  };

  handleDeleteOrder = (id) => {
    const { deleteOrder: _deleteOrder } = this.props,
      { options } = this.state;

    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el pedido numero " + id + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          _deleteOrder({
            id,
            options,
          });
        }
      },
    });
  };
  handleShowPanel = (e, s) => {
    e.preventDefault();
    this.setState({
      panel: s,
    });
  };
}

const mapStateToProps = ({ order, category, logging }) => {
    return {
      order: order.order,
      options: order.options,
      //categories: category.list,
      messages: order.messages,
      userRole: logging.rol,
    };
  },
  mapActionsToProps = {
    _getListCategories: categoryActions.getListCategories,
    _getOrder: orderActions.getOrder,
    _setOptions: orderActions.setOptions,
  };

export default connect(mapStateToProps, mapActionsToProps)(indexOrderComponent);
