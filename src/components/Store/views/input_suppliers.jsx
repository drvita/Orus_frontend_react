import { useEffect } from "react";
import { connect } from "react-redux";
//Actions
import { contactActions } from "../../../redux/contact/index";

function InputSuppliersComponent(props) {
  const {
    supplier,
    supplierRef,
    suppliers,
    showIcon = true,
    handleChangeSupplier: _handleChangeSupplier,
    _getSuppliers,
  } = props;
  const handleChangeSupplier = ({ target }) => {
    const { value } = target;
    if (_handleChangeSupplier) {
      _handleChangeSupplier(parseInt(value));
    }
  };

  useEffect(() => {
    _getSuppliers(null);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col">
        <small>
          <label>Proveedor</label>
        </small>
        {suppliers.length && (
          <div className="input-group mb-3">
            {showIcon && (
              <div className="input-group-prepend">
                <span
                  className={
                    supplier
                      ? "input-group-text bg-primary"
                      : "input-group-text bg-warning"
                  }
                >
                  <i className="fas fa-address-book"></i>
                </span>
              </div>
            )}
            <select
              className="custom-select text-uppercase"
              name="supplier"
              value={supplier}
              ref={supplierRef}
              onChange={handleChangeSupplier}
            >
              <option value="">--Seleccione un Proveedor--</option>
              {suppliers.map((sp) => {
                return (
                  <option value={sp.id} key={sp.id}>
                    {sp.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ contact }) => ({
    suppliers: contact.suppliers,
  }),
  mapActionsToProps = {
    _getSuppliers: contactActions.getListSuppliers,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InputSuppliersComponent);
