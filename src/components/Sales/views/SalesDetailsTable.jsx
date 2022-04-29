import { useContext,useState } from "react";

//Components
import PaymentDetails from "./PaymentDetails";
import UpdateItemModal from "./UpdateItemModal";

//Helper
import helpers from "../helpers";

//Hook
import useSales from '../../../hooks/useSale';

// Sale Context
import { Sale } from '../../../context/SaleContext';
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";


export default function SalesDetailsTableComponent() {
  const sale  = Sale();
  const _saleHook = useSales();
  const pagado  = sale.discount === 0 ? helpers.getPagado(sale.payments) : helpers.getPagado(sale.payments) + sale.discount; 
  const paid = sale.subtotal <= pagado ? true : false;
  const { auth } = useContext(AuthContext);
  const {rol: userMain, roles} = auth;



   const [data, setData] = useState({
      showUpdateItem: false,
      showPaymentDetails: false,
      item: {},
      payment: {},
    });

    const [disablePayments, setDisabledPayments] = useState(null);

  //Functions
  const handleDeleteItem = (item) => {
      const newItems = sale.items.filter(
        (product) => product.store_items_id !== item.store_items_id
      );

      let subtotal = helpers.getSubTotal(newItems);

      sale.set({
        ...sale,
        items: newItems,
        total: helpers.getTotal(subtotal, sale.discount),
        subtotal:subtotal,
      })
    },

    handleShowPaymentDetails = (e, payment) => {
      if (e) e.preventDefault();

      setData({
        ...data,
        showPaymentDetails: true,
        payment,
      });
    },


    handleDeleteDiscount = () => {
      helpers.confirm("Realmente desea eliminar el descuento", () => {
        sale.set({
          ...sale,
          discount: 0
        })
      });
    },


    handleDeletePayment = ({ id, total, metodoname }) => {
      //TODO: revisar metodoname, viene como undefined
      console.log("DEBUG",id, total, metodoname);
      const newPayments = sale.payments.filter(
        (payment) => payment.id !== id
      )

      helpers.confirm(
        //`Realmente desea eliminar el pago ${metodoname}, de ${total}`,
        `Realmente desea eliminar el pago de  $${total}`,
        () => {        
          sale.set({
            ...sale,
            payments:newPayments
          })
        }
      );
    },

    handleShowUpdateItem = (e, item) => {
      console.log("Funcion ejecutada");
      if (e) e.preventDefault();
      setData({
        ...data,
        showUpdateItem: true,
        item,
      });
    },

    handleClosePaymentDetails = () => {
      setData({
        ...data,
        showPaymentDetails: false,
        payment: {},
      });
    },

    handleUpdateItem = (item) => {
      const newItems = sale.items.filter(
        (i) => i.store_items_id !== item.store_items_id
      );
      newItems.push(item);

      let subtotal = helpers.getSubTotal(newItems);

      sale.set({
        ...sale,
        items:newItems,
        total: helpers.getTotal(subtotal, sale.discount),
        subtotal: subtotal,
      })

      handleCloseUpdateItem();
    },


    handleCloseUpdateItem = () => {
      setData({
        ...data,
        showUpdateItem: false,
        item: {},
      });
    };

     
  const handlePrintShow = () => {
    _saleHook.saveSale(sale);
    window.addEventListener("afterprint", handlePrint);
    window.print();
  };


  const handlePrint = () => {
    const path = window.location.pathname;

    if (path !== "/notas") {
      return false;
    }

    helpers.confirm("Cerrar la venta actual", () => {
      sale.set({
        id: 0,
      customer: {
        id: 0,
        name: "venta de mostrador",
      },
      contact_id: 2,
      items: [],
      session: helpers.getSession(),
      discount: 0,
      subtotal: 0,
      total: 0,
      payments: [],
      })
    });
  };


  return (
    <>
      <table className="table table-striped">
        <tbody>
          {sale.items && sale.items.length ? (
            <>
              {sale.items.map((item, index) => {
                const disabled = (sale.subtotal && paid) || sale.payments.length || sale.discount;
                const diffDay = moment(Date.now()).diff(moment(sale.created_at),"days");
                console.log("DIFERENCIA DE DIAS DE LA VENTA:", diffDay);
                if (!item.store_items_id) return null;
                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeleteItem, item, disabled)}
                    <td onClick={(e) => {
                      if(roles === 'ventas' && diffDay !== 0 ){
                        alert('No puedes editar esta venta!');
                      }else{
                        handleShowUpdateItem(null, item);
                      }
                    }}>
                      <a
                        href="#details"
                        className="text-muted w-full d-block text-uppercase"
                        onClick={(e) => {
                          if(roles === 'ventas'){
                            return null;
                          }else{
                            handleShowUpdateItem(e, item);
                          }
                        }}
                      >
                        {item.producto}
                      </a>
                      <label className="w-full d-block">
                        <span className="badge badge-dark mr-1">
                          {item.cant}
                        </span>
                        *
                        <span
                          className={item.price ? "mx-1" : "mx-1 text-danger"}
                        >
                          ${item.price}
                        </span>
                        =
                        <span
                          className={
                            item.subtotal ? "ml-1" : "ml-1 text-danger"
                          }
                        >
                          ${item.subtotal}
                        </span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}
          {sale.discount ? (
            <tr>
              {handleDeleteBtn(handleDeleteDiscount, null, paid)}
              <td>
                <span className="text-danger w-full d-block text-uppercase">
                  Descuento
                </span>
                <label className="w-full d-block">
                  <span className="ml-1 text-danger">- ${sale.discount}</span>
                </label>
              </td>
            </tr>
          ) : null}
          {sale.payments.length ? (
            <>
              {sale.payments.map((pay, index) => {
                const diffPay = moment(Date.now()).diff(moment(pay.created_at),"days");
                console.log('Diferencia de dias', diffPay);
                console.log(pay.created_at);
                  const disabled = (roles === 'admin') ? false : (roles === 'ventas') ? diffPay === 0 ? false: true : false; 
                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeletePayment, pay, disabled)} 
                    {console.log(pay)}
                    <td>
                      <a
                        href="#link"
                        className=" w-full d-block text-uppercase"
                        onClick={(e) => handleShowPaymentDetails(e, pay)}
                      >
                        <span
                          className={
                            pay.id ? "text-success" : "text-warning text-bold"
                          }
                        >
                          Abono
                        </span>
                        <span className="ml-1 text-muted">
                          {pay.metodoname}
                        </span>
                      </a>
                      <label className="w-full d-block">
                        <span className="ml-1 text-muted">
                          {moment(pay.created_at).format("LL")},
                        </span>
                        <span className="ml-1">${pay.total}</span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}
          {paid && sale.subtotal ? (
            <tr className="table-info">
              <td colSpan="2">
                <span className=" w-full d-block text-uppercase text-center text-bold">
                  <i className="fas fa-info-circle mr-1 text-primary"></i>
                  Cuenta pagada
                </span>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {data.showPaymentDetails && (
        <PaymentDetails
          handleClose={handleClosePaymentDetails}
          payment={data.payment}
        />
      )}
      {data.showUpdateItem && (
        <UpdateItemModal
          item={data.item}
          handleUpdate={handleUpdateItem}
          close={handleCloseUpdateItem}
        />
      )}
    </>
  );
}

function handleDeleteBtn(toDo, data = null, disabled = false) {
  return (
    <td style={{ width: 32 }}>
      <button
        type="button"
        className={disabled ? "btn btn-default disabled" : "btn btn-default"}
        onClick={() => {
          if (toDo) {
            if (data) toDo(data);
            else toDo();
          }
        }}
        disabled={disabled}
      >
        <i className="fas fa-trash text-muted"></i>
      </button>
    </td>
  );
}
