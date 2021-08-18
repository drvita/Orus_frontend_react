import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import PaymentDetails from "./PaymentDetails";
import UpdateItemModal from "./UpdateItemModal";
//Actions
import { saleActions } from "../../../redux/sales";
import helpers from "../helpers";

export default function SalesDetailsTableComponent({ paid }) {
  const { sales, users } = useSelector((state) => state),
    { sale } = sales,
    { dataLoggin: userMain } = users,
    dispatch = useDispatch(),
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
      if (sale.id) {
        dispatch(
          saleActions.saveSale({
            id: sale.id,
            data: {
              ...sale,
              items: JSON.stringify(newItems),
              payments: null,
            },
          })
        );
      } else {
        dispatch(
          saleActions.setSale({
            ...sale,
            items: newItems,
          })
        );
      }
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
        dispatch(
          saleActions.saveSale({
            id: sale.id,
            data: {
              ...sale,
              total: sale.total + sale.descuento,
              descuento: 0,
              items: JSON.stringify(sale.items),
              payments: null,
            },
          })
        );
      });
    },
    handleDeletePayment = ({ id, total, metodoname }) => {
      helpers.confirm(
        `Realmente desea eliminar el pago ${metodoname}, de ${total}`,
        () => {
          dispatch(
            saleActions.deletePayment({
              id,
              sale_id: sale.id,
            })
          );
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

      if (sale.id) {
        dispatch(
          saleActions.saveSale({
            id: sale.id,
            data: {
              ...sale,
              items: JSON.stringify(newItems),
              payments: null,
            },
          })
        );
      } else {
        dispatch(
          saleActions.setSale({
            ...sale,
            items: newItems,
          })
        );
      }

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
                const disabled = paid || sale.payments.length || sale.descuento;
                if (!item.store_items_id) return null;

                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeleteItem, item, disabled)}
                    <td>
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
