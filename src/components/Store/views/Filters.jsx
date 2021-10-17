import { connect } from "react-redux";
//Components
import CardMenu from "../../../layouts/card_menu";
import BrandsInput from "./input_brand";
import SuppliersInput from "./input_suppliers";
//Actions
import { storeActions } from "../../../redux/store/index";

function FiltersComponent(props) {
  const {
    options,
    panel,
    _setOptions,
    handleChangePage: _handleChangePage,
  } = props;

  //Funciones
  const handleSetSelectOptions = (target) => {
      //console.log("[DEBUG] cambio de filtro en almacen");
      const { name, value, checked } = target;
      let val = value;

      console.log("[Orus System] Cambiando filtros");
      if (name === "itemsPage") val = parseInt(value);
      if (name === "supplier" && value > 0) val = parseInt(value);
      if (name === "zero") {
        if (checked) val = "true";
        else val = "false";
      }

      _setOptions({
        key: name,
        value: val,
      });
    },
    handleChangeBrand = (id) => {
      console.log("[Orus System] Cambiando filtros");
      _setOptions({
        key: "brand",
        value: id,
      });
    },
    handleChangeSupplier = (id) => {
      console.log("[Orus System] Cambiando filtros");
      _setOptions({
        key: "brand",
        value: "",
      });
      _setOptions({
        key: "supplier",
        value: id,
      });
    };

  return (
    <CardMenu title={panel === "inbox" ? "Menu y filtros" : "Menu"}>
      <li className="nav-item">
        <a
          href="#item"
          className={panel === "inbox" ? "nav-link text-dark" : "nav-link"}
          onClick={(e) => {
            e.preventDefault();
            _handleChangePage("inbox");
          }}
        >
          <i
            className={
              panel === "inbox" ? "fas fa-plus mr-1" : "fas fa-minus mr-1"
            }
          ></i>
          Productos
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={panel === "category" ? "nav-link text-dark" : "nav-link"}
          onClick={(e) => {
            e.preventDefault();
            _handleChangePage("category");
          }}
        >
          <i
            className={
              panel === "category" ? "fas fa-plus mr-1" : "fas fa-minus mr-1"
            }
          ></i>
          Categorias
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={panel === "brands" ? "nav-link text-dark" : "nav-link"}
          onClick={(e) => {
            e.preventDefault();
            _handleChangePage("brands");
          }}
        >
          <i
            className={
              panel === "brands" ? "fas fa-plus mr-1" : "fas fa-minus mr-1"
            }
          ></i>
          Marcas
        </a>
      </li>
      {/* <li className="nav-item">
        <a
          href="#item"
          className={panel === "inventory" ? "nav-link text-dark" : "nav-link"}
          onClick={(e) => {
            e.preventDefault();
            _handleChangePage("inventory");
          }}
        >
          <i
            className={
              panel === "inventory" ? "fas fa-plus mr-1" : "fas fa-minus mr-1"
            }
          ></i>
          Inventario
        </a>
      </li> */}
      {panel === "inbox" && (
        <>
          <li className="nav-item p-1">
            <SuppliersInput
              supplier={options.supplier}
              showIcon={false}
              handleChangeSupplier={(id) => handleChangeSupplier(id)}
            />
          </li>
          {options.supplier ? (
            <li className="nav-item p-1">
              <BrandsInput
                supplier={options.supplier}
                brand={options.brand}
                showIcon={false}
                handleChangeBrand={(id) => handleChangeBrand(id)}
              />
            </li>
          ) : null}
          <li className="nav-item p-1">
            <div className="custom-control custom-switch">
              <input
                name="zero"
                type="checkbox"
                className="custom-control-input"
                id="zero"
                checked={options.zero === "true" ? true : false}
                onChange={({ target }) => handleSetSelectOptions(target)}
              />
              <label
                className="custom-control-label font-weight-normal"
                htmlFor="zero"
              >
                Cantidades en cero
              </label>
            </div>
          </li>
          <li className="nav-item p-1">
            <label htmlFor="orderby">Ordenar por</label>
            <select
              className="custom-select text-uppercase"
              name="orderby"
              id="orderby"
              value={options.orderby}
              onChange={({ target }) => handleSetSelectOptions(target)}
            >
              <option value="created_at">Fecha de registro</option>
              <option value="updated_at">Fecha de modificacion</option>
            </select>
          </li>
          <li className="nav-item p-1">
            <label htmlFor="order">Mostrar por</label>
            <select
              className="custom-select text-uppercase"
              name="order"
              id="order"
              value={options.order}
              onChange={({ target }) => handleSetSelectOptions(target)}
            >
              <option value="asc">Antiguos</option>
              <option value="desc">Recientes</option>
            </select>
          </li>
          <li className="nav-item p-1">
            <label htmlFor="itemsPage">Numero de productos</label>
            <select
              className="custom-select text-uppercase"
              name="itemsPage"
              id="itemsPage"
              value={options.itemsPage}
              onChange={({ target }) => handleSetSelectOptions(target)}
            >
              <option value="10">ver 10</option>
              <option value="20">ver 20</option>
              <option value="50">ver 50</option>
              <option value="100">ver 100</option>
            </select>
          </li>
        </>
      )}
    </CardMenu>
  );
}

const mapStateToProps = ({ storeItem, contact }) => {
    return {
      options: storeItem.options,
    };
  },
  mapActionsToProps = {
    _setOptions: storeActions.setOptions,
  };

export default connect(mapStateToProps, mapActionsToProps)(FiltersComponent);
