/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Config } from "../../context/ConfigContext";
import useStore from "../../hooks/useStore";

export default function FormEntries({
  data,
  eraseItem,
  setItemNew,
  setData,
  setBranch,
}) {
  const configContext = Config();
  const branches = configContext?.data.filter(
    (conf) => conf.name === "branches"
  );
  const branchesId = branches.map((b) => b.id);
  const [state, setState] = useState({
    id: 0,
    code: "",
    branch_id: 0,
    cant: 0,
    price: 0,
    currentCant: 0,
    branchesId: [],
  });
  const store = useStore();
  const searchProductByItem = async () => {
    if (!state.code) return;

    const items = await store.getItems({ code: state.code });
    const item = items?.data.length ? items.data[0] : {};

    if (item && Object.keys(item).length) {
      setItemNew(state.id, state.branch_id, item);
    } else {
      window.Swal.fire({
        title: "Almacen",
        text: "Codigo no encontrado",
        icon: "warning",
      });
      setState({
        ...state,
        code: "",
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
        currentPrice = data.price ? data.price : inBranch.price;
      }

      if (!currentPrice) {
        currentPrice = data.price ? data.price : state.price;
      }
    }
    return [branch_id, currentCant, currentPrice];
  };
  const getBranchesId = () => {
    const branches = [];
    data.branches?.forEach((branch) => branches.push(branch.branch_id));

    return branches;
  };

  useEffect(() => {
    const [branch_id, currentCant, currentPrice] = setDataByBranch();
    const branchesId = getBranchesId();

    // console.log("[DEBUG] reload effect:", data);
    setState({
      ...state,
      id: data.id,
      code: data.code,
      cant: data.cant,
      branch_id,
      currentCant,
      price: currentPrice,
      branchesId,
    });
  }, [data.id, data.branch_id]);

  return (
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
          onChange={({ target }) =>
            setState({ ...state, code: target.value.toLowerCase() })
          }
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
          onChange={() => {}}
        />
      </div>
      <div className="form-group col-3">
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
          value={data.branch_default ? data.branch_default : state.branch_id}
          onChange={({ target }) => {
            if (!isNaN(target.value)) {
              setBranch(state.id, state.branch_id, parseInt(target.value));
            }
          }}
        >
          <option value={0}>--- Seleccione una sucursal ---</option>
          {branches.map((branch) => {
            // console.log("[DEBUG] Map branches:", data.branches_used, branch.id);
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
          onChange={() => {}}
        />
      </div>
      <div className="form-group col-1">
        <label htmlFor="cant">Ingreso</label>
        <input
          type="text"
          className="form-control"
          placeholder="Cantidad"
          id="cant"
          disabled={typeof state.id === "string" ? true : false}
          value={state.cant ?? 0}
          onChange={({ target }) => {
            if (!isNaN(target.value)) {
              setState({
                ...state,
                cant: parseInt(target.value ? target.value : 0),
              });
            }
          }}
        />
      </div>
      <div className="form-group col-1">
        <label htmlFor="price">Precio</label>
        <input
          type="text"
          className="form-control"
          placeholder="Precio"
          id="price"
          disabled={typeof state.id === "string" ? true : false}
          value={state.price ?? 0}
          onChange={({ target }) => {
            if (!isNaN(target.value)) {
              setState({ ...state, price: parseInt(target.value) });
            }
          }}
          onKeyPress={({ key }) => key === "Enter" && setData(state)}
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
          <button
            className="btn btn-sm btn-success"
            disabled={typeof state.id === "string" ? true : false}
            onClick={() => setData(state)}
          >
            {data.cant ? (
              <i className="fas fa-pen" />
            ) : (
              <i className="fas fa-check" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}