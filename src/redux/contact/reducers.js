import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  contact: { id: 0 },
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CONTACTS: {
      return {
        ...state,
        list: [],
        metaList: {},
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_CONTACT: {
      return {
        ...state,
        contact: {},
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CONTACT: {
      return {
        ...state,
        contact: {},
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
        contact: { id: 0 },
        ...payload.result,
        messages: [],
        loading: false,
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
        list: [],
        metaList: {},
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
