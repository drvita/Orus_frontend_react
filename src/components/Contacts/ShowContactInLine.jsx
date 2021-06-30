import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { contactActions } from "../../redux/contact";

const ShowContactComponent = (props) => {
  const {
    contact,
    readOnly,
    title = "Contacto",
    contacts,
    //Funciones
    handleChangeContact: _handleChangeContact,
    _getListContacts,
    _setListContact,
  } = props;
  const [input, setInput] = useState("");
  const domain = /.*@domain(.com)?/gim;
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const birthDay = new Date(contact.f_nacimiento ?? new Date());
  const numAnos = moment().diff(birthDay, "years");

  useEffect(() => {
    if (input.length > 2) {
      _getListContacts({
        type: 0,
        search: input,
        itemsPage: 20,
      });
    }
    //eslint-disable-next-line
  }, [input]);

  //console.log("[DEBUG] Render", numAnos);

  return (
    <div className="input-group position-static">
      <div className="input-group-prepend">
        <span className="input-group-text text-capitalize">
          <i className="fas fa-user mr-2"></i> {title}
        </span>
      </div>
      {contact.id ? (
        <span className="form-control text-capitalize bg-light">
          {contact.nombre}
          {contact.email && !domain.exec(contact.email) ? (
            <span className="badge badge-secondary mx-1">
              <i className="fas fa-envelope mr-1"></i>
              {contact.email}
            </span>
          ) : null}
          {numAnos > 1 ? (
            <span className="badge badge-secondary ml-1">
              <i className="fas fa-calendar mr-1"></i>
              {numAnos} años
            </span>
          ) : null}
        </span>
      ) : (
        <>
          <input
            type="text"
            className="form-control text-capitalize"
            value={
              contact.id
                ? contact.email && !domain.exec(contact.email)
                  ? contact.nombre + " [" + contact.email + "]"
                  : contact.nombre
                : input
            }
            disabled={contact.id ? true : false}
            onChange={handleChangeInput}
          />
          {contacts.length ? (
            <div
              className="position-absolute overflow-auto"
              style={{
                top: "6.4rem",
                left: "8rem",
                height: "12rem",
                zIndex: "10",
                width: "100%",
                maxWidth: "20rem",
              }}
            >
              <ul className="list-group">
                {contacts.map((contact) => {
                  return (
                    <li
                      key={contact.id}
                      className="list-group-item text-capitalize"
                    >
                      <a
                        href="#selected"
                        className="text-indigo"
                        onClick={(e) => {
                          e.preventDefault();
                          _handleChangeContact(contact);
                          _setListContact({
                            result: {
                              list: [],
                              metaList: {},
                            },
                          });
                          setInput("");
                        }}
                      >
                        <i className="fas fa-user mr-1"></i>
                        {contact.nombre}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </>
      )}

      {!readOnly && contact.id ? (
        <div className="float-right">
          <div className="btn-group btn-sm d-print-none">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                _handleChangeContact({});
              }}
              title="Cambiar"
            >
              <i className="fas fa-exchange-alt"></i>
            </button>
            <Link
              to={"/contactos/" + contact.id}
              className="btn btn-danger btn-sm"
              title="Editar"
            >
              <i className="fas fa-edit"></i>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ contact }) => {
    return {
      contacts: contact.list,
    };
  },
  mapActionsToProps = {
    _getListContacts: contactActions.getListContacts,
    _setContact: contactActions.setContact,
    _setListContact: contactActions.setListContact,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ShowContactComponent);
