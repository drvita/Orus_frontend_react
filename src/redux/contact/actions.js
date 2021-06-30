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
//SETS
const setListContact = (payload = {}) => ({
  type: TYPE.SET_LIST_CONTACT,
  payload,
});
const setStateVar = (payload = {}) => ({
  type: TYPE.SET_STATE_VAR_CONTACT,
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

const toExportActions = {
  getListContacts,
  deleteContact,
  saveContact,
  setListContact,
  setStateVar,
  setMessageContact,
  getContact,
  setContact,
};

export default toExportActions;
