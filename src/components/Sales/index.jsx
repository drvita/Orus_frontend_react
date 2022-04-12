import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";


//Components
import InputSearchItem from "./views/InputSearchItem";
import DiscountBtnComponent from "./views/DiscountBtn";
import ListSalesBtn from "./views/ListSalesBtn";
import PrintSaleComponent from "./views/Print_sale";
import PaymentBtnComponent from "./views/PaymentBtn";
import EraseBtn from "./views/EraseSaleBtn";
import CustomerBtnComponent from "./views/CustomerBtn";
import SalesDetailsTableComponent from "./views/SalesDetailsTable";


//Actions
import { saleActions } from "../../redux/sales";
import helpers from "./helpers";
import { DEFAULT_STATE_SALES } from "../../redux/sales/reducer";
import { defaultActions } from "../../redux/default/";

export default function IndexSalesComponent() {

  //Store Redux
  const { sales } = useSelector((state) => state);
  const { sale, loading } = sales;
  const dispatch = useDispatch();

  //Cargar alguna venta del hook(pendiente)


  //Store Local
  const [data, setData] = useState({
    pagado: 0,
  });

  const [currentSale, setCurrentSale] = useState({
    customer: sale.customer,
    items: sale.items,
    session: sale.session,
    descuento: sale.descuento,
    subtotal: sale.subtotal,
    total: sale.total,
    payments: sale.payments,
  });


  useEffect(() => {

    let sum = 0,
      pagado = 0;

    currentSale.items.forEach((item) => (sum += item.subtotal));
    currentSale.payments.forEach((pay) => (pagado += pay.total));

    if (sum !== currentSale.subtotal || data.pagado !== pagado) {
      currentSale.subtotal = sum;
      currentSale.total = sum - currentSale.descuento;
      currentSale.pagado = pagado;
      if (currentSale.id) {
        dispatch(saleActions.setSale(currentSale));
      }

      setData({
        pagado,
      });
    }

    window.addEventListener("afterprint", handlePrint);
  }, [currentSale]);

  useEffect(() => {
    console.log("SALES COMPONENT RENDERIZADO");
    dispatch(defaultActions.changeNamePage("punto de venta"));

    return () => {
      console.log("[Orus Systme] Cerrando venta");
      window.removeEventListener("afterprint", handlePrint);
      dispatch(
        saleActions.setListSales({
          result: DEFAULT_STATE_SALES,
        })
      );
      localStorage.setItem("OrusSales", "{}");
    };
    //eslint-disable-next-line
  }, []);


  console.log("REDUX SALE", currentSale);


  //Functions

  const handleDeleteSale = () => setData({ pagado: 0 }),


    handleSetSale = (res) => {
      setData({
        ...data,
        ...res,
      });
    },


    handlePrint = () => {
      const path = window.location.pathname;

      if (path !== "/notas") {
        return false;
      }

      helpers.confirm("Cerrar la venta actual", () => {
        dispatch(
          saleActions.setSale({
            ...DEFAULT_STATE_SALES.currentSale,
            session: helpers.getSession(),
            created_at: new Date(),
          })
        );
        handleDeleteSale();
      });
    };

  const paid = currentSale.total <= data.pagado ? true : false;

  const btnDisabled =
  currentSale.total - data.pagado > 0 && currentSale.descuento === 0 && data.pagado === 0 ? false : true;

  return (
    <>
      <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
        <div className="card-body pb-2 d-print-none">
          <nav className="row mb-2">
            <div className="col">
              <CustomerBtnComponent sale={currentSale} setSale={handleSetSale} />
            </div>
            <div className="col">
              <label className="mx-1">Folio:</label>
              <span className="mx-1">{currentSale.id ? currentSale.id : "Nuevo"}</span>
              <label className="mx-1">Fecha:</label>
              <span className="mx-1">
                {moment(currentSale.created_at).format("L")}
              </span>
              {currentSale.pedido ? (
                <>
                  <label className="mx-1">Pedido:</label>
                  <span className="mx-1">{currentSale.pedido}</span>
                </>
              ) : null}
            </div>

            <div className="col-3">
              <div className="card-tools text-right">
                <ListSalesBtn setSale={handleSetSale} />
                  {/* TODO: verificar validacion */}
                <DiscountBtnComponent
                  sale={currentSale}
                  paid={paid}
                  btnDisabled={btnDisabled}
                />
                <EraseBtn
                  sale={currentSale}
                  defaultState={DEFAULT_STATE_SALES}
                  erase={handleDeleteSale}
                />
              </div>
            </div>
          </nav>
          <div
            className="overflow-auto text-right p-0 border border-gray"
            style={{ height: "27rem" }}
          >
            {currentSale.customer && currentSale.customer.id && (
              <SalesDetailsTableComponent paid={paid} />
            )}
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col d-print-none">
              {currentSale.total ? (
                <>
                  <span className="text-lg">Total:</span>
                  <label className="text-lg ml-1">${currentSale.total}</label>
                </>
              ) : null}
            </div>

            <div className="col d-print-none">
              {!paid && (
                <>
                  <span className="text-lg">Por pagar:</span>
                  <label className="text-lg ml-1">
                    ${currentSale.total - data.pagado}
                  </label>
                </>
              )}
            </div>

            <div className="col-6 text-right">
              <InputSearchItem sale={currentSale} />
              <PaymentBtnComponent
              //TODO: verificar validacion//
                sale={sale}
                paid={paid}
                forPaid={currentSale.total - data.pagado}
              />
              <PrintSaleComponent
                sale={currentSale}
                order={currentSale.pedido}
                payed={data.pagado}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    </>
  );
}
