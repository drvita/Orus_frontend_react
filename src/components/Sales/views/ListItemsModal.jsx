import { useState } from "react";

function ListItemsModal({
  items,
  cantDefault = 1,
  handleClose: _close,
  handleSelect: _Select,
}) {


  const [data, setData] = useState({
    item: null,
    cant: cantDefault,
    precio: 0,
  });

  const disabled = data.precio <= 0 ? true : false;


  //Functions
  const handleClose = () => {
      if (_close) _close();
    },


    handleClickItem = (e, item) => {
      e.preventDefault();
      setData({
        ...data,
        precio: item.precio,
        item,
      });
    },

    handleSelectItem = () => {
      const toSend = {
        ...data,
        item: {
          ...data.item,
          precio: data.precio,
        },
      };

      //Item seleccionado
      console.log("ITEM SELECCIONADO", data.item.precio);
      
      _Select(toSend);
      setData({
        item: null,
        cant: 1,
        precio: 0,
      });

      handleClose();
    },
    handleChangeCant = ({ name, value }) => {
      setData({
        ...data,
        [name]: parseInt(value),
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
              {data.item && data.item.id ? (
                <>
                  <div className="text-uppercase mb-4">
                    {data.item.producto}
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Cantidad</label>
                    {cantDefault < 2 ? (
                      <div className="col">
                        <input
                          type="number"
                          placeholder="Cantidad"
                          name="cant"
                          className="form-control"
                          defaultValue={data.cant}
                          onChange={({ target }) => handleChangeCant(target)}
                        />
                      </div>
                    ) : (
                      <span className="col text-lg">{data.cant}</span>
                    )}
                    <label className="col-2 col-form-label">Precio</label>
                    {!data.item.precio ? (
                      <div className="col">
                        <input
                          type="number"
                          placeholder="Precio"
                          name="precio"
                          className="form-control"
                          defaultValue={data.precio}
                          onChange={({ target }) => handleChangeCant(target)}
                        />
                      </div>
                    ) : (
                      <span className="col text-lg">${data.precio}</span>
                    )}
                  </div>
                </>
              ) : (
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
                                    {item.code}
                                  </span>
                                </td>
                                <td className="text-capitalize text-left">
                                  <a
                                    href="#select"
                                    onClick={(e) => handleClickItem(e, item)}
                                  >
                                    {item.name}
                                  </a>
                                </td>
                                <td>${item.price}</td>
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
              )}
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSelectItem}
              disabled = { disabled }
            >
              <i className="fas fa-check mr-1"></i>
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItemsModal;
