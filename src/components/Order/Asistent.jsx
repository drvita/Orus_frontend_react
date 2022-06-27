/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, { useState, useContext, useEffect } from "react";
//Context
import { OrderContext } from "../../context/OderContext";
//Hooks
import useOrder from "../../hooks/useOrder";
//Helpers
import generalHelper from "../../utils/helpers";

//Components
import SearchContact from "../Contacts/views/ShowCard";
import Items from "./views/ItemsOrder";
import PrintSaleComponent from "../print/PrintSale";
import CardCustomer from "./views/Asistent_card_customer";
import CardExam from "./views/Asistent_card_exam";
import CardDiscount from "./views/Asistent_card_discount";
import CardOrderPayments from "./views/Asistent_card_payments";

export default function AsistentComponent(props) {
  const [state, setState] = useState({
    id: 0,
    contact_id: 0,
    contact: {},
    exam_id: 0,
    exam: {},
    examsList: [],
    items: [],
    session: generalHelper.getSession(),
    sale: {
      total: 0,
      discount: 0,
      payments: [],
    },
    print: false,
    editCustomer: false,
    validItems: false,
  });
  const orderContext = useContext(OrderContext);
  const orderHook = useOrder();

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
    console.log(key, value);
    if (key === "exam") {
      if (value.category_id) {
        handleGetCategories(value.category_id);
      }

      if (!value.id) {
        setState({
          ...state,
          exam_id: 0,
          exam: {},
        });
      } else {
        setState({
          ...state,
          exam_id: value.id,
          exam: value,
        });
      }

      return;
    }

    if (key === "items") {
      const total = value.reduce(
        (sub, item) => item.cant * item.price + sub,
        0
      );

      setState({
        ...state,
        items: value,
        sale: {
          ...state.sale,
          total: total,
        },
      });
      return;
    }

    setState({
      ...state,
      [key]: value,
    });
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
                customer: data.paciente,
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
    // console.log("[DEBUG] State:", state.sale);
  }, []);

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
                handleContactSelect={(contact) => {
                  if (contact.id) {
                    setState({
                      ...state,
                      contact_id: contact.id ?? 0,
                      examsList: contact.exams.length ? contact.exams : [],
                      contact,
                    });
                  }
                }}
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
        {Boolean(state.exam_id) && (
          <div className="col-lg-10 d-flex align-self-center justify-content-center p-0">
            <Items
              items={state.items ?? []}
              session={state.session}
              disabled={Boolean(state.sale?.payments?.length)}
              changeInput={handleChangeInput}
              className={
                state.items.length
                  ? "card border border-success col-lg-12"
                  : "card border border-warning col-lg-12"
              }
            />
          </div>
        )}

        {/* Validación 4 --- lista de abonos al pago */}
        {Boolean(state.items.length) && state.validItems && (
          <div className="col-lg-10 d-flex align-self-center p-0 mt-2">
            <CardDiscount
              data={state.sale ?? {}}
              handleSetDiscount={handleChangeInput}
              disabled={(() => {
                const amount = state.sale.payments.reduce(
                  (back, pay) => pay.total + back,
                  0
                );

                if (state.id) return true;
                if (amount) return true;

                return !Boolean(
                  state.sale.total - state.sale.discount - amount
                );
              })()}
            />

            <CardOrderPayments
              data={state.sale ?? {}}
              handleSetPayments={handleChangeInput}
              disabled={Boolean(state.id)}
            />
          </div>
        )}

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
            <button
              className="btn btn-secondary"
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

            {state.id ? (
              <button
                className="btn btn-primary ml-3"
                onClick={() => setState({ ...state, print: !state.print })}
              >
                <i className="fas fa-print mr-2"></i>
                Imprimir
              </button>
            ) : (
              <button
                className="btn btn-warning ml-3"
                disabled={
                  !state.items.length || state.id || !state.validItems
                    ? true
                    : false
                }
                onClick={handleSave}
              >
                <i className="fas fa-save mr-2"></i>
                Guardar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
