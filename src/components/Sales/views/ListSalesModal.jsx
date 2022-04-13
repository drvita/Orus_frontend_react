import moment from "moment";
import { useEffect, useState } from "react";
import useSales from "../../../hooks/useSale";

function ListSalesModal({ handleClose: _close, handleSelect: _select }) {
  
  const [search, setSearch] = useState("");

  const { getSaleList, getSaleById, saleList,  sale } = useSales();

  const items = saleList.length !== 0 ? saleList : sale.length !== 0 ? sale : [] 

  const handleSelectSale = (e, sale) => {
      if (e) e.preventDefault();
      _select(sale);
    },

    handleChangeSearch = ({ value }) => {
      setSearch(value);
    },
    
    handleSearchEnter = (key) => {
      if (key === "Enter") {
        searchInDB(search);
      }
    },

    searchInDB = (search = "") => {
      if(search.length === 0){
        getSaleById(search);

      }else{
        getSaleById(search);
      }
    };

  useEffect(() => {
    getSaleList();
  }, [search]);

  return (
    <div className="modal d-block" tabIndex="-1">
      {console.log("ITEMS STATE",)}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccione una venta</h5>
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <div className="w-full d-block mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por folio o nombre"
                  onChange={({ target }) => handleChangeSearch(target)}
                  onKeyPress={({ key }) => handleSearchEnter(key)}
                />
                <button
                  type="button"
                  className="btn btn-default ml-1"
                  onClick={() => handleSearchEnter("Enter")}
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
                  {items ? (
                    <>
                      {items.length ? (
                        <>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td className="text-right">
                                <span className="badge badge-dark">
                                  {item.id}
                                </span>
                              </td>
                              <td className="text-capitalize text-left">
                                <a
                                  href="#select"
                                  onClick={(e) => handleSelectSale(e, item)}
                                >
                                  {item.customer ? item.customer.nombre : "--"}
                                </a>
                              </td>
                              <td className="text-right">
                                {moment(item.created_at).fromNow()}
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td>No existen ventas para esta coincidencia</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <tr>
                      <td>
                        <i className="fas fa-info-circle mr-1"></i> Escriba el
                        folio o nombre para cargar una venta
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
              onClick={() => _close()}
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

export default ListSalesModal;
