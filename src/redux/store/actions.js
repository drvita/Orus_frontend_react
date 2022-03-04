import { TYPE } from "./types";

const setListStore = (payload = []) => ({
  type: TYPE.SET_LIST_STORE,
  payload,
});
const setMessagesStore = (payload = []) => ({
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
const setListBrand = (payload = {}) => ({
  type: TYPE.SET_LIST_BRANDS,
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
const saveItem = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_ITEM,
  payload,
});

const getListBrands = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_BRANDS,
  payload,
});
const saveBrand = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_BRAND,
  payload,
});
const deleteBrand = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_BRAND,
  payload,
});
const saveInBranch = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_INBRANCH,
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
  saveItem,
  getListBrands,
  setListBrand,
  saveBrand,
  deleteBrand,
  saveInBranch,
};

export default toExportActions;
