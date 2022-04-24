/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Inbox from "../../layouts/list_inbox";
import { Contacts } from "../../context/ContactContext";
import useContact from "../../hooks/useContact";

export default function InboxContact() {
  const context = Contacts();
  const _contacts = useContact();
  const history = useHistory();
  const [state, setState] = useState({
    contactSelected: "",
    contacts: [],
    meta: {},
    loading: false,
  });

  // Functions
  const hanleViewContact = (id) => {
    history.push(`contactos/${id}`);
  };
  const handleLoadContacts = () => {
    setState({
      ...state,
      loading: true,
    });

    _contacts
      .getContacts({
        ...context.options,
      })
      .then((res) => {
        setState({
          ...state,
          loading: false,
          contacts: res.data,
          meta: res.meta,
        });
      });
  };

  useEffect(() => {
    // console.log("[DEBUG] Inbox:", context.options, state);
    if (Object.keys(context.options).length) {
      handleLoadContacts();
    }
  }, [context.options]);

  return (
    <Inbox
      title="Lista de contactos"
      icon="id-badge"
      color="indigo"
      loading={state.loading}
      meta={state.meta}
      itemSelected={state.contactSelected}
      handlePagination={(page) => {
        if (page) {
          context.set({
            ...context,
            options: {
              ...context.options,
              page,
            },
          });
        }
      }}
      handleSearch={(search) => {
        if (search) {
          context.set({
            ...context,
            options: {
              ...context.options,
              search,
              page: 1,
            },
          });
        } else if (context.options.search) {
          context.set({
            ...context,
            options: {
              ...context.options,
              search: "",
              page: 1,
            },
          });
        }
      }}
      handleDeleteItem={(select) => {
        if (state.contactSelected) {
          window.Swal.fire({
            title: "Contactos",
            text: "¿Desea eliminar a este contacto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              _contacts
                .deleteContact(_contacts, state.contactSelected)
                .then((status) => {
                  if (status) {
                    console.log(
                      "[DEBUG] click delete:",
                      select,
                      state.contactSelected
                    );
                  }

                  setState({
                    ...state,
                    contactSelected: "",
                  });
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                    },
                  });
                })
                .catch((err) => {
                  console.log(
                    "[Orus System] Catch when delete contact:",
                    err.message
                  );
                });
            } else {
              setState({
                ...state,
                contactSelected: "",
              });
            }
          });
        } else {
          window.Swal.fire({
            title: "Error",
            text: "Lo sentimos no existe un contacto seleccionado",
            icon: "error",
          });
        }
      }}
      handleEditItem={() => {
        if (state.contactSelected) {
          hanleViewContact(parseInt(state.contactSelected));
        } else {
          window.Swal.fire({
            title: "Error",
            text: "Lo sentimos no existe un contacto seleccionado",
            icon: "error",
          });
        }
      }}
      handleSync={() => {
        context.set({
          ...context,
          options: {
            ...context.options,
            page: 1,
          },
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
              {context.options.orderby === "created_at"
                ? "Registrado"
                : "Actualizado"}
            </th>
          </tr>
        </thead>
        <tbody>
          {state.contacts?.map((contact) => {
            const phones = Object.values(contact.phones).filter((p) => p);

            return (
              <tr key={contact.id}>
                <td className="icheck-primary pl-2">
                  <input
                    type="checkbox"
                    className="form-check-input mt-4"
                    value={contact.id}
                    id={"contact_" + contact.id}
                    //disabled={contact.enUso}
                    checked={
                      state.contactSelected === contact.id ? true : false
                    }
                    onChange={({ target }) => {
                      const { value, checked } = target;

                      setState({
                        ...state,
                        contactSelected: checked ? parseInt(value) : "",
                      });
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
                  onClick={() => hanleViewContact(contact.id)}
                >
                  <label
                    style={{ cursor: "pointer" }}
                    className={contact.enUso ? "text-indigo" : ""}
                  >
                    {contact.type ? (
                      <i className="fas fa-store text-sm mr-2"></i>
                    ) : (
                      <i className="fas fa-user text-sm mr-2"></i>
                    )}
                    {contact.name.toLowerCase()}
                  </label>
                </td>
                <th>{contact.age ? contact.age : "--"}</th>
                <td
                  className="mailbox-attachment text-lowercase text-truncate"
                  style={{ maxWidth: 180 }}
                >
                  <span>
                    <i className="fas fa-envelope text-sm mr-2"></i>
                    <a href={"mailto:" + contact.email} className="text-muted">
                      {contact.email?.toLowerCase()}
                    </a>
                  </span>
                </td>
                <td className="mailbox-date text-muted text-truncate text-right">
                  <span>
                    <i className="fas fa-phone text-sm mr-2"></i>
                    {phones.length ? phones[0] : "--"}
                  </span>
                </td>
                <td className="text-capitalize">
                  {contact.created.name.toLowerCase()}
                </td>
                <td>
                  {moment(
                    context.options.orderby === "created_at"
                      ? contact.created_at
                      : contact.updated_at
                  ).fromNow()}
                </td>
              </tr>
            );
          })}

          {!state.contacts?.length && (
            <tr>
              <th className="text-center text-muted" colSpan="7">
                <i className="fa fa-info mx-2"></i>
                {context.options.search ? (
                  <span>
                    La busqueda
                    <strong className="text-dark mx-1">
                      "{context.options.search}",
                    </strong>
                    no coincide con ning&uacute;n contacto.
                  </span>
                ) : (
                  "No hay contactos registrados"
                )}
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </Inbox>
  );
}
