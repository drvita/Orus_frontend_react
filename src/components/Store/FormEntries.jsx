/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Config } from "../../context/ConfigContext";
import useStore from "../../hooks/useStore";

export default function FormEntries({ data, eraseItem, setItemNew, setData }) {
  const configContext = Config();
  const branches = configContext?.data.filter(
    (conf) => conf.name === "branches"
  );
  const branchesId = branches.map((b) => b.id);
  const [state, setState] = useState({
    key: "",
    id: 0,
    code: "",
    branch_id: 0,
    cant: "",
    cost: "",
    price: "",
    branchesId: [],
    showLoader: false,
  });
  const store = useStore();
  const searchProductByItem = async () => {

    setState({
      ...state,
      showLoader:true,
    });    

    if (!state.code){      
      setState({
        ...state,
        showLoader:false,
      });
      return;
    }

    const items = await store.getItems({ code: state.code });
    const item = items?.data.length ? items.data[0] : {};

    if (item && Object.keys(item).length) {      
      setState({
        ...state,
        showLoader:false,
      });
      setItemNew(state, item);       
    } else {
      window.Swal.fire({
        title: "Almacen",
        text: "Codigo no encontrado",
        icon: "warning",
        timer: 2500,
      });
      setState({
        ...state,
        code: "",
        showLoader:false,
      });
    }
  };
  const setDataByBranch = () => {
    const branch_id = data.branch_default
      ? data.branch_default
      : data.branch_id;
    let currentCant = 0,
      currentPrice = 0;

    if (branch_id) {
      const branch_select = data.branches?.filter(
        (b) => b.branch_id === branch_id
      );

      if (branch_select && branch_select.length) {
        const inBranch = branch_select[0];

        currentCant = inBranch.cant;
        currentPrice = inBranch.price;
      }

      if (!currentPrice) {
        currentPrice = data.price ? data.price : state.price;
      }
    }
    return [branch_id, currentCant, currentPrice];
  };
  const getBranchesId = () => {
    const branches = [];
    data.branches?.forEach((b) => branches.push(b.branch_id));

    return branches;
  };

  useEffect(() => {
    const [branch_id, currentCant, currentPrice] = setDataByBranch();
    const branchesId = getBranchesId();

    setState({
      ...state,
      key: data.key,
      id: data.id,
      code: data.code,
      cant: data.cant,
      branch_id: branch_id ?? 0,
      cost: data.cost,
      currentCant,
      price: data.price ? data.price : currentPrice,
      branchesId,
    });
  }, [data.id, data.branch_id]);

  return (
    <div>
      {state.showLoader ? (
        <div className="text-center">
          <h4 className="text-primary">Buscando producto</h4>
          <div className="spinner-border text-primary ml-4" role="status">
            <span className="sr-only">Cargando ...</span>
          </div>
      </div>
      ):(
        <div className="form-row border-bottom mt-2">
        <div className="form-group col-2">
          <label htmlFor="code">Codigo</label>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Codigo del producto"
            id="code"
            disabled={typeof state.id === "number" ? true : false}
            value={state.code}
            onChange={({ target: { value } }) =>
              setState({ ...state, code: value.toLowerCase() })
            }
            onBlur={() => searchProductByItem()}
            onKeyPress={({ key }) => key === "Enter" && searchProductByItem()}
          />
        </div>
        <div className="form-group col-3">
          <label htmlFor="name">Producto</label>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Nombre del producto"
            id="name"
            value={data.name ?? ""}
            disabled={true}
          />
        </div>
        <div className="form-group col-2">
          <label htmlFor="branch">Sucursal</label>
          <select
            id="branch"
            className="form-control text-uppercase"
            disabled={
              typeof state.id === "string" ||
              branchesId.includes(data.branch_default) ||
              data.cant
                ? true
                : false
            }
            value={state.branch_id}
            onChange={({ target: { value } }) =>
              setState({ ...state, branch_id: parseInt(value) })
            }
            onBlur={() => setData(data, "branch_id", state.branch_id)}
          >
            <option value={0}>--- Seleccione una sucursal ---</option>
            {branches.map((branch) => {
              if (data.branches_used.includes(branch.id)) {
                return null;
              }

              return (
                <option key={branch.id} value={branch.id}>
                  {branch.data?.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-1">
          <label htmlFor="current">Actual</label>
          <input
            type="text"
            className="form-control"
            id="current"
            value={state.currentCant ?? 0}
            disabled={true}
          />
        </div>
        <div className="form-group col-1">
          <label htmlFor="cant">Cantidad</label>
          <input
            type="text"
            className={
              data.cant !== state.cant
                ? "form-control is-warning"
                : "form-control"
            }
            placeholder="Cantidad"
            id="cant"
            disabled={typeof state.id === "string" ? true : false}
            value={state.cant ?? ""}
            onChange={({ target: { value: val } }) => {
              if (val && isNaN(val)) {
                return;
              }

              val = val ? parseInt(val) : 0;
              setState({
                ...state,
                cant: val,
              });
            }}
            onBlur={() => setData(data, "cant", state.cant)}
            onKeyPress={({ key }) =>
              key === "Enter" && setData(data, "cant", state.cant)
            }
          />
        </div>
        <div className="form-group col-1">
          <label htmlFor="costos">Costo</label>
          <input
            type="text"
            className="form-control"
            id="costos"
            placeholder="Costo"
            value={state.cost}
            disabled={typeof state.id === "string" ? true : false}
            onChange={({ target: { value: val } }) => {
              if (val && isNaN(val)) {
                return;
              }

              val = val ? parseInt(val) : 0;
              setState({ ...state, cost: val });
            }}
            onBlur={() => setData(data, "cost", state.cost)}
            onKeyPress={({ key }) =>
              key === "Enter" && setData(data, "cost", state.cost)
            }
          />
        </div>
        <div className="form-group col-1">
          <label htmlFor="price">Precio</label>
          <input
            type="text"
            className={
              data.price !== state.price
                ? "form-control is-warning"
                : "form-control"
            }
            placeholder="Precio"
            id="price"
            disabled={typeof state.id === "string" ? true : false}
            value={state.price ?? 0}
            onChange={({ target: { value: val } }) => {
              if (val && isNaN(val)) {
                return;
              }

              val = val ? parseInt(val) : 0;
              setState({ ...state, price: val });
            }}
            onKeyPress={({ key }) =>
              key === "Enter" && setData(data, "price", state.price)
            }
            onBlur={() => setData(data, "price", state.price)}
          />
        </div>
        <div className="form-group col-1 text-right pt-4">
          <div
            className="btn-group btn-group-sm mt-2"
            role="group"
            aria-label="..."
          >
            <button
              className="btn btn-sm btn-warning"
              onClick={() => eraseItem(data)}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>
      )}             
    </div>
  );
}
