import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  contact: { id: 0 },
  suppliers: [],
  supplier: { id: 0 },
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;

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
        contact: { id: 0 },
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CONTACT: {
      return {
        ...state,
        contact: { id: 0 },
        loading: true,
      };
    }
    case TYPE.SAGA_GET_CONTACT: {
      return {
        ...state,
        loading: true,
        contact: { id: 0 },
      };
    }
    case TYPE.SAGA_GET_LIST_SUPPLIERS: {
      return {
        ...state,
        loading: true,
        supplier: { id: 0 },
      };
    }

    case TYPE.SET_LIST_CONTACT: {
      return {
        ...state,
        contact: { id: 0 },
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_CONTACT: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_CONTACT: {
      return {
        ...state,
        loading: false,
        contact: payload,
        list: [],
        metaList: {},
        messages: [],
      };
    }
    case TYPE.SET_LIST_SUPPLIERS: {
      return {
        ...state,
        supplier: { id: 0 },
        suppliers: payload,
        messages: [],
        loading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
