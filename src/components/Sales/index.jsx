import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//Components
import SearchCustomerModal from "./views/SearchCustomerModal";
import InputSearchItem from "./views/InputSearchItem";
import ListSalesModal from "./views/ListSalesModal";
import PaymentModal from "./views/PaymentModal";
import PaymentDetails from "./views/PaymentDetails";
import UpdateItemModal from "./views/UpdateItemModal";
//Actions
import helpers from "./helpers";
import { saleActions } from "../../redux/sales";

export default function IndexSalesComponent() {
  /*LocalStorage
  const ls = localStorage.getItem("OrusSales"),
    dataDefault = JSON.parse(ls ?? "{}");
    */
  //Store
  const { sales, users } = useSelector((state) => state),
    { sale } = sales,
    { dataLoggin: userMain } = users,
    dispatch = useDispatch();
  const [data, setData] = useState({
    pagado: 0,
    payment: {},
    item: {},
    showSearchCustomer: false,
    showSales: false,
    showPayment: false,
    showPaymentDetails: false,
    showUpdateItem: false,
  });
  const [paid, setPaid] = useState(sale.total <= data.pagado);
  //Functions
  const handleSetCustomer = () => {
      setData({
        ...data,
        showSearchCustomer: true,
      });
    },
    handleCloseShowSearchCustomer = () => {
      setData({
        ...data,
        showSearchCustomer: false,
      });
    },
    handleSelectCustomer = (customer) => {
      setData({
        ...data,
        pagado: 0,
        payment: {},
        showSearchCustomer: false,
      });
      dispatch(
        saleActions.setSale({
          id: 0,
          customer,
          contact_id: customer.id,
          items: [],
          session: getSession(),
          descuento: 0,
          subtotal: 0,
          total: 0,
          pagado: 0,
          payments: [],
          payment: {},
          created_at: null,
        })
      );
    },
    handleAddItem = (result) => {
      const found = sale.items.filter(
        (item) => item.store_items_id === result.store_items_id
      );
      let newItems = sale.items.filter(
        (item) => item.store_items_id !== result.store_items_id
      );

      if (found.length) {
        const cantidad = parseInt(result.cant) + parseInt(found[0].cant),
          item = {
            ...found[0],
            cant: cantidad,
            subtotal: parseFloat(result.price) * cantidad,
            inStorage: cantidad >= parseInt(result.cantInStore) ? true : false,
            out: parseInt(result.cantInStore) - cantidad,
          };
        newItems.push(item);
      } else {
        newItems.push(result);
      }

      //Add to redux
      dispatch(
        saleActions.setSale({
          ...sale,
          items: newItems,
        })
      );
    },
    handleDeleteItem = (item) => {
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
    handleShowListSales = () => {
      setData({
        ...data,
        showSales: true,
      });
    },
    handleCloseListSales = () => {
      setData({
        ...data,
        showSales: false,
      });
    },
    handleSelectSale = (sale) => {
      let abonado = 0;

      sale.payments.forEach((pay) => (abonado = pay.total));

      setData({
        ...data,
        pagado: abonado,
        payment: {},
        showSales: false,
      });
      //Add to redux
      dispatch(
        saleActions.setSale({
          id: sale.id,
          customer: sale.customer,
          contact_id: sale.customer.id,
          items: sale.items,
          session: sale.session,
          descuento: sale.descuento,
          subtotal: sale.subtotal,
          total: sale.total,
          payments: sale.payments,
          created_at: sale.created_at,
        })
      );
    },
    eraseSale = () => {
      dispatch(
        saleActions.setSale({
          id: 0,
          customer: {},
          contact_id: null,
          items: [],
          session: getSession(),
          descuento: 0,
          subtotal: 0,
          total: 0,
          payments: [],
          created_at: null,
        })
      );

      setData({
        pagado: 0,
        showSearchCustomer: false,
        showSales: false,
        showPayment: false,
        showPaymentDetails: false,
      });
    },
    handleEraseSale = () => {
      helpers.confirm("¿Desea eliminar esta venta?", eraseSale);
    },
    handleShowPayment = () => {
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
    handleShowPaymentDetails = (e, payment) => {
      if (e) e.preventDefault();

      setData({
        ...data,
        showPaymentDetails: true,
        payment,
      });
    },
    handleClosePaymentDetails = () => {
      setData({
        ...data,
        showPaymentDetails: false,
        payment: {},
      });
    },
    handleAddDiscount = () => {
      const discount = window.prompt("Agregue el descuento a aplicar"),
        isNumeric = /^[0-9]+$/gms,
        isPercen = /^[0-9]{2,3}%$/gms;

      if (discount.match(isNumeric)) {
        const value = parseInt(discount);
        //Add to redux
        dispatch(
          saleActions.saveSale({
            id: sale.id,
            data: {
              ...sale,
              descuento: value,
              total: sale.total - value,
              items: JSON.stringify(sale.items),
              payments: null,
            },
          })
        );
      } else if (discount.match(isPercen)) {
        const percent = parseInt(discount.replace("%", "")) / 100,
          value = parseInt(sale.total * percent);
        dispatch(
          saleActions.saveSale({
            id: sale.id,
            data: {
              ...sale,
              descuento: value,
              total: sale.total - value,
              items: JSON.stringify(sale.items),
              payments: null,
            },
          })
        );
      }
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
    handleChangePayments = () => {
      setData({
        ...data,
        showPayment: false,
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
    handleCloseUpdateItem = () => {
      setData({
        ...data,
        showUpdateItem: false,
        item: {},
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
      const total = sum - sale.descuento;
      setData({
        ...data,
        pagado,
      });
      dispatch(
        saleActions.setSale({
          ...sale,
          subtotal: sum,
          total,
          pagado,
        })
      );
      setPaid(total <= pagado);
    }

    localStorage.setItem("OrusSales", JSON.stringify(sale.id ? {} : toSave));
    return () => {
      localStorage.setItem("OrusSales", "{}");
    };
    //eslint-disable-next-line
  }, [sale]);

  return (
    <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
      <div className="card-body pb-2">
        <nav className="row mb-2">
          <div className="col-5">
            <i className="fas fa-user mr-1 text-indigo"></i>
            Cliente:
            <label className="text-capitalize ml-1">
              {sale.customer ? sale.customer.nombre : "XXX"}
            </label>
            <button
              type="button"
              className="btn bg-indigo btn-sm ml-2"
              onClick={handleSetCustomer}
            >
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>
          <div className="col">
            <label className="mx-1">Folio:</label>
            <span className="mx-1">{sale.id ? sale.id : "Nuevo"}</span>
            <label className="mx-1">Fecha:</label>
            <span className="mx-1">
              {sale.id ? moment(sale.created_at).format("LL") : "--"}
            </span>
          </div>
          <div className="col">
            <div className="card-tools text-right">
              <button
                className="btn btn-primary mr-1"
                title="Cargar una venta"
                onClick={handleShowListSales}
              >
                <i className="fas fa-list"></i>
              </button>

              <button
                className="btn btn-primary mx-1"
                title="Agregar descuento"
                onClick={handleAddDiscount}
                disabled={!sale.total || paid || sale.payments.length}
              >
                <i className="fas fa-percent"></i>
              </button>

              <button
                className="btn btn-warning ml-1"
                title="Cancelar venta"
                onClick={handleEraseSale}
                disabled={!sale.total}
              >
                <i className="fas fa-ban"></i>
              </button>
            </div>
          </div>
        </nav>
        <div
          className="overflow-auto text-right p-0 border border-gray"
          style={{ height: "27rem" }}
        >
          <table className="table table-striped">
            <tbody>
              {sale.items && sale.items.length ? (
                <>
                  {sale.items.map((item, index) => {
                    const disabled =
                      paid || sale.payments.length || sale.descuento;
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
                              className={
                                item.price ? "mx-1" : "mx-1 text-danger"
                              }
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
                      <span className="ml-1 text-danger">
                        - ${sale.descuento}
                      </span>
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
                                pay.id
                                  ? "text-success"
                                  : "text-warning text-bold"
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
        </div>
        {data.showSearchCustomer && (
          <SearchCustomerModal
            handleClose={handleCloseShowSearchCustomer}
            handleSelect={handleSelectCustomer}
          />
        )}
        {data.showSales && (
          <ListSalesModal
            handleClose={handleCloseListSales}
            handleSelect={handleSelectSale}
          />
        )}
        {data.showPayment && (
          <PaymentModal
            handleClose={handleClosePayment}
            sale={{
              id: sale.id,
              subtotal: sale.subtotal,
              descuento: sale.descuento,
              total: sale.total,
              pagado: data.pagado,
              contact_id: sale.customer.id,
              session: sale.session,
              items: sale.items,
              payments: sale.payments,
            }}
            handelPayments={handleChangePayments}
            total={sale.total - data.pagado}
          />
        )}
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
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            {sale.total ? (
              <>
                <span className="text-lg">Total:</span>
                <label className="text-lg ml-1">${sale.total}</label>
              </>
            ) : null}
          </div>
          <div className="col">
            {sale.total - data.pagado ? (
              <>
                <span className="text-lg">Por pagar:</span>
                <label className="text-lg ml-1">
                  ${sale.total - data.pagado}
                </label>
              </>
            ) : null}
          </div>
          <div className="col-6 text-right">
            <InputSearchItem handleAdd={handleAddItem} session={sale.session} />
            <button
              className="btn btn-success ml-2"
              onClick={handleShowPayment}
              disabled={!sale.items.length || paid}
            >
              <i className="fas fa-money-bill-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSession() {
  return (
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(10)
  );
}
/*
function makeItems(items) {
  const itemToBack = items.map((item) => ({
    ...item,
    cant: item.cantidad,
    out: 0,
    price: item.precio,
  }));

  return itemToBack;
}
*/
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
