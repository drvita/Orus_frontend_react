/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";

import helper from "../helper";

import es from "date-fns/locale/es";
registerLocale("es", es);

export default function CardNewContact(props) {
  const { title = "contacto", nameDefault, messages = [], _save } = props;
  const [data, setData] = useState({
    name: "",
    phone: "",
    birthday: moment(),
    email: "",
    gender: "male",
  });

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

    helper.saveContact(title, body, _save);
  };

  useEffect(() => {
    if (nameDefault) {
      setData({
        ...data,
        name: nameDefault,
      });
    }
  }, []);

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary text-bold">
              <i className="fas fa-plus mr-1"></i>
              Crear nuevo {title}
            </h5>
            <button
              type="button"
              className="close"
              onClick={props.handleCancel}
            >
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
                placeholder={`Nombre del ${title}`}
                autoComplete="off"
                required="required"
                pattern="^[a-zA-Z.]{2,20}[\s]{1}[a-zA-Z.]{2,20}.*"
                minLength="8"
                defaultValue={data.name}
                onChange={({ target }) => {
                  setData({
                    ...data,
                    name: target.value.toLowerCase(),
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                className="form-control"
                defaultValue={data.email}
                onChange={({ target }) => {
                  setData({
                    ...data,
                    email: target.value.toLowerCase(),
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label>Telefono celular</label>
              <input
                type="tel"
                placeholder="Telefono celular"
                className="form-control"
                maxLength="10"
                value={data.phone}
                onChange={({ target }) => {
                  if (!isNaN(target.value)) {
                    setData({
                      ...data,
                      phone: target.value,
                    });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label>Fecha de naciemiento</label>

              <DatePicker
                className={`form-control`}
                locale="es"
                selected={new Date(data.birthday.format("YYYY/MM/DD"))}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                placeholderText="Seleccione una fecha"
                onSelect={(date) => {
                  if (date) {
                    date = date.toLocaleDateString("es-MX");
                    date = moment(date, "DD/MM/YYYY");

                    if (date.isValid()) {
                      setData({
                        ...data,
                        birthday: date,
                      });
                    }
                  }
                }}
                onChange={(date) => {
                  if (date) {
                    date = date.toLocaleDateString("es-MX");
                    date = moment(date, "DD/MM/YYYY");

                    if (date.isValid()) {
                      setData({
                        ...data,
                        birthday: date,
                      });
                    }
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <select
                className="custom-select"
                onChange={({ target }) => {
                  setData({
                    ...data,
                    gender: target.value,
                  });
                }}
                defaultValue={data.gender}
              >
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              {props.handleCancel && (
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={props.handleCancel}
                >
                  <i className="fas fa-ban mr-1"></i>
                  cancelar
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={true}
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
}
