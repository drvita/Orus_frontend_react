import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { contactActions } from "../../../redux/contact";

const FormAddContactComponent = (props) => {
  const [data, setData] = useState({
    name: "",
    telnumbers: { t_casa: "", t_oficina: "", t_movil: "" },
    email: "",
    birthday: "",
    type: 0,
    business: 0,
  });

  const { name, telnumbers, birthday, email } = data,
    { title = "contacto", name: name_props, messages, _save } = props;

  const changeValue = (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "telnumbers") {
      val = {
        ...data.telnumbers,
        t_movil: value,
      };
    }

    setData({
      ...data,
      [name]: val,
    });
  };

  const handleSave = () => {
    console.log("[DEBUG] ::: Save");
    _save({
      id: null,
      data: {
        ...data,
        telnumbers: JSON.stringify(data.telnumbers),
      },
    });
  };

  useEffect(() => {
    setData({
      ...data,
      name: name_props,
    });

    //eslint-disable-next-line
  }, [name_props]);

  //console.log("[DEBUG] messages ", messages);

  return (
    <>
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
        <label>Fecha de naciemiento</label>
        <input
          type="date"
          className="form-control"
          name="birthday"
          value={birthday}
          onChange={changeValue}
        />
      </div>
      <div className="form-group text-right">
        <button className="btn btn-primary" onClick={handleSave}>
          <i className="fas fa-save"></i>
          Guardar
        </button>
      </div>
    </>
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
