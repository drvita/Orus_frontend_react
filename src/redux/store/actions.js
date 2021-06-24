import { TYPE } from "./types";

const getListStore = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_STORE,
  payload,
});
const setListStore = (payload = {}) => ({
  type: TYPE.SET_LIST_STORE,
  payload,
});
const setMessagesStore = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_STORE,
  payload,
});

const toExportActions = {
  getListStore,
  setListStore,
  setMessagesStore,
};

export default toExportActions;
