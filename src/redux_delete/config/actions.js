import { TYPE } from "./types";

const getListConfig = (payload) => ({
  type: TYPE.SAGA_GET_LIST_CONFIG,
  payload,
});
const getConfig = (payload) => ({
  type: TYPE.SAGA_GET_CONFIG,
  payload,
});
const deleteConfig = (payload) => ({
  type: TYPE.SAGA_DELETE_CONFIG,
  payload,
});
const saveConfig = (payload) => ({
  type: TYPE.SAGA_SAVE_CONFIG,
  payload,
});

const setMessages = (payload) => ({
  type: TYPE.SET_MESSAGE_CONFIG,
  payload,
});
const setListConfig = (payload) => ({
  type: TYPE.SET_LIST_CONFIG,
  payload,
});
const setConfig = (payload = {}) => ({
  type: TYPE.SET_CONFIG,
  payload,
});

const getBranches = (payload)=>({
  type:TYPE.SAGA_GET_BRANCHES,
  payload
});

const setBranches = (payload)=>({
  type:TYPE.SET_BRANCHES,
  payload
});

const toExportActions = {
  setMessages,
  getListConfig,
  getConfig,
  deleteConfig,
  saveConfig,
  setListConfig,
  setConfig,
  getBranches,
  setBranches,
};

export default toExportActions;
