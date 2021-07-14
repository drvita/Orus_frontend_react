import { TYPE } from "./types";
//SAGAS
const getListOrder = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST,
  payload,
});
const deleteOrder = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_ORDER,
  payload,
});
const saveOrder = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_ORDER,
  payload,
});
const getOrder = (payload = {}) => ({
  type: TYPE.SAGA_GET_ORDER,
  payload,
});

//SETS
const setListOrder = (payload = {}) => ({
  type: TYPE.SET_LIST,
  payload,
});
const setMessageOrder = (payload = []) => ({
  type: TYPE.SET_MESSAGE,
  payload,
});
const setOrder = (payload = {}) => ({
  type: TYPE.SET_ORDER,
  payload,
});
const setOptions = (payload = {}) => ({
  type: TYPE.SET_OPTIONS,
  payload,
});

const toExportActions = {
  getListOrder,
  deleteOrder,
  saveOrder,
  getOrder,
  setListOrder,
  setMessageOrder,
  setOrder,
  setOptions,
};

export default toExportActions;
