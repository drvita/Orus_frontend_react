import { TYPE } from "./types";
//SAGAS
const getListContact = (payload = {}, idOrder) => ({
  type: TYPE.SAGA_GET_LIST_CONTACT,
  payload,
  idOrder,
});
const deleteContact = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_CONTACT,
  payload,
});
const saveContact = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_CONTACT,
  payload,
});
//SETS
const setListContact = (payload = {}) => ({
  type: TYPE.SET_LIST_CONTACT,
  payload,
});
const setStateVar = (payload = {}) => {
  return {
    type: TYPE.SET_STATE_VAR_CONTACT,
    payload,
  };
};
const setMessageContact = (payload = []) => ({
  type: TYPE.SET_MESSAGE_CONTACT,
  payload,
});

export default {
  getListContact,
  deleteContact,
  saveContact,
  setListContact,
  setStateVar,
  setMessageContact,
};
