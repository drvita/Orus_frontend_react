import { useState } from "react";

function ListItemsModal({
  items,
  cantDefault,
  handleClose: _close,
  handleSelect: _Select,
}) {
  const [data, setData] = useState({
    item: null,
    cant: cantDefault ? cantDefault : 1,
  });
  //Functions
  const handleClose = () => {
      if (_close) _close();
    },
    handleClickItem = (e, item) => {
      e.preventDefault();
      setData({
        ...data,
        item,
      });
    },
    handleSelectItem = () => {
      _Select(data);
      setData({
        item: null,
        cant: 1,
      });
      handleClose();
    },
    handleChangeCant = ({ value }) => {
      setData({
        ...data,
        cant: parseInt(value),
      });
    };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccione un producto</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
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
                                  {item.codigo}
                                </span>
                              </td>
                              <td className="text-capitalize text-left">
                                <a
                                  href="#select"
                                  onClick={(e) => handleClickItem(e, item)}
                                >
                                  {item.producto}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td>No existen productos para esta coincidencia</td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <tr>
                      <td>
                        <i className="fas fa-info-circle mr-1"></i> No se
                        recibieron los productos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <div className="form-group row">
              {data.item && data.item.id ? (
                <>
                  <label className="col-2 col-form-label">Cantidad</label>
                  <div className="col">
                    <input
                      type="number"
                      placeholder="cantidad"
                      className="form-control"
                      defaultValue={data.cant}
                      onChange={({ target }) => handleChangeCant(target)}
                    />
                  </div>
                </>
              ) : null}

              <div className="btn-group col-6">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={handleClose}
                >
                  <i className="fas fa-ban mr-1"></i>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSelectItem}
                >
                  <i className="fas fa-check mr-1"></i>
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItemsModal;
