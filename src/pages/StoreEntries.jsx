import { useEffect, useState } from "react";
import FormEntries from "../components/Store/FormEntries";
import useStore from "../hooks/useStore";

export default function StoreEntries() {
  const store = useStore();
  const [state, setState] = useState({
    numFactura: "",
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
  });
  const saveItems = () => {
    const items = state.items.filter((i) => typeof i.id === "number");

    for (let i = 0; i < items.length; i++) {
      items[i].invoice = state.numFactura;
      delete items[i].branch_default;
      delete items[i].branches;
      delete items[i].branches_used;
      delete items[i].name;
      delete items[i].code;
    }

    console.log("[DEBUG] Send items", items);

    // MFPLAR-000075
    store
      .saveItemByList(items)
      .then((res) => {
        window.Swal.fire({
          title: "Almacen",
          text: "Productos almacenados con exito",
          icon: "success",
          timer: 2500,
        });

        setState({
          numFactura: "",
          items: [getNewItem()],
        });
      })
      .catch((err) => console.error("Error when save items:", err.message));
  };

  useEffect(() => {
    console.log("[DEBUG] Items useEffect:", state.items);
  }, [state.items]);

  return (
    <div className="row" style={{ height: "100vh" }}>
      <div className="col-12">
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
            <div className="form-group d-flex align-items-end justify-content-end w-100">
              <label className="mr-2" htmlFor="code">
                Número de factura
              </label>
              <input
                type="text"
                className="form-control text-uppercase w-25"
                placeholder="Número de factura"
                id="code"
                value={state.numFactura ? state.numFactura : ""}
                maxLength="50"
                onChange={({ target }) =>
                  setState({ ...state, numFactura: target.value.toLowerCase() })
                }
              />
            </div>

            {state.items.map((item, i) => (
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
                      console.log(
                        "[DEBUG] Set new item id:",
                        prod.key,
                        select.key
                      );
                      console.log(
                        "[DEBUG] Set new item branch:",
                        prod.branch_id,
                        select.branch_id
                      );
                      items[i] = {
                        ...items[i],
                        id: item.id,
                        code: item.code,
                        name: item.name,
                        branch_id: item.branch_default
                          ? item.branch_default
                          : 0,
                        cant: "",
                        price: item.price,
                        cost: "",
                        branches: item.branches,
                        branches_used: [],
                        branch_default: item.branch_default,
                      };
                      console.log("[DEBUG] update selected");
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
                    console.log("[DEBUG] Branchs filters:", itemFound);
                  }
                  items.forEach((i) => {
                    if (i.key === item.key) {
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
              disabled={!state?.numFactura?.length ? true : false}
            >
              Enviar
            </button>
          </div>
        </div>
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
