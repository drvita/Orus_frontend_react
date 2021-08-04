import { useEffect, useState } from "react";
//Components
import SearchCustomerModal from "./views/SearchCustomerModal";
import InputSearchItem from "./views/InputSearchItem";
//Data
const ls = localStorage.getItem("OrusSales"),
  dataDefault = JSON.parse(ls ?? "{}");

export default function BoxSalesComponent() {
  const [data, setData] = useState({
    customer: dataDefault.customer ?? null,
    showSearchCustomer: false,
    items: dataDefault.items ?? [],
    session: dataDefault.session ? dataDefault.session : getSession(),
    descuento: 0,
    subtotal: 0,
    total: 0,
    contact_id: null,
    order_id: 0,
    status: 0,
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
    };

  useEffect(() => {
    const toSave = {
      customer: data.customer,
      items: data.items,
      session: data.session,
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
            <i className="fas fa-user mr-1"></i>
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
          <div className="col">{data.session}</div>
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
            </tbody>
          </table>
        </div>
        {data.showSearchCustomer && (
          <SearchCustomerModal
            handleClose={handleCloseShowSearchCustomer}
            handleSelect={handleSelectCustomer}
          />
        )}
      </div>
      <div className="card-footer">
        <label className="text-lg">Total: ${data.total}</label>
        <InputSearchItem handleAdd={handleAddItem} />
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
