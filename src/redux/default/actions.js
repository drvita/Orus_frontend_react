import {TYPE} from "./types";

export const changeHost = (payload) => ({
  type: TYPE.CHANGE_HOST,
  payload,
});
