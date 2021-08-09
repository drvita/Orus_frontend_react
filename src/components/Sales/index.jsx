import { useEffect, useState } from "react";
//Components
import SearchCustomerModal from "./views/SearchCustomerModal";
import InputSearchItem from "./views/InputSearchItem";
import ListSalesModal from "./views/ListSalesModal";
import PaymentModal from "./views/PaymentModal";
import PaymentDetails from "./views/PaymentDetails";
//Actions
import helpers from "./helpers";
import moment from "moment";

export default function IndexSalesComponent() {
  //LocalStorage
  const ls = localStorage.getItem("OrusSales"),
    dataDefault = JSON.parse(ls ?? "{}");
  //Store
  const [data, setData] = useState({
    id: 0,
    customer: dataDefault.customer ?? null,
    items: dataDefault.items ?? [],
    session: dataDefault.session ? dataDefault.session : getSession(),
    descuento: 0,
    subtotal: 0,
    total: 0,
    order_id: 0,
    pagado: 0,
    payments: [],
    payment: {},
    created_at: null,
    showSearchCustomer: false,
    showSales: false,
    showPayment: false,
    showPaymentDetails: false,
  });
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
        id: 0,
        customer,
        items: [],
        session: getSession(),
        descuento: 0,
        subtotal: 0,
        total: 0,
        order_id: 0,
        pagado: 0,
        payments: [],
        payment: {},
        created_at: null,
        showSearchCustomer: false,
      });
    },
    handleAddItem = (result) => {
      const found = data.items.filter(
        (item) => item.store_items_id === result.store_items_id
      );
      let newItems = data.items.filter(
        (item) => item.store_items_id !== result.store_items_id
      );

      if (found.length) {
        const cantidad = parseInt(result.cant) + parseInt(found[0].cant),
          item = {
            ...found[0],
            cant: cantidad,
            subtotal: parseFloat(result.price) * cantidad,
            inStorage: cantidad >= parseInt(result.cantInStore) ? true : false,
            out: parseInt(data.cantInStore) - cantidad,
          };
        newItems.push(item);
      } else {
        newItems.push(result);
      }

      setData({
        ...data,
        items: newItems,
      });
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
        id: sale.id,
        customer: sale.cliente,
        items: makeItems(sale.productos),
        session: sale.session,
        descuento: sale.descuento,
        subtotal: sale.subtotal,
        total: sale.total,
        order_id: sale.pedido,
        payments: sale.payments,
        pagado: abonado,
        payment: {},
        created_at: sale.created_at,
        showSales: false,
      });
    },
    eraseSale = () => {
      setData({
        ...data,
        id: 0,
        customer: null,
        items: [],
        session: getSession(),
        descuento: 0,
        subtotal: 0,
        total: 0,
        order_id: 0,
        payments: [],
        payment: {},
        pagado: 0,
        created_at: null,
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
    handleDeleteItem = (item) => {
      const newItems = data.items.filter(
        (product) => product.store_items_id !== item.store_items_id
      );

      setData({
        ...data,
        items: newItems,
      });

      console.log("[DEBUG] Items", newItems, item);
    };

  useEffect(() => {
    const toSave = {
      customer: data.customer,
      items: data.items,
      session: data.session,
      descuento: data.descuento,
      subtotal: data.subtotal,
      total: data.total,
      order_id: data.order_id,
      payments: data.payments,
    };
    let sum = 0,
      pagado = 0;

    data.items.forEach((item) => (sum += item.subtotal));
    data.payments.forEach((pay) => (pagado += pay.total));

    if (sum !== data.subtotal && sum) {
      //console.log("[DEBUG] Effect", sum, data.subtotal);
      const total = sum - data.descuento;
      setData({
        ...data,
        subtotal: sum,
        total,
        pagado,
      });
    }

    localStorage.setItem("OrusSales", JSON.stringify(data.id ? {} : toSave));
    return () => {
      localStorage.setItem("OrusSales", "{}");
    };
  }, [data]);

  return (
    <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
      <div className="card-body pb-2">
        <nav className="row mb-2">
          <div className="col">
            <i className="fas fa-user mr-1 text-indigo"></i>
            Cliente:
            <label className="text-capitalize ml-1">
              {data.customer ? data.customer.nombre : "XXX"}
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
            <span className="mx-1">{data.id ? data.id : "Nuevo"}</span>
            <label className="mx-1">Fecha:</label>
            <span className="mx-1">
              {data.id ? moment(data.created_at).format("LL") : "--"}
            </span>
          </div>
          <div className="col">
            <div className="card-tools text-right">
              <button
                className="btn btn-primary"
                title="Cargar una venta"
                onClick={handleShowListSales}
              >
                <i className="fas fa-list"></i>
              </button>

              <button
                className="btn btn-warning ml-2"
                title="Cancelar venta"
                onClick={handleEraseSale}
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
              {data.items.length ? (
                <>
                  {data.items.map((item, index) => {
                    if (!item.store_items_id) return null;
                    return (
                      <tr key={index}>
                        {handleDeleteBtn(handleDeleteItem, item)}
                        <td>
                          <span className="text-muted w-full d-block text-uppercase">
                            {item.producto}
                          </span>
                          <label className="w-full d-block">
                            <span className="badge badge-dark mr-1">
                              {item.cant}
                            </span>
                            *<span className="mx-1">${item.price}</span>=
                            <span className="ml-1">${item.subtotal}</span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
              {data.descuento ? (
                <tr>
                  {handleDeleteBtn()}
                  <td>
                    <span className="text-danger w-full d-block text-uppercase">
                      Descuento
                    </span>
                    <label className="w-full d-block">
                      <span className="ml-1">${data.descuento}</span>
                    </label>
                  </td>
                </tr>
              ) : null}
              {data.payments.length ? (
                <>
                  {data.payments.map((pay) => (
                    <tr key={pay.id}>
                      {handleDeleteBtn()}
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
                  ))}
                </>
              ) : null}
              {data.total === data.pagado && data.total ? (
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
              id: data.id,
              subtotal: data.subtotal,
              descuento: data.descuento,
              total: data.total,
              pagado: data.pagado,
              contact_id: data.customer.id,
              order_id: data.order_id,
              session: data.session,
              payments: data.payments,
            }}
            total={data.total - data.pagado}
          />
        )}
        {data.showPaymentDetails && (
          <PaymentDetails
            handleClose={handleClosePaymentDetails}
            payment={data.payment}
          />
        )}
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <span className="text-lg">Total:</span>
            <label className="text-lg ml-1">${data.total}</label>
          </div>
          <div className="col">
            <span className="text-lg">Por pagar:</span>
            <label className="text-lg ml-1">${data.total - data.pagado}</label>
          </div>
          <div className="col-6 text-right">
            <InputSearchItem handleAdd={handleAddItem} session={data.session} />
            <button
              className="btn btn-success ml-2"
              onClick={handleShowPayment}
              disabled={!data.items.length || data.total === data.pagado}
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
function makeItems(items) {
  const itemToBack = items.map((item) => ({
    ...item,
    cant: item.cantidad,
    out: 0,
    price: item.precio,
  }));

  return itemToBack;
}
function handleDeleteBtn(toDo, data = null) {
  return (
    <td style={{ width: 32 }}>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => {
          if (toDo) {
            if (data) toDo(data);
            else toDo();
          }
        }}
      >
        <i className="fas fa-trash text-muted"></i>
      </button>
    </td>
  );
}
