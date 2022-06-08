import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
import {AuthContext} from '../../context/AuthContext';

//Context
import { SaleContext } from "../../context/SaleContext";
import saleHelper from './helpers';
import useSales from "../../hooks/useSale";

//Actions
import { defaultActions } from "../../redux/default/";

export default function IndexSalesComponent(props) {

  const {auth} = useContext(AuthContext);
  const { sales } = useSelector((state) => state);
  const { loading } = sales;
  const hookSale = useSales();

  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    id: 0,
    customer: {
      id: 0,
      name: "venta de mostrador",
    },
    contact_id: 2,
    items: [],
    session: saleHelper.getSession(),
    discount: 0,
    subtotal: 0,
    total: 0,
    payments: [],
    branch_id: auth.branch.id,
  })
  
  const [data, setData] = useState({
    pagado: 0,
  });



  useEffect(() => {
    let sum = 0,
      pagado = 0;
      state.items.forEach((item) => (sum += item.subtotal));
      state.payments.forEach((pay) => (pagado += pay.total));
    if (sum !== state.subtotal || data.pagado !== pagado) {
      state.subtotal = sum;
      state.total = sum - state.discount;
      state.pagado = pagado;

      setData({
        pagado,
      });
    }

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    dispatch(defaultActions.changeNamePage("punto de venta"));

    return () => {
      console.log("[Orus Systme] Cerrando venta");
      localStorage.setItem("OrusSales", "{}");
    };

  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  useEffect(()=>{
    if(props.match.params.id){
      hookSale.getSaleById(props.match.params.id).then((data)=>{
        if(data){
          setState({
            ...state,
            id: data.data.id,
            contact_id: data.data.customer.id,
            items: data.data.items,
            session: data.data.session,
            discount: data.data.discount,    
            subtotal: data.data.subtotal,
            total: data.data.total,
            payments: data.data.payments, 
            branch_id:data.data.branch.id,
            created_at: data.data.created_at,                                           
          })
        }
      })
    }else{
      return null;
    }
  },[]);


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
                <ListSalesBtn/>

                <DiscountBtnComponent/>

                <EraseBtn
                  {...props}
                />
              </div>
            </div>
          </nav>
          <div
            className="overflow-auto text-right p-0 border border-gray"
            style={{ height: "27rem" }}
          >
            <SalesDetailsTableComponent/>
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
