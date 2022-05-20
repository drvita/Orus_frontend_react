import { Store } from "../../context/StoreContext";
//Components
import CardMenu from "../../layouts/card_menu";
import BrandsInput from "./Brands";
import SuppliersInput from "./Suppliers";
import { useHistory } from "react-router-dom";

export default function ToolBar() {
  const context = Store();
  const history = useHistory();

  //Funciones
  const handleSetSelectOptions = ({ name, value, checked }) => {
    if (name === "itemsPage") value = parseInt(value);
    if (name === "supplier" && value > 0) value = parseInt(value);
    if (name === "zero") {
      if (checked) value = "true";
      else value = "false";
    }

    context.set({
      ...context,
      options: {
        ...context.options,
        [name]: value,
      },
    });
  };
  const handleChangeSupplier = (id) => {
    context.set({
      ...context,
      options: {
        ...context.options,
        brand: "",
        supplier: id,
      },
    });
  };

  // useEffect(() => {
  //   console.log("[DEBUG] Options:", context.options);
  // }, [context.options]);

  return (
    <CardMenu title={context.panel === "inbox" ? "Menu y filtros" : "Menu"}>
      <li className="nav-item">
        <a
          href="#item"
          className={
            context.panel === "inbox" ? "nav-link  disabled" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();
            context.set({
              ...context,
              panel: "inbox",
            });
            history.push('/almacen');
          }}
        >
          <i
            className={
              context.panel === "inbox"
                ? "fas fa-check text-success mr-1"
                : "fas fa-plus mr-1"
            }
          ></i>
          Productos
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={
            context.panel === "category" ? "nav-link disabled" : "nav-link "
          }
          onClick={(e) => {
            e.preventDefault();

            context.set({
              ...context,
              panel: "category",
            });

            history.push('/almacen');
          }}
        >
          <i
            className={
              context.panel === "category"
                ? "fas fa-check text-success mr-1"
                : "fas fa-plus mr-1"
            }
          ></i>
          Categorias
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={
            context.panel === "brands" ? "nav-link disabled" : "nav-link"
          }
          onClick={(e) => {
            e.preventDefault();

            context.set({
              ...context,
              panel: "brands",
            });

            history.push('/almacen');
          }}
        >
          <i
            className={
              context.panel === "brands"
                ? "fas fa-check text-success mr-1"
                : "fas fa-plus mr-1"
            }
          ></i>
          Marcas
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#item"
          className={context.panel === "inventory" ? "nav-link disabled" : "nav-link"}
          onClick={(e) => {
            e.preventDefault();

            context.set({
              ...context,
              panel: "inventory",
            })

            //history.push('/almacen');
          }}
        >
          <i
            className={
              context.panel === "inventory" ? "fas fa-check text-success mr-1" : "fas fa-plus mr-1"
            }
          ></i>
          Inventario
        </a>
      </li>

      {context.panel === "inbox" && (
        <>
          <li className="nav-item p-1">
            <SuppliersInput
              supplier={context.options?.supplier}
              showIcon={false}
              handleChangeSupplier={(id) => handleChangeSupplier(id)}
            />
          </li>
          {context.options?.supplier && (
            <li className="nav-item p-1">
              <BrandsInput
                supplier={context.options?.supplier}
                brand={context.options?.brand}
                showIcon={false}
                handleChangeBrand={(id) =>{
                  handleSetSelectOptions({
                      name: "brand", 
                      value: id 
                    })
                }}
              />
            </li>
          )}
          <li className="nav-item p-1">
            <div className="custom-control custom-switch">
              <input
                name="zero"
                type="checkbox"
                className="custom-control-input"
                id="zero"
                checked={context.options?.zero === "true" ? true : false}
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
              value={context.options?.orderby}
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
              value={context.options?.order}
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
              value={context.options?.itemsPage}
              onChange={({ target }) => handleSetSelectOptions(target)}
            >
              <option value="25">ver 25</option>
              <option value="50">ver 50</option>
              <option value="75">ver 75</option>
              <option value="100">ver 100</option>
            </select>
          </li>
        </>
      )}
    </CardMenu>
  );
}
