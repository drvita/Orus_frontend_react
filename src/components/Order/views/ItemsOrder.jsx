/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AddModal from "../../Store/views/searchItemModal";

export default function ListItemComponent(props) {
  const [state, setState] = useState({
    itemNew: false,
    code: "",
    cant: 1,
    validItems: true,
    showDetails: true,
    disabled: false,
    total: 0,
  });

  const handleSetCantItem = (id, cant) => {
    const items_rest = props.items.map((item) => {
        if (item.store_items_id === id) {
          item.cant = item.cant + cant;
          item.subtotal = item.cant * item.price;
        }
        return item;
      }),
      itemsToSave = items_rest.filter((item) => item.cant > 0);
    props.changeInput("items", itemsToSave);
  };
  const deleteItem = (id) => {
    const itemsToSave = props.items.filter((e) => e.store_items_id !== id);
    props.changeInput("items", itemsToSave);
  };
  const handleAddItem = (item) => {
    if (!item || typeof item !== "object") {
      console.error("[Orus System] The item is corrupt:", item);
      return;
    }
    const items = [...props.items];
    const itemFound = props.items.findIndex(
      (e) => e.store_items_id === item.store_items_id
    );

    if (itemFound !== -1) {
      const subtotal = items[itemFound].price * state.cant;

      if (items[itemFound].price === item.price) {
        items[itemFound].cant = state.cant;
        items[itemFound].subtotal = subtotal;
      } else {
        items.push(item);
      }
    } else {
      items.push(item);
    }

    props.changeInput("items", items);
    setState({
      ...state,
      itemNew: false,
    });
  };

  useEffect(() => {
    const items = props.items.filter((item) =>
      ["lentes", "armazones", "lentes de contacto"].includes(
        item.category?.code?.codeNameCategory[0]
      )
    );
    const total = props.items.reduce(
      (sub, item) => item.cant * item.price + sub,
      0
    );
    let validItems = Boolean(items.length);
    let disabled = state.disabled;
    let showDetails = state.showDetails;

    if (props.hasOwnProperty("showDetails")) {
      showDetails = props.showDetails;
    }
    if (props.hasOwnProperty("disabled")) {
      disabled = props.disabled;
    }

    if (total && props.changeInput) {
      props.changeInput("validItems", validItems);
    } else if (!props.changeInput) {
      disabled = true;
      validItems = true;
    }

    setState({
      ...state,
      validItems,
      showDetails,
      disabled,
      total,
    });
  }, [props.items, props.disabled]);

  return (
    <div
      className={
        props.hasOwnProperty("className") ? props.className : "card m-0 p-0"
      }
    >
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-shopping-cart"></i> Lista de Productos
        </h3>
        <div className="card-tools">
          {Boolean(props.session) && (
            <button
              className="btn btn-too btn-primary text-bold"
              disabled={state.disabled}
              onClick={(e) => {
                setState({
                  ...state,
                  itemNew: !state.itemNew,
                  code: "",
                  cant: 1,
                });
              }}
            >
              <i className="fas fa-plus mr-1"></i> Agregar
            </button>
          )}
        </div>
      </div>

      <div className="card-body table-responsive p-0">
        <table className="table table-sm m-0">
          <thead>
            <tr>
              {state.showDetails && <th style={{ width: 80 }}>&nbsp;</th>}

              <th scope="col" style={{ width: 32 }}>
                cant
              </th>
              <th scope="col">Descripcion</th>

              {state.showDetails && (
                <>
                  <th scope="col" className="text-right" style={{ width: 120 }}>
                    Precio
                  </th>
                  <th scope="col" className="text-right" style={{ width: 120 }}>
                    Subtotal
                  </th>
                  <th
                    scope="col"
                    style={{ minWidth: "4rem", maxWidth: "8rem" }}
                  >
                    <span className="sr-only">acciones</span>
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {props.items.map((item) => {
              return (
                <tr key={item.store_items_id}>
                  {state.showDetails && (
                    <td>
                      {item.cant === 0 || state.disabled ? (
                        <i className="fas fa-minus mr-2 text-muted mr-1"></i>
                      ) : (
                        <i
                          className="fas fa-minus mr-2 text-primary mr-1"
                          title="Quitar"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleSetCantItem(item.store_items_id, -1)
                          }
                        ></i>
                      )}
                      {state.disabled ? (
                        <i className="fas fa-plus mr-2 text-muted mr-1"></i>
                      ) : (
                        <i
                          className="fas fa-plus mr-2 text-primary mr-1"
                          title="Agregar"
                          style={{ cursor: "pointer" }}
                          disabled={state.disabled}
                          onClick={() =>
                            handleSetCantItem(item.store_items_id, 1)
                          }
                        ></i>
                      )}
                    </td>
                  )}

                  <th scope="row" className="text-right">
                    {item.cant}
                  </th>
                  <td>
                    <span className="text-capitalize">{item.name}</span>
                    {item.descripcion && (
                      <span className="text-muted ml-2">
                        ({item.descripcion})
                      </span>
                    )}
                    {item.lot && (
                      <span className="text-muted ml-2">Fac: {item.lot}</span>
                    )}
                  </td>

                  {state.showDetails && (
                    <>
                      <td className="text-right">
                        $ {parseFloat(item.price).toFixed(2)}
                      </td>
                      <td className="text-right">
                        $ {item.subtotal.toFixed(2)}
                      </td>
                      <td className="d-print-none text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-muted"
                          onClick={() => deleteItem(item.store_items_id)}
                          disabled={state.disabled}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}

            {!props.items.length && (
              <tr className="">
                <td className="text-center py-2" colSpan="6">
                  <h5>No hay articulos seleccionados</h5>
                </td>
              </tr>
            )}
          </tbody>

          {Boolean(props.items.length && state.showDetails) && (
            <tfoot>
              <tr>
                <td className="text-right text-lg" colSpan="5">
                  <span className=" mr-2">Total:</span>
                  <label>$ {state.total.toFixed(2)}</label>
                </td>
                <td>&nbsp;</td>
              </tr>
            </tfoot>
          )}
        </table>

        {!state.validItems && (
          <div className="d-flex justify-content-center">
            <p className="bg-warning w-75 text-center text-md p-2">
              <i className="fas fa-info mr-2"></i>
              Debe agregar al menos <strong>1</strong> producto a la lista con
              categoria <strong>lentes</strong> o <strong>armazones</strong>.
            </p>
          </div>
        )}
      </div>
      {state.itemNew ? (
        <AddModal
          codeDefault={state.code}
          cantDefault={state.cant}
          handleAddItem={handleAddItem}
          handleCloseModal={() =>
            setState({
              ...state,
              itemNew: false,
            })
          }
        />
      ) : null}
    </div>
  );
}
