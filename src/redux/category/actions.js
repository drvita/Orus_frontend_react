import {TYPE} from "./types";

export const getListCategories = (payload = {}) => ({
  type: TYPE.SAGA_GET_LIST_CATEGORIES,
  payload,
});
