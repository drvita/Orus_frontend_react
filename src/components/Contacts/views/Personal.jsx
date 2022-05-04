/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import { useEffect, useState } from "react";

import helper from "../helper";

import es from "date-fns/locale/es";
registerLocale("es", es);

export default function Personal({ data = {}, handleChange, fn }) {
  const [state, setState] = useState({
    emailVerification: null,
    emailColor: "dark",
    nameVerification: null,
    nameColor: "dark",
    birthdayVerification: false,
    birthdayColor: "dark",
    contatcs: [],
  });

  const handleValidContact = (type, value) => {
    if (!type || !value) return;

    if (type === "email" && helper.isEmail(value)) {
      fn.getContacts({
        page: 1,
        orderby: "created_at",
        order: "desc",
        itemsPage: 10,
        email: value,
        except: data.id,
      }).then((res) => {
        setState({
          ...state,
          emailVerification: Boolean(res.data?.length),
          emailColor: !res.data?.length ? "dark" : "danger",
        });
        handleChange("validates", {
          ...data.validates,
          email: !Boolean(res.data?.length),
        });
      });
    }

    if (type === "name") {
      fn.getContacts({
        page: 1,
        orderby: "created_at",
        order: "desc",
        itemsPage: 10,
        name: value,
        except: data.id,
      }).then((res) => {
        setState({
          ...state,
          contacts: res.data?.length ? res.data : [],
          nameVerification: Boolean(res.data?.length),
          nameColor: !res.data?.length ? "dark" : "danger",
        });
        handleChange("validates", {
          ...data.validates,
          name: !Boolean(res.data?.length),
        });
      });
    }
  };

  useEffect(() => {
    const check = {
      birthday: Boolean(moment().diff(data.birthday, "days") > 0),
      test: moment().diff(data.birthday, "days"),
    };

    if (check.birthday !== state.birthdayVerification) {
      setState({
        ...state,
        birthdayVerification: check.birthday,
        birthdayColor: check.birthday ? "dark" : "danger",
      });
      handleChange("validates", {
        ...data.validates,
        birthday: check.birthday,
      });
    }
  }, [data.name, data.email, data.birthday]);

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Tipo de contacto</label>
          <select
            className="custom-select"
            name="type"
            value={data.type ?? ""}
            onChange={({ target }) =>
              handleChange("type", parseInt(target.value))
            }
          >
            <option value="0">Cliente</option>
            <option value="1">Proveedor</option>
          </select>
        </div>
        {data.type ? (
          <div className="form-group custom-control custom-checkbox">
            <input
              type="checkbox"
              name="business"
              className="custom-control-input"
              checked={data.business ?? false}
              onChange={({ target }) =>
                handleChange("business", target.checked)
              }
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
            defaultValue={data.rfc ?? ""}
            onChange={({ target }) =>
              handleChange("rfc", target.value.toUpperCase())
            }
            minLength="10"
          />
        </div>

        <div className="form-group">
          <label>Género</label>
          <select
            className="custom-select"
            name="gender"
            value={data.gender ?? ""}
            onChange={({ target }) => handleChange("gender", target.value)}
          >
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
        </div>
      </div>
      <div className="col">
        <div className="form-group position-relative">
          <label>
            Nombre completo <span className="text-orange">*</span>
          </label>
          <input
            type="text"
            className={`form-control text-capitalize text-truncate text-${state.nameColor}`}
            placeholder="Ej: Juan Perez G"
            name="name"
            defaultValue={data.name ?? ""}
            onChange={({ target }) =>
              handleChange("name", target.value.toLowerCase())
            }
            onBlur={({ target }) =>
              handleValidContact("name", target.value.toLowerCase())
            }
            onKeyDown={({ key }) => {
              if (key === "Escape") {
                setState({
                  ...state,
                  contacts: [],
                });
              }
            }}
          />
          {!data.name && (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          )}

          {state.contacts?.length && data.name?.length > 5 && !data.id
            ? showContacts(state.contacts)
            : null}
        </div>

        <div className="form-group">
          <label>
            Correo electr&oacute;nico <span className="text-orange">*</span>
          </label>
          <input
            type="email"
            className={`form-control text-lowercase text-truncate text-${state.emailColor}`}
            placeholder="Ej: correo@domain.com"
            name="email"
            defaultValue={data.email ?? ""}
            onChange={({ target }) =>
              handleChange("email", target.value.toLowerCase())
            }
            onBlur={({ target }) => handleValidContact("email", target.value)}
          />
          {!data.email && (
            <small>
              <span className="text-orange">Este campo es requerido</span>
            </small>
          )}

          {data.email && !helper.isEmail(data.email) && (
            <small>
              <span className="text-orange">Este no es un correo valido</span>
            </small>
          )}

          {state.emailVerification &&
            typeof state.emailVerification === "boolean" && (
              <small>
                <span className="text-orange">
                  Este e-mail ya se encuentra registrado
                </span>
              </small>
            )}
        </div>

        {!data.type ? (
          <div className="form-group">
            <label>
              Fecha de nacimiento <span className="text-orange">*</span>
            </label>
            <DatePicker
              className={`form-control text-${state.birthdayColor}`}
              locale="es"
              selected={new Date(data.birthday.format("YYYY/MM/DD"))}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              placeholderText="Seleccione una fecha"
              onSelect={(date) => {
                if (date) {
                  date = date.toLocaleDateString("es-MX");
                  const birthday = moment(date, "DD/MM/YYYY");

                  if (birthday.isValid()) {
                    handleChange("birthday", birthday);
                  }
                }
              }}
              onChange={(date) => {
                if (date) {
                  date = date.toLocaleDateString("es-MX");
                  const birthday = moment(date, "DD/MM/YYYY");

                  if (birthday.isValid()) {
                    handleChange("birthday", birthday);
                  }
                }
              }}
            />
            {!state.birthdayVerification && (
              <small>
                <span className="text-orange">Este campo es requerido</span>
              </small>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

function showContacts(contacts) {
  return (
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
            <li className="list-group-item text-truncate" key={contact.id}>
              <i className="fas fa-minus mr-1 text-danger"></i>
              <span className="text-capitalize text-muted text-monospace text-sm">
                {contact.name?.toLowerCase()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
