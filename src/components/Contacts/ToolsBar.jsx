/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SideBar from "../../pages/partials/SideBar";
import { Contacts } from "../../context/ContactContext";

export default function ToolBarContact({
  newOrEdit = false,
  handleNewOrEdit: _handleNewOrEdit,
}) {
  const _contacts = Contacts();
  const contact = _contacts.contact ?? {};
  const options = _contacts.options ?? {};
  const history = useHistory();

  useEffect(() => {
    console.log("[DEBUG] Tool Bar options:", options);
  }, [_contacts.options]);

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
                value={options.type}
                onChange={({ target }) => {
                  const value = parseInt(target.value);

                  _contacts.setOptions(_contacts, {
                    ...options,
                    type: !isNaN(value) ? value : "",
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
                value={options.orderby}
                onChange={({ target }) => {
                  _contacts.setOptions(_contacts, {
                    ...options,
                    orderby: target.value,
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
                value={options.order}
                onChange={({ target }) => {
                  _contacts.setOptions(_contacts, {
                    ...options,
                    order: target.value,
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
                value={options.itemsPage}
                onChange={({ target }) => {
                  _contacts.setOptions(_contacts, {
                    ...options,
                    itemsPage: parseInt(target.value),
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
                  _contacts.setOptions(_contacts, {
                    ...options,
                    page: 1,
                  });
                  history.push("/contactos");
                  _handleNewOrEdit();
                }}
              >
                Ver listado
                <span className="badge badge-primary badge-pill">
                  <i className="fas fa-chevron-left"></i>
                </span>
              </a>
            </li>
            {contact.id ? (
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
