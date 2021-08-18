import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Actions
import { contactActions } from "../../../redux/contact/";

function SearchCustomerModal({
  customers,
  loading,
  //Functions
  _getListContacts,
  _setListContacts,
  handleClose: _close,
  handleSelect: _Select,
}) {
  const [data, setData] = useState({
    list: null,
    textSearch: "",
  });
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
      if (key === "Enter" && data.textSearch.length) searchCustomer();
    },
    searchCustomer = () => {
      if (data.textSearch.length > 2) {
        _getListContacts({
          search: data.textSearch,
          itemsPage: 25,
          orderBy: "id",
          order: "desc",
        });
        setData({
          ...data,
          textSearch: "",
        });
      }
    },
    handleClickCustomer = (e, customer) => {
      e.preventDefault();
      _Select(customer);
      _setListContacts({
        result: {
          list: [],
          metaList: {},
        },
      });
    };

  useEffect(() => {
    setData({
      ...data,
      list: customers,
    });
    // eslint-disable-next-line
  }, [customers]);

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
                  onClick={searchCustomer}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
              {loading && (
                <div className="form-group pl-2">
                  <i className="fas fa-2x fa-spinner fa-spin"></i>
                </div>
              )}
            </div>
            <div
              className="table-responsive overflow-auto"
              style={{ height: "12rem" }}
            >
              <table className="table table-sm">
                <tbody>
                  {data.list ? (
                    <>
                      {data.list.length ? (
                        <>
                          {data.list.map((customer) => (
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

const mapStateToProps = ({ contact }) => {
    return {
      loading: contact.loading,
      customers: contact.list,
      meta: contact.metaList,
    };
  },
  mapActionsToProps = {
    _getListContacts: contactActions.getListContacts,
    _setListContacts: contactActions.setListContact,
  };

export default connect(mapStateToProps, mapActionsToProps)(SearchCustomerModal);
