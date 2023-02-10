import { useEffect, useState } from "react";
import { Store } from "../../../context/StoreContext";

export default function FormEntriesInvoice({ state, setState }) {
  const context = Store();
  const [btnStatus, setBtnStatus] = useState(true);

  const handleShowList = () => {
    if (state.invoice && state.supplier_id) {
      setState({
        ...state,
        showList: true,
      });
      setBtnStatus(false);
    } else if (btnStatus) {
      setBtnStatus(true);
    }
  };

  useEffect(() => {
    if (!state.invoice || !state.supplier_id) {
      setBtnStatus(true);
    }
  }, [state.invoice, state.supplier_id]);

  return (
    <div className="row">
      <div className="form-group col">
        <label className="mr-2" htmlFor="code">
          Número de factura
        </label>
        <input
          type="text"
          className="form-control text-uppercase"
          placeholder="Ej: FAC2023001"
          id="code"
          value={state.invoice ?? ""}
          maxLength="50"
          onChange={({ target: { value } }) =>
            setState({ ...state, invoice: value.toLowerCase() })
          }
          onBlur={handleShowList}
          onKeyPress={({ key }) => key === "Enter" && handleShowList}
        />
      </div>

      <div className="form-group col">
        <label htmlFor="code">Proveedor</label>
        <select
          className="form-control text-uppercase"
          value={state.supplier_id ?? ""}
          onChange={({ target: { value } }) =>
            setState({ ...state, supplier_id: parseInt(value) })
          }
          onBlur={handleShowList}
          disabled={!btnStatus}
        >
          {/* Load suppliers */}
          <option>-- Seleccione uno --</option>
          {context.suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </select>
      </div>

      {btnStatus && (
        <div className="form-group col-2 pt-4">
          <button className="btn btn-dark mt-1">Empezar</button>
        </div>
      )}
    </div>
  );
}
