import { useEffect, useState, useContext } from "react";
//Components
import InputSearchItem from '../components/Sales/views/InputSearchItem';
import DiscountBtnComponent from "../components/Sales/views/DiscountBtn";
import ListSalesBtn from "../components/Sales/views/ListSalesBtn";
import PrintSaleComponent from "../components/Sales/views/Print_sale";
import PaymentBtnComponent from "../components/Sales/views/PaymentBtn";
import EraseBtn from "../components/Sales/views/EraseSaleBtn";
import CustomerBtnComponent from "../components/Sales/views/CustomerBtn";
import SalesDetailsTableComponent from "../components/Sales/views/SalesDetailsTable";
import SaleDate from "../components/Sales/views/SaleDate";
import ShowToPay from "../components/Sales/views/ShowToPay";
import ShowTotal from "../components/Sales/views/ShowTotal";
import saleHelper from '../components/Sales/helpers';
import InfoButton from "../components/Sales/views/InfoButton";

//Context
import {SaleContext} from '../context/SaleContext';
import { AuthContext } from "../context/AuthContext";

//Hook
import useSales from '../hooks/useSale';


export default function IndexSalesComponent(props) {

  const {auth} = useContext(AuthContext);
  const hookSale = useSales();


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
    activitys: [],
  })


  useEffect(() => {

    return () => {
      console.log("[Orus Systme] Cerrando venta");
      localStorage.setItem("OrusSales", "{}");
    };

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let sum = 0,
      pagado = 0;

    state.items.forEach((item) => (sum += item.subtotal));
    state.payments.forEach((pay) => (pagado += pay.total));

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
            activitys: data.data.activity,
            pagado                                   
          })
        }
      })
    }else{
      setState({
        ...state,
        pagado                                         
      })
    }
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  const handleSet = (obj) => {
    return new Promise(done => {
      setState(obj);
      done();
    });
  }


  return (
    <SaleContext.Provider value={{ ...state, set: handleSet }}>
      <div className="card border border-gray">
        <div className="card-body pb-2 d-print-none">
          <nav className="row">
            <div className="col">
              <CustomerBtnComponent/>
            </div>

            <div className="col">
              <SaleDate></SaleDate>
            </div>

            <div className="col-3">
              <div className="card-tools d-flex justify-content-end mb-3">      

                <ListSalesBtn/>                

                <DiscountBtnComponent/>

                <EraseBtn
                  {...props}
                />

                <InfoButton/>

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
              <ShowTotal/>
            </div>

            <div className="col d-print-none">
              <ShowToPay/>
            </div>

            <div className="col-6 text-right">
              <InputSearchItem/>

              <PaymentBtnComponent/>

              <PrintSaleComponent/>
            </div>
          </div>
        </div>
      </div>
    </SaleContext.Provider>
  );
}
