import { TYPE } from "./types";
//SAGAS
const getListContacts = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_CONTACTS,
  payload,
});
const deleteContact = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_CONTACT,
  payload,
});
const saveContact = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_CONTACT,
  payload,
});
const getContact = (payload = {}) => ({
  type: TYPE.SAGA_GET_CONTACT,
  payload,
});
const getListSuppliers = (payload) => ({
  type: TYPE.SAGA_GET_LIST_SUPPLIERS,
  payload,
});
//SETS
const setListContact = (payload = []) => ({
  type: TYPE.SET_LIST_CONTACT,
  payload,
});
const setMessageContact = (payload = []) => ({
  type: TYPE.SET_MESSAGE_CONTACT,
  payload,
});
const setContact = (payload = {}) => ({
  type: TYPE.SET_CONTACT,
  payload,
});
const setListSuppliers = (payload = []) => ({
  type: TYPE.SET_LIST_SUPPLIERS,
  payload,
});

const toExportActions = {
  getListContacts,
  deleteContact,
  saveContact,
  setListContact,
  setMessageContact,
  getContact,
  setContact,
  getListSuppliers,
  setListSuppliers,
};

export default toExportActions;
