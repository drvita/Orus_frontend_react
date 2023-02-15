/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Store } from "../../../context/StoreContext";

export default function FormEntries({
  state,
  setState,
  brands,
  itemSearch,
  searchFn,
}) {
  const context = Store();

  const [alert, setAlert] = useState({
    status: false,
    class: "danger",
    message: "",
  });
  const [braDef, setBraDef] = useState({ status: false, branch_id: null });

  const handleSetName = () => {
    const category = context.cats.filter((cat) => cat.id === state.category_id);
    const category_name = category[0].name;
    const brand = brands.filter((bra) => bra.id === state.brand_id);
    const brand_name = brand[0].name;
    const name =
      "Armazon " + category_name + " " + brand_name + " " + state.code;

    console.log("[Orus System] Set name:", name);
    handleSetPrice(name);
  };
  const handleSetPrice = (name) => {
    if (itemSearch?.id) {
      const branch_selected = itemSearch.branch_default
        ? itemSearch.branch_default
        : state.branch_id;
      const branch = itemSearch.branches.filter(
        (b) => b.branch_id === branch_selected
      )[0];
      if (branch && branch.price) {
        const {
          code: { codeNameCategory },
        } = itemSearch.category;
        if (codeNameCategory[0] === "armazones") {
          console.log("[Orus System] set price from branch:", branch.price);
          const data = {
            ...state,
            price: parseFloat(branch.price),
          };
          if (name) data.name = name;

          setState(data);
        }
      }
    } else {
      setState({
        ...state,
        name,
      });
    }
  };

  useEffect(() => {
    if (!itemSearch) return;

    if (itemSearch.branch_default && !braDef.status) {
      setBraDef({
        status: true,
        branch_id: itemSearch.branch_default,
      });
      setState({
        ...state,
        branch_id: itemSearch.branch_default,
      });
    }

    if (state.price && state.cost) {
      if (state.cost > state.price) {
        setAlert({
          status: true,
          message: "El costo no puede se mayor al precio.",
        });
        setState({
          ...state,
          used: true,
        });
        return;
      }
    }

    if (state.category_id) {
      const {
        category: { code },
      } = itemSearch;

      if (code.codeNameCategory[0] !== "armazones") {
        setAlert({
          status: true,
          message: "Este codigo esta siendo usado en otra categoria.",
          class: "danger",
        });
        setState({
          ...state,
          used: true,
        });
        return;
      }
    }

    if (state.supplier_id) {
      const { supplier } = itemSearch;

      if (supplier.id !== state.supplier_id) {
        setAlert({
          status: true,
          message: "Este CODIGO de armazon esta asignado a otro proveedor",
          class: "warning",
        });
        setState({
          ...state,
          used: false,
        });
        return;
      }
    }

    setAlert({
      status: false,
      message: "",
      class: "danger",
    });
    setState({
      ...state,
      used: false,
    });
    return;
  }, [itemSearch?.id, state.category_id, state.cost]);

  return (
    <>
      {alert.status && (
        <div className={"alert alert-" + (alert.class ?? "danger") + " w-100"}>
          <h6>
            <i className="fas fa-exclamation-triangle mr-1"></i>
            {alert.message}
          </h6>
        </div>
      )}
      <div className="row">
        <div className="form-group col-4">
          <label htmlFor="code">Codigo</label>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Codigo del producto"
            defaultValue={state.code ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, code: value.toLowerCase() })
            }
          />
        </div>

        <div className="form-group col-8">
          <label htmlFor="code">Codigo de barras</label>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Codigo de barras"
            defaultValue={state.codeBar ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, codeBar: value.toLowerCase() })
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label htmlFor="code">Categoria</label>
          <select
            className="form-control text-uppercase"
            defaultValue={state.category_id ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, category_id: parseInt(value) })
            }
            disabled={(() => {
              // console.log("[DEBUG] codes:", state.code, state.codeBar);
              if (state.codeBar?.length > 10) {
                return false;
              }
              if (state.code?.length > 3) {
                return false;
              }

              return true;
            })()}
            onBlur={() => {
              const code = (Math.random() + 1).toString(36).substring(7);
              if (!state.code) {
                setState({
                  ...state,
                  code,
                });
              }
              searchFn(!state.code ? code : state.code);
            }}
          >
            <option>-- Seleccione uno --</option>
            {context.cats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col">
          <label htmlFor="code">Marca</label>
          <select
            className="form-control text-uppercase"
            defaultValue={state.brand_id ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, brand_id: parseInt(value) })
            }
            disabled={!state.category_id}
            onBlur={handleSetName}
          >
            <option>
              --{" "}
              {brands.length
                ? "Seleccione una marca"
                : "Primero seleccione un proveedor"}{" "}
              --
            </option>

            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-5">
          <label htmlFor="code">Sucrusal</label>
          <select
            className="form-control text-uppercase"
            value={braDef.status ? braDef.branch_id : state.branch_id ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, branch_id: parseInt(value) })
            }
            disabled={!state.brand_id || braDef.status}
            onBlur={handleSetPrice}
          >
            <option>-- Seleccione uno --</option>
            {context.branches.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-7">
          <label htmlFor="code">Descripcion</label>
          <input
            type="text"
            min={1}
            className="form-control text-uppercase"
            placeholder="Descripcion del producto"
            value={state.name ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, name: value.toLowerCase() })
            }
            disabled={!state.brand_id}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-3">
          <label htmlFor="code">Cantidad</label>
          <input
            type="number"
            min={1}
            className="form-control text-uppercase"
            placeholder="Cantidad inicial"
            defaultValue={state.cant ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, cant: parseInt(value) })
            }
            disabled={!state.branch_id}
          />
        </div>

        <div className="form-group col-3">
          <label htmlFor="code">Precio</label>
          <input
            type="number"
            min={1}
            className="form-control text-uppercase"
            placeholder="Cantidad inicial"
            value={state.price ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, price: parseFloat(value) })
            }
            disabled={!state.branch_id}
          />
        </div>

        <div className="form-group col-3">
          <label htmlFor="code">Costo</label>
          <input
            type="text"
            min={1}
            className="form-control text-uppercase"
            placeholder="Descripcion del producto"
            defaultValue={state.cost ?? ""}
            onChange={({ target: { value } }) =>
              setState({ ...state, cost: parseFloat(value) })
            }
            disabled={!state.price}
            onBlur={() => {}}
          />
        </div>
      </div>
    </>
  );
}
