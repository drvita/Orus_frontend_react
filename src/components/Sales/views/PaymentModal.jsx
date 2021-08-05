function PaymentModal({ handleClose: _close }) {
  const listBank = [];

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
            <form autoComplete="off">
              <div className="row mb-2">
                <div className="col">
                  <label>Metodo de pago</label>
                  <select name="metodopago" className="custom-select">
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
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label>Banco</label>
                  <select
                    name="bank_id"
                    className="custom-select text-uppercase"
                  >
                    <option value="0">--Seleccione un banco--</option>
                    {listBank.map((bank) => {
                      return (
                        <option
                          key={bank.id}
                          value={bank.id}
                          className="text-uppercase"
                        >
                          {bank.name}
                        </option>
                      );
                    })}
                  </select>

                  <label>Espesifique</label>
                  <input type="text" name="details" className="form-control" />
                </div>
                <div className="col">
                  <label>N. Autorización</label>
                  <input type="text" name="auth" className="form-control" />
                </div>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
