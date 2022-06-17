import React, { useState, useEffect } from "react";
import AddModal from "../../Store/views/searchItemModal";

export default function ListItemComponent(props){
  
  const [state, setState] = useState({
    itemNew: false,
    code: "",
    cant: 1,
    validList: true,
  });

 /*  setState({
    ...state,
    itemNew: !state.itemNew,
    code: "",
    cant: 1,
  }); */

  const { itemNew, code, cant } = state;
  const { items, session, status = true, noPrice, productCodes, showHideBtns, cancelListProducts } = props;
  const price = !noPrice;

  let total = 0;
  
  useEffect(()=>{
    validateList();
  },[productCodes]);// eslint-disable-line react-hooks/exhaustive-deps


  const validateList = () => {
    if(productCodes){
      let valid = productCodes.some((code) => parseInt(code) === 1 || parseInt(code) === 2)
    setState({
      ...state,
      validList: valid
    })
    }else{
      return null;
    }
  };

  const handleSetCantItem = (id, cant) => {
      const { items, ChangeInput: _changeInput } = props,
        items_rest = items.map((item) => {
          if (item.store_items_id === id) {
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


  const handleAddItem = (item) => {

      if (item) {
        let { items, ChangeInput: _changeInput } = props;
        const itemFound = items.findIndex(
          (e) => e.store_items_id === item.store_items_id
        );
  
        if (itemFound !== -1) {
          //const cantidad = items[itemFound].cant + item.cant,
          const precio = item.precio;
          const subtotal = items[itemFound].precio * cant;
  
          if (items[itemFound].precio === precio) {
            items[itemFound].cant = cant;
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




  return productCodes ? (
    <div className="col-lg-10 d-flex align-self-center justify-content-center p-0">
      <div className = {items.length !== 0 ? "card border border-success col-lg-12" : "card border border-warning col-lg-12"}>
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
                disabled={showHideBtns ? true : false}
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
                          {item.cant > 1 && showHideBtns ? (
                            <i className="fas fa-minus mr-2 text-muted"></i>                            
                          ) : showHideBtns ? (
                            <i className="fas fa-minus mr-2 text-muted"></i>     
                          ) : (
                            <i
                              className="fas fa-minus mr-2 text-primary"
                              title="Quitar"
                              style={{ cursor: "pointer" }}                              
                              onClick={() =>
                                handleSetCantItem(item.store_items_id, -1)
                              }
                            ></i>                             
                          )                      
                                                     
                          }
                        </td>
                        <td>
                          {showHideBtns ? (
                            <i className="fas fa-plus mr-2 text-muted"></i>                            
                          ):(
                            <i
                              className="fas fa-plus mr-2 text-primary"
                              title="Agregar"
                              style={{ cursor: "pointer" }}                            
                              onClick={() =>
                                handleSetCantItem(item.store_items_id, 1)
                              }
                          ></i>
                          )}                  
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
                          disabled={showHideBtns ? true : false}
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
              <tr className="">
                <td className="text-center" colSpan={status ? 7 : 4}>
                  <i className="fas fa-info-circle mr-1 mt-4"></i>
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

        {state.validList === false && items.length !== 0 ? (
          <div className="d-flex justify-content-center">
            <p className="bg-warning w-50 text-center">
              <i className="fas fa-info-circle mr-1"></i>
              Debes agregar al menos un Monofocal o Armazon a la lista!
            </p>
          </div>
          ) : null}

          {!showHideBtns ? (
            <div className="d-flex justify-content-end mb-2">
              <button className="btn btn-secondary mr-3" onClick={cancelListProducts} disabled = {state.validList === false ?  true : false}>Cancelar</button>
              <button className="btn btn-success mr-2" disabled = {state.validList === false ?  true : false} onClick= {()=>{
                props.changeTotal(total,state.validList);
                setState({
                  ...state,
                  showHideBtns: true,
                })
              }}>Siguiente</button>
          </div>
          ): null}

        
      </div>     
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

    </div>
  ): (
    //------------------------SECOND COMPONENT-------------------------------//
    <div className="col-lg-12 d-flex align-self-center justify-content-center p-0">
      
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
                    <>
                      <td>                                                                         
                      </td>
                      <td>                                          
                      </td>
                    </>                    

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
                  </tr>
                );
              })
            ) : (
              <tr className="">
                <td className="text-center" colSpan={status ? 7 : 4}>
                  <i className="fas fa-info-circle mr-1 mt-4"></i>
                  Seleccione articulos primero
                </td>
              </tr>
            )}
          </tbody>

        </table>
    </div>
  </div>
    
  );
}