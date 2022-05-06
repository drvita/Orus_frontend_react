import moment from "moment";
import { useEffect, useState, useContext } from "react";
import useUsers from "../../../hooks/useUsers";
import { UserContext } from "../../../context/UserContext";
import ListInbox from "../../../layouts/list_inbox";
import helper from "../helpers";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

//Actions
import { userActions } from "../../../redux/user/index";
import { connect } from "react-redux";

export default function InboxComponent(){

  const history = useHistory();
  const _users = useUsers();
  const _userContext = useContext(UserContext);
  const _authContext = useContext(AuthContext);
  const [userSelected, setUserSelected] = useState('');


  const [data, setData] = useState({
    users:[],
    meta: {},
  })

  const [loading, setLoading] = useState(false);

  const { users, meta } = data;

  const handleChangeOptions = (key, value) => {
    console.log("Handle Pagination", key, value);
    _userContext.set({
      ..._userContext,
      options:{
        ..._userContext.options,
        search: value,
      }
    })
    /* if (options[key] !== value) {
      _setOptions({
        key,
        value,
      });
    } */
  };


  const deleteItem = () => {
    setLoading(true)
    _users.deleteUser(userSelected).then((data)=>{
      window.Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado correctamente',
        showConfirmButton: false,
        timer: 2500
      });

      setUserSelected({ id: 0 });

      _users.getListUsers(_userContext.options).then((data) => {
        if(data){
          setData({
            ...data,
            users: data.data,
            meta: data.meta,
          })
          setLoading(false);
        }
      })
    })
    .catch((error)=>{      
      console.error(error);
    })
  };

  //Checkbox selected
  const handleUserSelect = (item) => {
    console.log(item);
    let { value , checked } = item;
    if (!checked) item = { id: 0 };
    setUserSelected(value);
  };

//Click on userName
/*  const handleSelectUser = (e, order = { id: 0 }) => {
    if (e) e.preventDefault();
    if (order.id) {
      console.log(order);
      //TODO: guardar el usuario seleccionado para que el componente pueda acceder a el
      //TODO: guardar en state local y pasar por props
    } else if (userSelected.id) {
      console.log(userSelected.id);
      _users.getUserById(userSelected.id);
    }
  };  */

  const handleSelectUser = (e, order = { id: 0 }) => {
    if(userSelected){
      history.push(`usuarios/${userSelected}`);
    }
    else{
      window.Swal.fire({
        title: "Error",
        text: "Lo sentimos no existe un contacto seleccionado",
        icon: "error",
      });
    }
  };


  useEffect(()=>{
    setLoading(true);
    _users.getListUsers(_userContext.options).then((data)=>{
      if(data){
        setData({
          ...data,
          users: data.data,
          meta: data.meta
        })
        setLoading(false);
      }else{
        console.error("Error al obtener los datos");
      }
    })
  }, [_userContext.options]);


  return (
    <ListInbox
      title="Lista de productos"
      icon="id-badge"
      color="primary"
      loading={loading}
      meta={meta}
      itemSelected={userSelected}
      defaultSearch={ _userContext.options.search }
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleDeleteItem={deleteItem}
      handleEditItem={handleSelectUser}
      handleSync={() => { 
        _userContext.set({
          ..._userContext,
          options:{
            page: 1,
            orderby: "created_at",
            order: "desc",
            itemsPage: 10,
          }
        })
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
                          const {value, checked} = target;
                          setUserSelected(checked ? parseInt(value) : "",)                          
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
                        history.push(`usuarios/${user.id}`)                        
                      }}
                      >              
                        {user.name}
                    </td>
                    <td className="mailbox-name text-muted text-truncate">
                      <span>{user.email}</span>
                    </td>
                    <td className="mailbox-name text-dark text-bold text-truncate">                  
                      {helper.getNameRoles(user.roles)}
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
































/* 
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
                        {user.branch.data.name}
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

 */