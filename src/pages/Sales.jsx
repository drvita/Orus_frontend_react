/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";

//Components
import InputSearchItem from "../components/Sales/views/InputSearchItem";
import DiscountBtnComponent from "../components/Sales/views/DiscountBtn";
import ListSalesBtn from "../components/Sales/views/ListSalesBtn";
import PrintSaleComponent from "../components/print/PrintSale";
import PaymentBtnComponent from "../components/Sales/views/PaymentBtn";
import EraseBtn from "../components/Sales/views/EraseSaleBtn";
import CustomerBtnComponent from "../components/Sales/views/CustomerBtn";
import SalesDetailsTableComponent from "../components/Sales/views/SalesDetailsTable";
import SaleDate from "../components/Sales/views/SaleDate";
import ShowToPay from "../components/Sales/views/ShowToPay";
import ShowTotal from "../components/Sales/views/ShowTotal";
import saleHelper from "../components/Sales/helpers";
import InfoButton from "../components/Sales/views/InfoButton";
import ShowPedido from "../components/Sales/views/ShowPedido";

//Context
import { SaleContext } from "../context/SaleContext";
import { AuthContext } from "../context/AuthContext";

//Hook
import useSales from "../hooks/useSale";

//Helpers
import helpers from "../components/Sales/helpers";

