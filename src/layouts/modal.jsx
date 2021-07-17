function ModalComponents({
  title = "confirmación",
  body,
  handleCancel: _handleCancel,
}) {
  const handleClose = () => {
    if (_handleCancel) _handleCancel();
  };
  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark text-bold text-capitalize">
              {title}
            </h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{body}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponents;
