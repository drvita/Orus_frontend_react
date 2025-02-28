/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import useUsers from "../../hooks/useUsers";
import { Config } from "../../context/ConfigContext";
import { useHistory } from "react-router-dom";
import UserNameInput from "./views/userNameInput";
import UserEmailInput from "./views/userEmailInput";
import Metadata from "./Metadata";
import Permissions from "./Permissions";
import Activities from "../Activitys";
import NameInput from "./views/NameInput";
import PasswordInput from "./views/PasswordInput";
import SelectInputComponent from "./views/SelectInput";

const initialState = {
  id: 0,
  role: "ventas",
  password: "",
  username: "",
  name: "",
  email: "",
  branch_id: 12,
};
const initialdata = {
  session: {},
  roles: [],
  permissions: [],
  load: false,
  validUserName: false,
  validUserEmail: false,
  created_at: "",
  updated_at: "",
  activities: [],
};

export default function UserAddComponent(props) {
  const { id } = props.match.params;
  const { handleNewOrEdit: _handleNewOrEdit } = props;
  const _users = useUsers();
  const configContext = Config();
  const branchs = configContext.data;
  const [currentUser, setCurrentUser] = React.useState(initialState);
  const [data, setData] = React.useState(initialdata);
  const history = useHistory();
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  function processData(data) {
    if (data) {
      setCurrentUser({
        id: data.id,
        role: 'ventas',
        username: data.username,
        name: data.name,
        email: data.email,
        password: "",
        branch_id: data.branch.id,
      });
      setData({
        session: data.session ? data.session : {},
        permissions: data.permissions,
        roles: data.roles,
        load: data.load ? data.load : false,
        validUserName: true,
        validUserEmail: true,
        created_at: data.created_at,
        updated_at: data.updated_at,
        activities: data.activity,
      });
    }
  }
  const catchInputs = ({ name, value }) => {
    if (typeof value === "string" && name !== 'password') {
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

    if (!data.validUserName) {
      window.Swal.fire({
        icon: "error",
        title: "El nombre de usuario ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!data.validUserEmail) {
      window.Swal.fire({
        icon: "error",
        title: "El correo ya esta en uso",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    let dataToSave = {
      name,
      username,
      role,
      email,
      branch_id,
    };

    if (password.length >= 8) dataToSave.password = password;
    setData({
      ...data,
      load: true,
    });

    _users.saveUser(dataToSave, id).then((response) => {
      if (response) {
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
          } else {
            setData({
              ...data,
              load: false,
            });
          }
        });
      }
    });
  };

  React.useEffect(() => {
    if (id) {
      _users.getUserById(id).then((data) => {
        if (data) {
          processData(data.data);
        }
      });
    }
  }, [id]);
  React.useEffect(() => {
    const isValid = currentUser.name.length &&
      !data.load &&
      data.validUserName &&
      data.validUserEmail
      ? true
      : false;

    setBtnDisabled(!isValid);
  }, [currentUser, data]);

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
            {data.load ? (
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
                    isValid={(status) => {
                      setData({
                        ...data,
                        validUserName: status,
                      });
                    }}
                  />
                  <NameInput
                    value={currentUser.name}
                    name="name"
                    onChange={catchInputs}
                    col={6}
                  />
                </div>
                <div className="row">
                  <PasswordInput
                    value={currentUser.password}
                    name="password"
                    onChange={catchInputs}
                    col={6}
                  />
                  <UserEmailInput
                    email={currentUser.email}
                    userId={id ? id : ""}
                    col={6}
                    onChange={catchInputs}
                    isValid={(status) => {
                      setData({
                        ...data,
                        validUserEmail: status,
                      });
                    }}
                  />
                </div>
                <div className="row">
                  <SelectInputComponent
                    label="Tipo de usuario"
                    name="role"
                    value={currentUser.role}
                    icon={<AccountBoxIcon />}
                    col={6}
                    color="success"
                    onChange={catchInputs}
                    options={[
                      { value: 'admin', label: 'Administrador' },
                      { value: 'ventas', label: 'Ventas' },
                      { value: 'doctor', label: 'Optometrista' },
                    ]}
                  />
                  <SelectInputComponent
                    label="Sucursal"
                    name="branch_id"
                    value={currentUser.branch_id}
                    icon={<WorkOutlineIcon />}
                    col={6}
                    color="success"
                    onChange={catchInputs}
                    options={
                      branchs.filter((b) => b.name !== 'bank')
                        .map((b) => ({ value: b.id, label: b.data.name }))
                    }
                  />
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
                      data.load
                        ? "btn btn-primary disabled"
                        : "btn btn-primary"
                    }
                    disabled={btnDisabled}
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

        {!!currentUser.id && (
          <Permissions data={{ ...data, role: currentUser.role }} />
        )}
      </div>
      {id && (
        <div className="col-4">
          <Metadata data={data} />
          <Activities data={data.activities} />
        </div>
      )}
    </div>
  );
}
