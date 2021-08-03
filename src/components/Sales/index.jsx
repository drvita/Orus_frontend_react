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
  });
  let total = 0;
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
        showSearchCustomer: false,
      });
    },
    handleAddItem = (result) => {
      const found = data.items.filter(
        (item) => item.item.id === result.item.id
      );
      let newItems = data.items.filter(
        (item) => item.item.id !== result.item.id
      );

      if (found.length) {
        newItems.push({
          ...found,
          cant: result.cant + found.cant,
        });
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
    };
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
        </nav>
        <div
          className="overflow-auto text-right p-0 border border-gray"
          style={{ height: "27rem" }}
        >
          <table className="table table-striped">
            <tbody>
              {data.items.map((item) => {
                const sum = parseInt(item.cant) * parseInt(item.item.precio);
                total += sum;

                return (
                  <tr key={item.item.id}>
                    <td>
                      <span className="text-muted w-full d-block text-uppercase">
                        {item.item.producto}
                      </span>
                      <label className="w-full d-block">
                        <span className="badge badge-dark mr-1">
                          {item.cant}
                        </span>
                        *<span className="mx-1">${item.item.precio}</span>=
                        <span className="ml-1">${sum}</span>
                      </label>
                    </td>
                  </tr>
                );
              })}
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
        <label className="text-lg">Total: ${total}</label>
        <InputSearchItem handleAdd={handleAddItem} />
      </div>
    </div>
  );
}
