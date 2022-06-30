import { useContext, useState } from "react";

//Components
import PaymentDetails from "./PaymentDetails";
import UpdateItemModal from "./UpdateItemModal";

// Context
import { Sale } from "../../../context/SaleContext";
import { AuthContext } from "../../../context/AuthContext";

//Helper
import helpers from "../helpers";

//Libraries
import moment from "moment";

export default function SalesDetailsTableComponent() {
  const sale = Sale();
  const pagado = !sale.discount
    ? helpers.getPagado(sale.payments)
    : helpers.getPagado(sale.payments) + sale.discount;
  const paid = sale.subtotal <= pagado ? true : false;
  const { auth } = useContext(AuthContext);
  const { roles } = auth;

  const [data, setData] = useState({
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

      let subtotal = helpers.getSubTotal(newItems);

      sale.set({
        ...sale,
        items: newItems,
        total: helpers.getTotal(subtotal, sale.discount),
        subtotal: subtotal,
      });
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
          discount: 0,
        });
      });
    },
    handleDeletePayment = ({ id, total, metodoname }) => {
      const newPayments = sale.payments.filter((payment) => payment.id !== id);

      helpers.confirm(`Realmente desea eliminar el pago de  $${total}`, () => {
        sale.set({
          ...sale,
          payments: newPayments,
        });
      });
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

      let subtotal = helpers.getSubTotal(newItems);

      sale.set({
        ...sale,
        items: newItems,
        total: helpers.getTotal(subtotal, sale.discount),
        subtotal: subtotal,
      });

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
                  (sale.subtotal && paid) ||
                  sale.payments.length ||
                  sale.discount;
                const diffDay = moment(Date.now()).diff(
                  moment(sale.created_at),
                  "days"
                );
                if (!item.store_items_id) return null;
                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeleteItem, item, disabled)}
                    <td
                      onClick={(e) => {
                        if (roles === "ventas" && diffDay !== 0) {
                          alert("No puedes editar esta venta!");
                        } else {
                          handleShowUpdateItem(null, item);
                        }
                      }}
                    >
                      <a
                        href="#details"
                        className="text-muted w-full d-block text-uppercase"
                        onClick={(e) => {
                          if (roles === "ventas") {
                            return null;
                          } else {
                            handleShowUpdateItem(e, item);
                          }
                        }}
                      >
                        {item.producto ? item.producto : item.name}
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
                const disabled =
                  sale.id && !sale.order
                    ? true
                    : sale.id && sale.order
                    ? sale.isPayed
                      ? true
                      : false
                    : false;

                return (
                  <tr key={index}>
                    {handleDeleteBtn(handleDeletePayment, pay, disabled)}
                    <td>
                      <a
                        href="#link"
                        className=" w-full d-block text-uppercase"
                        onClick={(e) => handleShowPaymentDetails(e, pay)}
                      >
                        <span className="text-success">Abono</span>
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

          {Boolean(sale.thereNews && sale.payments?.length) ? (
            <tr className="table-info">
              <td colSpan="2">
                <span className=" w-full d-block text-uppercase text-center text-bold">
                  <i className="fas fa-info-circle mr-1 text-primary"></i>
                  Para guardar los cambios presione el boton ¡Imprimir!
                </span>
              </td>
            </tr>
          ) : (
            Boolean(paid && sale.subtotal) && (
              <tr className="table-info">
                <td colSpan="2">
                  <span className=" w-full d-block text-uppercase text-center text-bold">
                    <i className="fas fa-info-circle mr-1 text-primary"></i>
                    Cuenta pagada
                  </span>
                </td>
              </tr>
            )
          )}
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
