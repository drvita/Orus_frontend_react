import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getListStore, setListStore } from "../../redux/store/actions";

function AddItemModal(props) {
  const {
      items,
      loading,
      //Funtions
      handleAddItem: _handleAddItem,
      getListStore: _getListStore,
      setListStore: _setListStore,
      handleCloseModal: _handleCloseModal,
    } = props,
    [item, setItem] = useState({
      id: 0,
      producto: "",
      cantidad: 1,
      precio: 0,
      out: 0,
      inStorage: 0,
      subtotal: 0,
      store_items_id: 0,
      descripcion: "",
    }),
    [search, setSearch] = useState("");

  const _reset = () => {
    _setListStore({
      result: {
        list: [],
        metaList: {},
      },
    });
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
    });
  };
  const _close = (e) => {
    _reset();
    _handleCloseModal();
  };

  const verifyItem = () => {
    let result = true;

    if (!item.cantidad) {
      result = false;
      window.alert("La cantidad debe de ser un valor valido");
    }
    if (!item.store_items_id) {
      result = false;
      window.alert("No se selecciono un producto valido");
    }
    if (!item.precio) {
      result = false;
      window.alert("El precio no es valido");
    }

    return result;
  };

  let searchInput = null;

  useEffect(() => {
    if (!search && searchInput) searchInput.focus();
  });

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary text-bold">
              <i className="fas fa-plus mr-1"></i>
              Agregar producto
            </h5>
            <button type="button" className="close" onClick={(e) => _close(e)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col position-relative">
                <label>
                  Producto
                  {loading ? (
                    <small
                      className="position-absolute ml-2"
                      style={{ zIndex: "101", top: "0" }}
                    >
                      Buscando...
                    </small>
                  ) : null}
                </label>
                <input
                  className="form-control text-uppercase text-truncate"
                  type="text"
                  placeholder="Buscar produccto"
                  autoComplete="off"
                  ref={(input) => {
                    searchInput = input;
                  }}
                  value={search}
                  onChange={(e) => {
                    const { value } = e.target;
                    setSearch(value.toLocaleLowerCase());
                    if (value.length > 2) {
                      _getListStore({
                        options: {
                          page: 1,
                          orderby: "name",
                          order: "ASC",
                          search: value,
                          itemsPage: 25,
                        },
                      });
                    } else if (!value.length) {
                      _reset();
                    }
                  }}
                />
                {items.length && !item.store_items_id ? (
                  <div
                    className="position-absolute shadow p-0 pt-2 pl-1 bg-white rounded w-100 mh-50 overflow-auto"
                    style={{ maxHeight: "18rem", zIndex: "100" }}
                  >
                    <div className="list-group m-0 list-group-flush">
                      {items.map((i) => {
                        const total = i.cantidades > 0 ? i.cantidades : 0;

                        return (
                          <a
                            key={i.id}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            href="#l"
                            onClick={(e) => {
                              e.preventDefault();
                              setItem({
                                ...item,
                                store_items_id: parseInt(i.id),
                                producto: i.producto.toString(),
                                precio: parseFloat(i.precio),
                                out: parseInt(i.cantidades),
                              });
                              setSearch(i.producto);
                            }}
                          >
                            <span className="text-truncate text-uppercase text-primary text-bold">
                              {i.producto}
                            </span>
                            <span
                              className={
                                total
                                  ? "badge badge-primary badge-pill"
                                  : "badge badge-warning badge-pill"
                              }
                            >
                              {total}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              {item.store_items_id ? (
                <React.Fragment>
                  <div className="col-2">
                    <label>Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Cantidad"
                      value={item.cantidad}
                      onChange={(e) => {
                        e.preventDefault();
                        const { value } = e.target;

                        setItem({
                          ...item,
                          cantidad: parseInt(value),
                        });
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <label>Precio</label>
                    <input
                      type="number"
                      className="form-control text-right"
                      placeholder="Precio"
                      value={item.precio}
                      onChange={(e) => {
                        e.preventDefault();
                        const { value } = e.target;

                        setItem({
                          ...item,
                          precio: parseFloat(value),
                        });
                      }}
                    />
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => _close(e)}
              >
                <i className="fas fa-undo mr-1"></i>
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                disabled={
                  item.store_items_id && item.cantidad && item.precio
                    ? false
                    : true
                }
                onClick={(e) => {
                  e.preventDefault();
                  const verify = verifyItem();

                  if (!verify) return false;

                  item.inStorage = item.out >= item.cantidad ? true : false;
                  item.out =
                    item.out >= item.cantidad ? 0 : item.cantidad - item.out;
                  item.subtotal = parseFloat(item.cantidad * item.precio);

                  _handleAddItem(item);
                  _close();
                }}
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

const mapStateToProps = (state) => {
    return {
      items: state.storeItem.list,
      loading: state.storeItem.loading,
    };
  },
  mapActionsToProps = {
    getListStore,
    setListStore,
  };

export default connect(mapStateToProps, mapActionsToProps)(AddItemModal);
