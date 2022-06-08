import { useEffect, useState } from "react";
import FormEntries from "../components/Store/FormEntries";
import { Config } from "../context/ConfigContext";

export default function StoreEntries() {
  const configContext = Config();
  const branches = configContext?.data.filter(
    (conf) => conf.name === "branches"
  );
  const branchesId = branches.map((b) => b.id);
  const [state, setState] = useState({
    items: [
      {
        id: `${Date.now()}`,
        code: "",
        name: "",
        branch_id: 0,
        cant: 0,
        price: 0,
        branches: [],
        branches_used: [],
        branch_default: null,
      },
    ],
  });
  const setNewItem = (id, branch_id, item) => {
    const items = [...state.items];
    const branches_used = {};
    const branches_rest = {};
    let done = 0;

    for (const i of items) {
      if (!branches_used[i.id]?.length) branches_used[i.id] = [];
      if (!branches_rest[i.id]?.length) branches_rest[i.id] = branchesId;

      if (i.id === item.id) {
        if (branchesId.includes(item.branch_default)) {
          window.Swal.fire({
            title: "Almacen",
            text: "Codigo ya se encuentra en la lsta",
            icon: "warning",
          });
          break;
        }

        branches_rest[i.id] = branches_rest[i.id].filter(
          (b) => b !== i.branch_id
        );
        branches_used[i.id].push(i.branch_id);

        item.branches = item.branches.filter(
          (b) => !branches_used[i.id].includes(b.branch_id)
        );
      }

      if (!branches_rest[i.id].length) {
        window.Swal.fire({
          title: "Almacen",
          text: "Codigo ya fue agregado a la lista en todas sus sucursales",
          icon: "warning",
        });
        break;
      }

      if (i.id === id && i.branch_id === branch_id) {
        i.id = item.id;
        i.code = item.code;
        i.name = item.name;
        i.branches = item.branches;
        i.branches_used = branches_used[i.id] ?? [];
        i.branch_default = item.branch_default ?? null;
        i.branch_id = item.branch_default ? item.branch_default : 0;
      }

      done++;
    }

    if (done < items.length) {
      items.forEach((i) => {
        if (typeof i.id === "string" && i.id === item.id) {
          i.code = "";
        }
      });
    }

    setState({
      items,
    });
  };
  const setDataItem = (item) => {
    const items = [...state.items];
    let itemHasNew = true;

    if (!item.cant) {
      window.Swal.fire({
        title: "Almacen",
        text: "La cantidad de productos (ingreso), es un valor requerido",
        icon: "warning",
      });
      return;
    }

    if (!item.price) {
      window.Swal.fire({
        title: "Almacen",
        text: "Es necesario establecer un precio mayor a cero",
        icon: "warning",
      });
      return;
    }

    if (!item.branch_id) {
      window.Swal.fire({
        title: "Almacen",
        text: "Por favor seleccione una sucursal",
        icon: "warning",
      });
      return;
    }

    items.forEach((i) => {
      if (i.id === item.id && i.branch_id === item.branch_id) {
        i.cant = item.cant;
        i.price = item.price;
        i.branch_id = item.branch_id;
      }

      if (typeof i.id === "string") {
        itemHasNew = false;
      }
    });

    if (itemHasNew) {
      items.push(getNewItem());
    }

    setState({
      items,
    });
  };
  const setBranch = (id, c_branch, n_branch) => {
    const items = [...state.items];

    items.forEach((i) => {
      if (i.id === id && i.branch_id === c_branch) {
        i.branch_id = n_branch;
      }
    });

    setState({
      items,
    });
  };
  const deleteItem = (item) => {
    const items = [...state.items];
    const newItems = items.filter((i) => {
      if (i.id === item.id && i.branch_id === item.branch_id) {
        return false;
      }

      return true;
    });

    setState({
      items: newItems,
    });
  };
  const saveItems = () => {
    console.log("[DEBUG] Items", state.items);
  };

  useEffect(() => {
    // console.log("[DEBUG] Items", state.items);
  }, [state.items]);

  return (
    <div className="row">
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
                    items,
                  });
                }}
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>

          <div className="card-body">
            {state.items.map((item, i) => (
              <FormEntries
                key={`${item.id}${Date.now()}${i}`}
                data={item}
                eraseItem={deleteItem}
                setItemNew={setNewItem}
                setData={setDataItem}
                setBranch={setBranch}
              />
            ))}
          </div>
          <div className="card-footer text-right">
            <button className="btn btn-primary" onClick={saveItems}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getNewItem() {
  return {
    id: `${Date.now()}`,
    code: "",
    name: "",
    branch_id: 0,
    cant: 0,
    price: 0,
    branches: [],
    branches_used: [],
    branch_default: null,
  };
}
