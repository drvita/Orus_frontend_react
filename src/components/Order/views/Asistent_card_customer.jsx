/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import UserEmailInputComponent from "./userEmailInput";
import UserPhoneInputComponent from "./userPhoneInput";
import useContact from "../../../hooks/useContact";

export default function CardCustomer({
  data = {},
  disabled,
  handleRemoveCustomer: _handleRemoveCustomer,
  handleUpdateContact: _handleUpdateContact,
  handleEditor: _handleEditor,
}) {
  const contactHook = useContact();
  const [state, setState] = useState({
    edit: false,
    phone: "",
    email: "",
    validToSave: false,
  });

  const save = () => {
    if (!state.phone) {
      console.error("[Orus System] Fatal error - phone not stablish");
      return;
    }

    if (!state.email) {
      console.error("[Orus System] Fatal error - email not stablish");
      return;
    }

    const contactData = {
      id: data.id,
      phones: {
        ...data.phones,
        cell: state.phone,
      },
      email: state.email,
    };

    contactHook.saveContact(contactData).then((contact) => {
      if (contact) {
        window.Swal.fire({
          icon: "success",
          title: "Paciente actualizado",
          showConfirmButton: false,
          timer: 3000,
        });
        _handleUpdateContact(contact);
        setState({
          ...state,
          edit: false,
          validToSave: true,
        });
      } else {
        console.error(
          "[Orus System] Server error - when save contact data:",
          data.id,
          contactData
        );
        window.Swal.fire({
          icon: "Error",
          title: "Error al almacenar cambios del paciente",
          showConfirmButton: true,
        });
      }
    });
  };

  useEffect(() => {
    const phonesArray = Object.values(data.phones ?? {});
    const phones = phonesArray.filter((ph) => ph);

    if (!phones || !phones.length || !data.email) {
      setState({
        ...state,
        edit: true,
        phone: phones[0],
        email: data.email,
        validToSave: false,
      });
    } else {
      setState({
        ...state,
        edit: false,
        phone: phones[0],
        email: data.email,
        validToSave: true,
      });
    }
  }, []);

  useEffect(() => {
    _handleEditor(state.edit);
  }, [state.edit]);

  return (
    <div className="card col-lg-5 mr-5 border border-success">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-user-alt mr-1"></i>
          Cliente seleccionado
          <i className="ml-5 fas fa-check mr-1"></i>
        </h3>
      </div>
      <div className="card-body text-lg">
        <p className="badge badge-success">{`# ID ${data.id}`}</p>
        <p className="card-text">
          <i className="fas fa-user-circle mr-1"></i>
          {data.name.toUpperCase()}
        </p>

        {state.edit ? (
          <div>
            <div>
              <UserPhoneInputComponent
                phone={state.phone ?? ""}
                col={12}
                onChange={(value) => {
                  setState({
                    ...state,
                    phone: value,
                  });
                }}
                handleValidData={(...dto) => {
                  let valid = dto[1];
                  if (!state.email) valid = false;

                  setState({
                    ...state,
                    validToSave: valid,
                  });
                }}
              />
              <UserEmailInputComponent
                email={state.email ?? ""}
                userId={data.id}
                col={12}
                onChange={(value) => {
                  setState({
                    ...state,
                    email: value,
                  });
                }}
                handleValidData={(...dto) => {
                  let valid = dto[1];
                  if (!state.phone) valid = false;

                  setState({
                    ...state,
                    validToSave: valid,
                  });
                }}
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              {!state.validToSave && (
                <button
                  className="btn btn-dark mr-1"
                  disabled={state.exam_id ? true : false}
                  onClick={_handleRemoveCustomer}
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Cambiar
                </button>
              )}

              <button
                className="btn btn-secondary mr-1"
                onClick={() => setState({ ...state, edit: false })}
                disabled={!state.validToSave}
              >
                <i className="fas fa-ban mr-2"></i>
                Cancelar
              </button>
              <button
                className="btn btn-warning"
                onClick={save}
                disabled={!state.validToSave}
              >
                <i className="fas fa-save mr-2"></i>
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <p className="card-text text-truncate">
              <i className="fas fa-at mr-1"></i>
              {state.email ?? "Email no registrado"}
            </p>

            <p className="card-text">
              <i className="fas fa-phone-alt mr-1"></i>
              {state.phone ? state.phone : `Telefono no registrado`}
            </p>
          </div>
        )}

        <div>
          {!state.edit && (
            <>
              <button
                className="btn btn-secondary"
                disabled={disabled}
                onClick={_handleRemoveCustomer}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Cambiar
              </button>
              <button
                className="btn btn-info ml-1"
                disabled={disabled}
                onClick={() =>
                  setState({
                    ...state,
                    edit: true,
                  })
                }
              >
                <i className="fas fa-edit mr-1"></i>
                Editar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
