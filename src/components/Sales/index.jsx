import { useState } from "react";
//Components
import SearchCustomerModal from "./views/SearchCustomerModal";

export default function BoxSalesComponent({ _setListContacts }) {
  const [data, setData] = useState({
    customer: null,
    showSearchCustomer: false,
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
        showSearchCustomer: false,
      });
    };

  return (
    <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
      <div className="card-body pb-2">
        <nav className="row mb-2">
          <div className="col">
            <i className="fas fa-user mr-1"></i>
            Cliente:{" "}
            <label className="text-capitalize">
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
              <tr>
                <td>
                  <span className="text-muted w-full d-block">Producto 1</span>
                  <label className="w-full d-block">$120.00</label>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-muted w-full d-block">Producto 2</span>
                  <label className="w-full d-block">$75.00</label>
                </td>
              </tr>
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
        <div className="btn-group float-right text-center">
          <input className="form-control" placeholder="Barcode" />
          <button type="button" className="btn btn-primary">
            <i className="fas fa-barcode"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
