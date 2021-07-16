import React, { useState } from "react";
//Components
import Search from "../data/searchStore";
//Actions
import helper from "../helpers";

function AddItemModalComponent(props) {
  //Props and vars
  const {
    codeDefault = "",
    cantDefault = 1,
    handleAddItem: _handleAddItem,
    handleCloseModal: _handleCloseModal,
  } = props;
  //States
  const [item, setItem] = useState({
      id: 0,
      producto: codeDefault,
      cantidad: cantDefault,
      precio: 0,
      out: 0,
      inStorage: 0,
      subtotal: 0,
      store_items_id: 0,
      descripcion: "",
      category: 0,
    }),
    [showDesc, setShowDesc] = useState(false);
  //Functions
  const _reset = () => {
      setItem({
        id: 0,
        producto: "",
        precio: 0,
        out: 0,
        cantidad: 1,
        inStorage: 0,
        subtotal: 0,
        store_items_id: 0,
        descripcion: "",
        category: 0,
      });
    },
    close = () => {
      _reset();
      _handleCloseModal();
    },
    hanleChangeDataItem = (data) => {
      //console.log("[DEBUG] select item", data);
      setItem({
        id: 0,
        producto: data.producto.toLowerCase(),
        precio: parseFloat(data.precio),
        out: data.cantidades,
        cantidad: 1,
        inStorage: 0,
        subtotal: 0,
        store_items_id: data.id,
        descripcion: "",
        category: data.categoria ? data.categoria.id : 0,
      });
    },
    handleChangeItem = (key, value) => {
      setItem({
        ...item,
        [key]: key === "descripcion" ? value : parseInt(value),
      });
    },
    hanldeSendBack = () => {
      const verify = helper.verifyItem(item);

      if (!verify) return false;

      item.inStorage = item.out >= item.cantidad ? true : false;
      item.out = item.out >= item.cantidad ? 0 : item.cantidad - item.out;
      item.subtotal = parseFloat(item.cantidad * item.precio);

      _handleAddItem(item);
      close();
    };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary text-bold">
              <i className="fas fa-plus mr-1"></i>
              Agregar producto
            </h5>
            <button type="button" className="close" onClick={() => close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col position-relative">
                <Search item={item} handleItemSelect={hanleChangeDataItem} />
              </div>
              {item.store_items_id ? (
                <>
                  <div className="col-2">
                    <label>Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Cantidad"
                      value={item.cantidad}
                      min="0"
                      max="100"
                      onChange={({ target }) =>
                        handleChangeItem("cantidad", target.value)
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control text-right"
                      placeholder="Precio"
                      min="0"
                      value={item.precio}
                      onChange={({ target }) =>
                        handleChangeItem("precio", target.value)
                      }
                    />
                  </div>
                  {showDesc ? (
                    <div className="col-12 mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Agregue una descripcion"
                        value={item.descripcion}
                        onChange={({ target }) =>
                          handleChangeItem("descripcion", target.value)
                        }
                      />
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-default btn-sm"
                onClick={() => close()}
              >
                <i className="fas fa-ban mr-1"></i>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-default btn-sm"
                onClick={() => setShowDesc(!showDesc)}
                disabled={!item.store_items_id}
              >
                <i className="fas fa-sticky-note mr-1"></i>
                {showDesc ? "Cerrar nota" : "Abrir nota"}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm text-bold"
                disabled={
                  item.store_items_id && item.cantidad && item.precio
                    ? false
                    : true
                }
                onClick={() => hanldeSendBack()}
              >
                <i className="fas fa-save mr-1"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemModalComponent;
