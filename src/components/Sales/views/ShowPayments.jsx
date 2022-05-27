import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleActions } from "../../../redux/sales";
import PaymentModal from "./PaymentModal";
import helpers from "../helpers";
import PrintSaleComponent from "./Print_sale";
import useSales from "../../../hooks/useSale";

import { SaleContext } from "../../../context/SaleContext";


export default function ShowPaymentsComponent({ nota, orderId }) {

  //TODO: Crear un context de venta para la venta en este componente
  //Los hijos de este componente modifican la venta de esta componentes


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
  const handleShowPayment = () => {
      setData({
        ...data,
        showPayment: true,
      });
    },

    handleClosePayment = () => {
      setData({
        ...data,
        showPayment: false,
      });
    },


    getSale = (id) => {
      hookSale.getSaleById(id).then((data)=>{
        if(data){
          let venta = data.data[0];
          let totalPayments = 0;
          console.log(venta);
          venta.payments.forEach((pay) => (totalPayments += parseInt(pay.total)));

          setMainSale(venta);
          //TODO: 

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

    handleDeletePayment = ({ id, total, metodoname }) => {
     /*  helpers.confirm(
        `Realmente desea eliminar el pago ${metodoname}, de ${total}`,
        () => {
          dispatch(
            saleActions.deletePayment({
              id,
              sale_id: sale.id,
            })
          );
        }
      ); */
    };

  useEffect(() => {
    getSale(nota.id);
    /* if (mainSale & mainSale.id) {
      let totalPayments = 0;
      mainSale.payments.forEach((pay) => (totalPayments += parseInt(pay.total)));
      setData({
        ...data,
        totalPayments,
        toPaid: parseInt(mainSale.total) - totalPayments,
      });

    } else {
      getSale(nota.id);
    } */
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      dispatch(saleActions.setSale());
    };
    // eslint-disable-next-line
  }, []);

  if (mainSale && mainSale.id) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row d-print-none">
            <div className="col">
              <label>Nota:</label> {mainSale.id}
            </div>
            <div className="col">
              <label>Total:</label> ${mainSale.subtotal}
            </div>
            <div className="col">
              <label>Abonado:</label> ${data.totalPayments}
            </div>
            <div className="col">
              <label>Por pagar:</label>{" "}
              <span className="text-success text-bold">
                ${data.toPaid >= 0 ? data.toPaid : 0}
              </span>
            </div>
          </div>

          <div className="row d-print-none">
            <div className="col table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Metodo</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Recibio</th>
                    <th style={{ width: 16 }}>
                      <span className="sr-only">DELETE</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mainSale.payments.map((pay) => (
                    <tr key={pay.id}>
                      <th>{pay.id}</th>
                      <td className="text-uppercase">{pay.metodoname}</td>
                      <td>${pay.total}</td>
                      <td>{pay.created_at}</td>
                      <td>{pay.created.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={() => handleDeletePayment(pay)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col text-right">
              <div className="btn-group">
                <PrintSaleComponent
                  sale = {mainSale}
                  order={orderId}
                  payed={data.totalPayments}
                  text="Imprimir"
                  btn="default"
                />
                <button
                  type="button"
                  className="btn btn-primary d-print-none"
                  disabled={!data.toPaid}
                  onClick={handleShowPayment}
                >
                  <i className="fas fa-plus mr-1" />
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {data.showPayment && (
            <PaymentModal
              handleClose={handleClosePayment}
              saleSend={{
                ...mainSale,
                contact_id: mainSale.customer.id,
              }}
              forPaid={data.toPaid}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <span className="d-block text-center text-dark my-4">
        <i className="fas fa-info-circle mr-1"></i>
        Sin datos de ventas
      </span>
    );
  }
}
