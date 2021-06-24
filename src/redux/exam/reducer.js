import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  orderby: "created_at",
  order: "desc",
  search: "",
  page: 1,
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_EXAM: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SET_LIST_EXAM: {
      return {
        ...state,
        ...payload.result,
        ...payload.options,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_EXAM: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
