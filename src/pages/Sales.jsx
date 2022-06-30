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
  };

  const [state, setState] = useState(initialState);

  const pagado = helpers.getPagado(state.payments) + state.discount;
  const paid = state.total <= pagado ? true : false;
  const disabled = state.order
    ? false
    : !paid || !state.items.length
    ? true
    : false;

  const handleSet = (obj) => {
    return new Promise((done) => {
      setState(obj);
      done();
    });
  };
  const saveSale = () => {
    if (state.id && state.order) {
      const returnedSale = hookSale.saveSale(state);
      returnedSale.then((data) => {
        if (data.data) {
          setState({
            ...state,
            id: data.data.id,
            thereNews: false,
          });
        }
      });
      return null;
    }

    const returnedSale = hookSale.saveSale(state);
    returnedSale.then((data) => {
      if (data.data) {
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
            //Change print state and set ID returned
            setState({
              ...state,
              id: data.data.id,
              print: true,
            });
          } else {
            helpers.confirm("Cerrar la venta actual", () => {
              setState(initialState);
            });
          }
        });
      } else {
        console.error("Error al guardar la venta");
      }
    });
  };
  const validateSale = () => {
    if (state.id && state.order && state.thereNews) {
      saveSale();
    }

    setState({ ...state, print: true });
  };

  useEffect(() => {
    const total = state.items?.reduce((back, item) => item.price + back, 0);
    const payments = state.payments?.reduce(
      (back, item) => item.total + back,
      0
    );
    let payed = Boolean(!(total - state.discount - payments));
    let thereNews = state.id ? false : true;

    if (!total && !payments) {
      thereNews = false;
      payed = false;
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
        //Guarda venta normal
        saveSale();
      }
    }
  }, [state.isPayed]);

  useEffect(() => {
    if (props.match.params.id) {
      hookSale.getSaleById(props.match.params.id).then((data) => {
        if (data) {
          setState({
            ...state,
            id: data.data.id,
            order: data.data.order,
            contact_id: data.data.customer.id,
            items: data.data.items,
            session: data.data.session,
            discount: data.data.discount,
            subtotal: data.data.subtotal,
            total: data.data.total,
            payments: data.data.payments,
            branch_id: data.data.branch.id,
            created_at: data.data.created_at,
            activitys: data.data.activity,
            customer: data.data.customer,
            thereNews: false,
          });
        }
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
            <SalesDetailsTableComponent />
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
                disabled={disabled}
              >
                <i className="fas fa-print mr-2"></i>
                Imprimir
              </button>

              {state.print && (
                <PrintSaleComponent
                  data={state}
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
