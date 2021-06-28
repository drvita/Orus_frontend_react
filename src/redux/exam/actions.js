import { TYPE } from "./types";

const getListExam = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_EXAM,
  payload,
});
const deleteExam = (payload = {}) => ({
  type: TYPE.SAGA_DELETE_EXAM,
  payload,
});
const setListExam = (payload = {}) => ({
  type: TYPE.SET_LIST_EXAM,
  payload,
});
const setMessagesExam = (payload = {}) => ({
  type: TYPE.SET_MESSAGE_EXAM,
  payload,
});

const toExportActions = {
  getListExam,
  setListExam,
  setMessagesExam,
  deleteExam,
};

export default toExportActions;
