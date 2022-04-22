/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Inbox from "../../layouts/list_inbox";
import { Contacts } from "../../context/ContactContext";

export default function InboxContact({
  loading = false,
  contactSelected = {},
  handleNewOrEdit: _handleNewOrEdit,
}) {
  const _contacts = Contacts();
  const contacts = _contacts.list.data ?? [];
  const meta = _contacts.list.meta ?? {};
  const options = _contacts.options;
  const history = useHistory();

  useEffect(() => {
    // console.log("[DEBUG] Inbox:", contacts);
  }, []);

  return (
    <Inbox
      title="Lista de contactos"
      icon="id-badge"
      color="indigo"
      loading={loading}
      meta={meta}
      itemSelected={contactSelected}
      //   handlePagination={handleChangePage}
      //   handleSearch={handleSearch}
      //   handleDeleteItem={handleDelete}
      //   handleEditItem={handleEditItem}
      handleSync={() => {
        _contacts.setOptions(_contacts, {
          ...options,
          page: 1,
        });
      }}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>E-mail</th>
            <th>Telefono</th>
            <th>Creado por</th>
            <th>
              {options.orderby === "created_at" ? "Registrado" : "Actualizado"}
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td className="icheck-primary pl-2">
                  <input
                    type="checkbox"
                    className="form-check-input mt-4"
                    value={contact.id}
                    id={"contact_" + contact.id}
                    //disabled={contact.enUso}
                    checked={contactSelected === contact.id ? true : false}
                    onChange={({ target }) => {
                      console.log("[DEBUG] checkbox:", target.value);
                      history.push(`contactos/${target.value}`);
                      _handleNewOrEdit();
                    }}
                  />
                  <label
                    htmlFor={"contact_" + contact.id}
                    className="sr-only"
                  ></label>
                </td>
                <td
                  className="mailbox-name text-capitalize text-truncate"
                  style={{ cursor: "pointer", maxWidth: 180 }}
                  onClick={(e) => {}}
                >
                  <label
                    style={{ cursor: "pointer" }}
                    className={contact.enUso ? "text-indigo" : ""}
                  >
                    {contact.tipo ? (
                      <i className="fas fa-store text-sm mr-2"></i>
                    ) : (
                      <i className="fas fa-user text-sm mr-2"></i>
                    )}
                    {contact.nombre}
                  </label>
                </td>
                <th>{contact.edad ? contact.edad : "--"}</th>
                <td
                  className="mailbox-attachment text-lowercase text-truncate"
                  style={{ maxWidth: 180 }}
                >
                  <span>
                    <i className="fas fa-envelope text-sm mr-2"></i>
                    <a href={"mailto:" + contact.email} className="text-muted">
                      {contact.email}
                    </a>
                  </span>
                </td>
                <td className="mailbox-date text-muted text-truncate text-right">
                  <span>
                    <i className="fas fa-phone text-sm mr-2"></i>
                    {contact.telefonos.t_movil
                      ? contact.telefonos.t_movil
                      : contact.telefonos.t_casa
                      ? contact.telefonos.t_casa
                      : contact.telefonos.t_oficina
                      ? contact.telefonos.t_oficina
                      : "--"}
                  </span>
                </td>
                <td>{contact.created.name}</td>
                <td>
                  {moment(
                    options.orderby === "created_at"
                      ? contact.created_at
                      : contact.updated_at
                  ).fromNow()}
                </td>
              </tr>
            );
          })}

          {!contacts.length && (
            <tr>
              <th className="text-center text-muted" colSpan="7">
                No hay contactos registrados
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </Inbox>
  );
}
