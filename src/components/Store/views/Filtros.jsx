import { connect } from "react-redux";
import { useEffect } from "react";
//Components
import CardMenu from "../../../layouts/card_menu";
//Actions
import { storeActions } from "../../../redux/store/index";
import { contactActions } from "../../../redux/contact/index";

function FiltersComponent(props) {
  const { options, suppliers, _getContacts, _setOptions } = props;

  //Funciones
  const handleSetSelectOptions = (target) => {
    console.log("[DEBUG] cambio de filtro");
    const { name, value } = target;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);

    _setOptions({
      key: name,
      value: val,
    });
  };

  useEffect(() => {
    _getContacts({
      type: 1,
      business: 0,
    });
    //eslint-disable-next-line
  }, []);

  return (
    <CardMenu title="Menu y filtros">
      <li className="nav-item">
        <a
          href="#item"
          className={"nav-link"}
          onClick={(e) => {
            e.preventDefault();
            this.props.history.push(`/almacen/categorias`);
          }}
        >
          Categorias
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={"nav-link"}
          onClick={(e) => {
            e.preventDefault();
            this.props.history.push(`/almacen/marcas`);
          }}
        >
          Marcas
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={"nav-link"}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              panel: "inventory",
            });
            this.props.history.push(`/almacen/inventario`);
          }}
        >
          Inventario
        </a>
      </li>
      <li className="nav-item p-2">
        <label htmlFor="supplier">Proveedor</label>
        <select
          className="form-control "
          name="supplier"
          id="supplier"
          value={options.supplier}
          onChange={({ target }) => handleSetSelectOptions(target)}
        >
          <option value="">-- Todos --</option>
          {suppliers.map((supplier) => {
            return (
              <option value={supplier.id} key={supplier.id}>
                {supplier.nombre}
              </option>
            );
          })}
        </select>
      </li>
      <li className="nav-item p-2">
        <label htmlFor="orderby">Ordenar por</label>
        <select
          className="form-control "
          name="orderby"
          id="orderby"
          value={options.orderby}
          onChange={({ target }) => handleSetSelectOptions(target)}
        >
          <option value="created_at">Fecha de registro</option>
          <option value="updated_at">Fecha de modificacion</option>
        </select>
      </li>
      <li className="nav-item p-2">
        <label htmlFor="order">Mostrar por</label>
        <select
          className="form-control "
          name="order"
          id="order"
          value={options.order}
          onChange={({ target }) => handleSetSelectOptions(target)}
        >
          <option value="asc">Antiguos</option>
          <option value="desc">Recientes</option>
        </select>
      </li>
      <li className="nav-item p-2">
        <label htmlFor="itemsPage">Numero de productos</label>
        <select
          className="form-control "
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
    </CardMenu>
  );
}

const mapStateToProps = ({ storeItem, contact }) => {
    return {
      options: storeItem.options,
      suppliers: contact.list,
    };
  },
  mapActionsToProps = {
    _setOptions: storeActions.setOptions,
    _getContacts: contactActions.getListContacts,
  };

export default connect(mapStateToProps, mapActionsToProps)(FiltersComponent);
