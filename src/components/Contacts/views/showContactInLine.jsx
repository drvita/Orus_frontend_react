import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Components
import Easycontact from "../data/modalAddContact";
import Autocomplete from "../data/listContact";
//Actions
import { contactActions } from "../../../redux/contact";

const ShowContactComponent = (props) => {
  const {
      contact,
      readOnly = false,
      title = "contacto",
      contacts,
      left,
      legend,
      meta,
      //Funciones
      _getListContacts,
      _setListContact,
      _getContact,
    } = props,
    domain = /.*@domain(.com)?/gim,
    perPage = 10;
  //States
  const [input, setInput] = useState(""),
    [create, setCreate] = useState(false),
    [timer, setTimer] = useState("");
  //Actions
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInput(value);
    setCreate(false);
  };
  const handleSelectContact = (contact) => {
    _setListContact({
      result: {
        list: [],
        metaList: {},
      },
    });
    _getContact(contact.id);
    setInput("");
    setCreate(false);
  };
  useEffect(() => {
    let toTimer = null;

    if (input.length > 2) {
      if (timer) clearTimeout(timer);
      toTimer = setTimeout(() => {
        _getListContacts({
          type: 0,
          search: input,
          itemsPage: perPage,
        });
        setTimer("");
      }, 1000);
      setTimer(toTimer);
    }

    return () => {
      _setListContact({
        result: {
          list: [],
          metaList: {},
          contact: {},
        },
      });
    };
    //eslint-disable-next-line
  }, [input]);

  return (
    <div className="w-100 d-block">
      {legend && !contact.id ? (
        <span className="text-sm text-muted ml-4 w-100 d-block">
          <label>Primero:</label> {legend}
        </span>
      ) : null}

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text text-capitalize">
            <i className="fas fa-user mr-2"></i> {title}
          </span>
        </div>
        {contact.id ? (
          <>
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
            {!readOnly ? (
              <div className="float-right">
                <div className="btn-group btn-sm d-print-none">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleSelectContact({})}
                    title="Cambiar"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                  <Link
                    to={"/contactos/" + contact.id}
                    className="btn bg-indigo btn-sm"
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control text-capitalize"
              value={input}
              disabled={contact.id ? true : false}
              onChange={handleChangeInput}
            />

            {timer ? (
              <div className="float-right px-4">
                <div className="spinner-border text-indigo"></div>
              </div>
            ) : null}

            {input && !contacts.length && create ? (
              <div className="w-100 mt-4">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-5">
                    <h4 className="mb-4 text-center">
                      <i className="fas fa-user mr-1"></i>Registrar nuevo
                      {title}
                    </h4>
                    <Easycontact
                      title={title}
                      name={input}
                      handleCancel={(e) => handleSelectContact({})}
                    />
                  </div>
                </div>
              </div>
            ) : input.length > 2 && !timer ? (
              <div className="w-100 d-block position-static">
                <Autocomplete
                  contacts={contacts}
                  title={title}
                  text={input}
                  showNew={create}
                  left={left}
                  meta={meta}
                  perPage={perPage}
                  handleNew={(e) => setCreate(true)}
                  handleSelected={handleSelectContact}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ contact }) => {
    return {
      contacts: contact.list,
      contact: contact.contact,
      meta: contact.metaList,
    };
  },
  mapActionsToProps = {
    _getListContacts: contactActions.getListContacts,
    _setListContact: contactActions.setListContact,
    _getContact: contactActions.getContact,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ShowContactComponent);
