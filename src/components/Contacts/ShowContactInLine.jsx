import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import moment from "moment";
import { connect } from "react-redux";
import { contactActions } from "../../redux/contact";
import Easycontact from "./views/easyContact";

const ShowContactComponent = (props) => {
  const {
    contact,
    readOnly,
    title = "Contacto",
    contacts,
    //Funciones
    //handleChangeContact: _handleChangeContact,
    _getListContacts,
    _setListContact,
    _setContact,
  } = props;
  const [input, setInput] = useState("");
  const [create, setCreate] = useState(false);

  const domain = /.*@domain(.com)?/gim;
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  //const birthDay = new Date(contact.f_nacimiento ?? new Date());
  //const numAnos = moment().diff(birthDay, "years");
  /*TO DELETE
  const valueSearch = contact.id
    ? contact.email && !domain.exec(contact.email)
      ? contact.nombre + " [" + contact.email + "]"
      : contact.nombre
    : input;
  */

  useEffect(() => {
    if (input.length > 2) {
      _getListContacts({
        type: 0,
        search: input,
        itemsPage: 50,
      });
    }
    //eslint-disable-next-line
  }, [input]);

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
          {contact.edad ? (
            <span className="badge badge-secondary ml-1">
              <i className="fas fa-calendar mr-1"></i>
              {contact.edad} años
            </span>
          ) : null}
        </span>
      ) : (
        <>
          <input
            type="text"
            className="form-control text-capitalize"
            value={input}
            disabled={contact.id ? true : false}
            onChange={handleChangeInput}
          />

          {input.length > 2 ? (
            <div
              className="position-absolute overflow-auto"
              style={{
                top: "8.1rem",
                left: "7.8rem",
                height: !create ? "12rem" : "0rem",
                zIndex: "10",
                width: "100%",
                maxWidth: "28rem",
              }}
            >
              <ul className="list-group">
                {contacts.length ? (
                  <>
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
                              //_handleChangeContact(contact);
                              _setContact(contact);
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
                  </>
                ) : !create ? (
                  <li className="list-group-item">
                    <a
                      href="·create"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreate(true);
                      }}
                    >
                      <i className="fas fa-info-circle mr-1 text-dark"></i>
                      <label>El {title}:</label>{" "}
                      <span className="text-uppercase text-dark font-weight-bold">
                        {input}
                      </span>
                      , no existe.
                      <span className="badge badge-dark ml-2">Registrar</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {input && !contacts.length && create ? (
            <div className="w-100 mt-4">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                  <h4 className="mb-4 text-center">
                    <i className="fas fa-user mr-1"></i>Registrar nuevo {title}{" "}
                  </h4>
                  <Easycontact title={title} name={input} />
                </div>
              </div>
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
                //_handleChangeContact({});
                _setContact({});
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
      contact: contact.contact,
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
