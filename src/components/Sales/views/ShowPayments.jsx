import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales";
import useSales from "../../../hooks/useSale";


export default function ShowPaymentsComponent({ nota, orderId }) {
  //State         
  const [data, setData] = useState({
    showPayment: false,
    totalPayments: 0,
    toPaid: 0,
  });

  const [mainSale, setMainSale] = useState({})
  const dispatch = useDispatch();
  const hookSale = useSales();

  //Functions

    getSale = (id) => {
      hookSale.getSaleById(id).then((data)=>{
        if(data){
          let venta = data.data[0];
          let totalPayments = 0;
          venta.payments.forEach((pay) => (totalPayments += parseInt(pay.total)));

          setMainSale(venta);

          setData({
            ...data,
            totalPayments,
            toPaid: parseInt(venta.total) - totalPayments,
          });
          
        }else{
          console.error("Error al obtener la venta");
        }
      })
    },



  useEffect(() => {
    getSale(nota.id);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(saleActions.setSale());
    };
    // eslint-disable-next-line
  }, []);

  if (mainSale && mainSale.id) {
    return <p>En espera . . .</p>
  
  } else {
    return (
      <p>En espera . . .</p>
    );
  }
}
