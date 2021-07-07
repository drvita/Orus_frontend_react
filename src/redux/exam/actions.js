import { TYPE } from "./types";

const setListExam = (payload = {}) => ({
  type: TYPE.SET_LIST_EXAM,
  payload,
});
const setMessagesExam = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_EXAM,
  payload,
});
const saveExam = (payload = {}) => ({
  type: TYPE.SAGA_SAVE_EXAM,
  payload,
});
const setExam = (payload = {}) => ({
  type: TYPE.SET_EXAM,
  payload,
});

//SAGAS
const getListExam = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_EXAM,
  payload,
});
const getExam = (payload) => ({
  type: TYPE.SAGA_GET_EXAM,
  payload,
});
const deleteExam = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_EXAM,
  payload,
});

const toExportActions = {
  getListExam,
  setListExam,
  setMessagesExam,
  deleteExam,
  saveExam,
  getExam,
  setExam,
};

export default toExportActions;
