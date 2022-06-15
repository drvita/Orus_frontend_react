/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useUsers from "../../hooks/useUsers";
import { Config } from "../../context/ConfigContext";
import { useHistory } from "react-router-dom";

//Component
import UserNameInput from "./views/userNameInput";
import UserEmailInput from "./views/userEmailInput";
import Metadata from "./Metadata";
import Permissions from "./Permissions";
import Activities from "../Activitys";

const initialState = {
  id: 0,
  role: "ventas",
  password: "",
  username: "",
  name: "",
  email: "",
  branch_id: 12,
  data: {
    session: {},
    roles: [],
    permissions: [],
    load: false,
    validUserName: false,
    validUserEmail: false,
    created_at: "",
    updated_at: "",
    activities: [],
  },
};

export default function UserAddComponent(props) {
  const { id } = props.match.params;
  const { handleNewOrEdit: _handleNewOrEdit } = props;
  const _users = useUsers();
  const configContext = Config();
  const branchs = configContext.data;
  const [currentUser, setCurrentUser] = useState(initialState);
  const history = useHistory();
  const send =
    currentUser.name.length &&
    !currentUser.data.load &&
    currentUser.data.validUserName &&
    currentUser.data.validUserEmail
      ? false
      : true;

  function processData(data) {
    if (data) {
      // console.log("[DEBUG] Activities:", data.activity);
      setCurrentUser({
        id: data.id,
        role: data.roles[0],
        username: data.username,
        name: data.name,
        email: data.email,
        password: "",
        branch_id: data.branch.id,
        data: {
          session: data.session ? data.session : {},
          permissions: data.permissions,
          roles: data.roles,
          load: data.load ? data.load : false,
          validUserName: true,
          validUserEmail: true,
          created_at: data.created_at,
          updated_at: data.updated_at,
          activities: data.activity,
        },
      });
    }
  }

  const handleValidate = ({ name, value }) => {
    setCurrentUser({
      ...currentUser,
      data: {
        ...currentUser.data,
        [name]: value,
      },
    });
  };
  const catchInputs = ({ name, value, type }) => {
    if (type === "text") {
      value = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };
  const handleSave = () => {
    const { id, name, username, role, password, email, branch_id } =
      currentUser;

    //Valid primary data
    if (!currentUser.data.validUserName) {
      window.Swal.fire({
        icon: "error",
        title: "El nombre de usuario ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!currentUser.data.validUserEmail) {
      window.Swal.fire({
        icon: "error",
        title: "El correo ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    let data = {
      name,
      username,
      role,
      email,
      branch_id,
    };

    if (password.length >= 8) data.password = password;

    _users.saveUser(data, id).then((data) => {
      if (data) {
        window.Swal.fire({
          title: "Usuarios",
          text: id
            ? `Usuario actualizado correctamente`
            : `Usuario guardado correctamente`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Hecho!",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        }).then(({ dismiss }) => {
          if (!dismiss) {
            history.push("/usuarios");
            _handleNewOrEdit();
          }
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      _users.getUserById(id).then((data) => {
        if (data) {
          processData(data.data);
        }
      });
    }
  }, [id]);

  // useEffect(() => {
  //   console.log("[DEBUG] activity:", currentUser.data.activities);
  // }, [send]);

  return (
    <div className="row" style={{ height: "100vh" }}>
      <div className={`col-${id ? 8 : 12}`}>
        <form className="card card-primary card-outline" autoComplete="off">
          <div className="card-header">
            <h1 className="card-title text-primary">
              <i className="fas fa-user mr-2"></i>
              {id ? "Editar usuario" : "Registrar nuevo usuario"}
            </h1>
          </div>
          <div className="card-body was-validated">
            {currentUser.load ? (
              <div className="alert alert-light text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="row mb-3">
                  <UserNameInput
                    username={currentUser.username}
                    userId={id ? id : ""}
                    col={6}
                    onChange={catchInputs}
                    handleValidate={handleValidate}
                  />
                  <div className="col-6">
                    {currentUser.name.length ? (
                      <small>
                        <label>Nombre completo</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-blue">
                          <i className="fas fa-user-tag"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Nombre completo"
                        name="name"
                        autoComplete="off"
                        defaultValue={currentUser.name}
                        onChange={({ target }) => catchInputs(target)}
                        required="required"
                        minLength="8"
                        pattern="^[a-zA-Z]{2,20}[\s]{1}[a-zA-Z]{2,20}.*"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {currentUser.password.length || id ? (
                      <small>
                        <label>Contraseña</label>
                        {!id && (
                          <span className="ml-2 text-muted">
                            De 8 a 16 caracteres, por lo menos una mayuscula, un
                            numero y un caracter especial
                          </span>
                        )}
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-blue">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        autoComplete="off"
                        defaultValue={currentUser.password}
                        onChange={({ target }) => catchInputs(target)}
                        required={id ? false : true}
                        minLength="8"
                        maxLength="16"
                        pattern="^(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$"
                      />
                    </div>
                  </div>
                  <UserEmailInput
                    email={currentUser.email}
                    userId={id ? id : ""}
                    col={6}
                    onChange={catchInputs}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <small>
                      <label>Tipo de usuario</label>
                    </small>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-blue">
                          <i className="fas fa-id-card"></i>
                        </span>
                      </div>
                      <select
                        className="custom-select"
                        name="role"
                        defaultValue={currentUser.role}
                        onChange={({ target }) => catchInputs(target)}
                      >
                        <option value="admin">Administrador</option>
                        <option value="ventas">Ventas</option>
                        <option value="doctor">Optometrista</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <small>
                      <label>Sucursal</label>
                    </small>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-blue">
                          <i className="fas fa-store"></i>
                        </span>
                      </div>
                      <select
                        className="custom-select text-uppercase"
                        name="branch_id"
                        value={currentUser.branch_id}
                        onChange={({ target }) => catchInputs(target)}
                      >
                        {branchs.map((branch) =>
                          branch.name !== "bank" ? (
                            <option value={branch.id} key={branch.id}>
                              {branch.data.name}
                            </option>
                          ) : null
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-12 text-right">
                <div className="btn-group btn-group-lg" role="group">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      history.push(`/usuarios`);
                      _handleNewOrEdit();
                    }}
                  >
                    <i className="fas fa-ban mr-1"></i>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={
                      currentUser.load
                        ? "btn btn-primary disabled"
                        : "btn btn-primary"
                    }
                    disabled={send ? true : false}
                    onClick={handleSave}
                  >
                    <i className="fas fa-save mr-1"></i>
                    {id ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <Permissions data={currentUser} />
      </div>
      {id && (
        <div className="col-4">
          <Metadata data={currentUser} />
          <Activities data={currentUser.data.activities} />
        </div>
      )}
    </div>
  );
}
