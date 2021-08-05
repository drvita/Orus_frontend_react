import { useEffect, useState } from "react";
//Components
import SearchCustomerModal from "./views/SearchCustomerModal";
import InputSearchItem from "./views/InputSearchItem";
import ListSalesModal from "./views/ListSalesModal";
import PaymentModal from "./views/PaymentModal";
//Actions
import helpers from "./helpers";
//Data
const ls = localStorage.getItem("OrusSales"),
  dataDefault = JSON.parse(ls ?? "{}");

export default function BoxSalesComponent() {
  const [data, setData] = useState({
    customer: dataDefault.customer ?? null,
    items: dataDefault.items ?? [],
    session: dataDefault.session ? dataDefault.session : getSession(),
    descuento: 0,
    subtotal: 0,
    total: 0,
    contact_id: null,
    order_id: 0,
    pagado: 0,
    showSearchCustomer: false,
    showSales: false,
    showPayment: false,
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
        customer,
        contact_id: customer.id,
        showSearchCustomer: false,
        items: [],
        session: getSession(),
        descuento: 0,
        subtotal: 0,
        total: 0,
        order_id: 0,
        pagado: 0,
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
      setData({
        customer: sale.cliente,
        items: makeItems(sale.productos),
        session: sale.session,
        descuento: sale.descuento,
        subtotal: sale.subtotal,
        total: sale.total,
        contact_id: sale.cliente.id,
        order_id: sale.pedido,
        showSales: false,
        pagado: sale.pagado,
      });
    },
    handleEraseSale = () => {
      const toDo = () => {
        setData({
          customer: null,
          showSearchCustomer: false,
          showSales: false,
          items: [],
          session: getSession(),
          descuento: 0,
          subtotal: 0,
          total: 0,
          contact_id: null,
          order_id: 0,
          pagado: 0,
        });
      };
      helpers.confirm("¿Desea eliminar esta venta?", toDo);
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
    };

  useEffect(() => {
    const toSave = {
      customer: data.customer,
      items: data.items,
      session: data.session,
      descuento: data.descuento,
      subtotal: data.subtotal,
      total: data.total,
      contact_id: data.contact_id,
      order_id: data.order_id,
      pagado: data.pagado,
    };
    let sum = 0;

    data.items.forEach((item) => {
      sum += parseFloat(item.subtotal);
    });

    if (sum !== data.subtotal && sum) {
      //console.log("[DEBUG] Effect", sum, data.subtotal);
      const total = sum - data.descuento;
      setData({
        ...data,
        subtotal: sum,
        total,
      });
    }

    localStorage.setItem("OrusSales", JSON.stringify(toSave));
    return () => {
      localStorage.setItem("OrusSales", "{}");
    };
  }, [data]);

  return (
    <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
      <div className="card-body pb-2">
        <nav className="row mb-2">
          <div className="col">
            <i className="fas fa-user mr-1 text-danger"></i>
            Cliente:
            <label className="text-capitalize ml-1">
              {data.customer ? data.customer.nombre : "XXX"}
            </label>
            <button
              type="button"
              className="btn btn-primary btn-sm ml-2"
              onClick={handleSetCustomer}
            >
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>
          <div className="col">
            <div className="card-tools text-right">
              <button
                className="btn btn-default"
                title="Cargar una venta"
                onClick={handleShowListSales}
              >
                <i className="fas fa-shopping-basket"></i>
              </button>

              <button
                className="btn btn-default ml-2"
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
                  {data.items.map((item) => {
                    if (!item.store_items_id) return null;
                    return (
                      <tr key={item.store_items_id}>
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
              {data.pagado ? (
                <tr>
                  <td>
                    <span className="text-success w-full d-block text-uppercase">
                      Abonos
                    </span>
                    <label className="w-full d-block">
                      <span className="ml-1">${data.pagado}</span>
                    </label>
                  </td>
                </tr>
              ) : null}
              {data.total === data.pagado && data.total ? (
                <tr className="table-info">
                  <td>
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
        {data.showPayment && <PaymentModal handleClose={handleClosePayment} />}
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
          <div className="col text-right">
            <InputSearchItem handleAdd={handleAddItem} />
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
