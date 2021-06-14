import { TYPE } from "./types";
//SAGAS
export const getListOrder = (payload = {}, idOrder) => ({
  type: TYPE.SAGA_GET_LIST,
  payload,
  idOrder,
});
export const deleteOrder = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_ORDER,
  payload,
});
export const saveOrder = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_ORDER,
  payload,
});

//SETS
export const setListOrder = (payload = {}) => ({
  type: TYPE.SET_LIST,
  payload,
});
export const setStateVar = (payload = {}) => {
  return {
    type: TYPE.SET_STATE_VAR,
    payload,
  };
};
export const setErrorOrder = (payload = []) => ({
  type: TYPE.SET_ERROR,
  payload,
});
export const setMessageOrder = (payload = []) => ({
  type: TYPE.SET_MESSAGE,
  payload,
});
