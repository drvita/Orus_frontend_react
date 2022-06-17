import { useContext } from "react";
//Context
import { OrderContext } from "../../context/OderContext";
import SideBar from "../../pages/partials/SideBar";

export default function Toolbar() {
  const orderContext = useContext(OrderContext);
  const options = orderContext.options;

  const handleSetSelectOptions = ({ target }) => {
    const { value, name } = target;
    //if(name === 'status' || name === 'itemsPage'){}
    orderContext.set({
      ...orderContext,
      options: {
        ...options,
        [name]: value,
      },
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 d-print-none">
        <a
          href="#new"
          className={
            ["edit", "newOrder"].includes(orderContext.panel)
              ? "disabled mb-3 btn btn-secondary btn-block"
              : "mb-3 btn btn-warning btn-block"
          }
          onClick={(e) => {
            e.preventDefault();
            orderContext.set({
              ...orderContext,
              panel: "newOrder",
            });
          }}
          disabled={
            ["edit", "newOrder"].includes(orderContext.panel) ? true : false
          }
        >
          <i className="mr-2 fas fa-plus"></i>
          Pedido nuevo
        </a>

        {orderContext.panel === "inbox" && (
          <SideBar title="Filtros">
            {orderContext.panel === "inbox" ? (
              <>
                <li className="nav-item">&nbsp;</li>
                <li className="p-2 nav-item">
                  <label htmlFor="status">Estado del pedido</label>
                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    value={options.status}
                    onChange={handleSetSelectOptions}
                  >
                    <option value="">-- Todos --</option>
                    <option value="0">En proceso</option>
                    <option value="1">Laboratorio</option>
                    <option value="2">Bicelación</option>
                    <option value="3">Terminado</option>
                    <option value="4">Entregado</option>
                  </select>
                </li>
                <li className="nav-item p-2">
                  <label htmlFor="orderby">Ordenar por</label>
                  <select
                    className="form-control "
                    name="orderby"
                    id="orderby"
                    value={options.orderby}
                    onChange={handleSetSelectOptions}
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
                    onChange={handleSetSelectOptions}
                  >
                    <option value="asc">Antiguos</option>
                    <option value="desc">Recientes</option>
                  </select>
                </li>
                <li className="nav-item p-2">
                  <label htmlFor="itemsPage">Numero de pedidos</label>
                  <select
                    className="form-control "
                    name="itemsPage"
                    id="itemsPage"
                    value={options.itemsPage}
                    onChange={handleSetSelectOptions}
                  >
                    <option value="25">ver 25</option>
                    <option value="50">ver 50</option>
                    <option value="75">ver 75</option>
                    <option value="100">ver 100</option>
                  </select>
                </li>
              </>
            ) : null}
          </SideBar>
        )}
      </div>
    </div>
  );
}
