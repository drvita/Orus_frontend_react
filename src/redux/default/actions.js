import { TYPE } from "./types";

const changeHost = (payload) => ({
  type: TYPE.CHANGE_HOST,
  payload,
});
const changeNamePage = (payload) => ({
  type: TYPE.CHANGE_PAGE,
  payload,
});

const toExportActions = {
  changeHost,
  changeNamePage,
};

export default toExportActions;
