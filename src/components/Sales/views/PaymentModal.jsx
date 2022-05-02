import { useState, useContext } from "react";
//Context
import { ConfigContext } from "../../../context/ConfigContext";
import { Sale } from '../../../context/SaleContext';

//Helpers
import helpers from "../helpers";

function PaymentModal({forPaid, handleClose: _close }) {

    const config = useContext(ConfigContext);
    const listBanks = config.data;
    
    const sale = Sale();

  //States
  const [data, setData] = useState({
    id: 0,
    metodopago: 1,
    metodoname: "efectivo",
    total: 0,
    bank_id: null,
    details: null,
    auth: null,
  });

  //Functions
  const handleChangeInput = ({ name, value, type }) => {

      let val = value;

      if (type === "number" || type === "select-one") val = parseFloat(value);

      setData({
        ...data,
        [name]: val,
      });
    },

    handleSetPayment = () => {
      const payments = [...sale.payments];
      let pagado = 0;

      if (!data.total) {
        window.Swal.fire({
          icon: "warning",
          title: "El total del abono debe ser mayor a 0",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      }

      if (
        data.metodopago !== 1 &&
        data.metodopago !== 4 &&
        data.metodopago !== 0
      ) {
        if (!data.bank_id) {
          window.Swal.fire({
            icon: "warning",
            title: "Seleccione un banco",
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        }
        if (data.auth.toString().length < 4) {
          window.Swal.fire({
            icon: "warning",
            title: "Espesifique los ultimos 4 numeros de la tarjeta",
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        }else if(data.auth.toString().length > 4){
          window.Swal.fire({
            icon: "warning",
            title: "Espesifique solamente 4 numeros",
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        }
      }

      if (data.metodopago === 4) {
        console.log("Metodo Pago",data.metodoname);
        if (!data.auth) {
          window.Swal.fire({
            icon: "warning",
            title: "Espesifique el numero de autorización",
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        }
      }

      payments.push({
        ...data,
        id:`new${Date.now().toString()}`,
        metodoname: helpers.getMethodName(data.metodopago),
        total: forPaid < data.total ? forPaid : data.total,
      });

      payments.forEach((pay) => (pagado += pay.total));

      _close();

      sale.set({
        ...sale,
        payments: payments,
      })
      
    },
    handleSubmitForm = (e) => {
      e.preventDefault();
      handleSetPayment();
    };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Capture el pago</h5>
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <form autoComplete="off" onSubmit={handleSubmitForm}>
              <div className="row mb-2 bg-gray-light">
                <div className="col">
                  <h4 className="text-center">
                    Por pagar: <span className="text-success">$ {forPaid}</span>
                  </h4>
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <label>Metodo de pago</label>
                  <select
                    name="metodopago"
                    className="custom-select text-uppercase"
                    onChange={({ target }) => handleChangeInput(target)}
                    defaultValue={data.metodopago}
                  >
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta de debito</option>
                    <option value="3">Tarjeta de credito</option>
                    <option value="4">La marina</option>
                    <option value="5">Cheque</option>
                    <option value="6">Transferencia</option>
                    <option value="0">Otro</option>
                  </select>
                </div>
                <div className="col">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control text-right"
                    name="total"
                    onChange={({ target }) => handleChangeInput(target)}
                    autoFocus={true}
                  />
                </div>
              </div>

              {data.metodopago !== 1 ? (
                <div className="row mb-2">
                  <div className="col">
                    {data.metodopago !== 4 && data.metodopago !== 0 ? (
                      <>
                        <label>Banco</label>
                        <select
                          name="bank_id"
                          className="custom-select text-uppercase"
                          onChange={({ target }) => handleChangeInput(target)}
                        >
                          <option value="">--Seleccione un banco--</option>
                          {listBanks.map((bank) => {
                            return bank.name === 'bank' ? (
                              <option key={bank.id} value={bank.id}>
                                {bank.data}
                              </option>
                            ): null;
                          })}
                        </select>
                      </>
                    ) : !data.metodopago ? (
                      <>
                        <label>Espesifique</label>
                        <input
                          type="text"
                          name="details"
                          className="form-control"
                          onChange={({ target }) => handleChangeInput(target)}
                        />
                      </>
                    ) : (
                      <h4 className="d-bloc text-center mt-4 text-success">
                        LA MARINA
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <label>
                      {data.metodopago !== 4
                        ? "Ultimos 4 digitos"
                        : "N. Autorización"}
                    </label>
                    <input
                       type="number"
                      name="auth"
                      className="form-control"
                      onChange={({ target }) => handleChangeInput(target)}
                    />
                  </div>
                </div>
              ) : null}

              {forPaid < data.total ? (
                <div className="row">
                  <div className="col">
                    <h4 className="text-center mt-4">
                      {data.metodopago === 1 ? (
                        <>
                          Cambio:
                          <span className="ml-2">$ {data.total - forPaid}</span>
                        </>
                      ) : (
                        <span className="text-danger">
                          <i className="fas fa-info-circle mr-2"></i>
                          La cantidad cobrada es mayor al total
                        </span>
                      )}
                    </h4>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => _close()}
            >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSetPayment()}
              disabled={!data.total}
            >
              <i className="fas fa-money-bill mr-1"></i>
              Abonar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
