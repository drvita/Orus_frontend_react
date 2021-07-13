import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  messages: [],
  exam: { id: 0 },
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
    case TYPE.SAGA_GET_EXAM: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_EXAM: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_EXAM: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LIST_EXAM: {
      return {
        ...state,
        exam: { id: 0 },
        ...payload.result,
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
    case TYPE.SET_EXAM: {
      return {
        ...state,
        loading: false,
        exam: payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
