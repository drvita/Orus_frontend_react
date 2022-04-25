import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import InputSearchItem from "./views/InputSearchItem";
import DiscountBtnComponent from "./views/DiscountBtn";
import ListSalesBtn from "./views/ListSalesBtn";
import PrintSaleComponent from "./views/Print_sale";
import PaymentBtnComponent from "./views/PaymentBtn";
import EraseBtn from "./views/EraseSaleBtn";
import CustomerBtnComponent from "./views/CustomerBtn";
import SalesDetailsTableComponent from "./views/SalesDetailsTable";
import SaleDate from "./views/SaleDate";
import ShowToPay from "./views/ShowToPay";
import ShowTotal from "./views/ShowTotal";

//Actions
import { saleActions } from "../../redux/sales";
import { DEFAULT_STATE_SALES } from "../../redux/sales/reducer";
import { defaultActions } from "../../redux/default/";

//Context
import { SaleContext } from "../../context/SaleContext";
import saleHelper from './helpers';


export default function IndexSalesComponent() {

  const { sales } = useSelector((state) => state);
  const { sale, loading } = sales;
  

  const dispatch = useDispatch();

  const [state, setState] = useState({
    id: 0,
    customer: {
      id: 0,
      nombre: "venta de mostrador",
      email: "",
      telefonos: {},
      f_nacimiento: null,
      edad: 0,
    },
    contact_id: 2,
    items: [],
    session: saleHelper.getSession(),
    descuento: 0,
    subtotal: 0,
    total: 0,
    payments: [],
    created_at: new Date(),
  })
  
  const [data, setData] = useState({
    pagado: 0,
  });

 /*  const [ currentSale ] = useState({
    customer: sale.customer,
    items: sale.items,
    session: sale.session,
    descuento: sale.descuento,
    subtotal: sale.subtotal,
    total: sale.total,
    payments: sale.payments,
  });
 */
  useEffect(() => {
    let sum = 0,
      pagado = 0;

      state.items.forEach((item) => (sum += item.subtotal));
      state.payments.forEach((pay) => (pagado += pay.total));

    if (sum !== state.subtotal || data.pagado !== pagado) {
      state.subtotal = sum;
      state.total = sum - state.descuento;
      state.pagado = pagado;
      if (state.id) {
        dispatch(saleActions.setSale(state));
      }

      setData({
        pagado,
      });
    }

  }, []);

  useEffect(() => {
    dispatch(defaultActions.changeNamePage("punto de venta"));

    return () => {
      console.log("[Orus Systme] Cerrando venta");
      dispatch(
        saleActions.setListSales({
          result: DEFAULT_STATE_SALES,
        })
      );
      localStorage.setItem("OrusSales", "{}");
    };

  }, []);

  //Functions
  const handleDeleteSale = () => setData({ pagado: 0 }),
    handleSetSale = (res) => {
      /* setData({
        ...data,
        ...res,
      }); */
    }

  return (
    <SaleContext.Provider value={{ ...state, set: setState }}>
      <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
        <div className="card-body pb-2 d-print-none">
          <nav className="row mb-2">
            <div className="col">
              <CustomerBtnComponent/>
            </div>

            <div className="col">
              <SaleDate></SaleDate>
            </div>

            <div className="col-3">
              <div className="card-tools text-right">      
                <ListSalesBtn setSale={handleSetSale} />

                <DiscountBtnComponent/>

                <EraseBtn/>
              </div>
            </div>
          </nav>
          <div
            className="overflow-auto text-right p-0 border border-gray"
            style={{ height: "27rem" }}
          >
            {state.customer && state.customer.id && (
              <SalesDetailsTableComponent/>
            )}
          </div>
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col d-print-none">
              <ShowTotal></ShowTotal>
            </div>

            <div className="col d-print-none">
              <ShowToPay></ShowToPay>
            </div>

            <div className="col-6 text-right">
              <InputSearchItem/>

              <PaymentBtnComponent/>

              <PrintSaleComponent/>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    </SaleContext.Provider>
  );
}
