import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {},
  messages: [],
  sale: {},
  listBanks: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_SALES: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_SALE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_SALE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_SALE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_LIST_BANK: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LIST_SALES: {
      return {
        ...state,
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_SALE: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_SALE: {
      return {
        ...state,
        sale: payload,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_LIST_BANKS: {
      return {
        ...state,
        listBanks: payload,
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
