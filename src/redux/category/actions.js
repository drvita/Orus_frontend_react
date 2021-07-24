import { TYPE } from "./types";

//SAGAS
const getListCategories = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_CATEGORIES,
  payload,
});
const getCategory = (payload) => ({
  type: TYPE.SAGA_GET_CATEGORY,
  payload,
});
const deleteCategory = (payload) => ({
  type: TYPE.SAGE_DELETE_CATEGORY,
  payload,
});
const saveCategory = (payload) => ({
  type: TYPE.SAGA_SAVE_CATEGORY,
  payload,
});

//Other
const setListCategories = (payload = []) => ({
  type: TYPE.SET_LIST_CATEGORY,
  payload,
});
const setCategory = (payload = {}) => ({
  type: TYPE.SET_CATEGORY,
  payload,
});
const setMessageCategory = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_CATEGORY,
  payload,
});

const toExportActions = {
  getListCategories,
  getCategory,
  setListCategories,
  setCategory,
  setMessageCategory,
  deleteCategory,
  saveCategory,
};

export default toExportActions;
