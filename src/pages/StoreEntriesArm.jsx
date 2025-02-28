/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import FormEntries from "../components/Store/FormEntries";
import Modal from "../components/Store/StoreEntriesArmModal";
import useStore from "../hooks/useStore";
import Tr from "../components/Store/views/StoreEntriesTr";
import FormInvoice from "../components/Store/views/FormEntriesInvoice";

export default function StoreEntriesArm() {
  const initialState = {
    invoice: "",
    supplier_id: "",
    items: [],
    showList: false,
    btnStatus: false,
    showModal: false,
    showLoader: false,
  };
  const store = useStore();
  const [state, setState] = useState({ ...initialState });
  const [newRow, setNewRow] = useState(null);
  const setModel = (data) => {
    if (!data) return;

    const response = {
      code: data.code,
      name: data.name,
      cant: data.cant ?? 0,
      category_id: data.category_id,
      brand_id: data.brand_id,
      branch_id: data.branch_id,
      price: data.price,
      cost: data.cost,
      supplier_id: state.supplier_id,
      invoice: state.invoice,
    };

    if (data.codeBar) response.codebar = data.codeBar;

    return response;
  };
  const saveItems = () => {
    window.Swal.fire({
      title: "Almacen",
      html: `Se va a guardar los datos de la factura: <strong>${state.invoice.toUpperCase()}</strong><br/> ¿Realmente desea realizar esta acción?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (dismiss === "cancel") {
        return false;
      }

      const items = [];

      for (let i = 0; i < state.items.length; i++) {
        const data = setModel({ ...state.items[i] });
        if (!data) continue;
        items.push(data);
      }

      setState({
        ...state,
        showLoader: true,
      });

      store
        .saveItemByList(items)
        .then(() => {
          window.Swal.fire({
            title: "Almacen",
            text: "Productos almacenados con exito",
            icon: "success",
            timer: 2500,
          });

          console.log("[DEBUG] Send items", items);
          setState({
            numFactura: "",
            btnStatus: false,
            showList: false,
            items: [],
            showLoader: false,
          });
        })
        .catch((err) => {
          console.error("Error when save items:", err.message);
          window.Swal.fire({
            text: "Tenemos un error al almacenar por lista. Revise la consola.",
            icon: "error",
            timer: 2500,
          });
          setState({
            ...state,
            showLoader: false,
          });
        });
    });
  };

  useEffect(() => {
    // console.log("[DEBUG] Items useEffect:", state.items);
    let btnStatus = true;
    const itemsValid = state.items.filter(
      (i) => i.id && i.branch_id && i.cant && i.price && i.price >= i.cost
    );

    if (!Boolean(state.invoice)) {
      btnStatus = false;
    }

    if (!itemsValid.length) {
      btnStatus = false;
    }

    if (state.btnStatus !== btnStatus) {
      setState({
        ...state,
        btnStatus,
      });
    }
  }, [state.items, state.invoice]);

  return (
    <>
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-12">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h5 className="card-title mt-2 ml-2 text-bold">
                Entradas de armazones por lote
              </h5>
            </div>

            <div className="card-body">
              <FormInvoice state={state} setState={setState} />

              {state.showList && (
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Codigos</th>
                      <th>Descripcion</th>
                      <th>Cant</th>
                      <th>Precio</th>
                      <th>Categoria</th>
                      <th>Marca</th>
                      <th>Suc</th>
                      <th>{""}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.items.map((item) => (
                      <Tr
                        item={item}
                        key={item.id}
                        newRow={newRow}
                        supplier_id={state.supplier_id}
                        handleDelete={(id) => {
                          window.Swal.fire({
                            title: "Almacen",
                            text: `Realmente desea eliminar este articulo`,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Guardar",
                            cancelButtonText: "Cancelar",
                            showLoaderOnConfirm: true,
                          }).then(({ dismiss }) => {
                            if (dismiss === "cancel") {
                              return false;
                            }

                            const itemsFilter = state.items.filter(
                              (i) => i.id !== id
                            );

                            setState({
                              ...state,
                              items: itemsFilter,
                            });
                          });
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {state.showList && (
              <div className="card-footer text-right">
                <div className="btn-group">
                  <button
                    className="btn btn-dark"
                    alt="Agregar una linea nueva"
                    onClick={() => setState({ ...state, showModal: true })}
                  >
                    <i className="fas fa-plus mr-1" /> Armazon
                  </button>
                  <button
                    className="btn btn-secondary"
                    alt="Agregar una linea nueva"
                    onClick={() => setState({ ...initialState })}
                  >
                    <i className="fas fa-ban mr-1" /> Cancelar
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={saveItems}
                    disabled={!state.btnStatus}
                  >
                    <i className="fas fa-save mr-1" />
                    Enviar
                  </button>
                </div>
              </div>
            )}

            {(state.showLoader || state.showModal) && (
              <div className="overlay">
                <i className="fas fa-2x fa-sync-alt fa-spin"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      {state.showModal && (
        <Modal
          supplier_id={state.supplier_id}
          handleCancel={() => setState({ ...state, showModal: false })}
          handleAdd={(item) => {
            const items = [...state.items];
            const itemCode = items.filter(
              (i) => i.code === item.code && i.branch_id === item.branch_id
            );

            if (itemCode.length) {
              console.log("[Orus System] Update item");
              items.forEach((i) => {
                if (i.code === item.code && i.branch_id === item.branch_id) {
                  i.cant += item.cant;
                  i.cantAdd = !i.cantAdd;
                }
              });
            } else {
              console.log("[Orus System] Add new item");
              items.push(item);
            }

            setNewRow(item.id);
            setTimeout(() => setNewRow(null), 1000);
            setState({ ...state, items: items, showModal: false });
          }}
        />
      )}
    </>
  );
}
