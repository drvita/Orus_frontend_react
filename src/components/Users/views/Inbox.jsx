/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import useUsers from "../../../hooks/useUsers";
import { UserContext } from "../../../context/UserContext";
import ListInbox from "../../../layouts/list_inbox";
import { useHistory } from "react-router-dom";
//import { AuthContext } from '../../../context/AuthContext';

export default function InboxComponent() {
  const history = useHistory();
  const _users = useUsers();
  const _userContext = useContext(UserContext);
  //const _authContext = useContext(AuthContext);
  const [userSelected, setUserSelected] = useState("");

  const [data, setData] = useState({
    users: [],
    meta: {},
  });

  const [loading, setLoading] = useState(false);

  const { users, meta } = data;

  const handleChangeOptions = (key, value) => {
    _userContext.set({
      ..._userContext,
      options: {
        ..._userContext.options,
        [key]: value,
      },
    });
  };

  const deleteItem = () => {
    setLoading(true);
    _users
      .deleteUser(userSelected)
      .then((data) => {
        window.Swal.fire({
          icon: "success",
          title: "Usuario eliminado correctamente",
          showConfirmButton: false,
          timer: 2500,
        });

        setUserSelected({ id: 0 });

        _users.getListUsers(_userContext.options).then((data) => {
          if (data) {
            setData({
              ...data,
              users: data.data,
              meta: data.meta,
            });
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectUser = (e, order = { id: 0 }) => {
    if (userSelected) {
      history.push(`usuarios/${userSelected}`);
    } else {
      window.Swal.fire({
        title: "Error",
        text: "Lo sentimos no existe un contacto seleccionado",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    _users.getListUsers(_userContext.options).then((data) => {
      if (data) {
        setData({
          ...data,
          users: data.data,
          meta: data.meta,
        });
        setLoading(false);
      } else {
        console.error("Error al obtener los datos");
      }
    });
  }, [_userContext.options]);

  return (
    <ListInbox
      title="Lista de productos"
      icon="id-badge"
      color="primary"
      loading={loading}
      meta={meta}
      itemSelected={userSelected}
      defaultSearch={_userContext.options.search}
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleDeleteItem={deleteItem}
      handleEditItem={handleSelectUser}
      handleSync={() => {
        _userContext.set({
          ..._userContext,
          options: {
            page: 1,
            orderby: "created_at",
            order: "desc",
            itemsPage: 10,
          },
        });
      }}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Email/Usuario</th>
            <th>Rol</th>
            <th>Sucursal</th>
            {_userContext.options.orderby === "created_at" ? (
              <th>Creado</th>
            ) : (
              <th>Modificado</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            <>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="icheck-primary pl-2">
                      <input
                        type="checkbox"
                        className="form-check-input mt-4"
                        value={user.id}
                        id={"item_" + user.id}
                        checked={userSelected === user.id ? true : false}
                        onChange={({ target }) => {
                          const { value, checked } = target;
                          setUserSelected(checked ? parseInt(value) : "");
                          //handleUserSelect(target);
                        }}
                      />
                      <label
                        htmlFor={"item_" + user.id}
                        className="sr-only"
                      ></label>
                    </td>
                    <td
                      className="mailbox-name text-capitalize text-truncate text-bold text-primary"
                      style={{ cursor: "pointer", maxWidth: 180 }}
                      onClick={(e) => {
                        //handleSelectUser(e, user)
                        history.push(`usuarios/${user.id}`);
                      }}
                    >
                      {user.name}
                    </td>
                    <td className="mailbox-name text-muted text-truncate">
                      <span>{user.email}</span>
                    </td>
                    <td className="mailbox-name ">
                      <span className={getClassByRole(user.roles[0])}>
                        {user.roles[0]}
                      </span>
                    </td>
                    <td className="text-truncate">
                      <span className="text-capitalize">
                        {user.branch.data.name}
                      </span>
                    </td>
                    {_userContext.options.orderby === "created_at" ? (
                      <td className="mailbox-date text-muted text-truncate">
                        <span>{moment(user.created_at).format("LL")}</span>
                      </td>
                    ) : (
                      <td className="mailbox-date text-muted text-truncate">
                        <span>{moment(user.updated_at).fromNow()}</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <th className="text-center text-muted" colSpan="6">
                No hay usuarios registrados
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </ListInbox>
  );
}

function getClassByRole(role) {
  switch (role) {
    case "admin":
      return "text-capitalize badge badge-pill badge-dark";
    case "ventas":
      return "text-capitalize badge badge-pill badge-success";
    default:
      return "text-capitalize badge badge-pill badge-primary";
  }
}
