import { useEffect, useState, useContext } from "react";

//Custom Hook//
import useContact from "../../../hooks/useContact";

import  { SaleContext }  from "../../../context/SaleContext";

function SearchCustomerModal({
  //Functions
  handleClose: _close,
  handleSelect: _Select,
}) {
  

  const salesContext = useContext(SaleContext);


  const [data, setData] = useState({
    textSearch: "",
  });


  const filters = {
    search: data.textSearch,
    itemsPage: '25',
    orderBy: 'id',
    order:'desc'
  }
  
  const { getListContact, listContact: customers } = useContact();  
  

  //Functions
  const handleClose = () => {
      if (_close) _close();
    },

    handleChangeText = ({ value }) => {
      setData({
        ...data,
        textSearch: value,
      });
    },

    handleKeyPressSearch = (key) => {
      if (key === "Enter" && data.textSearch.length) SearchCustomer();
    },

    SearchCustomer = () => {
      getListContact(filters);
    },

    handleClickCustomer = (e, customer) => {
      salesContext.setCustomer(customer);
      _Select();
    };




  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccione un cliente</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <div className="form-inline mb-3">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Buscar cliente"
                  onChange={({ target }) => handleChangeText(target)}
                  onKeyPress={({ key }) => handleKeyPressSearch(key)}
                  autoFocus={true}
                />
              </div>
              <div className="form-group pl-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={SearchCustomer}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div
              className="table-responsive overflow-auto"
              style={{ height: "12rem" }}
            >
              <table className="table table-sm">
                <tbody>
                  {customers ? (
                    <>
                      {customers.length ? (
                        <>
                          {customers.map((customer) => (
                            <tr key={customer.id}>
                              <td className="text-right">
                                <span className="badge badge-dark">
                                  {customer.id}
                                </span>
                              </td>
                              <td className="text-capitalize text-left">
                                <a
                                  href="#select"
                                  onClick={(e) =>
                                    handleClickCustomer(e, customer)
                                  }
                                >
                                  {customer.nombre}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td>No existen pacientes con esta coincidencia</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <tr>
                      <td>
                        <i className="fas fa-info-circle mr-1"></i> Escriba el
                        nombre del cliente a buscar
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={handleClose}
            >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCustomerModal;