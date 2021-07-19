import { TYPE } from "./types";

const setListStore = (payload = {}) => ({
  type: TYPE.SET_LIST_STORE,
  payload,
});
const setMessagesStore = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_STORE,
  payload,
});
const setOptions = (payload = {}) => ({
  type: TYPE.SET_OPTIONS,
  payload,
});
const setItem = (payload = {}) => ({
  type: TYPE.SET_ITEM,
  payload,
});

//SAGAS
const getListStore = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_STORE,
  payload,
});
const deleteItem = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_STORE,
  payload,
});
const getItem = (payload = {}) => ({
  type: TYPE.SAGA_GET_ITEM,
  payload,
});

const toExportActions = {
  getListStore,
  deleteItem,
  getItem,
  setListStore,
  setMessagesStore,
  setOptions,
  setItem,
};

export default toExportActions;
