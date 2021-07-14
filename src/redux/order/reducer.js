import { TYPE } from "./types";

const DEFAULT_STATE = {
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

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST: {
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

    case TYPE.SET_LIST: {
      const { payload } = action;
      return {
        ...state,
        ...payload.result,
        order: { id: 0 },
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_ORDER: {
      const { payload } = action;
      return {
        ...state,
        order: payload,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_OPTIONS: {
      const { payload } = action;
      return {
        ...state,
        options: {
          ...state.options,
          page: 1,
          [payload.key]: payload.value,
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
