/* eslint-disable no-lone-blocks */
import React, { useState, useContext, useEffect } from "react";

//Context
import { OrderContext } from "../../context/OderContext";

//Hooks
import useOrder from "../../hooks/useOrder";

//Helpers
import generalHelper from "../../utils/helpers";
import saleHelper from "../../components/Sales/helpers";

//Components
import SearchContact from "../Contacts/views/ShowCard";
import Items from "./views/listItemsOrder";
import PaymentModal from "./views/PaymentModal";
import DiscountModal from "./views/DiscountModal";
import PrintSaleComponent from "../print/PrintSale";
import CardCustomer from "./views/Asistent_card_customer";
import CardExam from "./views/Asistent_card_exam";

export default function AsistentComponent(props) {
  const [state, setState] = useState({
    id: 0,
    contact_id: 0,
    contact: {},
    exam_id: 0,
    exam: {},
    examsList: [],
    examEdit: false,
    items: [],
    codes: {},
    load: true,
    LOADING: false,
    session: generalHelper.getSession(),
    listReady: false,
    showModal: false,
    discountModal: false,
    sale: {
      total: 0,
      discount: 0,
      payments: [],
    },
    print: false,
    editCustomer: false,
    phone: "",
    email: "",
    validEmailPhone: {
      phone: "",
      email: "",
    },
  });
  const orderContext = useContext(OrderContext);
  const orderHook = useOrder();

  const productCodes = [];
  state.items.forEach((item) =>
    productCodes.push(item.category.code.codeCategory[0])
  );
  const changeTotal = (total, status) => {
    setState({
      ...state,
      listReady: status,
      sale: {
        ...state.sale,
        total: total,
      },
    });
  };
  const penddingToPay = () => {
    let pendding =
      saleHelper.getTotal(state.sale.total, state.sale.discount) -
      saleHelper.getPagado(state.sale.payments);
    return pendding;
  };
  const deletePayment = (e, id) => {
    e.preventDefault();
    let filteredPayments = state.sale.payments.filter(
      (payment) => payment.id !== id
    );
    setState({
      ...state,
      sale: {
        ...state.sale,
        payments: filteredPayments,
      },
    });
  };
  const setDiscount = (discount) => {
    setState({
      ...state,
      sale: {
        ...state.sale,
        discount: discount,
      },
      discountModal: false,
    });
  };
  const setPayments = (payments) => {
    setState({
      ...state,
      showModal: false,
      sale: {
        ...state.sale,
        payments: payments,
      },
    });
  };
  const handleContactSelect = (contact) => {
    if (contact.id) {
      setState({
        ...state,
        contact_id: contact.id ?? 0,
        examsList: contact.exams.length ? contact.exams : [],
        contact,
      });
    }
  };
  const handleSave = (e) => {
    let categories_wrong = 0;

    const { items: items_state, exam_id, session, contact_id, sale } = state;

    const items = items_state.map((item) => {
      if (item.category === 4) categories_wrong++;

      return {
        cant: item.cant,
        price: item.price,
        subtotal: item.subtotal,
        inStorage: item.inStorage,
        session: session,
        out: item.out,
        descripcion: item.descripcion,
        store_items_id: item.store_items_id,
      };
    });

    if (items.length === categories_wrong) {
      window.Swal.fire({
        title: "Verificacion",
        text: "No hay productos para procesar en un pedido",
        icon: "warning",
        timer: 3000,
      });
      return false;
    }

    let data = {
      session: session,
      contact_id: contact_id,
      items: items,
      sale: {
        discount: sale.discount,
      },
    };

    if (sale.payments.length) {
      let finalPayments = sale.payments;
      finalPayments.forEach((payment) => {
        delete payment.id;
        delete payment.metodoname;
      });
      data.sale.payments = finalPayments;
    }

    if (exam_id) data.exam_id = parseInt(exam_id);

    if (!data.sale.payments?.length) {
      window.Swal.fire({
        icon: "question",
        title: "¿Desea GUARDAR el pedido sin ningun abono?",
        showConfirmButton: true,
        confirmButtonText: "Si",
        showCancelButton: true,
        denyButtonText: "No",
      }).then(({ dismiss }) => {
        if (!dismiss) {
          executeHook(data);
        }
      });
    } else {
      window.Swal.fire({
        icon: "question",
        title: "Esta seguro que desea GUARDAR el pedido?",
        showConfirmButton: true,
        confirmButtonText: "Si",
        showCancelButton: true,
        denyButtonText: "No",
      }).then(({ dismiss }) => {
        if (!dismiss) {
          executeHook(data);
        }
      });
    }
  };

  const handleChangeInput = (key, value) => {
    if (key === "exam") {
      if (value.category_id) {
        handleGetCategories(value.category_id);
      }

      if (!value.id) {
        setState({
          ...state,
          exam_id: 0,
          exam: {},
          codes: {},
        });
      } else {
        setState({
          ...state,
          exam_id: value.id,
          exam: value,
          codes: {},
        });
      }
    }

    if (key === "codes") {
      setState({
        ...state,
        codes: value,
      });
    } else {
      setState({
        ...state,
        [key]: value,
      });
    }
  };

  const handleGetCategories = (cat_id) => {
    const { _getCategory } = this.props;
    _getCategory({ id: cat_id });
  };

  const executeHook = (data) => {
    orderHook.saveOrder(data).then(({ data }) => {
      if (data) {
        window.Swal.fire({
          icon: "success",
          title: "Pedido guardado correctamente",
          showConfirmButton: false,
          timer: 3000,
        }).then(({ dismiss }) => {
          if (dismiss) {
            setState({
              ...state,
              id: data.id,
              sale: {
                ...state.sale,
                ...data.sale,
                payments: data.sale.payments,
                paid: data.sale.paid,
                paciente: data.paciente,
              },
              print: true,
            });
          }
        });
      } else {
        window.Swal.fire({
          icon: "danger",
          title: "Error al guardar el pedido",
          showConfirmButton: true,
        });
      }
    });
  };
  const handleCloseAssitent = () => {
    orderContext.set({
      ...orderContext,
      panel: "inbox",
    });
  };

  useEffect(() => {
    // console.log("[DEBUG] State:", state);
  }, [state]);

  return (
    <div className="mainAssitentComponent">
      <div className="card card-warning card-outline col-lg-12">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>
            Nuevo Pedido
          </h3>
        </div>

        <div className="card-body d-flex justify-content-center col-lg-12">
          {/* Validacion 1 --- Seleccion de cliente */}
          {!state.contact_id ? (
            <div className="form-group col-lg-6">
              <SearchContact
                title="Paciente"
                legend={
                  !state.contact_id
                    ? "Busque el paciente por nombre para crearun nuevo pedido"
                    : null
                }
                handleContactSelect={handleContactSelect}
                data={state.contact}
              />
            </div>
          ) : (
            <CardCustomer
              data={state.contact}
              handleRemoveCustomer={() => {
                setState({
                  session: generalHelper.getSession(),
                  contact_id: 0,
                  contact: {},
                  items: [],
                  exam_id: 0,
                  exam: {},
                });
              }}
              handleUpdateContact={(contact) =>
                setState({ ...state, contact, editCustomer: false })
              }
              handleEditor={(status) =>
                setState({ ...state, editCustomer: status })
              }
              disabled={Boolean(state.exam_id)}
            />
          )}

          {/* Validacion 2 --- Seleccion de examen o creacion de uno nuevo */}
          {Boolean(state.contact_id) && (
            <CardExam
              data={state.exam}
              customer={state.contact}
              editCustomer={state.editCustomer}
              disabled={Boolean(state.items.length)}
              handleSelect={(exam) =>
                setState({ ...state, exam_id: exam.id, exam })
              }
              hanldeRemove={() => setState({ ...state, exam_id: 0, exam: {} })}
            />
          )}
        </div>

        {/* Validacion 3 --- Seleccion de productos una vez seleccionado el examen */}
        {!state.contact_id ? null : state.exam_id ? (
          <Items
            items={state.items}
            session={state.session}
            codes={state.codes}
            productCodes={productCodes}
            showHideBtns={state.listReady}
            ChangeInput={handleChangeInput}
            changeTotal={changeTotal}
            cancelListProducts={() =>
              setState({
                ...state,
                items: [],
              })
            }
          />
        ) : (
          <div className="col-lg-10 text-center mt-3 mb-3">
            <h5>
              <i className="fas fa-exclamation-circle mr-1"></i>
              Crea o selecciona un examen antes de agregar productos!
            </h5>
          </div>
        )}

        {/* Validación 4 --- lista de abonos al pago */}
        {state.listReady && (
          <div className="col-lg-10 d-flex align-self-center p-0 mt-5">
            <div className="card col-lg-4">
              <div className="card-header border-primary">
                <h3 className="card-title">
                  <i className="fas fa-percent mr-1"></i>
                  Descuento
                </h3>
              </div>
              <div className="card-body">
                <h5 className="font-weight-bold">
                  Descuento:{" "}
                  <span className="font-weight-normal">
                    ${state.sale.discount}
                  </span>
                </h5>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  disabled={state.sale.discount ? false : true}
                  onClick={() => {
                    setDiscount(0);
                  }}
                >
                  Eliminar descuento
                  <i className="fas fa-window-close ml-1"></i>
                </button>
              </div>
            </div>

            <div className="card col-lg-8">
              <div className="card-header border-primary">
                <h3 className="card-title">
                  <i className="fas fa-money-bill-alt mr-1"></i>
                  Lista de abonos
                </h3>
              </div>

              <div className="card-body">
                {state.sale.payments.length ? (
                  <div className="col-lg-12">
                    {state.sale.payments.map((payment, index) => (
                      <div className="row" id={payment.id} key={index}>
                        <div className="col-1">{index + 1}</div>
                        <div className="col-6 text-uppercase font-weight-bold">
                          <h6
                            className={
                              payment.metodoname === "efectivo"
                                ? "text-success"
                                : "text-dark"
                            }
                          >
                            {payment.metodoname}{" "}
                          </h6>
                        </div>
                        <div className="col-3 text-right">
                          <h6>${payment.total}</h6>
                        </div>
                        <div className="col-2 text-right">
                          <button
                            className="btn btn-sm btn-muted"
                            id={payment.id}
                            onClick={(e) => {
                              deletePayment(e, payment.id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center bg-warning">
                    <i className="fas fa-info-circle mr-1"></i>
                    No tiene abonos en este pedido
                  </p>
                )}

                <div className="card-footer text-right d-flex justify-content-end">
                  <h6 className="mr-4 text-success">
                    <span className="font-weight-bold text-dark">
                      Abono total:
                    </span>{" "}
                    ${saleHelper.getPagado(state.sale.payments)}
                  </h6>
                  <h6 className="text-danger">
                    <span className="font-weight-bold text-dark">
                      Por pagar:
                    </span>
                    ${penddingToPay()}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal validation */}
        {state.showModal ? (
          <PaymentModal
            handleClose={() => {
              setState({
                ...state,
                showModal: false,
              });
            }}
            sale={state.sale}
            forPaid={penddingToPay()}
            handleSetPayments={setPayments}
          />
        ) : null}

        {/* Discount Modal validation*/}
        {state.discountModal ? (
          <DiscountModal
            items={state.sale}
            total={state.sale.total}
            closeModal={() => {
              setState({
                ...state,
                discountModal: false,
              });
            }}
            setDiscountProp={setDiscount}
          />
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

        <div className="card col-lg-10 d-flex align-self-center border border-bottom-primary">
          <div className="card-body text-right">
            {Boolean(state.items.length) && (
              <>
                <button
                  className="btn btn-success mr-4"
                  onClick={() => {
                    setState({
                      ...state,
                      showModal: true,
                    });
                  }}
                  disabled={
                    penddingToPay() === 0 || state.id || !state.listReady
                      ? true
                      : false
                  }
                >
                  <i className="fas fa-money-bill-alt mr-1"></i>
                  Abonar
                </button>

                <button
                  className="btn btn-primary mr-4"
                  disabled={
                    state.listReady
                      ? state.sale.discount || state.id
                        ? true
                        : false
                      : true
                  }
                  //disabled={state.sale.discount ? true : false}
                  onClick={() => {
                    setState({
                      ...state,
                      discountModal: true,
                    });
                  }}
                >
                  <i className="fas fa-percent mr-1"></i>
                  Aplicar un descuento
                </button>

                <button
                  className="btn btn btn-outline-info"
                  disabled={
                    state.sale.payments.length ||
                    state.sale.discount ||
                    !state.listReady ||
                    state.id
                      ? true
                      : false
                  }
                  onClick={() => {
                    setState({
                      ...state,
                      listReady: false,
                    });
                  }}
                >
                  <i className="fas fa-plus mr-1"></i>
                  Agregar otro producto
                </button>
              </>
            )}

            <button
              className="btn btn-secondary ml-3"
              onClick={() => {
                if (state.contact_id && !state.id) {
                  window.Swal.fire({
                    icon: "question",
                    title: "¿Realmente desea cerrar esta venta sin GUARDAR?",
                    showConfirmButton: true,
                    confirmButtonText: "Sí",
                    showCancelButton: true,
                    cancelButttonText: "Cancelar",
                  }).then(({ dismiss }) => {
                    if (!dismiss) {
                      handleCloseAssitent();
                    }
                  });
                } else {
                  handleCloseAssitent();
                }
              }}
            >
              <i
                className={
                  state.id ? "fas fa-door-open mr-2" : "fas fa-ban mr-2"
                }
              ></i>
              {state.id ? "Cerrar" : "Cancelar"}
            </button>

            <button
              className="btn btn-warning ml-3"
              disabled={!state.items.length || state.id ? true : false}
              onClick={handleSave}
            >
              <i className="fas fa-save mr-2"></i>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
