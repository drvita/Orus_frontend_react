import { TYPE } from "./types";

export const getListStore = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_STORE,
  payload,
});
export const setListStore = (payload = {}) => ({
  type: TYPE.SET_LIST_STORE,
  payload,
});
export const setMessagesStore = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_STORE,
  payload,
});
