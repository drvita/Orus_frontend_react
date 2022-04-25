import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
//Components
import PaymentDetails from "./PaymentDetails";
import UpdateItemModal from "./UpdateItemModal";
//Actions
import helpers from "../helpers";

// Sale Context
import { Sale } from '../../../context/SaleContext';

export default function SalesDetailsTableComponent() {
  const { users } = useSelector((state) => state);
  const sale  = Sale();

  console.log("Componente de tabla", sale);

  console.log("Sale actual", sale);


  const pagado  = sale.descuento === 0 ? helpers.getPagado(sale.payments) : helpers.getPagado(sale.payments) + sale.descuento; 
  const paid = sale.total <= pagado ? true : false;

    const { dataLoggin: userMain } = users,

    [data, setData] = useState({
      showUpdateItem: false,
      showPaymentDetails: false,
      item: {},
      payment: {},
    });

  //Functions
  const handleDeleteItem = (item) => {

      const newItems = sale.items.filter(
        (product) => product.store_items_id !== item.store_items_id
      );
      //addItems(sale, newItems);
      sale.set({
        ...sale,
        items: newItems,
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
        //addDiscount(sale, 0);
        sale.set({
          ...sale,
          descuento: 0
        })
      });
    },


    handleDeletePayment = ({ id, total, metodoname }) => {
      const newPayments = sale.payments.filter(
        (payment) => payment.id !== id
      )

      helpers.confirm(
        `Realmente desea eliminar el pago ${metodoname}, de ${total}`,
        () => {        
          //addPayment(sale, newPayments);
          sale.set({
            ...sale,
            payments:newPayments
          })
        }
      );
    },

    handleShowUpdateItem = (e, item) => {
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
      //addItems(sale, newItems);
      sale.set({
        ...sale,
        items:newItems,
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

  return (
    <>
      <table className="table table-striped">
        <tbody>
          {sale.items && sale.items.length ? (
            <>
              {sale.items.map((item, index) => {
                const disabled =
                  (sale.total && paid) ||
                  sale.payments.length ||
                  sale.descuento;
                if (!item.store_items_id) return null;

                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeleteItem, item, disabled)}
                    <td onClick={(e) => handleShowUpdateItem(null, item)}>
                      <a
                        href="#details"
                        className="text-muted w-full d-block text-uppercase"
                        onClick={(e) => handleShowUpdateItem(e, item)}
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
          {sale.descuento ? (
            <tr>
              {handleDeleteBtn(handleDeleteDiscount, null, paid)}
              <td>
                <span className="text-danger w-full d-block text-uppercase">
                  Descuento
                </span>
                <label className="w-full d-block">
                  <span className="ml-1 text-danger">- ${sale.descuento}</span>
                </label>
              </td>
            </tr>
          ) : null}
          {sale.payments.length ? (
            <>
              {sale.payments.map((pay, index) => {
                const diffPay = moment(Date.now()).diff(
                    moment(pay.created_at),
                    "days"
                  ),
                  disabled = paid && diffPay && userMain.rol;

                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeletePayment, pay, disabled)}
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
          {paid && sale.total ? (
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
