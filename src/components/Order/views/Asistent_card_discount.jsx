/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

export default function CardDiscount({
  data,
  disabled,
  handleSetDiscount: _handleSetDiscount,
}) {
  const [state, setState] = useState({
    showForm: false,
    discount: null,
    toPaid: 0,
  });

  const setDiscount = () => {
    const isNumeric = /^[0-9]+$/gms;
    const isPercen = /^[0-9]{2,3}%$/gms;
    let value = 0;

    if (!state.discount) {
      setState({
        ...state,
        showForm: false,
      });
      return;
    }

    if (state.discount.match(isNumeric)) {
      value = parseInt(state.discount);
      value = value > data.total ? data.total : parseInt(state.discount);
    } else if (state.discount.match(isPercen)) {
      const percent = parseInt(state.discount.replace("%", "")) / 100;
      value = percent >= 1 ? data.total : parseInt(data.total * percent);
    }

    _handleSetDiscount("sale", {
      ...data,
      discount: value,
    });
    setState({
      ...state,
      showForm: false,
    });
  };

  return (
    <>
      <div className="card col-lg-4">
        <div className="card-header border-primary">
          <h3 className="card-title">
            <i className="fas fa-percent mr-1"></i>
            Descuento
          </h3>
        </div>
        <div className="card-body">
          {state.showForm ? (
            <>
              <p className="ml-1 text-dark my-2">
                *Escribe la cantidad o el porcentaje con un "%" al final
              </p>
              <div className="form-row">
                <div className="col-8">
                  <input
                    value={state.discount ?? ""}
                    className="form-control"
                    type="text"
                    onChange={({ target }) =>
                      setState({ ...state, discount: target.value })
                    }
                    onKeyPress={({ key }) => key === "Enter" && setDiscount()}
                  />
                </div>
                <div className="col">
                  <button className="btn btn-primary" onClick={setDiscount}>
                    {state.discount ? (
                      <>
                        <i className="fas fa-save mr-1"></i> Guardar
                      </>
                    ) : (
                      <>
                        <i className="fas fa-ban mr-1"></i> Cancelar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h5 className="font-weight-bold">
                {disabled ? (
                  <span className="text-danger text-sm">
                    <i className="fas fa-info-circle mr-2"></i>
                    Para aplicar un <strong>descuento</strong>, elimine primero
                    los abonos.
                  </span>
                ) : (
                  <>
                    Descuento:
                    <span className="font-weight-normal ml-2">
                      $ {data.discount?.toFixed(2)}
                    </span>
                  </>
                )}
              </h5>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  disabled={!Boolean(data.discount)}
                  onClick={() => {
                    _handleSetDiscount("sale", {
                      ...data,
                      discount: 0,
                    });
                    setState({
                      ...state,
                      discount: 0,
                    });
                  }}
                >
                  <i className="fas fa-window-close mr-1"></i>
                  Eliminar
                </button>
                <button
                  className="btn btn-warning mr-4"
                  disabled={disabled}
                  onClick={() => {
                    setState({
                      ...state,
                      showForm: true,
                    });
                  }}
                >
                  <i className="fas fa-edit mr-1"></i>
                  Editar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
