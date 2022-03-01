import { TYPE } from "./types";

export const DEFAULT_STATE_ORDER = {
  list: [],
  metaList: {},
  order: { id: 0 },
  options: {
    page: 1,
    orderby: "created_at",
    order: "desc",
    search: "",
    status: "",
    itemsPage: 10,
  },
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE_ORDER, action) => {
  const { payload } = action;

  switch (action.type) {
    case TYPE.SAGA_GET_LIST_ORDER: {
      return {
        ...state,
        list: [],
        metaList: {},
        order: { id: 0 },
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_ORDER: {
      return {
        ...state,
        list: [],
        metaList: {},
        order: { id: 0 },
        loading: true,
      };
    }

    case TYPE.SET_LIST_ORDER: {
      return {
        ...state,
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_ORDER: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_ORDER: {
      return {
        ...state,
        order: payload,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_OPTIONS_ORDER: {
      const { key, value } = payload;
      return {
        ...state,
        options: {
          ...state.options,
          page: 1,
          [key]: value,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
