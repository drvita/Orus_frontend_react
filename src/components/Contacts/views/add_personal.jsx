import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { contactActions } from "../../../redux/contact/index";

const DataPersonalComponent = (props) => {
  const {
    id,
    type,
    business,
    name,
    rfc,
    email,
    birthday,
    handleChangeData,
    verification,
    contacts,
    //Functions
    _getList,
    _setList,
  } = props;
  const catchInputs = (e) => {
    const { name, value, checked } = e.target;
    let val = value;

    if (name === "type") val = parseInt(value);
    if (name === "business") val = checked;
    if (name !== "name" && contacts.length) {
      console.log("[DEBUG] add_personal catch input", name);
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
    }
    handleChangeData(name, val);
  };
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (!id) {
      let timeTemp = null;
      if (name.length > 2) {
        if (time) clearTimeout(time);
        timeTemp = setTimeout(() => {
          _getList({
            search: name,
            //except: id,
          });
        }, 1000);
        setTime(timeTemp);
      } else if (name.length === 1) {
        console.log("[DEBUG] add_personal effect:", name.length);
        _setList({
          result: {
            list: [],
            metaList: {},
          },
        });
      }
    }

    //eslint-disable-next-line
  }, [name]);

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Tipo de contacto</label>
          <select
            className="custom-select"
            name="type"
            value={type ?? ""}
            onChange={catchInputs}
          >
            <option value="0">Cliente</option>
            <option value="1">Proveedor</option>
          </select>
        </div>
        {type ? (
          <div className="form-group custom-control custom-checkbox">
            <input
              type="checkbox"
              name="business"
              className="custom-control-input"
              checked={business ?? ""}
              onChange={catchInputs}
              id="business_checkbox"
            />
            <label
              htmlFor="business_checkbox"
              className="custom-control-label cursor-pointer"
            >
              <small>¿Es un laboratorio?</small>
            </label>
          </div>
        ) : null}
        <div className="form-group">
          <label>RFC</label>
          <input
            type="text"
            className="form-control text-uppercase text-truncate"
            placeholder="facturas"
            name="rfc"
            value={rfc ?? ""}
            onChange={catchInputs}
            minLength="10"
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group position-relative">
          <label>
            Nombre completo <span className="text-orange">*</span>
          </label>
          <input
            type="text"
            className={
              contacts.length && !id
                ? "form-control text-capitalize text-truncate text-danger"
                : "form-control text-capitalize text-truncate"
            }
            placeholder="Ej: Juan Perez G"
            name="name"
            value={name ?? ""}
            onChange={catchInputs}
          />
          {!name | !verification.name ? (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          ) : null}
          {contacts.length && name.length > 2 && !id ? (
            <div
              className="position-absolute border rounded p-0 bg-white overflow-auto "
              style={{
                zIndex: "50",
                top: "4.1rem",
                width: "100%",
                maxHeight: "8rem",
              }}
            >
              <ul className="list-group">
                {contacts.map((contact) => {
                  return (
                    <li
                      className="list-group-item text-truncate"
                      key={contact.id}
                    >
                      <i className="fas fa-minus mr-1 text-danger"></i>
                      <span className="text-capitalize text-muted text-monospace text-sm">
                        {contact.nombre}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <label>
            Correo electr&oacute;nico <span className="text-orange">*</span>
          </label>
          <input
            type="email"
            className="form-control text-lowercase text-truncate"
            placeholder="Ej: correo@domain.com"
            name="email"
            value={email ?? ""}
            onChange={catchInputs}
          />
          {!email | !verification.email ? (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          ) : null}
        </div>
        {!type ? (
          <div className="form-group">
            <label>
              Fecha de nacimiento <span className="text-orange">*</span>
            </label>
            <input
              type="date"
              className="form-control text-truncate"
              placeholder=""
              data-inputmask-alias="datetime"
              data-inputmask-inputformat="dd/mm/yyyy"
              data-mask=""
              im-insert="false"
              name="birthday"
              value={birthday ?? ""}
              onChange={catchInputs}
            />
            {!birthday | !verification.birthday ? (
              <small>
                <span className="text-orange">Este campo es requerido</span>
              </small>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = ({ contact }) => {
    return {
      contacts: contact.list,
    };
  },
  mapActionsToProps = {
    _getList: contactActions.getListContacts,
    _setList: contactActions.setListContact,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DataPersonalComponent);