export default function IndexSalesComponent(props) {
  const { auth } = useContext(AuthContext);
  const hookSale = useSales();
  const initialState = {
    id: 0,
    order: 0,
    customer: {
      id: 0,
      name: "venta de mostrador",
      phones: {},
    },
    contact_id: 2,
    items: [],
    session: saleHelper.getSession(),
    discount: 0,
    subtotal: 0,
    total: 0,
    payments: [],
    branch_id: auth.branch.id,
    activitys: [],
    print: false,
    isPayed: false,
    thereNews: false,
    loading: false,
    btnPrintStatus: false,
  };

  const [state, setState] = useState(initialState);
  const validateSale = () => {
    if ((state.id || state.order) && state.thereNews) {
      saveSale();
    } else {
      setState({
        ...state,
        print: true,
      });
    }
  };

  const handleSet = (obj) => {
    return new Promise((done) => {
      setState(obj);
      done();
    });
  };

  const setDataToSend = () => {
    const data = {
      id: state.id,
      contact_id: state.contact_id ? state.contact_id : 2,
      discount: state.discount,
      items: [],
      payments: [],
    };

    if (!state.id) {
      data.session = state.session;
    }

    state.items.forEach((item) =>
      data.items.push({
        id: item.id,
        cant: item.cant,
        price: item.price,
        store_items_id: item.store_items_id,
      })
    );

    if (state.payments.length) {
      state.payments.forEach((payment) => {
        const pay = {
          id: payment.id ? payment.id : 0,
          metodopago: payment.metodopago,
          total: payment.total,
        };

        if (payment.metodopago !== 1) {
          pay.auth = payment.auth;
          if (payment.metodopago !== 4) {
            pay.bank_id = payment.bank_id;
            if(payment.bank_id === 0){
              pay.details = payment.details;
            }
          }
        }

        data.payments.push(pay);
      });
    }
    return data;
  };

  const saveSale = () => {
    window.Swal.fire({
      title: "Ventas",
      text: `¿Realmente quires guardar esta venta?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Solo guardar",
      cancelButtonText: "Imprimir y guardar",
      showLoaderOnConfirm: true,
      showDenyButton: true,
    }).then(({ dismiss }) => {
      if (dismiss) {
        //Guardar e imprimir los cambios
        const returnedSale = hookSale.saveSale(setDataToSend());
        returnedSale.then(({ data }) => {
          if (data) {
            if (state.id && state.order) {
              setState({
                ...state,
                id: data.id,
                thereNews: false,
                print: true,
              });
            } else {
              window.Swal.fire({
                title: "Venta Guardada correctamente",
                text: `¿Quieres imprimir el ticket de la venta?`,
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Imprimir",
                cancelButtonText: "Cancelar",
                showLoaderOnConfirm: true,
              }).then(({ dismiss }) => {
                if (!dismiss) {
                  setState({
                    ...state,
                    id: data.id,
                    thereNews: false,
                    print: true,
                  });
                } else {
                  helpers.confirm("Cerrar la venta actual", () => {
                    setState(initialState);
                  });
                }
              });
            }
          } else {
            console.error("[App] Error al guardar la venta");
            window.Swal.fire({
              title: "Error al guardar la venta",
              icon: "error",
              showCancelButton: false,
              showConfirmButton: false,
              showLoaderOnConfirm: true,
              timer: 3000,
            });
          }
        });
      } else {
        //Solo guardar los cambios
        const returnedSale = hookSale.saveSale(setDataToSend());
        returnedSale.then(({ data }) => {
          if (data) {
            if (state.id && state.order) {
              setState({
                ...state,
                id: data.id,
                thereNews: false,
                //print: true,
              });
            } else {
              window.Swal.fire({
                title: "Venta Guardada correctamente",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                showLoaderOnConfirm: true,
                timer: 3000,
              });
            }
          } else {
            console.error("[App] Error al guardar la venta");
            window.Swal.fire({
              title: "Error al guardar la venta",
              icon: "error",
              showCancelButton: false,
              showConfirmButton: false,
              showLoaderOnConfirm: true,
              timer: 3000,
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    const total = state.items?.reduce(
      (back, item) => item.cant * item.price + back,
      0
    );
    const payments = state.payments?.reduce(
      (back, item) => item.total + back,
      0
    );
    let payed = Boolean(!(total - state.discount - payments));
    let thereNews = state.id ? false : true;

    if (!total && !payments) {
      thereNews = false;
      payed = false;
    } else if (state.thereNews) {
      thereNews = true;
    }

    if (state.thereNews === false && state.load === false) {
      thereNews = true;
    }

    setState({
      ...state,
      isPayed: payed,
      thereNews,
      load: false,
    });
  }, [state.items, state.payments, state.discount]);

  useEffect(() => {
    if (state.isPayed) {
      if (!state.id && !state.order) {
        saveSale();
      }
    }
  }, [state.isPayed]);

  useEffect(() => {
    // const pagado = helpers.getPagado(state.payments) + state.discount;
    // const paid = state.total <= pagado ? true : false;

    console.log("[App] Btn print status:", Boolean(state.items.length));
    setState({
      ...state,
      btnPrintStatus: !state.items.length,
    });
  }, [state.items.length]);

  useEffect(() => {
    if (props.match.params.id) {
      setState({
        ...state,
        loading: true,
      });
      hookSale
        .getSaleById(props.match.params.id)
        .then(({ data }) => {
          if (data) {
            setState({
              ...state,
              id: data.id,
              order: data.order,
              contact_id: data.customer.id,
              items: data.items,
              session: data.session,
              discount: data.discount,
              subtotal: data.subtotal,
              total: data.total,
              payments: data.payments,
              branch_id: data.branch.id,
              created_at: data.created_at,
              activitys: data.activity,
              customer: data.customer,
              thereNews: false,
              loading: false,
            });
          }
        })
        .catch(() => {
          setState({
            ...state,
            loading: false,
          });
        });
    }
  }, []);

  return (
    <SaleContext.Provider value={{ ...state, set: handleSet }}>
      <div className="card border border-gray">
        <div className="card-body pb-2 d-print-none">
          <nav className="row">
            <div className="col">
              <CustomerBtnComponent />
            </div>

            <div className="col">
              <SaleDate></SaleDate>
            </div>

            <div className="col-3">
              <div className="card-tools d-flex justify-content-end mb-3">
                <ShowPedido />

                <ListSalesBtn />

                <DiscountBtnComponent />

                <EraseBtn {...props} />

                <InfoButton />
              </div>
            </div>
          </nav>
          <div
            className="overflow-auto text-right p-0 border border-gray"
            style={{ minHeight: "65vh" }}
          >
            {state.loading ? (
              <div className="d-flex flex-column justify-content-center align-items-center  mt-5">
                <h1>Cargando informacion</h1>
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              <SalesDetailsTableComponent />
            )}
          </div>
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col d-print-none">
              <ShowTotal />
            </div>

            <div className="col d-print-none">
              <ShowToPay />
            </div>

            <div className="col-6 text-right">
              <InputSearchItem />

              <PaymentBtnComponent />

              <button
                className="btn btn-primary ml-3"
                onClick={() => validateSale()}
                disabled={state.btnPrintStatus}
              >
                <i className="fas fa-print mr-2"></i>
                Imprimir
              </button>

              {state.print && (
                <PrintSaleComponent
                  data={{ ...state, order_id: state.order }}
                  setPrint={() => setState({ ...state, print: false })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </SaleContext.Provider>
  );
}
