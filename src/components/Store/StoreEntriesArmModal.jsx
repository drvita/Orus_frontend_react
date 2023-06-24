/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Store } from "../../context/StoreContext";
import useStore from "../../hooks/useStore";
import FormEntries from "./views/FormEntries";
import { Auth } from "../../context/AuthContext";

export default function ModalComponents({
  handleCancel: _handleCancel,
  handleAdd: _handleAdd,
  supplier_id,
}) {
  const context = Store();
  const user = Auth().auth;
  const hookStore = useStore();
  const [brands, setBrands] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [load, setLoad] = useState(false);
  const [itemSearch, setItemSearch] = useState(null);
  const [state, setState] = useState({
    id: Date.now(),
    code: "",
    codeBar: "",
    category_id: "",
    brand_id: "",
    branch_id: user.branch.id,
    cant: 1,
    name: "",
    price: 0,
    cost: 0,
    saved: false,
    cantAdd: false,
    used: false,
  });
  const handleSearchItem = (search) => {
    setLoad(true);
    return hookStore
      .getItems({
        search,
      })
      .then((res) => {
        const item = res.data.find(
          (i) => i.code.toLowerCase() === state.code.toLowerCase()
        );
        setItemSearch(item);
        setLoad(false);
        return item;
      });
  };

  useEffect(() => {
    console.log("[Orus System] Selected supplier id:", supplier_id);
    console.log("[Orus System] Branch id default:", user.branch.id);
    if (!supplier_id) {
      setBrands([]);
      return;
    }

    const supplierSelected = context.suppliers.filter(
      (sup) => sup.id === supplier_id
    );

    if (supplierSelected && !supplierSelected.length) {
      console.log(
        "[Orus System] Not found supplier from list:",
        supplierSelected
      );
      setBrands([]);
      return;
    }

    const brands = supplierSelected[0].brands;
    setBrands(brands);
  }, []);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark text-bold text-capitalize">
              Agregar nuevo armazon
            </h5>
            <button type="button" className="close" onClick={_handleCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <FormEntries
              state={state}
              setState={setState}
              brands={brands}
              itemSearch={itemSearch}
              searchFn={handleSearchItem}
            />
          </div>
          <div className="modal-footer">
            {confirm ? (
              <div className="alert alert-warning w-100">
                <div className="row">
                  <div className="col-9">
                    El <strong>codigo</strong> ya se encuentra registrado.{" "}
                    <br />
                    <strong>
                      ¿Desea agregar las cantidades a este Armazon?
                    </strong>
                  </div>
                  <div className="col-3 text-rigth">
                    <button
                      className="btn btn-dark"
                      onClick={() => _handleAdd(state)}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="btn-group">
                <button
                  className="btn btn-dark"
                  onClick={() => _handleCancel()}
                >
                  <i className="fas fa-ban mr-1" />
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setLoad(true);
                    if (itemSearch) {
                      const branches = itemSearch.branches.filter(
                        (b) => b.branch_id === state.branch_id
                      );
                      const branch = branches.length ? branches[0] : null;

                      if (branch) {
                        console.log("[Orus System] Sent confirm");
                        setState({
                          ...state,
                          saved: true,
                        });
                        setConfirm(true);
                        setLoad(false);
                        return itemSearch;
                      }
                    }

                    console.log("[Orus System] Add new item");
                    _handleAdd(state);
                    return;
                  }}
                  disabled={(() => {
                    if (
                      load ||
                      (state.codeBar && state.codeBar.length < 10) ||
                      !state.brand_id ||
                      !state.branch_id ||
                      !state.cant ||
                      state.cant < 1 ||
                      !state.name ||
                      state.name.length < 8 ||
                      state.price < 1 ||
                      state.used
                    ) {
                      return true;
                    }

                    if (state.price < state.cost) {
                      return true;
                    }
                    return false;
                  })()}
                >
                  <i className="fas fa-plus mr-1" />
                  {load ? "Guardando..." : "Agregar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
