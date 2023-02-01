import { useEffect, useState } from "react";
import FormEntries from "../components/Store/FormEntries";
import { Config } from "../context/ConfigContext";
import useStore from "../hooks/useStore";

export default function StoreEntries() {
  const configContext = Config();
  const branches = configContext?.data.filter(
    (conf) => conf.name === "branches"
  );
  const branchesId = branches.map((b) => b.id);
  const store = useStore();
  const [state, setState] = useState({
    numFactura:'',
    items: [
      {
        id: `${Date.now()}`,        
        code: "",
        name: "",
        branch_id: 0,
        cant: '',
        price: 0,
        cost:'',
        branches: [],
        branches_used: [],
        branch_default: null,
      },
    ],
    showLoader:false,
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
            timer: 2500,
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
          timer: 2500,
        });
        break;
      }

      if (i.id === id && i.branch_id === branch_id) {
        i.id = item.id;
        i.code = item.code;
        i.name = item.name;
        i.price = item.price;
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
      ...state,
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
        timer: 2500,
      });
      return;
    }

    if (!item.price) {
      window.Swal.fire({
        title: "Almacen",
        text: "Es necesario establecer un precio mayor a cero",
        icon: "warning",
        timer: 2500,
      });
      return;
    }

    if (!item.branch_id) {
      window.Swal.fire({
        title: "Almacen",
        text: "Por favor seleccione una sucursal",
        icon: "warning",
        timer: 2500,
      });
      return;
    }

    items.forEach((i) => {
      if (i.id === item.id && i.branch_id === item.branch_id) {
        i.cant = item.cant;
        i.price = item.price;
        i.cost = item.cost;        
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
      ...state,
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
      ...state,
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
      ...state,
      items: newItems,
    });
  };
  const saveItems = () => {
    const items = state.items.filter((i) => typeof i.id === "number");
    const newItems = [];

    for (let i = 0; i < items.length; i++) {      
      items[i].invoice = state.numFactura;
      items[i].cost = parseInt(items[i].cost);
      items[i].price = parseInt(items[i].price);
      items[i].cant = parseInt(items[i].cant);
      delete items[i].branch_default;
      delete items[i].branches;
      delete items[i].branches_used;
      delete items[i].name;
      delete items[i].code;
    }

    console.log(items);


    // MFPLAR-000075    
    setState({
      ...state,
      showLoader:true,
    });
    store
      .saveItemByList(items)
      .then((res) => {        
        window.Swal.fire({
          title: "Almacen",
          text: "Productos almacenados con exito",
          icon: "success",
          timer: 2500,
        });
        newItems.push(getNewItem());
        setState({
          ...state,
          items: newItems,
          showLoader:false,
        });
      })
      .catch((err) => {
        console.error("Error when save items:", err.message);
        setState({
          ...state,
          showLoader:false,
        });        
      });
  };

  useEffect(() => {
  }, [state.items]);

  return (
    <div className="row" style={{height:'100vh'}}>      
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

            <div className="form-group d-flex align-items-end justify-content-end w-100">
              <label className="mr-2" htmlFor="code">Número de factura</label>
              <input
                type="text"
                className="form-control text-uppercase w-25"
                placeholder="Número de factura"
                id="code"            
                value={state.numFactura ? state.numFactura : ''}
                maxLength="50"
                onChange={({ target }) =>
                  setState({ ...state, numFactura: target.value.toLowerCase() })
                }            
                />
              </div>

              {state.items.map((item, i) => (
              <FormEntries
                key={`${item.id}${Date.now()}${i}`}
                data={item}
                eraseItem={deleteItem}
                setItemNew={setNewItem}
                setData={(id, name, value) => {
                  console.log(id, name, value);
                  if(!id || !name || !value){
                    return;
                  }
                  const items = [...state.items];
                  items.forEach((item) => {
                    if(item.id === id){
                      console.log(item[name]);
                      item[name] = value;      
                      return;                
                    }                    
                  });
                  setState({                    
                    items: items,
                  })
                }}                
                setBranch={setBranch}                                           
              />
             ))}
            </div>


            <div className="card-footer text-right">
              <button className="btn btn-primary" onClick={saveItems} disabled={!state?.numFactura?.length ? true : false}>
                Enviar
              </button>
            </div>
          </div>          
        )}        
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
    cost:'',
    price: 0,
    branches: [],
    branches_used: [],
    branch_default: null,
  };
}
