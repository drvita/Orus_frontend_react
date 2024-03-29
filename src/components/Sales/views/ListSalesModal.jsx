import { useEffect, useState } from "react";

//Context
import { Sale } from "../../../context/SaleContext";

//Hooks
import useSales from "../../../hooks/useSale";

//Libraries
import moment from "moment";

function ListSalesModal({ handleClose: _close, handleSelect: _select }) {
  const _sales = useSales();

  const [search, setSearch] = useState("");

  const [saleList, setSaleList] = useState([]);

  const sale = Sale();

  const items =
    saleList.length !== 0 ? saleList : sale.length !== 0 ? sale : [];

  const handleSelectSale = (e, saleSelected) => {
      if (e) e.preventDefault();

      if (sale.items.length) {
        window.Swal.fire({
          title: "Ventas",
          text: `Si cargas una venta, se cerrará la venta actual`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Cargar",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        }).then(({ dismiss }) => {
          if (!dismiss) {
            _select(saleSelected);
          } else {
            return null;
          }
        });
      } else {
        _select(saleSelected);
      }
    },
    handleChangeSearch = ({ value }) => {
      setSearch(value);
    };

  useEffect(() => {
    _sales
      .getSaleList(search)
      .then((data) => {
        if (data) {          
          setSaleList(data.data);
        } else {
          console.error("Error al obtener las ventas");
        }
      })
      .catch((error) => console.error(error));
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="modal d-block" tabIndex="-1">
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
                />
                <button
                  type="button"
                  className="btn btn-default ml-1"                  
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
                                  {item.customer ? item.customer.name : "--"}
                                </a>
                              </td>
                              <td className="text-right">
                                {moment(item.created_at).fromNow()}
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr className="overlay dark">
                          <td className="overlay dark">
                            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                            Cargando las ventas!!
                          </td>
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
