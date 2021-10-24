import { useEffect } from "react";
import { connect } from "react-redux";
//Components
import { storeActions } from "../../../redux/store/index";

function InputBrandComponents(props) {
  const {
    brandsName,
    brand,
    textSelect = "Seleccione una marca",
    brandRef,
    brands,
    supplier,
    showIcon = true,
    //Funtions
    _getBrands,
    onBlur: _onBlur,
    handleChangeBrand: _handleChangeBrand,
  } = props;
  //Funtions
  const handleChangeCategory = ({ target }) => {
    const { value } = target;
    if (_handleChangeBrand) {
      _handleChangeBrand(parseInt(value));
    }
  };

  useEffect(() => {
    if (supplier) {
      _getBrands({
        supplier,
      });
    }
    //eslint-disable-next-line
  }, [supplier]);
  return (
    <div className="row">
      <div className="col">
        <small>
          <label>Marca</label>
        </small>
        {brands.length ? (
          <div className="input-group mb-3">
            {showIcon && (
              <div className="input-group-prepend">
                <span
                  className={
                    brand
                      ? "input-group-text bg-primary"
                      : "input-group-text bg-warning"
                  }
                >
                  <i className="fas fa-copyright"></i>
                </span>
              </div>
            )}
            <select
              className="custom-select text-uppercase"
              name={brandsName}
              value={brand}
              ref={brandRef}
              onChange={handleChangeCategory}
              onBlur={_onBlur}
            >
              <option value="0">--{textSelect}--</option>
              {brands.map((brand) => {
                return (
                  <option value={brand.id} key={brand.id}>
                    {brand.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <p className="text-danger">
            <i className="fas fa-info-circle mr-1"></i>
            No exiten marcas para este proveedor!
          </p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ storeItem }) => ({
    brands: storeItem.brands,
  }),
  mapActionsToProps = {
    _getBrands: storeActions.getListBrands,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InputBrandComponents);
