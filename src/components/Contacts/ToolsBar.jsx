/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";

import SideBar from "../../pages/partials/SideBar";
import { Contacts } from "../../context/ContactContext";

export default function ToolBarContact({
  newOrEdit = false,
  handleNewOrEdit: _handleNewOrEdit,
}) {
  const context = Contacts();
  const history = useHistory();

  return (
    <div className="col-sm-12 col-md-2">
      <button
        className="btn bg-indigo btn-block mb-3"
        type="button"
        disabled={newOrEdit}
        onClick={() => _handleNewOrEdit()}
      >
        <i className="fas fa-plus mr-1"></i>
        Nuevo contacto
      </button>
      <SideBar title={newOrEdit ? "Menu" : "Filtros"}>
        {!newOrEdit ? (
          <>
            <li className="nav-item p-2">
              <label htmlFor="type">Tipo</label>
              <select
                className="form-control "
                name="type"
                id="type"
                value={context.options?.type}
                onChange={({ target }) => {
                  const value = parseInt(target.value);

                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      type: !isNaN(value) ? value : "",
                    },
                  });
                }}
              >
                <option value="">-- Todos --</option>
                <option value="0">Clientes</option>
                <option value="1">Proveedores</option>
              </select>
            </li>
            <li className="nav-item p-2">
              <label htmlFor="orderby">Ordenar por</label>
              <select
                className="form-control "
                name="orderby"
                id="orderby"
                value={context.options?.orderby}
                onChange={({ target }) => {
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      orderby: target.value,
                    },
                  });
                }}
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
                value={context.options?.order}
                onChange={({ target }) => {
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      order: target.value,
                    },
                  });
                }}
              >
                <option value="asc">Antiguos</option>
                <option value="desc">Recientes</option>
              </select>
            </li>
            <li className="nav-item p-2">
              <label htmlFor="itemsPage">Numero de contactos</label>
              <select
                className="form-control "
                name="itemsPage"
                id="itemsPage"
                value={context.options?.itemsPage}
                onChange={({ target }) => {
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      itemsPage: parseInt(target.value),
                    },
                  });
                }}
              >
                <option value="25">ver 25</option>
                <option value="50">ver 50</option>
                <option value="75">ver 75</option>
                <option value="100">ver 100</option>
              </select>
            </li>
          </>
        ) : (
          <>
            <li className="list-group-item">
              <a
                href="#back"
                className="d-flex justify-content-between align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("[DEBUG] Tool bar:", context.options?.page);
                  history.push("/contactos");
                }}
              >
                Ver listado
                <span className="badge badge-primary badge-pill">
                  <i className="fas fa-chevron-left"></i>
                </span>
              </a>
            </li>
            {context.contact?.id ? (
              <li className="list-group-item">
                <a
                  href="#details"
                  className="d-flex justify-content-between align-items-center"
                >
                  Detalles
                  <span className="badge badge-primary badge-pill">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </a>
              </li>
            ) : null}
          </>
        )}
      </SideBar>
    </div>
  );
}
