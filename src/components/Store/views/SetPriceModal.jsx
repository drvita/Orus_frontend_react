import { useState } from "react";

function SetPriceModal({
  category,
  handleSave: _handleSave,
  handleClose: _close,
}) {
  const [showLoader, setShowLoader] = useState(false);
  const [price, setPrice] = useState(0);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Asignar Precio</h5>
            <button onClick={_close} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body p-2">
            {showLoader ? (
              <div className="text-center">
                <h4 className="text-primary">Asignando precios </h4>
                <div className="spinner-border text-primary ml-4" role="status">
                  <span className="sr-only">Cargando ...</span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-start align-items-start">
                <h5 className="text-center mt-2 mb-3">
                  <span className="badge badge-info">
                    {category.toUpperCase()}
                  </span>
                </h5>
                <label>Precio</label>
                <input
                  onChange={({ target }) => {
                    const { value } = target;
                    setPrice(value);
                  }}
                  name="price"
                  type="number"
                  defaultValue={price}
                  className="form-control"
                  placeholder="Precio"
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={_close}
              disabled={showLoader ? true : false}
            >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>

            <button
              disabled={showLoader || !price || price === "0" ? true : false}
              type="button"
              className="btn btn-success"
              onClick={() => {
                _handleSave(price);
                setShowLoader(true);
              }}
            >
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPriceModal;
