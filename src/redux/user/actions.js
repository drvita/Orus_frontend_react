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

const toExportActions = {
  loggin,
  checkLogging,
  getNotifyUser,
  readNotifyUser,
  setLoggin,
  setLogout,
  setNotifys,
  setMessages,
};

export default toExportActions;
