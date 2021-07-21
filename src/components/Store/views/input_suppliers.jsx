import { useEffect } from "react";
import { connect } from "react-redux";
//Actions
import { contactActions } from "../../../redux/contact/index";

function InputSuppliersComponent(props) {
  const {
    supplier,
    supplierRef,
    suppliers,
    handleChangeSupplier: _handleChangeSupplier,
    _getSuppliers,
  } = props;

  useEffect(() => {
    _getSuppliers();
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
            <select
              className="custom-select text-uppercase"
              name="supplier"
              value={supplier}
              ref={supplierRef}
              onChange={(e) => {
                const { value } = e.target;
                _handleChangeSupplier(parseInt(value));
              }}
            >
              <option value="0">--Seleccione un Proveedor--</option>
              {suppliers.map((sp) => {
                return (
                  <option value={sp.id} key={sp.id}>
                    {sp.nombre}
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
