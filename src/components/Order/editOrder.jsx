import React, { Component, useState, useEffect, useContext } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//Context
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OderContext";

//Hooks
import useOrder from "../../hooks/useOrder";

//Components
import LabOrder from "./views/labOrder";
import Bicelacion from "./views/bicelacionOrder";
import Exam from "../Exam/views/examShort";
import Items from "./views/listItemsOrder";
import Dashboard from "../Contacts/Dashboard";
import ShowPaymentsComponent from "../Sales/views/ShowPayments";


//Actions
import helper from "./helpers";
import { orderActions } from "../../redux/order/";
import { saleActions } from "../../redux/sales/";
import { DEFAULT_STATE_ORDER } from "../../redux/order/reducer";
import { DEFAULT_STATE_SALES } from "../../redux/sales/reducer";

export default function EditOrderComponent(props){

  const [state, setState] = useState({
      id: 0,
      paciente: {},
      session: null,
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      items: [],
      exam: {},
      codes: {},
      status: 0,
      created: {},
      created_at: null,
      updated: {},
      updated_at: null,
  });

  //const order = [];

  const orderContext = useContext(OrderContext);

  const {
    id,
    paciente,
    session,
    lab_id,
    npedidolab,
    ncaja,
    observaciones,
    items,
    exam = {},
    codes,
    status,
    created,
    created_at,
    updated,
    updated_at,
  } = state;

  const idurl = props.match.params;
  const hookOrder = useOrder();
  const authContext = useContext(AuthContext);
  const role = authContext.auth.roles;
  const currentUser = authContext.auth;
  const history = useHistory();


  const { /* order, */ loading: LOADING } = props;


  const fNacimiento = new Date(paciente.f_nacimiento ?? "") < new Date() ? moment(paciente.f_nacimiento) : null;

  const telefonos = Object.values(paciente.telefonos ?? {}).filter((tel) => tel !== "");

  
  const handleClose = (e) => {
    //Cambiamos el panel a inbox y rgresamos al estado inicial
    setState({
      id: 0,
      paciente: {},
      session: null,
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      nota:{},
      items: [],
      exam: {},
      codes: {},
      status: 0,
      created: {},
      created_at: null,
      updated: {},
      updated_at: null,
    });

    orderContext.set({
      ...orderContext,
      panel:'inbox',
    });

    history.push("/pedidos");
  };

  const handleSave = () => {
    console.log(currentUser);
    //Validid data
    const { id, npedidolab, ncaja, status, lab_id, observaciones, items } = state;
    const { options, _saveOrder /* currentUser */ } = props;
    const itemsToJson = items.map((item) => {
        return {
          ...item,
          cant: item.cantidad,
          price: item.precio,
        };
      });


    let data = {
      npedidolab,
      ncaja,
      status,
      observaciones,
      items: itemsToJson,
      //items: JSON.stringify(itemsToJson),
      branch_id: currentUser.branch.id,
    };
    if (lab_id) data.lab_id = lab_id;
    //Validity
    if (status === 1 && !lab_id && toString(npedidolab).length) {
      window.Swal.fire(
        "Verificación",
        "Los campos de laboratorio estan vacios",
        "error"
      );
      return false;
    }
    if (status === 2 && !ncaja) {
      window.Swal.fire("Verificación", "El numero de caja esta vacio", "error");
      return false;
    }
    //Save
    console.log("Data a guardar", data);

    hookOrder.saveOrder(data).then((data)=>{
      console.log("Funcion de guardar");
    })
    //helper.handleSaveOrder(id, data, options, _saveOrder);
  };

  const handleDeleteOrder = () => {
    /* const { order, options, _deleteOrder } = this.props;
    helper.handleDeleteOrder(order, options, _deleteOrder); */
  };


  const handleChangeInput = (key, value) => {
    console.log(key, value);
    setState({
      ...state,
      [key]: value
    })
  };

  useEffect(()=>{
    hookOrder.getOrder(idurl).then((data)=>{
      if(data){
        let dataReceibed = data.data;
        console.log(dataReceibed);
        setState({
          id: dataReceibed.id ?? 0,
          paciente: dataReceibed.paciente ?? {},
          session: dataReceibed.session ?? null,
          lab_id: dataReceibed.lab_id ?? 0,
          npedidolab: dataReceibed.npedidolab ?? "",
          observaciones: dataReceibed.observaciones ?? "",
          ncaja: dataReceibed.ncaja ?? 0,
          nota: dataReceibed.nota ?? {},
          items: dataReceibed.items ?? [],
          exam: dataReceibed.exam ?? {},
          codes: dataReceibed.codes ?? {},
          status: dataReceibed.status ?? 0,
          created: dataReceibed.created ?? {},
          created_at: dataReceibed.created_at ?? null,
          updated: dataReceibed.updated ?? {},
          updated_at: dataReceibed.updated_at ?? null,
        })
      }else{
        console.error("Error al obtener los datos");
      }
    });
  },[id])
  
  return (
    <>
      { state ? (
        <>
          <div className="card card-warning card-outline d-print-none">
            <div className="card-header">
              <h3 className="card-title">
                <i className="mr-1 fas fa-clipboard-list"></i>Pedido
                <span className="ml-1 badge badge-pill badge-warning">
                  {id}
                </span>
              </h3>
            </div>
            <div className="p-0 card-body">
              <div className="mailbox-read-info">
                <h5>
                  <i className="mr-1 fas fa-user"></i>
                  <span className="text-capitalize">{paciente.nombre}</span>
                  {role === "admin" ? (
                    <span className="float-right mailbox-read-time">
                      Fecha de nacimiento:{" "}
                      {fNacimiento ? (
                        <>
                          {fNacimiento.format("LL")}
                          <label className="ml-1">
                            ({moment().diff(fNacimiento, "years")} años)
                          </label>
                        </>
                      ) : (
                        "NO REGISTRADO"
                      )}
                    </span>
                  ) : null}
                </h5>
                <h6>
                  {paciente.email ? (
                    <span>
                      <i className="mr-1 fas fa-envelope"></i>
                      {paciente.email}
                    </span>
                  ) : null}
                  <span className="float-right mailbox-read-time">
                    Pedido registrado {moment(created_at).fromNow()}
                  </span>
                </h6>
                {telefonos.length ? (
                  <h6>
                    <i className="mr-1 fas fa-phone"></i>
                    <span className="mx-1">
                      {telefonos.map((tel, index) =>
                        index ? `, ${tel}` : `${tel}`
                      )}
                    </span>
                  </h6>
                ) : null}
              </div>
            </div>
            <div className="card-footer">
              <div className="text-right mailbox-controls">
                <div className="btn-group">
                  <a
                    href=""
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => handleClose(e)}
                  >
                    <i className="mr-1 fas fa-ban"></i>
                    Cerrar
                  </a>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={handleSave}
                  >
                    <i className="mr-1 fas fa-save"></i> Guardar
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

          <div className="row mt-4">
            <div className="col-lg-4 col-md-6 col-sm-12 d-print-none">
              <h6 className="w-100 d-block">Acciones</h6>
              <div className="card">
                <div className="text-center mailbox-controls with-border">
                  <div className="btn-group">
                    {state.nota && !state.nota.id ? (
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        title="Eliminar"
                        onClick={handleDeleteOrder}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    ) : null}

                    {paciente.telefonos && paciente.telefonos.t_movil ? (
                      <a
                        href={
                          "https://wa.me/52" +
                          paciente.telefonos.t_movil.replace(" ", "")
                        }
                        className="btn btn-default btn-sm"
                        title="Abrir WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-mobile-alt"></i>
                      </a>
                    ) : null}
                    {paciente.email && (
                      <a
                        href={"mailto:" + paciente.email}
                        className="btn btn-default btn-sm"
                        title="Enviar e-mail"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-at"></i>
                      </a>
                    )}
                  </div>
                </div>
                {LOADING ? (
                  <div className="overlay dark">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div>
                ) : null}
              </div>
              <h6 className="w-100 d-block">Estado</h6>
              <div className="card mt-2">
                <div className="btn-group-vertical">
                  {helper.getStatusType.map((type, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        status === index
                          ? "btn btn-primary btn-sm text-capitalize text-bold"
                          : "btn btn-default btn-sm text-capitalize"
                      }
                      onClick={(e) => {
                        setState({
                          ...state,
                          status: index,
                        });
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {LOADING ? (
                  <div className="overlay dark">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <div className="card h-100 m-0">
                <div className="card-header d-print-none">
                  <h5 className="card-title w-100 d-block mb-2 text-capitalize text-bold">
                    <i className="fas fa-shield-alt mr-1"></i>
                    {helper.handleStatusString(status)}
                  </h5>
                </div>
                <div className="card-body p-0">
                  <div className="p-0 mailbox-read-message m-0">
                    {status === 0 ? (
                      <Items
                        items={items}
                        codes={codes}
                        session={session}
                        noPrice
                        ChangeInput={handleChangeInput}
                      />
                    ) : null}
                    {status === 1 ? (
                      <LabOrder
                        lab_id={lab_id}
                        npedidolab={npedidolab}
                        status={status}
                        handleChange={handleChangeInput}
                      />
                    ) : null}
                    {status === 2 ? (
                      <Bicelacion
                        ncaja={ncaja}
                        observaciones={observaciones}
                        status={status}
                        handleChange={handleChangeInput}
                      />
                    ) : null}
                    {status >= 3 ? (
                      <div className="px-2">
                        <div className="my-2 border rounded card border-warning d-print-none">
                          <div className="card-body">
                            <h5 className="card-title">
                              Estado de la entrega
                            </h5>
                            <div className="ml-1 icheck-success d-inline">
                              <input
                                type="checkbox"
                                checked={status === 3 ? false : true}
                                id="checkboxSuccess1"
                                onChange={(e) =>
                                  handleChangeInput(
                                    "status",
                                    status === 3 ? 4 : 3
                                  )
                                }
                              />
                              <label htmlFor="checkboxSuccess1"></label>
                            </div>
                          </div>
                        </div>
                        {state && state.id ? (
                          <ShowPaymentsComponent
                            nota={state.nota}
                            orderId={state.id}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
                {LOADING ? (
                  <div className="overlay dark d-print-none">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="row mt-4 d-print-none">
            {exam && exam.id ? (
              <div className="col pt-6">
                <h6 className="w-100 d-block">Examen</h6>
                <div className="card mt-2">
                  <div className="card-body">
                    <div className="p-0 mailbox-read-message">
                      <Exam id={exam.id} examEdit={false} exam={exam} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={`col-${exam && exam.id ? 3 : 12} pt-6`}>
              <h6 className="w-100 d-block">Meta data</h6>
              {/* <Dashboard
                created_at={created_at ?? ""}
                created={created ? created.name : ""}
                updated={updated ? updated.name : ""}
                updated_at={updated_at ?? ""}
              /> */}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

/* class EditOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      paciente: {},
      session: null,
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      items: [],
      exam: {},
      codes: {},
      status: 0,
      created: {},
      created_at: null,
      updated: {},
      updated_at: null,
    };
  }

  componentDidMount() {
    this.getOrderData();
  }

  componentDidUpdate(props, state) {
    const { order } = this.props;

    if (props.order.id !== order.id && order.id) {
      this.getOrderData();
    }
  }


  componentWillUnmount() {
    const { _setOrder, _setSale } = this.props;
    _setOrder(DEFAULT_STATE_ORDER.order);
    _setSale(DEFAULT_STATE_SALES.sale);
  }

  render() {
    const {
        id,
        paciente,
        session,
        lab_id,
        npedidolab,
        ncaja,
        observaciones,
        items,
        exam = {},
        codes,
        status,
        created,
        created_at,
        updated,
        updated_at,
      } = this.state,
      { order, loading: LOADING } = this.props,
      fNacimiento =
        new Date(paciente.f_nacimiento ?? "") < new Date()
          ? moment(paciente.f_nacimiento)
          : null,
      telefonos = Object.values(paciente.telefonos ?? {}).filter(
        (tel) => tel !== ""
      );

    return (
      <>
        {!LOADING && order ? (
          <>
            <div className="card card-warning card-outline d-print-none">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="mr-1 fas fa-clipboard-list"></i>Pedido
                  <span className="ml-1 badge badge-pill badge-warning">
                    {id}
                  </span>
                </h3>
              </div>
              <div className="p-0 card-body">
                <div className="mailbox-read-info">
                  <h5>
                    <i className="mr-1 fas fa-user"></i>
                    <span className="text-capitalize">{paciente.nombre}</span>
                    {this.props.role === "admin" ? (
                      <span className="float-right mailbox-read-time">
                        Fecha de nacimiento:{" "}
                        {fNacimiento ? (
                          <>
                            {fNacimiento.format("LL")}
                            <label className="ml-1">
                              ({moment().diff(fNacimiento, "years")} años)
                            </label>
                          </>
                        ) : (
                          "NO REGISTRADO"
                        )}
                      </span>
                    ) : null}
                  </h5>
                  <h6>
                    {paciente.email ? (
                      <span>
                        <i className="mr-1 fas fa-envelope"></i>
                        {paciente.email}
                      </span>
                    ) : null}
                    <span className="float-right mailbox-read-time">
                      Pedido registrado {moment(created_at).fromNow()}
                    </span>
                  </h6>
                  {telefonos.length ? (
                    <h6>
                      <i className="mr-1 fas fa-phone"></i>
                      <span className="mx-1">
                        {telefonos.map((tel, index) =>
                          index ? `, ${tel}` : `${tel}`
                        )}
                      </span>
                    </h6>
                  ) : null}
                </div>
              </div>
              <div className="card-footer">
                <div className="text-right mailbox-controls">
                  <div className="btn-group">
                    <a
                      href="#close"
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => this.handleClose(e)}
                    >
                      <i className="mr-1 fas fa-ban"></i>
                      Cerrar
                    </a>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={this.handleSave}
                    >
                      <i className="mr-1 fas fa-save"></i> Guardar
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

            <div className="row mt-4">
              <div className="col-lg-4 col-md-6 col-sm-12 d-print-none">
                <h6 className="w-100 d-block">Acciones</h6>
                <div className="card">
                  <div className="text-center mailbox-controls with-border">
                    <div className="btn-group">
                      {order.nota && !order.nota.id ? (
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          title="Eliminar"
                          onClick={this.handleDeleteOrder}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      ) : null}

                      {paciente.telefonos && paciente.telefonos.t_movil ? (
                        <a
                          href={
                            "https://wa.me/52" +
                            paciente.telefonos.t_movil.replace(" ", "")
                          }
                          className="btn btn-default btn-sm"
                          title="Abrir WhatsApp"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-mobile-alt"></i>
                        </a>
                      ) : null}
                      {paciente.email && (
                        <a
                          href={"mailto:" + paciente.email}
                          className="btn btn-default btn-sm"
                          title="Enviar e-mail"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-at"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  {LOADING ? (
                    <div className="overlay dark">
                      <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                  ) : null}
                </div>
                <h6 className="w-100 d-block">Estado</h6>
                <div className="card mt-2">
                  <div className="btn-group-vertical">
                    {helper.getStatusType.map((type, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          status === index
                            ? "btn btn-primary btn-sm text-capitalize text-bold"
                            : "btn btn-default btn-sm text-capitalize"
                        }
                        onClick={(e) => {
                          this.setState({
                            status: index,
                          });
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {LOADING ? (
                    <div className="overlay dark">
                      <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col">
                <div className="card h-100 m-0">
                  <div className="card-header d-print-none">
                    <h5 className="card-title w-100 d-block mb-2 text-capitalize text-bold">
                      <i className="fas fa-shield-alt mr-1"></i>
                      {helper.handleStatusString(status)}
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="p-0 mailbox-read-message m-0">
                      {status === 0 ? (
                        <Items
                          items={items}
                          codes={codes}
                          session={session}
                          noPrice
                          ChangeInput={this.handleChangeInput}
                        />
                      ) : null}
                      {status === 1 ? (
                        <LabOrder
                          lab_id={lab_id}
                          npedidolab={npedidolab}
                          status={status}
                          handleChange={this.handleChangeInput}
                        />
                      ) : null}
                      {status === 2 ? (
                        <Bicelacion
                          ncaja={ncaja}
                          observaciones={observaciones}
                          status={status}
                          handleChange={this.handleChangeInput}
                        />
                      ) : null}
                      {status >= 3 ? (
                        <div className="px-2">
                          <div className="my-2 border rounded card border-warning d-print-none">
                            <div className="card-body">
                              <h5 className="card-title">
                                Estado de la entrega
                              </h5>
                              <div className="ml-1 icheck-success d-inline">
                                <input
                                  type="checkbox"
                                  checked={status === 3 ? false : true}
                                  id="checkboxSuccess1"
                                  onChange={(e) =>
                                    this.handleChangeInput(
                                      "status",
                                      status === 3 ? 4 : 3
                                    )
                                  }
                                />
                                <label htmlFor="checkboxSuccess1"></label>
                              </div>
                            </div>
                          </div>
                          {order && order.id ? (
                            <ShowPaymentsComponent
                              nota={order.nota}
                              orderId={order.id}
                            />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {LOADING ? (
                    <div className="overlay dark d-print-none">
                      <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row mt-4 d-print-none">
              {exam && exam.id ? (
                <div className="col pt-6">
                  <h6 className="w-100 d-block">Examen</h6>
                  <div className="card mt-2">
                    <div className="card-body">
                      <div className="p-0 mailbox-read-message">
                        <Exam id={exam.id} examEdit={false} exam={exam} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className={`col-${exam && exam.id ? 3 : 12} pt-6`}>
                <h6 className="w-100 d-block">Meta data</h6>
                <Dashboard
                  register={created_at ?? ""}
                  created={created ? created.name : ""}
                  updated={updated ? updated.name : ""}
                  updated_at={updated_at ?? ""}
                />
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }

  getOrderData = () => {
    //TODO: ejecutar un hook para obtener la order por el ID de la order en lugar de redux
    const { order } = this.props;
    this.setState({
      ...order,
      lab_id: (order.laboratorio && order.laboratorio.id) ?? 0,
    });
  };

  handleDeleteOrder = () => {
    const { order, options, _deleteOrder } = this.props;
    helper.handleDeleteOrder(order, options, _deleteOrder);
  };


  handleClose = (e) => {
    const { _setOrder } = this.props;

    if (e) e.preventDefault();
    _setOrder();
    this.props.handleChangePanel(null, 0);
  };


  handleChangeInput = (key, value) => {
    this.setState({
      [key]: value,
    });
  };


  handleSave = () => {
    //Validid data
    const { id, npedidolab, ncaja, status, lab_id, observaciones, items } =
        this.state,
      { options, _saveOrder, currentUser } = this.props,
      itemsToJson = items.map((item) => {
        return {
          ...item,
          cant: item.cantidad,
          price: item.precio,
        };
      });
    let data = {
      npedidolab,
      ncaja,
      status,
      observaciones,
      items: JSON.stringify(itemsToJson),
      branch_id: currentUser.branch.id,
    };
    if (lab_id) data.lab_id = lab_id;
    //Validity
    if (status === 1 && !lab_id && toString(npedidolab).length) {
      window.Swal.fire(
        "Verificación",
        "Los campos de laboratorio estan vacios",
        "error"
      );
      return false;
    }
    if (status === 2 && !ncaja) {
      window.Swal.fire("Verificación", "El numero de caja esta vacio", "error");
      return false;
    }
    //Save
    helper.handleSaveOrder(id, data, options, _saveOrder);
  };
}

const mapStateToProps = ({ order, users }) => {
    return {
      order: order.order,
      role: users.dataLoggin.roles[0],
      currentUser: users.dataLoggin,
      options: order.options,
      loading: order.loading,
    };
  },
  mapActionsToProps = {
    _saveOrder: orderActions.saveOrder,
    _deleteOrder: orderActions.deleteOrder,
    _setOrder: orderActions.setOrder,
    _setSale: saleActions.setSale,
  };

export default connect(mapStateToProps, mapActionsToProps)(EditOrderComponent);
 */