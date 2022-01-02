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
  const { sales } = useSelector((state) => state),
    { sale, loading } = sales,
    dispatch = useDispatch();
  //Store Local
  const [data, setData] = useState({
    pagado: 0,
  });
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
        // console.log("[DEBUG] Impresion cancelada:", path);
        return false;
      }

      helpers.confirm("Cerrar la venta actual", () => {
        dispatch(
          saleActions.setSale({
            ...DEFAULT_STATE_SALES.sale,
            session: helpers.getSession(),
            created_at: new Date(),
          })
        );
        handleDeleteSale();
      });
    };

  useEffect(() => {
    const toSave = {
      customer: sale.customer,
      items: sale.items,
      session: sale.session,
      descuento: sale.descuento,
      subtotal: sale.subtotal,
      total: sale.total,
      payments: sale.payments,
    };
    let sum = 0,
      pagado = 0;

    sale.items.forEach((item) => (sum += item.subtotal));
    sale.payments.forEach((pay) => (pagado += pay.total));

    if (sum !== sale.subtotal || data.pagado !== pagado) {
      sale.subtotal = sum;
      sale.total = sum - sale.descuento;
      sale.pagado = pagado;
      // console.log("[DEBUG] sale start:", sale);
      if (sale.id) {
        dispatch(saleActions.setSale(sale));
      }

      setData({
        pagado,
      });
    }

    localStorage.setItem("OrusSales", JSON.stringify(sale.id ? {} : toSave));
    window.addEventListener("afterprint", handlePrint);
    //eslint-disable-next-line
  }, [sale]);
  useEffect(() => {
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

  const paid = sale.total <= data.pagado ? true : false;

  return (
    <>
      <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
        <div className="card-body pb-2 d-print-none">
          <nav className="row mb-2">
            <div className="col">
              <CustomerBtnComponent sale={sale} setSale={handleSetSale} />
            </div>
            <div className="col">
              <label className="mx-1">Folio:</label>
              <span className="mx-1">{sale.id ? sale.id : "Nuevo"}</span>
              <label className="mx-1">Fecha:</label>
              <span className="mx-1">
                {moment(sale.created_at).format("L")}
              </span>
              {sale.pedido ? (
                <>
                  <label className="mx-1">Pedido:</label>
                  <span className="mx-1">{sale.pedido}</span>
                </>
              ) : null}
            </div>
            <div className="col-3">
              <div className="card-tools text-right">
                <ListSalesBtn setSale={handleSetSale} />
                <DiscountBtnComponent sale={sale} paid={paid} />
                <EraseBtn
                  sale={sale}
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
            {sale.customer && sale.customer.id && (
              <SalesDetailsTableComponent paid={paid} />
            )}
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col d-print-none">
              {sale.total ? (
                <>
                  <span className="text-lg">Total:</span>
                  <label className="text-lg ml-1">${sale.total}</label>
                </>
              ) : null}
            </div>
            <div className="col d-print-none">
              {!paid && (
                <>
                  <span className="text-lg">Por pagar:</span>
                  <label className="text-lg ml-1">
                    ${sale.total - data.pagado}
                  </label>
                </>
              )}
            </div>
            <div className="col-6 text-right">
              <InputSearchItem sale={sale} />
              <PaymentBtnComponent
                sale={sale}
                paid={paid}
                forPaid={sale.total - data.pagado}
              />
              <PrintSaleComponent
                sale={sale}
                order={sale.pedido}
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
