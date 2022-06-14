import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  messages: [],
  category: { id: 0 },
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGE_DELETE_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LIST_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        category: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
