import React, { Component, useState, useEffect } from "react";
import AddModal from "../../Store/views/searchItemModal";

export default function ListItemComponent(props){

  const [state, setState] = useState({
    itemNew: false,
    code: "",
    cant: 1,
  });

  const { itemNew, code, cant } = state;
  const { items, codes, session, status = true, noPrice } = props;
  const price = !noPrice;
  let total = 0;
  const productCategories = []

  //Guardamos en un array las categorias de los items agreados
  //Hacemos un array.includes para ver si existe al menos una categoria válida
  //Si existe, habilitamos el boton, si no existe, deshabilitamos boton y mostramos la alerta



  //Execute this function every time a new item is added
  const validateList = () => {

    items.forEach(item => {
      productCategories.push(item.category);
    });

    console.log(productCategories);

    let valid = productCategories.includes(3);

    console.log(valid);

    return valid;
  };



  const handleSetCantItem = (id, cant) => {
    console.log(id, cant);
      const { items, ChangeInput: _changeInput } = props,
        items_rest = items.map((item) => {
          if (item.store_items_id === id) {
            console.log(item);
            item.cant = item.cant + cant;
            item.subtotal = item.cant * item.precio;
          }
          return item;
        }),
        itemsToSave = items_rest.filter((item) => item.cant > 0);
      _changeInput("items", itemsToSave);
    };

  
  const deleteItem = (id) => {
      const { items, status = true, ChangeInput: _changeInput } = props;
      const itemsToSave = items.filter((e) => e.store_items_id !== id);
  
      if (!status) {
        console.error(
          "[Orus System] No se puede eliminar el producto, por estatus",
          id
        );
        return false;
      }
      _changeInput("items", itemsToSave);
    };

  const handleSetCode = ({ code, oi, od }) => {
    console.log("handleSetCode");
      /* this.setState({
        itemNew: true,
        code,
        cant: oi === od ? 2 : 1,
      }); */
    };


  const handleAddItem = (item) => {

      if (item) {
        let { items, ChangeInput: _changeInput } = props;
        const itemFound = items.findIndex(
          (e) => e.store_items_id === item.store_items_id
        );
  
        if (itemFound !== -1) {
          const cantidad = items[itemFound].cant + item.cant,
            precio = item.precio,
            subtotal = items[itemFound].precio * cant;
  
          if (items[itemFound].precio === precio) {
            items[itemFound].cant = cant;
            items[itemFound].subtotal = subtotal;
          } else {
            items.push(item);
          }
        } else {
          items.push(item);

          //validateList();

          props.validValue(validateList)
        }
        _changeInput("items", items);
      }
    };

    

  return (
    <div className = {items.length !== 0 ? "card border border-success" : "card border border-warning"}>
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-shopping-cart"></i> Lista de Productos
        </h3>
        <div className="card-tools">
          {session && !itemNew ? (
            <button
              className={
                !status
                  ? "btn btn-too btn-outline-secondary disabled"
                  : "btn btn-too btn-primary text-bold"
              }
              disabled={!status}
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
          ) : null}
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-sm m-0">
          <thead>
            <tr>
              {status ? (
                <>
                  <th style={{ width: 16 }}></th>
                  <th style={{ width: 16 }}></th>
                </>
              ) : null}

              <th scope="col" style={{ width: 32 }}>
                cant
              </th>
              <th scope="col">Descripcion</th>
              {price ? (
                <>
                  <th
                    scope="col"
                    className="text-right"
                    style={{ width: 120 }}
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="text-right"
                    style={{ width: 120 }}
                  >
                    Subtotal
                  </th>
                </>
              ) : null}

              {status ? (
                <th
                  scope="col"
                  style={{ minWidth: "4rem", maxWidth: "8rem" }}
                >
                  <span className="sr-only">acciones</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((item) => {
                total += item.subtotal * 1;
                return (
                  <tr key={item.store_items_id}>
                    {status ? (
                      <>
                        <td>                                                
                          {item.cant > 1 ? (
                            <i
                              className="fas fa-minus mr-2 text-primary"
                              title="Quitar"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleSetCantItem(
                                  item.store_items_id,
                                  -1
                                )
                              }
                            ></i>
                          ) : (
                            <i className="fas fa-minus mr-2 text-muted"></i>
                          )}
                        </td>
                        <td>
                          <i
                            className="fas fa-plus mr-2 text-primary"
                            title="Agregar"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSetCantItem(item.store_items_id, 1)
                            }
                          ></i>
                        </td>
                      </>
                    ) : null}

                    <th scope="row" className="text-right">                
                      {item.cant}
                    </th>
                    <td>
                      {!item.inStorage ? (
                        <i className="text-warning fas fa-circle mr-1"></i>
                      ) : null}
                      <span className="text-capitalize">{item.name}</span>
                      {item.descripcion ? (
                        <span className="text-muted ml-2">
                          ({item.descripcion})
                        </span>
                      ) : null}
                    </td>
                    {price ? (
                      <>
                        <td className="text-right">
                          $ {parseFloat(item.precio).toFixed(2)}
                        </td>
                        <td className="text-right">
                          $ {item.subtotal.toFixed(2)}
                        </td>
                      </>
                    ) : null}

                    {status ? (
                      <td className="d-print-none text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-muted"
                          disabled={!status}
                          onClick={() => deleteItem(item.store_items_id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    ) : null}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={status ? 7 : 4}>
                  <i className="fas fa-info-circle mr-1"></i>
                  Seleccione articulos primero
                </td>
              </tr>
            )}
          </tbody>


          {items.length && price ? (
            <tfoot>
              <tr>
                <td className="text-right" colSpan={status ? 4 : 2}></td>
                <th scope="row" className="text-right text-lg">
                  Total
                </th>
                <td className="text-right text-primary text-lg pr-3">
                  <label>$ {total.toFixed(2)}</label>
                </td>
                {status ? <td></td> : null}
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>



      {codes && codes.code ? (
        <div className="card-footer">
          {codes.od === codes.oi ? (
            <div className="row">
              <div className="col">
                <label className="m-2">
                  <i className="fas fa-eye"></i> Graduacion
                </label>
                <span
                  className="text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetCode(codes)}
                >
                  {codes.code + codes.od}
                </span>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col">
                <label className="m-2">
                  <i className="fas fa-eye"></i> Graduacion ojo derecho
                </label>
                <span
                  className="text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetCode(codes)}
                >
                  {codes.code + codes.od}
                </span>
              </div>
              <div className="col">
                <label className="m-2">
                  <i className="fas fa-eye"></i> Graduacion ojo izquierdo
                </label>
                <span
                  className="text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetCode(codes)}
                >
                  {codes.code + codes.oi}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {itemNew ? (
        <AddModal
          codeDefault={code}
          cantDefault={cant}
          handleAddItem={handleAddItem}
          handleCloseModal={() => setState({
            ...state,
            itemNew: false
          })}
        />
      ) : null}
    </div>
  );
}


/* ///CLASS-----------------------------------------------------
export default class ListItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNew: false,
      code: "",
      cant: 1,
    };

    this.total = 0;
  }

  render() {
    const { itemNew, code, cant } = this.state,
    { items, codes, session, status = true, noPrice } = this.props,
    price = !noPrice;
    this.total = 0;

    return (
      <div className="card ">
        PRUEBA
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-shopping-cart"></i> Pedido
          </h3>
          <div className="card-tools">
            {session && !itemNew ? (
              <button
                className={
                  !status
                    ? "btn btn-too btn-outline-secondary disabled"
                    : "btn btn-too btn-primary text-bold"
                }
                disabled={!status}
                onClick={(e) => {
                  this.setState({
                    itemNew: !this.state.itemNew,
                    code: "",
                    cant: 1,
                  });
                }}
              >
                <i className="fas fa-plus mr-1"></i> Agregar
              </button>
            ) : null}
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-sm m-0">
            <thead>
              <tr>
                {status ? (
                  <>
                    <th style={{ width: 16 }}></th>
                    <th style={{ width: 16 }}></th>
                  </>
                ) : null}

                <th scope="col" style={{ width: 32 }}>
                  cant
                </th>
                <th scope="col">Descripcion</th>
                {price ? (
                  <>
                    <th
                      scope="col"
                      className="text-right"
                      style={{ width: 120 }}
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="text-right"
                      style={{ width: 120 }}
                    >
                      Subtotal
                    </th>
                  </>
                ) : null}

                {status ? (
                  <th
                    scope="col"
                    style={{ minWidth: "4rem", maxWidth: "8rem" }}
                  >
                    <span className="sr-only">acciones</span>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {items.length ? (
                items.map((item) => {
                  this.total += item.subtotal * 1;
                  return (
                    <tr key={item.store_items_id}>
                      {status ? (
                        <>
                          <td>
                            {item.cantidad > 1 ? (
                              <i
                                className="fas fa-minus mr-2 text-primary"
                                title="Quitar"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  this.handleSetCantItem(
                                    item.store_items_id,
                                    -1
                                  )
                                }
                              ></i>
                            ) : (
                              <i className="fas fa-minus mr-2 text-muted"></i>
                            )}
                          </td>
                          <td>
                            <i
                              className="fas fa-plus mr-2 text-primary"
                              title="Agregar"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.handleSetCantItem(item.store_items_id, 1)
                              }
                            ></i>
                          </td>
                        </>
                      ) : null}

                      <th scope="row" className="text-right">
                        {item.cantidad}
                      </th>
                      <td>
                        {!item.inStorage ? (
                          <i className="text-warning fas fa-circle mr-1"></i>
                        ) : null}
                        <span className="text-capitalize">{item.producto}</span>
                        {item.descripcion ? (
                          <span className="text-muted ml-2">
                            ({item.descripcion})
                          </span>
                        ) : null}
                      </td>
                      {price ? (
                        <>
                          <td className="text-right">
                            $ {parseFloat(item.precio).toFixed(2)}
                          </td>
                          <td className="text-right">
                            $ {item.subtotal.toFixed(2)}
                          </td>
                        </>
                      ) : null}

                      {status ? (
                        <td className="d-print-none text-right">
                          <button
                            type="button"
                            className="btn btn-sm btn-muted"
                            disabled={!status}
                            onClick={() => this.deleteItem(item.store_items_id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center" colSpan={status ? 7 : 4}>
                    <i className="fas fa-info-circle mr-1"></i>
                    Seleccione articulos primero
                  </td>
                </tr>
              )}
            </tbody>
            {items.length && price ? (
              <tfoot>
                <tr>
                  <td className="text-right" colSpan={status ? 4 : 2}></td>
                  <th scope="row" className="text-right text-lg">
                    Total
                  </th>
                  <td className="text-right text-primary text-lg pr-3">
                    <label>$ {this.total.toFixed(2)}</label>
                  </td>
                  {status ? <td></td> : null}
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
        {codes && codes.code ? (
          <div className="card-footer">
            {codes.od === codes.oi ? (
              <div className="row">
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion
                  </label>
                  <span
                    className="text"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSetCode(codes)}
                  >
                    {codes.code + codes.od}
                  </span>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion ojo derecho
                  </label>
                  <span
                    className="text"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSetCode(codes)}
                  >
                    {codes.code + codes.od}
                  </span>
                </div>
                <div className="col">
                  <label className="m-2">
                    <i className="fas fa-eye"></i> Graduacion ojo izquierdo
                  </label>
                  <span
                    className="text"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleSetCode(codes)}
                  >
                    {codes.code + codes.oi}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {itemNew ? (
          <AddModal
            codeDefault={code}
            cantDefault={cant}
            handleAddItem={this.handleAddItem}
            handleCloseModal={() => this.setState({ itemNew: false })}
          />
        ) : null}
      </div>
    );
  }

  handleSetCantItem = (id, cant) => {
    const { items, ChangeInput: _changeInput } = this.props,
      items_rest = items.map((item) => {
        if (item.store_items_id === id) {
          item.cantidad = item.cantidad + cant;
          item.subtotal = item.cantidad * item.precio;
        }

        return item;
      }),
      itemsToSave = items_rest.filter((item) => item.cantidad > 0);
    _changeInput("items", itemsToSave);
  };


  handleSetCode = ({ code, oi, od }) => {
    this.setState({
      itemNew: true,
      code,
      cant: oi === od ? 2 : 1,
    });
  };



  deleteItem = (id) => {
    const { items, status = true, ChangeInput: _changeInput } = this.props;
    const itemsToSave = items.filter((e) => e.store_items_id !== id);

    if (!status) {
      console.error(
        "[Orus System] No se puede eliminar el producto, por estatus",
        id
      );
      return false;
    }
    _changeInput("items", itemsToSave);
  };


  handleAddItem = (item) => {
    if (item) {
      let { items, ChangeInput: _changeInput } = this.props;
      const itemFound = items.findIndex(
        (e) => e.store_items_id === item.store_items_id
      );

      if (itemFound !== -1) {
        const cantidad = items[itemFound].cantidad + item.cantidad,
          precio = item.precio,
          subtotal = items[itemFound].precio * cantidad;

        if (items[itemFound].precio === precio) {
          items[itemFound].cantidad = cantidad;
          items[itemFound].subtotal = subtotal;
        } else {
          items.push(item);
        }
      } else {
        items.push(item);
      }
      _changeInput("items", items);
    }
  };
} */
