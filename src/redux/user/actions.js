import { TYPE } from "./types";

const loggin = (payload) => ({
  type: TYPE.SAGA_TRY_LOGING,
  payload,
});
const checkLogging = (payload) => ({
  type: TYPE.SAGA_CHECK_LOGING,
  payload,
});
const getNotifyUser = (payload) => ({
  type: TYPE.SAGA_GET_NOTIFY,
  payload,
});
const readNotifyUser = (payload) => ({
  type: TYPE.SAGA_READ_NOTIFYS,
  payload,
});
const getListUsers = (payload) => ({
  type: TYPE.SAGA_GET_LIST_USERS,
  payload,
});
const getUser = (payload) => ({
  type: TYPE.SAGA_GET_USER,
  payload,
});
const deleteUser = (payload) => ({
  type: TYPE.SAGA_DELETE_USER,
  payload,
});
const saveUser = (payload) => ({
  type: TYPE.SAGA_SAVE_USER,
  payload,
});

const setLoggin = (payload) => ({
  type: TYPE.SET_LOGGIN,
  payload,
});
const setLogout = () => ({
  type: TYPE.SET_LOGOUT,
  payload: null,
});
const setNotifys = (payload) => ({
  type: TYPE.SET_NOTIFYS,
  payload,
});
const setMessages = (payload) => ({
  type: TYPE.SET_MESSAGES,
  payload,
});
const setListUsers = (payload) => ({
  type: TYPE.SET_LIST_USERS,
  payload,
});
const setOptions = (payload) => ({
  type: TYPE.SET_OPTIONS_USERS,
  payload,
});
const setUser = (payload = {}) => ({
  type: TYPE.SET_USER,
  payload,
});

const toExportActions = {
  loggin,
  checkLogging,
  getNotifyUser,
  readNotifyUser,
  setLoggin,
  setLogout,
  setNotifys,
  setMessages,
  getListUsers,
  setListUsers,
  setOptions,
  setUser,
  getUser,
  deleteUser,
  saveUser,
};

export default toExportActions;
