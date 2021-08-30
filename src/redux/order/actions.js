import { TYPE } from "./types";

//Data
const order_default = {
  result: {
    list: [],
    metaList: {},
  },
};

//SAGAS
const getListOrder = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_ORDER,
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
const setListOrder = (payload = order_default) => ({
  type: TYPE.SET_LIST_ORDER,
  payload,
});
const setMessageOrder = (payload = []) => ({
  type: TYPE.SET_MESSAGE_ORDER,
  payload,
});
const setOrder = (payload = {}) => ({
  type: TYPE.SET_ORDER,
  payload,
});
const setOptions = (payload = {}) => ({
  type: TYPE.SET_OPTIONS_ORDER,
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
