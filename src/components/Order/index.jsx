import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import Inbox from "./inbox";
import Asistent from "./asistent";
import AddOrder from "./addOrder";
import Chat from "../Layouts/messenger";
import {
  getListOrder,
  setStateVar,
  deleteOrder,
  saveOrder,
} from "../../redux/order/actions";
import { getListCategories } from "../../redux/category/actions";

class indexOrderComponent extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const LS = localStorage.getItem("OrusSystem"),
      { orders: ORDER = {} } = JSON.parse(LS ? LS : "{}"),
      {
        orderBy: ORDERBY = "updated_at",
        order: ORD = "desc",
        search: SEARCH = "",
        page: PAGE = 1,
        status: STATUS = "",
        itemsPage: IP = 10,
      } = ORDER;

    this.state = {
      panel: 0,
      order: {},
      update: false,
      editId: [],
      options: {
        page: PAGE,
        orderby: ORDERBY,
        order: ORD,
        search: SEARCH,
        status: STATUS,
        itemsPage: IP,
      },
    };
  }
  componentDidMount() {
    //localStorage.setItem("OrusOrderDashboard", JSON.stringify(this.state));
    const { options } = this.state,
      { getListOrder: _getListOrder, match } = this.props,
      { id } = match.params;

    _getListOrder(options, parseInt(id));
  }
  componentDidUpdate(props, state) {
    const {
        orderId: ID,
        status: STATUS,
        page: PAGE,
        search: SEARCH,
        orderby: ORDERBY,
        order: ORDER,
        itemsPage: IP,
        orders: ORDERS,
        errors: ERRS,
        messages: MSGS,
        //Functions
        getListOrder: _getListOrder,
        setStateVar: _setStateVar,
      } = this.props,
      { options, panel } = this.state;

    if (state.panel !== panel) {
      switch (panel) {
        case 1: {
          //_getListCategories();
          break;
        }
        case 2: {
          break;
        }
        case 3: {
          this.props.history.push(`/pedidos/${ID}`);
          break;
        }
        default:
          if (
            props.status === STATUS &&
            props.search === SEARCH &&
            props.orderby === ORDERBY &&
            props.page === PAGE &&
            props.order === ORDER
          ) {
            _getListOrder(options);
          }
          if (ID) {
            _setStateVar({
              key: "orderId",
              val: 0,
            });
            this.props.history.push("/pedidos");
          }
          break;
      }
    }

    //console.log("[DEBUG] Component update in params:", ID, ORDERS);
    if (props.orderId !== ID && ID && ORDERS.length) {
      let order = {};

      ORDERS.forEach((ord) => {
        if (ord.id === ID) {
          order = ord;
        }
      });
      if (order.id) {
        this.setState({
          panel: 3,
          order,
        });
      }
    }

    if (
      (props.orderId !== ID && !ID) ||
      (props.messages.length !== MSGS.length && MSGS.length && !ERRS.length)
    ) {
      this.setState({
        panel: 0,
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
    }

    if (
      props.status !== STATUS ||
      props.search !== SEARCH ||
      props.orderby !== ORDERBY ||
      props.page !== PAGE ||
      props.order !== ORDER ||
      props.itemsPage !== IP
    ) {
      //Cambiamos el state local
      this.setState({
        options: {
          page: PAGE,
          orderby: ORDERBY,
          order: ORDER,
          search: SEARCH,
          status: STATUS,
          itemsPage: IP,
        },
      });
    }
  }

  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { panel, update, editId, options, order } = this.state,
      {
        orderId,
        search: SEARCH,
        orders: ORDERS_LIST,
        meta: META,
        loading: LOADING,
        categories: CATEGORY_LIST = {},
        userRole: ROL = null,
      } = this.props;
    let showpanel = null;

    switch (panel) {
      case 1:
        showpanel = <div className="text-center">Cargando examenes</div>;
        break;
      case 2:
        showpanel = (
          <Asistent
            categories={CATEGORY_LIST}
            loading={LOADING}
            handleChangeInput={this.handleChangeInput}
            handleGetCategories={this.handleGetCategories}
            handleSaveOrder={this.handleSaveOrder}
          />
        );

        break;
      case 3:
        showpanel = (
          <AddOrder
            orderId={orderId}
            order={order}
            loading={LOADING}
            userRole={ROL}
            handleSaveOrder={this.handleSaveOrder}
            handleChangeInput={this.handleChangeInput}
            handleDeleteOrder={this.handleDeleteOrder}
          />
        );
        break;
      default:
        showpanel = (
          <Inbox
            orders={ORDERS_LIST}
            meta={META}
            update={update}
            editId={editId}
            options={options}
            searchText={SEARCH}
            loading={LOADING}
            handleSearchOrdes={this.handleSearchOrdes}
            handlePageOrder={this.handlePageOrder}
            handleDeleteOrder={this.handleDeleteOrder}
            handleSelectOrder={this.handleSelectOrder}
          />
        );
    }

    return (
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
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
                <i className="mr-2 fas fa-ellipsis-v"></i>Menu
              </h5>
            </div>
            <div className="p-0 card-body">
              <ul className="nav nav-pills flex-column p-1 pl-4">
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
                    <li className="p-2 nav-item">
                      <select
                        className="form-control "
                        name="status"
                        value={options.status}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="">-- Seleccione estado --</option>
                        <option value="0">En proceso</option>
                        <option value="1">Laboratorio</option>
                        <option value="2">Bicelación</option>
                        <option value="3">Terminado</option>
                        <option value="4">Entregado</option>
                        <option value="5">Garantia</option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <select
                        className="form-control "
                        name="orderby"
                        value={options.orderby}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="">-- Seleccione orden --</option>
                        <option value="created_at">Fecha de registro</option>
                        <option value="updated_at">
                          Fecha de modificacion
                        </option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <select
                        className="form-control "
                        name="order"
                        value={options.order}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="asc">Ultimos</option>
                        <option value="desc">Primeros</option>
                      </select>
                    </li>
                    <li className="nav-item p-2">
                      <select
                        className="form-control "
                        name="itemsPage"
                        value={options.itemsPage}
                        onChange={this.handleSetSelectOptions}
                      >
                        <option value="10">-- ver 10 --</option>
                        <option value="20">-- ver 20 --</option>
                        <option value="50">-- ver 50 --</option>
                        <option value="100">-- ver 100 --</option>
                      </select>
                    </li>
                  </Fragment>
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

  handleSetSelectOptions = ({ target }) => {
    const { getListOrder: _getListOrder } = this.props,
      { options } = this.state,
      { value, name } = target;
    let val = value;

    if (name === "itemsPage") val = parseInt(val);
    if (name === "status" && val !== "") val = parseInt(val);

    _getListOrder({
      ...options,
      [name]: val,
      page: 1,
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
  handleGetCategories = (cat_id) => {
    const { getListCategories: _getListCategories } = this.props;

    _getListCategories({
      options: {},
      id: cat_id,
    });
  };
  handleSearchOrdes = (search) => {
    const { getListOrder: _getListOrder } = this.props,
      { options } = this.state;

    _getListOrder({
      ...options,
      search,
      page: 1,
    });
  };
  handlePageOrder = (page) => {
    const { getListOrder: _getListOrder } = this.props,
      { options } = this.state;

    _getListOrder({
      ...options,
      page,
    });
  };
  handleSelectOrder = (id) => {
    const { setStateVar: _setStateVar } = this.props;

    _setStateVar({
      key: "orderId",
      val: parseInt(id),
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
      orders: order.list,
      meta: order.metaList,
      orderId: order.orderId,
      status: order.status,
      page: order.page,
      search: order.search,
      orderby: order.orderby,
      order: order.order,
      itemsPage: order.itemsPage,
      loading: order.loading,
      categories: category.list,
      messages: order.messages,
      errors: order.errors,
      userRole: logging.rol,
    };
  },
  mapActionsToProps = {
    setStateVar,
    getListOrder,
    deleteOrder,
    getListCategories,
    saveOrder,
  };

export default connect(mapStateToProps, mapActionsToProps)(indexOrderComponent);
