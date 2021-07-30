import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
//Actions
import { contactActions } from "../../../redux/contact";
import helper from "../helper";

const FormAddContactComponent = (props) => {
  const {
      title = "contacto",
      name: name_props,
      messages,
      handleCancel: _handleCancel,
      _save,
    } = props,
    [data, setData] = useState(helper.dataPrimary),
    { name, telnumbers, birthday, email } = data;
  //States
  //const [validForm, setValidForm] = useState(false);
  //Acctions
  const changeValue = (e) => {
    helper.changeDataInput(e.target, data, setData);

    //setValidForm(handleValidForm);
  };
  const handleValidForm = (showMsg = false) => {
    const verify = helper.handleVerificationData(data, showMsg);
    return verify.result;
  };
  const handleSave = () => {
    const valid = handleValidForm(true),
      body = {
        ...data,
        telnumbers: JSON.stringify(data.telnumbers),
      };
    if (!valid) return false;
    //console.log("[DEBUG] Save data", body);

    helper.saveContact(title, body, _save);
  };
  useEffect(() => {
    setData({
      ...data,
      name: name_props,
    });
    //eslint-disable-next-line
  }, [name_props]);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary text-bold">
              <i className="fas fa-plus mr-1"></i>
              Crear nuevo {title}
            </h5>
            <button type="button" className="close" onClick={_handleCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {messages.length ? (
              <>
                {messages.map((message, index) => {
                  const { type, text } = message;

                  return (
                    <div
                      className={`alert alert-${
                        type === "error"
                          ? "danger"
                          : type === "success"
                          ? type
                          : "warning"
                      }`}
                      key={index}
                    >
                      <i className="fas fa-info mr-1"></i>
                      {text}
                    </div>
                  );
                })}
              </>
            ) : null}
            <div className="form-group">
              <label>Nombre del {title}</label>
              <input
                type="text"
                className="form-control text-uppercase"
                placeholder="Nombre del paciente"
                name="name"
                autoComplete="off"
                required="required"
                pattern="^[a-zA-Z.]{2,20}[\s]{1}[a-zA-Z.]{2,20}.*"
                minLength="8"
                value={name}
                onChange={changeValue}
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={changeValue}
              />
            </div>
            <div className="form-group">
              <label>Telefono celular</label>
              <input
                type="tel"
                placeholder="Telefono celular"
                className="form-control"
                name="telnumbers"
                pattern="^[\d]{10}$"
                maxLength="10"
                value={telnumbers.t_movil}
                onChange={changeValue}
              />
            </div>
            <div className="form-group">
              <label>Fecha de naciemiento</label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                value={birthday}
                onChange={changeValue}
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              {_handleCancel ? (
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={_handleCancel}
                >
                  <i className="fas fa-ban mr-1"></i>
                  cancelar
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!name || !telnumbers || !birthday || !email}
              >
                <i className="fas fa-save"></i>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ contact }) => {
    return {
      messages: contact.messages,
    };
  },
  mapActionsToProps = {
    _save: contactActions.saveContact,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FormAddContactComponent);
