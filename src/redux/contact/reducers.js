import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  contact: {},
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CONTACTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_CONTACT: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CONTACT: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_CONTACT: {
      return {
        ...state,
        loading: true,
        contact: {},
      };
    }

    case TYPE.SET_LIST_CONTACT: {
      const { payload } = action;
      return {
        ...state,
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_STATE_VAR_CONTACT: {
      const { payload } = action;
      return {
        ...state,
        [payload.key]: payload.val,
      };
    }
    case TYPE.SET_MESSAGE_CONTACT: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_CONTACT: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        contact: payload,
        messages: [],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
