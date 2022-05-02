import { useState } from "react";

export default function UpdateItemModal({
  item,
  close: _close,
  handleUpdate: _update,
}) {
  const [data, setData] = useState({
    cant: item.cant ?? 0,
    price: item.price ?? 0,
  });
  //Functions
  const handleChangeInput = ({ name, value }) => {
      setData({
        ...data,
        [name]: parseInt(value),
      });
    },

    handleUpdateItem = () => {
      _update({
        ...item,
        ...data,
        subtotal: data.cant * data.price,
      });
    },

    handleKeyPress = (key) => {
      if (key === "Enter") handleUpdateItem();
    };

  console.log("[DEBUG] Item:", item);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-capitalize text-truncate">
                {item.producto}
              </span>
            </h5>
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <div className="row my-2">
              <div className="col">
                <label>Cantidad</label>
                <input
                  type="number"
                  min="0"
                  className="form-control text-right"
                  name="cant"
                  defaultValue={data.cant}
                  onChange={({ target }) => handleChangeInput(target)}
                />
              </div>
              <div className="col">
                <label>Precio</label>
                <input
                  type="number"
                  min="0"
                  className="form-control text-right"
                  name="price"
                  defaultValue={data.price}
                  onChange={({ target }) => handleChangeInput(target)}
                  onKeyPress={({ key }) => handleKeyPress(key)}
                />
              </div>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateItem}
            >
              <i className="fas fa-save mr-1"></i>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
