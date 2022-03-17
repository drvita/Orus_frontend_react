import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import ListInbox from "../../../layouts/list_inbox";
//Actions
import { userActions } from "../../../redux/user/index";
import helper from "../helpers";

function InboxComponent(props) {
  const {
    loading,
    meta,
    users,
    options,
    //Functions
    _getListUsers,
    _setOptions,
    _deleteUser,
    _setUser,
    _getUser,
  } = props;
  //States
  const [userSelected, setUserSelected] = useState({ id: 0 });
  //Functions
  const handleChangeOptions = (key, value) => {
      if (options[key] !== value) {
        _setOptions({
          key,
          value,
        });
      }
    },
    deleteItem = () => {
      helper.handleDelete(userSelected, options, _deleteUser);
      setUserSelected({ id: 0 });
    },
    handleUserSelect = ({ checked }, item) => {
      if (!checked) item = { id: 0 };
      setUserSelected(item);
    },
    handleSelectUser = (e, order = { id: 0 }) => {
      if (e) e.preventDefault();

      if (order.id) {
        _setUser(order);
      } else if (userSelected.id) {
        _getUser(userSelected.id);
      }
    };

  useEffect(() => {
    _getListUsers(options);
    //eslint-disable-next-line
  }, [options]);

  return (
    <ListInbox
      title="Lista de productos"
      icon="id-badge"
      color="primary"
      loading={loading}
      meta={meta}
      itemSelected={userSelected.id}
      defaultSearch={options.search}
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleDeleteItem={deleteItem}
      handleEditItem={handleSelectUser}
      handleSync={() => _getListUsers(options)}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Email/Usuario</th>
            <th>Rol</th>
            <th>Sucursal</th>
            {options.orderby === "created_at" ? (
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
                        checked={userSelected.id === user.id ? true : false}
                        onChange={({ target }) =>
                          handleUserSelect(target, user)
                        }
                      />
                      <label
                        htmlFor={"item_" + user.id}
                        className="sr-only"
                      ></label>
                    </td>
                    <td className="mailbox-name text-capitalize text-truncate">
                      <a
                        href="·link"
                        onClick={(e) => handleSelectUser(e, user)}
                        className="text-bold"
                      >
                        {user.name}
                      </a>
                    </td>
                    <td className="mailbox-name text-muted text-truncate">
                      <span>{user.email}</span>
                    </td>
                    <td className="mailbox-name text-dark text-bold text-truncate">
                      {helper.getNameRoles(user.roles)}
                    </td>
                    <td className="text-truncate">
                      <span className="text-capitalize">
                        {user.branch.values.name}
                      </span>
                    </td>
                    {options.orderby === "created_at" ? (
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

const mapStateToProps = ({ users }) => {
    return {
      users: users.list,
      meta: users.meta,
      messages: users.messages,
      loading: users.loading,
      options: users.options,
    };
  },
  mapActionsToProps = {
    _getListUsers: userActions.getListUsers,
    _setOptions: userActions.setOptions,
    _setUser: userActions.setUser,
    _getUser: userActions.getUser,
    _deleteUser: userActions.deleteUser,
  };

export default connect(mapStateToProps, mapActionsToProps)(InboxComponent);
