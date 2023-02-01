/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import FormEntries from "../components/Store/FormEntries";
import useStore from "../hooks/useStore";

export default function StoreEntries() {
  const store = useStore();
  const [state, setState] = useState({
    numFactura: "",
    showList: false,
    btnStatus: false,
    items: [
      {
        key: `${Date.now()}`,
        id: "",
        code: "",
        name: "",
        branch_id: 0,
        cant: "",
        price: 0,
        cost: "",
        branches: [],
        branches_used: [],
        branch_default: null,
      },
    ],
    showLoader:false,
  });
  const saveItems = () => {
    window.Swal.fire({
      title: "Almacen",
      html: `Se va a guardar los datos de la factura: <strong>${state.numFactura.toUpperCase()}</strong><br/> ¿Realmente desea realizar esta acción?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (dismiss === "cancel") {
        return false;
      }

      const items = state.items.filter((i) => typeof i.id === "number");

      for (let i = 0; i < items.length; i++) {
        items[i].invoice = state.numFactura;
        delete items[i].branch_default;
        delete items[i].branches;
        delete items[i].branches_used;
        delete items[i].name;
        delete items[i].code;
        delete items[i].key;
      }

      setState({
        ...state,
        showLoader:true,
      })

      store
        .saveItemByList(items)
        .then((res) => {
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
            items: [getNewItem()],
          });
        })
        .catch((err) => console.error("Error when save items:", err.message));
    });
  };

  useEffect(() => {
    // console.log("[DEBUG] Items useEffect:", state.items);
    let btnStatus = true;
    const itemsValid = state.items.filter(
      (i) => i.id && i.branch_id && i.cant && i.price && i.price >= i.cost
    );

    if (!Boolean(state.numFactura)) {
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
  }, [state.items, state.numFactura]);

  return (
    <div className="row" style={{ height: "100vh" }}>
      <div className="col-12">


        {state.showLoader ? (
            <div className="text-center">
              <h4 className="text-primary">Guardando entrada </h4>
              <div className="spinner-border text-primary ml-4" role="status">
                <span className="sr-only">Cargando ...</span>
              </div>
            </div>
        ):(

          <div className="card card-primary card-outline">



            <div className="card-header">
              <h5 className="card-title mt-2 ml-2 text-bold">
                Entradas de productos por lote
              </h5>
              <div className="card-tools">
                <button
                  className="btn btn-sm btn-primary"
                  title="Agregar una linea nueva"
                  alt="Agregar una linea nueva"
                  onClick={() => {
                    const items = [...state.items];
                    items.push(getNewItem());
                    setState({
                      ...state,
                      items,
                    });
                  }}
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div
                className={
                  state.showList
                    ? "form-group d-flex align-items-end justify-content-end w-100"
                    : "form-group d-flex align-items-center justify-content-center w-100"
                }
              >
                <label className="mr-2" htmlFor="code">
                  Número de factura
                </label>
                <input
                  type="text"
                  className="form-control text-uppercase w-25"
                  placeholder="Número de factura"
                  id="code"
                  value={state.numFactura ?? ""}
                  maxLength="50"
                  onChange={({ target: { value } }) =>
                    setState({ ...state, numFactura: value.toLowerCase() })
                  }
                  onBlur={() =>
                    setState({ ...state, showList: Boolean(state.numFactura) })
                  }
                  onKeyPress={({ key }) =>
                    key === "Enter" &&
                    setState({ ...state, showList: Boolean(state.numFactura) })
                  }
                />
              </div>

              {state.showList &&
                state.items.map((item, i) => (
                  <FormEntries
                    key={item.key}
                    data={item}
                    eraseItem={(item) => {
                      const items = [...state.items];
                      const newItems = items.filter((i) => {
                        if (i.id === item.id && i.branch_id === item.branch_id) {
                          return false;
                        }

                        return true;
                      });

                      setState({
                        ...state,
                        items: newItems,
                      });
                    }}
                    setItemNew={(select, item) => {
                      const items = [...state.items];

                      items.forEach((prod, i) => {
                        if (prod.key === select.key) {
                          items[i] = {
                            ...items[i],
                            id: item.id,
                            code: item.code,
                            name: item.name,
                            branch_id: item.branch_default
                              ? item.branch_default
                              : 0,
                            cant: "",
                            price: "",
                            cost: "",
                            branches: item.branches,
                            branches_used: [],
                            branch_default: item.branch_default,
                          };
                          return;
                        }
                      });

                      setState({
                        ...state,
                        items,
                      });
                    }}
                    setData={(item, name, value) => {
                      if (!item || !name) {
                        return;
                      }
                      const items = [...state.items];
                      if (name === "branch_id") {
                        const itemFound = items.filter(
                          (i) => i.branch_id === value && i.id === item.id
                        );

                        if (itemFound.length) {
                          window.Swal.fire({
                            title: "Almacen",
                            text: "Esta linea de captura ya se encuentra en el listado",
                            icon: "warning",
                            timer: 2500,
                          });
                          value = null;
                        }
                      }
                      items.forEach((i) => {
                        if (i.key === item.key) {
                          if (name === "price" && i.cost > value) {
                            window.Swal.fire({
                              title: "Almacen",
                              text: "El precio del producto no puede ser menor al costo",
                              icon: "warning",
                              timer: 2500,
                            });
                            value = null;
                          }

                          i[name] = value;
                          return;
                        }
                      });
                      setState({
                        ...state,
                        items: items,
                      });
                    }}
                  />
                ))}
            </div>

          <div className="card-footer text-right">
            <button
              className="btn btn-primary"
              onClick={saveItems}
              disabled={!state.btnStatus}
            >
              Enviar
            </button>
          </div>
        </div>
        )}



          
      </div>
    </div>
  );
}

function getNewItem(key = Date.now()) {
  return {
    key: `${key}`,
    id: "",
    code: "",
    name: "",
    branch_id: 0,
    cant: 0,
    cost: "",
    price: 0,
    branches: [],
    branches_used: [],
    branch_default: null,
  };
}
