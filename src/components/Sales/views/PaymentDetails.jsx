import moment from "moment";

function PaymentModal({ payment = {}, handleClose: _close }) {
  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalles del abono</h5>
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <div className="row mb-2">
              <div className="col">
                <label className="mr-2">Metodo de pago</label>
                <span>{payment.metodoname}</span>
              </div>
              <div className="col">
                <label className="mr-2">Cantidad abonada</label>
                <span>${payment.total}</span>
              </div>
            </div>

            {payment.banco && payment.banco.id ? (
              <div className="row mb-2">
                <div className="col">
                  <label className="mr-2">Banco</label>
                  <span>{payment.banco.value}</span>
                </div>
                <div className="col">
                  <label className="mr-2">Auth</label>
                  <span>{payment.auth ?? "--"}</span>
                </div>
              </div>
            ) : null}

            <div className="row mb-2">
              <div className="col">
                <label className="mr-2 d-block">Folio</label>
                <span>{payment.id}</span>
              </div>
              <div className="col">
                <label className="mr-2 d-block">Fecha</label>
                <span>{moment(payment.created_at).format("LL")}</span>
              </div>
              <div className="col">
                <label className="mr-2 d-block text-uppercase">Recibio</label>
                <span>{payment.created.name}</span>
              </div>
            </div>
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
