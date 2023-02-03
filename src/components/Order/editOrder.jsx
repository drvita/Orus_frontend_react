import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

//Context
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OderContext";

//Hooks
import useOrder from "../../hooks/useOrder";

//Components
import LabOrder from "./views/labOrder";
import Bicelacion from "./views/bicelacionOrder";
import Items from "./views/ItemsOrder";
import ExamModal from "./ExamModal";
import ModalNota from "./ModalNota";
import Activitys from "../Activitys";
import PrintSaleComponent from "../print/PrintSale";

//Helper
import helper from "./helpers";

export default function EditOrderComponent(props) {
  const [state, setState] = useState({
    id: 0,
    paciente: {},
    session: null,
    lab_id: 0,
    lab_order: "",
    bi_details: "",
    bi_box: 0,
    items: [],
    sale: {},
    exam: {},
    codes: {},
    status: 0,
    created: {},
    created_at: null,
    updated: {},
    updated_at: null,
    print: false,
    statusInitial: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalNota, setShowModalNota] = useState(false);

  const {
    id,
    paciente,
    lab_id,
    lab_order,
    bi_box,
    bi_details,
    items,
    exam = {},
    status,
    created_at,
  } = state;

  const idurl = props.match.params;
  const hookOrder = useOrder();
  const authContext = useContext(AuthContext);
  const role = authContext.auth.roles;
  const history = useHistory();
  const orderContext = useContext(OrderContext);

  const { loading: LOADING } = props;

  const fNacimiento =
    new Date(paciente.birthday ?? "") < new Date()
      ? moment(paciente.birthday)
      : null;

  const telefonos = Object.values(paciente.phones ?? {}).filter((tel) => tel);

  const handleClose = (e) => {
    orderContext.set({
      ...orderContext,
      panel: "inbox",
    });

    history.push("/pedidos");
  };

  const handleSave = () => {
    const { id, lab_order, bi_box, status, lab_id, bi_details } = state;
    if (status === 0) {
      return null;
    }

    if (status === 1 && !lab_id && toString(lab_order).length) {
      window.Swal.fire(
        "Verificación",
        "Verifique los campos de laboratorio",
        "error"
      );
      return false;
    } else if (status === 1) {
      saveFinalOrder({
        id,
        status,
        lab_id,
        lab_order,
      });
    }

    if (status === 2 && !bi_box) {
      window.Swal.fire("Verificación", "El numero de caja esta vacio", "error");
      return false;
    } else if (status === 2) {
      saveFinalOrder({
        id,
        status,
        bi_box,
        bi_details,
      });
    }

    if (status >= 3) {
      saveFinalOrder({
        id,
        status,
      });
    }
  };

  const saveFinalOrder = (data) => {
    hookOrder.saveOrder(data).then((data) => {
      if (data) {
        window.Swal.fire({
          title: "Estado guardado correctamente",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          timer: 3000,
        });
        orderContext.set({
          ...orderContext,
          panel: "inbox",
        });
        history.push("/pedidos");
      } else {
        window.Swal.fire({
          title: "Error al actualizar el estado",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
        });
      }
    });
  };

  const handleDeleteOrder = () => {
    window.Swal.fire({
      title: "¿Estás seguro de eliminar la orden?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(({ dismiss }) => {
      if (!dismiss) {
        hookOrder.deleteOrder(id);
        window.Swal.fire({
          icon: "success",
          title: "Orden eliminada correctamente",
          showConfirmButton: false,
          timer: 3000,
        });

        orderContext.set({
          ...orderContext,
          panel: "inbox",
        });
      }
    });
  };

  const handleChangeInput = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  useEffect(() => {
    hookOrder.getOrder(idurl).then(({ data }) => {
      console.log("[DEBUG] Sale in order:", data.items);
      if (data) {
        const $order = {
          id: data.id ?? 0,
          paciente: data.paciente ?? {},
          session: data.session ?? null,
          lab_id: data.lab ? data.lab.id : 0,
          lab_order: data.lab_order ?? "",
          bi_details: data.bi_details ?? "",
          bi_box: data.bi_box ?? 0,
          items: data.items ?? [],
          exam: data.exam ?? {},
          codes: data.codes ?? {},
          status: data.status ?? 0,
          created: data.created ?? {},
          created_at: data.created_at ?? null,
          updated: data.updated ?? {},
          updated_at: data.updated_at ?? null,
          contact_id: data.paciente.id,
          activitys: data.activity ?? [],
          statusInitial: data.status ?? 0,
        };
        if (data.sale) {
          $order.sale = {
            id: data.sale.id,
            total: data.sale.total,
            subtotal: data.sale.subtotal,
            session: data.sale.session,
            payments: data.sale.payments,
            paid: data.sale.paid,
            discount: data.sale.descuento,
            customer: data.paciente,
          };
        }
        setState($order);
      } else {
        console.error("Error al obtener los datos");
      }
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {state ? (
        <>
          <div className="card card-warning card-outline d-print-none">
            <div className="card-header">
              <h3 className="card-title w-100">
                <i className="mr-1 fas fa-clipboard-list"></i>
                Pedido
                <span className="ml-1 badge badge-pill badge-warning">
                  #{id}
                </span>
                <span className="float-right mailbox-read-time mt-1 text-dark">
                  Pedido registrado {moment(created_at).fromNow()}
                </span>
              </h3>
            </div>

            <div className="p-0 card-body d-flex p-3">
              <div className="pl-3 col-lg-6">
                {/* Nombre del paciente */}
                <h6 className="d-flex mb-2">
                  <i className="mr-2 fas fa-user"></i>
                  <span className="text-capitalize m-0 text-secondary">
                    {paciente.name}
                  </span>
                </h6>
                {/* Email del paciente */}
                {paciente.email ? (
                  <h6 className="mb-2">
                    <i className="mr-2 fas fa-envelope"></i>
                    <span className="text-muted">{paciente.email}</span>
                  </h6>
                ) : (
                  <h6 className="mb-2">
                    <i className="mr-2 fas fa-envelope"></i>
                    <span className="text-muted">Email no registrado</span>
                  </h6>
                )}
                {/* Teléfono del paciente */}
                {telefonos.length ? (
                  <h6 className="mb-2">
                    <i className="mr-1 fas fa-phone"></i>
                    <span className="mx-1 text-muted">
                      {telefonos.join(" ")}
                    </span>
                  </h6>
                ) : (
                  <h6 className="mb-2">
                    <i className="mr-1 fas fa-phone"></i>
                    <span className="text-muted">Telefonos no registrado</span>
                  </h6>
                )}

                {/*Fecha de nacimiento del paciente*/}
                {role === "admin" ? (
                  <span className="mailbox-read-time">
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
              </div>

              <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                <div className="w-75 d-flex flex-column justify-content-center align-items-center">
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
                  </div>
                </div>

                <div className="w-75 d-flex flex-column justify-content-center align-items-center">
                  <div className="mt-3 ">
                    <button
                      className="btn btn-info mr-1"
                      onClick={() => setShowModal(true)}
                      disabled={Object.keys(exam).length ? false : true}
                    >
                      {Object.keys(exam).length
                        ? "Ver examen"
                        : "Sin examen asignado"}
                      <i className="fas fa-eye ml-1"></i>
                    </button>

                    <button
                      className="btn btn-primary mr-1"
                      onClick={() => setShowModalNota(true)}
                    >
                      Ver Nota
                      <i className="fas fa-money-bill ml-1"></i>
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => setState({ ...state, print: true })}
                    >
                      Imprimir
                      <i className="fas fa-print ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div className="col-lg-4 col-md-6 col-sm-12 d-print-none">
              {/* ------------------SELECCION DE ESTATUS ------------------ */}
              <h6 className="w-100 d-block font-weight-bold">Estado</h6>
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

              <div className="mt-3 d-flex justify-content-center">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={(e) => handleClose(e)}
                >
                  Cerrar
                  <i className="mr-1 fas fa-door-open ml-2"></i>
                </button>

                <button
                  className="btn btn-warning"
                  /* disabled={Boolean(state.status === state.statusInitial)} */
                  onClick={handleSave}
                >
                  Guardar
                  <i className="mr-1 fas fa-save ml-2"></i>
                </button>
              </div>
            </div>

            {/*------------------ COMPONENTE DE PEDIDO ------------------*/}
            <div className="col">
              {
                <div className="card h-100 m-0">
                  <div className="card-header d-print-none">
                    <h5 className="card-title w-100 d-block mb-2 text-capitalize text-bold">
                      <i className="fas fa-shield-alt mr-1"></i>
                      {helper.handleStatusString(status)}
                    </h5>
                  </div>

                  <div className="card-body p-0">
                    <div className="p-0 mailbox-read-message m-0">
                      {!Boolean(status) && <Items items={items} />}

                      {status === 1 ? (
                        <LabOrder
                          lab_id={lab_id}
                          lab_order={lab_order}
                          status={status}
                          handleChange={handleChangeInput}
                        />
                      ) : null}

                      {status === 2 ? (
                        <Bicelacion
                          bi_box={bi_box}
                          bi_details={bi_details}
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
              }
            </div>
          </div>

          {/* MODAL VALIDATION EXAM */}
          {showModal ? (
            <ExamModal
              handleClose={() => setShowModal(false)}
              exam={state.exam}
            />
          ) : null}

          {/* MODAL VALIDATION NOTA*/}
          {showModalNota ? (
            <ModalNota
              handleClose={() => setShowModalNota(false)}
              sale={state.sale}
            />
          ) : null}
        </>
      ) : null}

      {state.print && (
        <PrintSaleComponent
          data={{
            ...state.sale,
            items: state.items,
            order_id: state.id,
          }}
          setPrint={() => setState({ ...state, print: false })}
        />
      )}

      <Activitys data={state.activitys ?? []} />
    </>
  );
}
